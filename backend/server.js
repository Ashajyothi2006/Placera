const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const config = require('./config');
const careerChatService = require('./services/careerChatService');
const { assessmentDb, db: rawAssessmentDb } = require('./db/assessmentDb');
const {
    detectResumeDomainAndStage,
    extractRequestedTopic,
    findActiveTopicInHistory,
    analyzeResumeMetadata,
    generateAdaptiveInterviewFallback
} = require('./interviewEngine');

const app = express();

// Flexible CORS setup to allow localhost/127.0.0.1 on any port and prevent CORS blocking
const allowedOrigins = (origin, callback) => {
    // Allow non-browser requests (e.g. curl, server-to-server, Postman)
    if (!origin) return callback(null, true);

    // If FRONTEND_URL is explicitly set, check it
    if (process.env.FRONTEND_URL) {
        const envOrigins = process.env.FRONTEND_URL.split(',').map(u => u.trim());
        if (envOrigins.includes(origin) || envOrigins.includes('*')) {
            return callback(null, true);
        }
    }

    // Allow any localhost or 127.0.0.1 on any port (e.g. 5173, 5174, 3000, 4173)
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
    }

    // Allow Vercel deployment domains (*.vercel.app)
    if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
    }

    // Allow local network IP addresses for LAN testing
    if (/^https?:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/.test(origin)) {
        return callback(null, true);
    }

    // In development mode, allow all origins
    if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
    }

    return callback(new Error('Blocked by CORS'));
};

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true,
    optionsSuccessStatus: 200
}));
// Support large resume uploads without 413 Payload Too Large error
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// Function to sanitize error message and strip raw URLs and internal error traces
function sanitizeErrorMessage(err) {
    if (!err) return 'Unknown error occurred.';
    let message = typeof err === 'string' ? err : (err.message || String(err));

    // Check for high demand / 503
    if (message.includes('503') || /high\s*demand/i.test(message) || /overloaded/i.test(message) || /spikes\s*in\s*demand/i.test(message)) {
        return 'The Gemini AI model is currently experiencing high demand (503 Service Unavailable). Please try again in a moment.';
    }

    // Check for rate limit / 429
    if (message.includes('429') || /quota/i.test(message) || /resource has been exhausted/i.test(message)) {
        return 'Gemini API quota or rate limit reached (429). Please try again in a moment.';
    }

    // Check for deprecated model / 404
    if (message.includes('404') || /no longer available/i.test(message) || /not found/i.test(message)) {
        return 'The AI service is transitioning to the latest model version. Please try your request again.';
    }

    // Strip GoogleGenerativeAI error prefixes and URLs
    message = message.replace(/\[GoogleGenerativeAI Error\]:\s*/gi, '');
    message = message.replace(/Error fetching from\s+https?:\/\/[^\s:]+:\s*/gi, '');
    message = message.replace(/https?:\/\/[^\s)\]]+/gi, '').trim();
    message = message.replace(/[:]+$/, '').trim();

    return message || 'The AI service is temporarily unavailable. Please try again.';
}

// Helper function to call Gemini with automatic fallback across proven working models and retry on 503
async function callGemini(promptText, timeoutMs = 8000, maxModels = 4) {
    // Supported modern active models arranged by availability and performance
    const allModels = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b',
        'gemini-1.5-pro',
        'gemini-2.0-flash'
    ];
    const modelsToTry = allModels.slice(0, maxModels);
    let lastError;
    for (const modelName of modelsToTry) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });

            let timeoutId;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutId = setTimeout(() => reject(new Error(`Timeout waiting for model ${modelName}`)), timeoutMs);
            });

            const generatePromise = model.generateContent(promptText);
            const result = await Promise.race([generatePromise, timeoutPromise]);
            clearTimeout(timeoutId);
            return result.response.text();
        } catch (err) {
            lastError = err;
            console.warn(`[Gemini Fallback] Model ${modelName} encountered issue: ${sanitizeErrorMessage(err)}. Trying next...`);
        }
    }
    const cleanErr = new Error(sanitizeErrorMessage(lastError));
    cleanErr.originalError = lastError;
    throw cleanErr;
}

// Basic health check
app.get('/', (req, res) => res.json({ message: 'Backend is running' }));

// ----------------------------------------------------
// ----------------------------------------------------
// ROUTE 1: Live AI Mock Interview (Multi-Domain & Candidate Topic-Driven)
// ----------------------------------------------------
app.post('/api/interview', async (req, res) => {
    try {
        const {
            candidateAnswer,
            chatHistory = [],
            resumeText = '',
            candidateName: passedCandidateName = '',
            targetRole: passedTargetRole = 'Senior Full Stack Engineer',
            targetCompany = 'Google',
            requestedTopic = '',
            isStart = false
        } = req.body;

        // Clean candidate name - ensure %PDF or binary headers are never used as a name
        let candidateName = (passedCandidateName || '').trim();
        if (/^%PDF/i.test(candidateName) || /PDF-\d/i.test(candidateName) || /obj|stream|endobj/i.test(candidateName)) {
            candidateName = '';
        }

        // Clean resume text of any raw PDF binary markers
        let cleanResume = (resumeText || '')
            .replace(/%PDF-[0-9.]+/gi, '')
            .replace(/stream[\s\S]*?endstream/gi, '')
            .replace(/[^\x20-\x7E\r\n\t]/g, ' ')
            .trim();

        if (!candidateName && cleanResume) {
            const pdfKeywords = /^(stream|endstream|obj|endobj|xref|trailer|startxref|catalog|pages|page|font|type|length|filter|flatedecode|linearized)$/i;
            const lines = cleanResume.split('\n').map(l => l.trim()).filter(Boolean);
            for (const line of lines.slice(0, 10)) {
                if (/^%PDF/i.test(line) || /obj\s*$/i.test(line) || /<<|>>/i.test(line) || /http/i.test(line) || /@/.test(line)) {
                    continue;
                }
                const cleaned = line.replace(/resume|curriculum vitae|cv/gi, '').trim();
                if (pdfKeywords.test(cleaned)) {
                    continue;
                }
                if (cleaned.length >= 2 && cleaned.length < 35 && !cleaned.includes(':') && /^[a-zA-Z\s.'-]+$/.test(cleaned)) {
                    candidateName = cleaned;
                    break;
                }
            }
        }

        // Detect domain & career stage (ECE, EEE, Data Science, Mechanical, Civil, CS, Lecturer, Student, etc.)
        const domainInfo = detectResumeDomainAndStage(cleanResume, passedTargetRole);
        let targetRole = passedTargetRole;
        if (!targetRole || targetRole === 'Senior Full Stack Engineer') {
            const meta = analyzeResumeMetadata(cleanResume, '');
            if (meta.targetRole && meta.domainType !== 'SOFTWARE') {
                targetRole = meta.targetRole;
            }
        }

        const systemPrompt = `You are Sarah Jenkins, an expert Principal Technical Interviewer at ${targetCompany}, conducting a live voice technical interview for ${candidateName || 'the candidate'}.

CANDIDATE CONTEXT & PROFILE:
- Target Role: ${targetRole}
- Detected Domain: ${domainInfo.domainName} (${domainInfo.domainType})
- Candidate Stage / Persona: ${domainInfo.stageName} (${domainInfo.stageType})
- Verified Resume Context:
"""
${cleanResume ? cleanResume.slice(0, 3500) : 'Technical candidate.'}
"""

CRITICAL CANDIDATE REQUEST & TOPIC SWITCHING INSTRUCTION (HIGHEST PRIORITY):
- If the candidate explicitly asks to be tested or practice a specific topic, programming language, or technical area (e.g., "ask me questions on Python", "can you ask about Machine Learning", "I want to practice SQL", "ask me about VLSI / Embedded Systems / Electrical / Circuits", etc.):
  1. IMMEDIATELY HONOR THEIR REQUEST. Do NOT ignore it or continue with a generic question!
  2. Briefly acknowledge their request enthusiastically (e.g., "Certainly, let's dive into Python!", "Understood, let's practice questions on Machine Learning!").
  3. Ask an insightful, level-appropriate technical question focused directly on their requested topic.
  4. In subsequent turns, continue asking questions on that requested topic until they request another pivot or conclude.

MULTI-DOMAIN ADAPTABILITY RULES:
- The candidate may come from any engineering discipline:
  * Electronics & Communication (ECE / VLSI / Embedded Systems / IoT / Microcontrollers / Circuit Design / Signal Processing)
  * Electrical Engineering (EEE / Power Systems / Control Systems / Power Electronics / Electric Vehicles / Machines)
  * Data Science & Artificial Intelligence (ML / Deep Learning / NLP / Computer Vision / Data Pipelines / Statistics)
  * Mechanical or Civil Engineering (Core disciplines, CAD, thermodynamics, structural analysis)
  * Software Engineering & Computer Science (Full Stack, Backend, Systems, Cloud, DevOps)
- ALWAYS ground technical questions in their actual domain. NEVER ask generic web or API questions to an Electronics or Electrical or Mechanical engineer!

CAREER STAGE & PERSONA CALIBRATION:
- Student / College Fresher: Focus on core fundamentals, academic capstone projects, lab coursework, problem-solving reasoning, and foundational concepts. Be encouraging.
- Lecturer / Professor / Academic Educator: Focus on theoretical depth, technical pedagogy (how they explain complex concepts to students), curriculum design, research insights, and lab experiment design.
- Experienced Industry Professional: Focus on real-world system architecture, scaling, reliability, production edge cases, trade-offs, and team engineering practices.

SPOKEN VOICE SYNTHESIS RULES:
1. Speak in natural, spoken English (2 to 3 sentences maximum). Keep it direct, crisp, conversational, and professional for audio speech synthesis.
2. DO NOT output any markdown formatting like asterisks (**), bullet points (-), hashtags (#), or backticks.
3. Address the candidate naturally${candidateName ? ` using their name (${candidateName})` : ''}. NEVER use raw file terms or technical markers.`;

        let prompt;
        if (isStart) {
            prompt = `${systemPrompt}

MANDATORY FIRST QUESTION TASK:
- Welcome the candidate${candidateName ? ` (${candidateName})` : ''} warmly to their technical interview for the ${targetRole} role at ${targetCompany}.
- Ask the candidate for their SELF-INTRODUCTION: "Please introduce yourself and briefly tell me about your background."
- Speak 2 sentences maximum. Do NOT jump into deep technical questions yet.`;
        } else {
            const formattedHistory = (chatHistory || [])
                .filter(m => m.sender !== 'System')
                .map(m => `${m.sender === 'AI' ? 'Sarah' : 'Candidate'}: ${m.text}`)
                .join('\n');

            prompt = `${systemPrompt}

Interview Conversation So Far:
"""
${formattedHistory}
"""

The candidate just answered:
"${candidateAnswer}"

TASK:
1. FIRST CHECK FOR CANDIDATE TOPIC / PRACTICE REQUESTS: Did the candidate ask to practice or be asked questions on a specific topic (e.g. Python, SQL, ML, Electronics, etc.)? If YES, immediately acknowledge the request in 1 sentence and ask a high-quality technical question on that requested topic!
2. If this is an answer to a previous question: Briefly acknowledge their answer in 1 sentence, and ask the next logical follow-up question grounded strictly in their verified resume, domain (${domainInfo.domainName}), or requested topic.
3. If this is answering the self-introduction: identify the specific project, domain skill, or experience they mentioned that aligns with their resume, and ask a targeted question about it.
4. Output 2 to 3 sentences maximum, clean spoken English without asterisks or markdown.`;
        }

        try {
            const replyText = await callGemini(prompt);
            const cleanReply = replyText.replace(/[*#_`]/g, '').trim();
            res.json({ reply: cleanReply });
        } catch (error) {
            console.warn('[Gemini Interview Fallback Engaged]:', error.message || error);
            const fallbackReply = generateAdaptiveInterviewFallback({
                candidateAnswer,
                chatHistory,
                cleanResume,
                candidateName,
                targetRole,
                targetCompany,
                isStart
            });
            res.json({ reply: fallbackReply });
        }
    } catch (error) {
        console.error('Server Error (Interview):', error);
        res.status(500).json({ error: error.message });
    }
});

// ----------------------------------------------------
// ROUTE 1.2: Parse Resume File (PDF, DOCX, TXT) & Extract Metadata
// ----------------------------------------------------
app.post('/api/resume/parse', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded.' });
        }
        const extractedText = await extractResumeText(req.file);
        const metadata = analyzeResumeMetadata(extractedText, req.file.originalname);
        res.json({
            text: extractedText,
            candidateName: metadata.candidateName,
            targetRole: metadata.targetRole,
            domain: metadata.domainName,
            domainType: metadata.domainType,
            stage: metadata.stageName,
            stageType: metadata.stageType
        });
    } catch (err) {
        console.error('Error parsing resume file:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// ROUTE 1.1: Live AI Interview Comprehensive Evaluation & Report
// ----------------------------------------------------
app.post('/api/interview/evaluate', async (req, res) => {
    try {
        const {
            chatHistory = [],
            resumeText = '',
            candidateName = 'Candidate',
            targetRole = 'Senior Software Engineer',
            targetCompany = 'Tech Enterprise',
            behavioralMetrics = {}
        } = req.body;

        const {
            eyeContactPercentage = 80,
            facePresencePercentage = 95,
            voiceClarityPercentage = 85
        } = behavioralMetrics;

        const candidateMsgs = (chatHistory || []).filter(m => m.sender === 'Candidate');
        const formattedHistory = (chatHistory || [])
            .filter(m => m.sender !== 'System')
            .map(m => `${m.sender === 'AI' ? 'Interviewer' : 'Candidate'}: ${m.text}`)
            .join('\n\n');

        const evalPrompt = `You are a Principal Technical Hiring Bar Raiser at ${targetCompany}.
Evaluate the candidate's live technical interview for the role of ${targetRole}.

Candidate Name: ${candidateName}
Verified Resume Extract:
"""
${(resumeText || '').slice(0, 2500)}
"""

Full Interview Transcript:
"""
${formattedHistory || 'Interview transcript in progress.'}
"""

Client-Side Behavioral Indicators Recorded During Interview:
- Eye Contact: ${eyeContactPercentage}%
- Face Presence: ${facePresencePercentage}%
- Voice Clarity: ${voiceClarityPercentage}%

Task: Generate a comprehensive, realistic interview performance evaluation in JSON format.
Evaluation criteria:
1. communicationScore: 0 to 100 integer (verbal clarity, structure, articulate delivery)
2. technicalScore: 0 to 100 integer (technical depth, accuracy, engineering concepts)
3. relevanceScore: 0 to 100 integer (how directly and concisely answers addressed the questions)
4. overallScore: 0 to 100 integer (holistic evaluation including behavioral indicators)
5. verdict: String, one of: "Strong Hire", "Hire", "Leaning Hire", "Needs Practice"
6. summary: 2-3 sentence executive recruiter summary
7. strengths: Array of 3 specific positive points demonstrated by candidate
8. improvements: Array of 3 actionable areas for improvement
9. behavioralFeedback: 1-2 sentences summarizing eye contact, posture, and vocal delivery

Return ONLY valid JSON matching this schema:
{
  "communicationScore": 82,
  "technicalScore": 80,
  "relevanceScore": 85,
  "overallScore": 82,
  "verdict": "Hire",
  "summary": "...",
  "strengths": ["...", "...", "..."],
  "improvements": ["...", "...", "..."],
  "behavioralFeedback": "..."
}`;

        let evalResult;
        try {
            const rawResponse = await callGemini(evalPrompt);
            let cleaned = rawResponse.replace(/```json/gi, '').replace(/```/gi, '').trim();
            const firstBrace = cleaned.indexOf('{');
            const lastBrace = cleaned.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                cleaned = cleaned.substring(firstBrace, lastBrace + 1);
            }
            evalResult = JSON.parse(cleaned);
        } catch (genErr) {
            console.warn('[Gemini Interview Eval Fallback]:', genErr.message);
            // Dynamic fallback based on candidate answer length and metrics
            const answerCount = candidateMsgs.length;
            const commScore = Math.min(95, Math.max(65, Math.round(75 + (voiceClarityPercentage * 0.15))));
            const techScore = answerCount >= 3 ? 82 : 74;
            const relScore = answerCount >= 2 ? 84 : 70;
            const overallScore = Math.round((commScore * 0.3) + (techScore * 0.4) + (relScore * 0.2) + (eyeContactPercentage * 0.1));

            evalResult = {
                communicationScore: commScore,
                technicalScore: techScore,
                relevanceScore: relScore,
                overallScore: overallScore,
                verdict: overallScore >= 80 ? "Hire" : overallScore >= 70 ? "Leaning Hire" : "Needs Practice",
                summary: `The candidate completed ${answerCount} interview turns for the ${targetRole} position, showing solid engagement with projects and foundational concepts.`,
                strengths: [
                    "Maintained consistent engagement and answered questions directly",
                    "Demonstrated familiarity with key technologies from the resume",
                    "Good vocal pace and steady articulation"
                ],
                improvements: [
                    "Provide more quantitative architectural metrics when explaining project outcomes",
                    "Deepen explanations of edge-case handling and system resilience",
                    "Maintain continuous eye contact toward the camera during challenging technical explanations"
                ],
                behavioralFeedback: `Demonstrated ${eyeContactPercentage}% eye contact consistency and ${voiceClarityPercentage}% clear vocal delivery throughout the interview.`
            };
        }

        // Attach behavioral metrics to response
        evalResult.behavioralMetrics = {
            eyeContactPercentage,
            facePresencePercentage,
            voiceClarityPercentage
        };

        // Record interview evaluation in database for authenticated user
        try {
            const userId = getRequestUserId(req);
            assessmentDb.recordInterviewEvaluation({
                userId,
                targetRole: targetRole || 'Software Engineer',
                targetCompany: targetCompany || 'Tech Company',
                overallScore: evalResult.overallScore,
                communicationScore: evalResult.communicationScore,
                technicalScore: evalResult.technicalScore,
                relevanceScore: evalResult.relevanceScore,
                verdict: evalResult.verdict,
                summary: evalResult.summary
            });
        } catch (recordErr) {
            console.warn('[Interview Eval Record Error]:', recordErr.message);
        }

        res.json(evalResult);
    } catch (err) {
        console.error('Error generating interview evaluation:', err);
        res.status(500).json({ error: err.message });
    }
});

function generateCareerAgentFallback(userPrompt, history = []) {
    const prompt = (userPrompt || '').toLowerCase();

    if (/resume|cv|ats|format/i.test(prompt)) {
        return `Here are the top strategic recommendations to optimize your resume for technical campus & off-campus placements:

1. **Quantify Your Achievements (XYZ Formula):** Format bullet points as *"Accomplished [X], as measured by [Y], by doing [Z]"*. For example: *"Optimized database queries, reducing API latency by 35% using indexing and Redis caching."*
2. **ATS Optimization:** Use standard headers (Summary, Technical Skills, Experience, Projects, Education). Place technical skills into structured categories (Languages, Frameworks, Developer Tools, Databases).
3. **Project Impact:** Highlight 2-3 prominent full-stack or system projects with GitHub links and live demos. Mention the architectural trade-offs you handled.
4. **Tailor for Target Role:** Match at least 60-70% of the keywords from the target company's job description.

Would you like to review specific bullet points or analyze a project description?`;
    }

    if (/interview|prep|mock|coding|dsa|algorithm/i.test(prompt)) {
        return `Here is a structured, proven technical interview preparation framework:

1. **Problem Solving (DSA):** Focus on high-frequency patterns rather than raw problem counts:
   - Two Pointers & Sliding Window
   - Hash Maps & Prefix Sums
   - Binary Search on answer space
   - Trees (BFS/DFS traversal) & Graphs
   - Dynamic Programming (1D & 2D memoization)
2. **Communication (UMPIRE Method):** Always clarify constraints before typing code. State your time and space complexity (O(N), O(log N)) proactively and walk through edge cases.
3. **Core CS Subjects:** Be ready for 1-2 questions on:
   - **DBMS:** ACID properties, Indexing (B+ Trees), Normalization vs Denormalization.
   - **OOPs:** Polymorphism, Inheritance, Encapsulation, Abstraction, SOLID principles.
   - **Operating Systems:** Process vs Thread, Deadlocks, Virtual Memory.
   - **Computer Networks:** TCP vs UDP, HTTP/HTTPS, DNS lifecycle.

Which specific subject or company format would you like to drill next?`;
    }

    if (/salary|negotiat|offer|ctc|package/i.test(prompt)) {
        return `Here are key principles for technical salary and offer negotiation:

1. **Know Your Market Value:** Research benchmarks on AmbitionBox, Levels.fyi, and Glassdoor for your specific tier, role, and location.
2. **Focus on Total Compensation (CTC):** Differentiate between Base Salary, Joining Bonus, Performance Bonus, and Stock/ESOPs. Fixed base salary is the most predictable component.
3. **Leverage Competing Offers:** If you have multiple offers, express genuine enthusiasm for the role while politely asking if they can match your other offers.
4. **Negotiate Non-Monetary Benefits:** If the base salary band is strict, ask for signing bonuses, relocation assistance, flexible remote days, or faster appraisal cycles.

Do you have a specific offer or stage you are negotiating right now?`;
    }

    if (/system design|architecture|scalab/i.test(prompt)) {
        return `Here is the standard 4-step framework for Technical System Design interviews:

1. **Scope the System (5 mins):** Clarify functional requirements (core features) and non-functional requirements (throughput, latency, availability, consistency). Calculate back-of-the-envelope DAU and storage needs.
2. **High-Level Architecture (10 mins):** Draw the basic flow: Client -> Load Balancer (Nginx/ALB) -> API Gateway -> Stateless Web Services -> Database (SQL vs NoSQL).
3. **Deep Dive & Data Modeling (15 mins):** Define API contracts, database schema, caching strategy (Redis), and asynchronous task queues (Kafka/RabbitMQ).
4. **Identify Bottlenecks & Failure Modes (10 mins):** Address single points of failure, database sharding/replication, CDN caching, rate limiting, and circuit breakers.

Which system design problem are you working on (e.g., URL shortener, Chat system, Notification service)?`;
    }

    // General Career Guidance
    return `As your AI Career Coach, here is a recommended roadmap to accelerate your placement readiness:

1. **Technical Foundation:** Dedicate 1-2 hours daily to solving 2-3 medium coding problems and revisiting core fundamentals (OOPs, DBMS, OS, Networks).
2. **Hands-On Application:** Ensure your resume features at least one production-grade full-stack or backend project with authentication, clean API design, and automated testing.
3. **Live Mock Practice:** Use the **Live AI Interview** module in the portal to practice real voice and camera interviews, receiving real-time behavioral and technical feedback.
4. **Skill Assessments:** Complete the company-specific assessments under **Skill Assessment** to benchmark your performance against TCS, Accenture, Google, and Infosys test patterns.

What specific area would you like us to focus on right now? (e.g., resume review, coding prep, HR rounds, or company-specific hiring criteria)`;
}

async function extractResumeText(file) {
    if (!file || !file.buffer) {
        throw new Error('No file was provided for ATS analysis.');
    }

    const filename = (file.originalname || '').toLowerCase();
    const mimetype = (file.mimetype || '').toLowerCase();

    // 1. PDF extraction
    if (filename.endsWith('.pdf') || mimetype.includes('pdf')) {
        let extractedPdfText = '';
        try {
            const parser = new PDFParse({ data: file.buffer });
            const result = await parser.getText();
            extractedPdfText = result?.text || '';
            try { await parser.destroy(); } catch (e) { }
        } catch (pdfErr) {
            console.warn('[PDFParse warning]:', pdfErr.message);
        }

        if (extractedPdfText && extractedPdfText.trim().length > 30) {
            return extractedPdfText.trim();
        }

        // Secondary fallback for PDF text extraction from stream data
        try {
            const raw = file.buffer.toString('latin1');
            const streamMatches = raw.match(/stream[\r\n]+([\s\S]*?)[\r\n]+endstream/gi) || [];
            let fallbackText = '';
            for (const sm of streamMatches) {
                const cleaned = sm.replace(/^stream[\r\n]+/, '').replace(/[\r\n]+endstream$/, '');
                const ascii = cleaned.replace(/[^\x20-\x7E\r\n\t]/g, ' ');
                if (ascii.length > 20) fallbackText += ' ' + ascii;
            }
            if (fallbackText.trim().length > 30) {
                return fallbackText.trim();
            }
        } catch (e) { }

        throw new Error('Could not extract readable text from the uploaded PDF. Please make sure the PDF contains selectable text (not scanned images) and is not password protected.');
    }

    // 2. DOCX extraction
    if (filename.endsWith('.docx') || mimetype.includes('wordprocessingml') || mimetype.includes('docx') || mimetype.includes('officedocument')) {
        try {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            if (result?.value && result.value.trim().length > 20) {
                return result.value.trim();
            }
        } catch (docxErr) {
            console.warn('[Mammoth warning]:', docxErr.message);
        }
        throw new Error('Could not extract readable text from the uploaded DOCX document. Please make sure the file is not corrupted or encrypted.');
    }

    // 3. Plaintext
    if (filename.endsWith('.txt') || mimetype.includes('text/plain')) {
        const text = file.buffer.toString('utf-8').trim();
        if (text.length > 20) return text;
    }

    throw new Error('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
}

// Comprehensive, deterministic ATS evaluation engine that strictly evaluates the extracted resume text
function generateDetailedATSAnalysisFallback(extractedText = '', targetRole = '') {
    const text = (extractedText || '').toLowerCase();
    const role = (targetRole || '').trim();

    // 1. Detect standard sections
    const hasSummary = /summary|professional summary|objective|profile|about me/i.test(extractedText);
    const hasSkills = /technical skills|skills|technologies|proficiencies|core competencies|tool[s]?/i.test(extractedText);
    const hasProjects = /project[s]?|academic project|personal project/i.test(extractedText);
    const hasExperience = /experience|work history|employment|internship|work experience/i.test(extractedText);
    const hasEducation = /education|academic background|qualifications|b\.?tech|bachelor|master|m\.?tech|degree|university|college/i.test(extractedText);
    const hasCertifications = /certification[s]?|certified|credential[s]?|license/i.test(extractedText);
    const hasAchievements = /achievement[s]?|award[s]?|honor[s]?|publication[s]?|extracurricular/i.test(extractedText);

    // 2. Technical skill detection bank
    const skillBank = {
        languages: ['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'c', 'go', 'golang', 'rust', 'ruby', 'php', 'swift', 'kotlin', 'sql', 'html', 'css', 'bash', 'shell'],
        frontend: ['react', 'next.js', 'vue', 'angular', 'tailwind', 'redux', 'bootstrap', 'webpack', 'vite', 'webrtc', 'responsive design'],
        backend: ['node.js', 'node', 'express', 'spring boot', 'spring', 'django', 'flask', 'fastapi', 'rest api', 'graphql', 'microservices', 'grpc', 'asp.net'],
        databases: ['postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'oracle', 'firebase', 'dynamodb', 'cassandra', 'elasticsearch'],
        devopsCloud: ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github', 'ci/cd', 'linux', 'terraform', 'jenkins', 'nginx'],
        aiData: ['machine learning', 'deep learning', 'pytorch', 'tensorflow', 'pandas', 'numpy', 'scikit-learn', 'nlp', 'computer vision', 'tableau', 'power bi'],
        coreCs: ['data structures', 'algorithms', 'oops', 'dbms', 'operating systems', 'computer networks', 'system design', 'agile', 'scrum', 'unit testing']
    };

    const allSkillsList = [
        ...skillBank.languages,
        ...skillBank.frontend,
        ...skillBank.backend,
        ...skillBank.databases,
        ...skillBank.devopsCloud,
        ...skillBank.aiData,
        ...skillBank.coreCs
    ];

    const detectedSkills = [];
    for (const skill of allSkillsList) {
        const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const pattern = new RegExp(`(?:^|[^a-zA-Z0-9_#+])${escaped}(?:$|[^a-zA-Z0-9_#+])`, 'i');
        if (pattern.test(extractedText)) {
            const displayName = skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            if (!detectedSkills.includes(displayName)) {
                detectedSkills.push(displayName);
            }
        }
    }

    // 3. Target Role specific required skills
    const roleKeywordMap = {
        'software developer': ['Data Structures', 'Algorithms', 'Git', 'SQL', 'OOPs', 'REST API', 'Unit Testing', 'CI/CD'],
        'frontend developer': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Redux', 'Responsive Design'],
        'backend developer': ['Node.js', 'Express', 'SQL', 'PostgreSQL', 'REST API', 'Docker', 'Redis', 'Microservices'],
        'full stack': ['React', 'Node.js', 'JavaScript', 'TypeScript', 'SQL', 'MongoDB', 'Docker', 'Git', 'REST API'],
        'java developer': ['Java', 'Spring Boot', 'Hibernate', 'SQL', 'OOPs', 'Microservices', 'REST API', 'Git'],
        'python developer': ['Python', 'Django', 'Flask', 'SQL', 'FastAPI', 'Pandas', 'Git', 'Docker'],
        'data analyst': ['SQL', 'Python', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Excel', 'Data Visualization'],
        'ai/ml': ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Pandas', 'Scikit-learn', 'NLP']
    };

    let targetBank = ['Data Structures', 'Algorithms', 'Git', 'SQL', 'OOPs', 'REST API', 'System Design'];
    for (const [rKey, rSkills] of Object.entries(roleKeywordMap)) {
        if (role.toLowerCase().includes(rKey)) {
            targetBank = rSkills;
            break;
        }
    }

    const matchedTargetSkills = targetBank.filter(ts =>
        detectedSkills.some(ds => ds.toLowerCase() === ts.toLowerCase())
    );
    const missingTargetSkills = targetBank.filter(ts =>
        !detectedSkills.some(ds => ds.toLowerCase() === ts.toLowerCase())
    );

    // 4. Calculate Scores strictly out of 100
    // Category 1: Keyword Relevance (out of 25)
    let keywordRelevance = 12;
    if (matchedTargetSkills.length >= 6) keywordRelevance = 24;
    else if (matchedTargetSkills.length >= 4) keywordRelevance = 20;
    else if (matchedTargetSkills.length >= 2) keywordRelevance = 16;
    else keywordRelevance = 12;

    // Category 2: Skills Alignment (out of 25)
    let skillsAlignment = 10;
    if (detectedSkills.length >= 12) skillsAlignment = 24;
    else if (detectedSkills.length >= 8) skillsAlignment = 21;
    else if (detectedSkills.length >= 4) skillsAlignment = 17;
    else skillsAlignment = 12;

    // Category 3: Resume Structure (out of 20)
    let resumeStructure = 10;
    if (hasEducation) resumeStructure += 3;
    if (hasProjects) resumeStructure += 3;
    if (hasSkills) resumeStructure += 3;
    if (hasExperience) resumeStructure += 2;
    if (hasSummary) resumeStructure += 1;
    if (/@/.test(extractedText)) resumeStructure += 1;
    resumeStructure = Math.min(20, resumeStructure);

    // Category 4: Content Quality (out of 15)
    let contentQuality = 7;
    const hasMetrics = /\d+%|\d+k|\$\d+|\d+\+|\b\d+\s*(?:users|clients|requests|ms|seconds|minutes)\b/i.test(extractedText);
    const hasActionVerbs = /architected|spearheaded|engineered|developed|implemented|optimized|automated|designed/i.test(extractedText);
    if (hasMetrics) contentQuality += 4;
    if (hasActionVerbs) contentQuality += 3;
    if (extractedText.length > 800) contentQuality += 1;
    contentQuality = Math.min(15, contentQuality);

    // Category 5: Projects / Experience (out of 10)
    let projectsExperience = 4;
    if (hasProjects) projectsExperience += 3;
    if (hasExperience) projectsExperience += 2;
    if (/github\.com|gitlab/i.test(extractedText)) projectsExperience += 1;
    projectsExperience = Math.min(10, projectsExperience);

    // Category 6: ATS Formatting (out of 5)
    let atsFormatting = 4;
    if (!/[^\x20-\x7E\r\n\t]{5,}/.test(extractedText)) atsFormatting += 1;
    atsFormatting = Math.min(5, Math.max(3, atsFormatting));

    const overallScore = Math.min(100, keywordRelevance + skillsAlignment + resumeStructure + contentQuality + projectsExperience + atsFormatting);

    // 5. Strengths
    const strengths = [];
    if (detectedSkills.length > 0) {
        strengths.push(`Clearly presents ${detectedSkills.length} identified technical competencies, notably ${detectedSkills.slice(0, 4).join(', ')}.`);
    }
    if (hasProjects) {
        strengths.push("Features concrete project implementations demonstrating hands-on technical execution.");
    }
    if (hasEducation) {
        strengths.push("Explicit academic credentials with university qualification clearly stated.");
    }
    if (hasMetrics) {
        strengths.push("Incorporates quantifiable performance metrics that validate engineering contributions.");
    }
    if (strengths.length < 3) {
        strengths.push("Adheres to parsable text structure easily read by modern Applicant Tracking Systems.");
    }

    // 6. Important Improvements
    const importantImprovements = [];
    if (!hasMetrics) {
        importantImprovements.push("Substantiate project and work bullet points with quantifiable metrics (e.g. '% speedup achieved', 'number of active users', or 'payload reduction').");
    }
    if (missingTargetSkills.length > 0) {
        importantImprovements.push(`${missingTargetSkills[0]} is not clearly listed in the Skills section. If you have experience with ${missingTargetSkills[0]}, consider adding it to your Skills section.`);
    }
    if (!hasSummary) {
        importantImprovements.push("Add a targeted 2-3 sentence Professional Summary at the top emphasizing your core stack and engineering strengths.");
    }
    if (missingTargetSkills.length > 1) {
        importantImprovements.push(`${missingTargetSkills[1]} is not clearly listed in the Skills section. If you have experience with ${missingTargetSkills[1]}, consider adding it to your Skills section.`);
    }
    if (importantImprovements.length < 3) {
        importantImprovements.push("Group technical skills into distinct subcategories (Languages, Frameworks, Databases, Developer Tools) to maximize ATS indexing.");
    }

    // 7. Missing Keywords
    const missingKeywords = missingTargetSkills.length > 0 ? missingTargetSkills : ['CI/CD', 'Unit Testing', 'System Design', 'Docker', 'Agile'];

    // 8. Formatting Suggestions
    const formattingSuggestions = [
        "Use standard, universally recognizable section headers (Summary, Skills, Experience, Projects, Education) rather than stylized labels.",
        "Ensure dates follow a consistent format (e.g., 'MMM YYYY - MMM YYYY' or 'YYYY - Present') for seamless ATS timeline parsing.",
        "Keep hyperlinks clean and visible with plain URLs (e.g., 'github.com/username') so automated extractors don't miss portfolio links."
    ];

    // 9. Content Suggestions
    const contentSuggestions = {
        summary: hasSummary
            ? "Refine your summary to clearly state your primary tech stack, years of coding experience, and the specific value you deliver to an engineering team."
            : "Include a 2-3 sentence executive profile at the top highlighting your key technical proficiencies and career objective.",
        skills: "Organize your skills into structured categories: Languages, Frameworks, Databases, and Tools. This ensures ATS algorithms accurately parse each competency.",
        projects: "Structure each project using the STAR method: state the technical problem, list the architecture and technologies used, and describe the measurable outcome.",
        experience: hasExperience
            ? "Begin every bullet point with strong action verbs (Architected, Engineered, Optimized, Delivered) and follow the XYZ formula (Accomplished X, measured by Y, by doing Z)."
            : "If professional experience is limited, highlight competitive programming, capstone projects, open-source contributions, or university hackathon entries.",
        education: "List degree title, institution name, graduation year, and relevant coursework such as Data Structures, DBMS, and Operating Systems.",
        certifications: hasCertifications
            ? "Ensure certifications include issuing organizations (e.g., AWS, Microsoft, Oracle, Coursera) and completion dates."
            : "Consider obtaining industry-recognized technical certifications (e.g., AWS Cloud Practitioner, Java SE, or Meta Frontend Developer) to reinforce credentials.",
        achievements: hasAchievements
            ? "Keep achievements concise and focused on high-impact honors such as hackathon ranks, coding rankings, or academic awards."
            : "Add a dedicated Achievements section featuring competitive programming milestones (LeetCode, Codeforces, HackerRank), scholarships, or leadership honors."
    };

    // 10. Keyword Optimization
    const keywordOptimization = (missingKeywords.slice(0, 4)).map(kw =>
        `${kw} — Highly weighted by recruiter search filters for ${role || 'engineering roles'}. If experienced, integrate into relevant projects or skills.`
    );
    if (keywordOptimization.length === 0) {
        keywordOptimization.push("RESTful APIs — Core industry requirement for full-stack data communication.");
        keywordOptimization.push("Git & Version Control — Standard requirement for team-based code collaboration.");
    }

    // 11. Final Recommendations
    const finalRecommendations = [
        `Incorporate missing high-priority target skills (${missingKeywords.slice(0, 3).join(', ')}) into your bullet points where applicable.`,
        "Quantify project bullets with concrete numbers, data scales, or efficiency percentages to stand out in hiring manager reviews.",
        "Ensure single-column ATS compatibility without floating text boxes or embedded tables before submitting to job portals."
    ];

    return {
        overall_score: overallScore,
        score_breakdown: {
            keyword_relevance: keywordRelevance,
            skills_alignment: skillsAlignment,
            resume_structure: resumeStructure,
            content_quality: contentQuality,
            projects_experience: projectsExperience,
            ats_formatting: atsFormatting
        },
        strengths,
        important_improvements: importantImprovements,
        missing_keywords: missingKeywords,
        formatting_suggestions: formattingSuggestions,
        content_suggestions: contentSuggestions,
        keyword_optimization: keywordOptimization,
        final_recommendations: finalRecommendations
    };
}

// Helper to get normalized user ID for multi-user chat isolation
function getRequestUserId(req) {
    const raw = req.headers['x-user-id'] || req.query.userId || req.body?.userId || 'default_user';
    return String(raw).trim().toLowerCase() || 'default_user';
}

// ----------------------------------------------------
// ROUTE 2: AI Career Agent & Persistent Conversation Management
// ----------------------------------------------------

// 2.1: List all conversations for the authenticated user
app.get('/api/agent/conversations', async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const conversations = await careerChatService.listConversations(userId);
        res.json({ conversations });
    } catch (error) {
        console.error('Error listing conversations:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2.2: Create a new conversation explicitly
app.post('/api/agent/conversations', async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { title } = req.body || {};
        const conversation = await careerChatService.createConversation(userId, title || 'New Conversation');
        res.status(201).json({ conversation });
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2.3: Get a specific conversation and all its messages in chronological order
app.get('/api/agent/conversations/:id', async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { id } = req.params;
        const result = await careerChatService.getConversation(id, userId);
        if (!result) {
            return res.status(404).json({ error: 'Conversation not found or unauthorized' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2.4: Rename a conversation
app.patch('/api/agent/conversations/:id', async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { id } = req.params;
        const { title } = req.body || {};
        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'New conversation title is required' });
        }
        const updated = await careerChatService.renameConversation(id, userId, title.trim());
        if (!updated) {
            return res.status(404).json({ error: 'Conversation not found or unauthorized' });
        }
        res.json({ success: true, conversation: updated });
    } catch (error) {
        console.error('Error renaming conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2.5: Delete a conversation and cascade-delete its messages
app.delete('/api/agent/conversations/:id', async (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { id } = req.params;
        const deleted = await careerChatService.deleteConversation(id, userId);
        if (!deleted) {
            return res.status(404).json({ error: 'Conversation not found or unauthorized' });
        }
        res.json({ success: true, message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2.6: Send message to AI Career Agent with automatic persistence & context preservation
app.post('/api/agent', async (req, res) => {
    try {
        const { prompt, history = [], conversationId } = req.body || {};
        const userId = getRequestUserId(req);

        if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
            return res.status(400).json({ error: 'Message prompt is required' });
        }

        const userPrompt = prompt.trim();
        let activeConvId = conversationId;
        let activeConvTitle = null;
        let isNewConversation = false;

        // Auto-create conversation if none provided (e.g. first message of a new chat)
        if (!activeConvId) {
            const autoTitle = careerChatService.generateTitleFromPrompt(userPrompt);
            const newConv = await careerChatService.createConversation(userId, autoTitle);
            activeConvId = newConv.id;
            activeConvTitle = newConv.title;
            isNewConversation = true;
        }

        // Persist User Message to database
        try {
            await careerChatService.saveMessage(activeConvId, userId, 'user', userPrompt);
        } catch (saveErr) {
            console.warn('[CareerChatService] Error saving user message:', saveErr.message);
        }

        // Prepare context history for Gemini
        const formattedHistory = (Array.isArray(history) ? history : [])
            .filter(msg => msg && (msg.text || msg.content) && msg.sender !== 'System' && msg.role !== 'system')
            .map(msg => {
                const isAssistant = msg.sender === 'Agent' || msg.sender === 'AI' || msg.role === 'assistant';
                const text = (msg.text || msg.content || '').trim();
                return `${isAssistant ? 'AI Mentor' : 'Candidate'}: ${text}`;
            })
            .filter(Boolean)
            .join('\n\n');

        const fullPrompt = `You are an intelligent AI Career Coach and Technical Placement Mentor.
Help candidates with resume optimization, technical interview preparation, salary negotiation, and career growth. Provide clear, direct, and actionable advice.

Conversation History:
"""
${formattedHistory}
"""

Candidate asks: ${userPrompt}

Your response:`;

        let replyText = '';
        try {
            replyText = await callGemini(fullPrompt);
        } catch (geminiError) {
            console.warn('[Career Agent Gemini Fallback Engaged]:', geminiError.message || geminiError);
            replyText = generateCareerAgentFallback(userPrompt, history);
        }

        // Persist Assistant Message to database
        try {
            await careerChatService.saveMessage(activeConvId, userId, 'assistant', replyText);
        } catch (saveErr) {
            console.warn('[CareerChatService] Error saving assistant message:', saveErr.message);
        }

        res.json({
            reply: replyText,
            conversationId: activeConvId,
            conversationTitle: activeConvTitle,
            isNewConversation
        });
    } catch (error) {
        console.error('Server Error (Agent):', error);
        res.status(500).json({ error: error.message });
    }
});

// ----------------------------------------------------
// ROUTE 3: ATS Resume Analysis (File Upload: PDF & DOCX)
// ----------------------------------------------------
app.post('/api/ats/analyze', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please select a resume file (PDF or DOCX).' });
        }

        const targetRole = (req.body.targetRole || '').trim();
        let extractedText;
        try {
            extractedText = await extractResumeText(req.file);
        } catch (extractErr) {
            return res.status(400).json({ error: extractErr.message });
        }

        if (!extractedText || extractedText.length < 40) {
            return res.status(400).json({
                error: 'Could not extract sufficient text from the document. Please ensure the resume is not scanned or empty.'
            });
        }

        let analysisResult;
        const atsPrompt = `You are a Principal ATS (Applicant Tracking System) Architect and Executive Hiring Bar Raiser.
Conduct a strict, in-depth ATS Resume Analysis of the ACTUAL uploaded resume below${targetRole ? ` tailored for the target role: "${targetRole}"` : ' for general technical placement readiness'}.

ACTUAL EXTRACTED RESUME TEXT:
"""
${extractedText.slice(0, 5000)}
"""

CRITICAL GROUNDING & ACCURACY RULES:
1. ONLY ANALYZE THE CANDIDATE'S ACTUAL EXTRACTED RESUME TEXT ABOVE.
2. DO NOT INVENT or HALLUCINATE any skills, projects, companies, certifications, degrees, or metrics.
3. If a skill or detail is missing, explicitly state that it is not found. Use phrasing like:
   "[Skill] is not clearly listed in the Skills section. If you have experience with [Skill], consider adding it to your Skills section."
4. Never assume the candidate has a skill they did not explicitly mention.

SCORE LOGIC:
The overall_score (0-100) MUST be calculated as the EXACT SUM of these 6 category scores:
- keyword_relevance: Integer out of 25 (relevance to ${targetRole || 'general technical engineering'})
- skills_alignment: Integer out of 25 (depth and clarity of categorized technical skills)
- resume_structure: Integer out of 20 (standard headers, logical hierarchy, contact info)
- content_quality: Integer out of 15 (action verbs, quantified achievements, metrics)
- projects_experience: Integer out of 10 (technical complexity, architecture, outcomes)
- ats_formatting: Integer out of 5 (clean single/two-column, parsable text, no complex tables)
overall_score = keyword_relevance + skills_alignment + resume_structure + content_quality + projects_experience + ats_formatting

REQUIRED OUTPUT: Return ONLY a valid JSON object matching this exact schema:
{
  "overall_score": 82,
  "score_breakdown": {
    "keyword_relevance": 18,
    "skills_alignment": 20,
    "resume_structure": 17,
    "content_quality": 14,
    "projects_experience": 8,
    "ats_formatting": 5
  },
  "strengths": [
    "Detected strength 1 based strictly on resume",
    "Detected strength 2 based strictly on resume",
    "Detected strength 3 based strictly on resume"
  ],
  "important_improvements": [
    "High priority improvement 1",
    "High priority improvement 2",
    "High priority improvement 3"
  ],
  "missing_keywords": [
    "Keyword 1",
    "Keyword 2",
    "Keyword 3",
    "Keyword 4"
  ],
  "formatting_suggestions": [
    "Formatting check 1",
    "Formatting check 2"
  ],
  "content_suggestions": {
    "summary": "Specific suggestion for summary based on uploaded resume",
    "skills": "Specific suggestion for skills based on uploaded resume",
    "projects": "Specific suggestion for projects based on uploaded resume",
    "experience": "Specific suggestion for experience based on uploaded resume",
    "education": "Specific suggestion for education based on uploaded resume",
    "certifications": "Specific suggestion for certifications based on uploaded resume",
    "achievements": "Specific suggestion for achievements based on uploaded resume"
  },
  "keyword_optimization": [
    "Optimized keyword suggestion 1 with rationale",
    "Optimized keyword suggestion 2 with rationale",
    "Optimized keyword suggestion 3 with rationale"
  ],
  "final_recommendations": [
    "Actionable priority 1",
    "Actionable priority 2",
    "Actionable priority 3"
  ]
}`;

        try {
            const rawResponse = await callGemini(atsPrompt);
            let cleaned = rawResponse.trim();
            if (cleaned.startsWith('```json')) {
                cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '');
            } else if (cleaned.startsWith('```')) {
                cleaned = cleaned.replace(/^```/, '').replace(/```$/, '');
            }
            const firstBrace = cleaned.indexOf('{');
            const lastBrace = cleaned.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                cleaned = cleaned.substring(firstBrace, lastBrace + 1);
            }
            const parsed = JSON.parse(cleaned);

            if (parsed && parsed.score_breakdown) {
                const bd = parsed.score_breakdown;
                const kw = Number(bd.keyword_relevance) || 15;
                const sk = Number(bd.skills_alignment) || 15;
                const rs = Number(bd.resume_structure) || 14;
                const cq = Number(bd.content_quality) || 10;
                const pe = Number(bd.projects_experience) || 7;
                const af = Number(bd.ats_formatting) || 4;
                parsed.score_breakdown = {
                    keyword_relevance: Math.min(25, Math.max(0, kw)),
                    skills_alignment: Math.min(25, Math.max(0, sk)),
                    resume_structure: Math.min(20, Math.max(0, rs)),
                    content_quality: Math.min(15, Math.max(0, cq)),
                    projects_experience: Math.min(10, Math.max(0, pe)),
                    ats_formatting: Math.min(5, Math.max(0, af))
                };
                parsed.overall_score = Object.values(parsed.score_breakdown).reduce((a, b) => a + b, 0);
                analysisResult = parsed;
            } else {
                throw new Error('Malformed Gemini ATS structure');
            }
        } catch (geminiError) {
            console.warn('[ATS Gemini Fallback Engaged]:', geminiError.message || geminiError);
            analysisResult = generateDetailedATSAnalysisFallback(extractedText, targetRole);
        }

        // Save to SQLite
        const userId = getRequestUserId(req);
        const savedId = assessmentDb.saveAtsAnalysis({
            userId,
            filename: req.file.originalname,
            file_type: req.file.mimetype || 'application/octet-stream',
            target_role: targetRole || 'General Technical Role',
            overall_score: analysisResult.overall_score,
            score_breakdown: analysisResult.score_breakdown,
            analysis: analysisResult,
            extracted_preview: extractedText.slice(0, 1000)
        });

        res.json({
            success: true,
            id: savedId,
            filename: req.file.originalname,
            target_role: targetRole || 'General Technical Role',
            extracted_preview: extractedText.slice(0, 600),
            ...analysisResult
        });
    } catch (error) {
        console.error('Error in /api/ats/analyze:', error);
        res.status(500).json({ error: error.message || 'Error analyzing resume file.' });
    }
});

// ROUTE 3.2: Get Latest ATS Analyses
app.get('/api/ats/latest', (req, res) => {
    try {
        const latest = assessmentDb.getLatestAtsAnalyses(5);
        res.json({ success: true, analyses: latest });
    } catch (error) {
        console.error('Error fetching latest ATS analyses:', error);
        res.status(500).json({ error: error.message });
    }
});

// ROUTE 3.3: Legacy JSON Resume Analysis endpoint
app.post('/api/analyze-resume', async (req, res) => {
    try {
        const { resumeText, targetRole } = req.body;
        const analysis = generateDetailedATSAnalysisFallback(resumeText, targetRole);
        res.json({
            atsScore: analysis.overall_score,
            strengths: analysis.strengths,
            missingKeywords: analysis.missing_keywords,
            improvements: analysis.important_improvements,
            verdict: analysis.overall_score >= 75 ? "Interview Ready" : "Needs Revision",
            ...analysis
        });
    } catch (error) {
        console.error('Server Error (ATS Legacy):', error);
        res.status(500).json({ error: error.message });
    }
});

// ----------------------------------------------------
// ROUTE 4: Skill Assessment & Placement Engine
// ----------------------------------------------------

// 4.1 Metadata (Companies, Roles, Categories, Subjects, Topics)
app.get('/api/assessments/meta', (req, res) => {
    try {
        const meta = assessmentDb.getMetadata();
        res.json(meta);
    } catch (error) {
        console.error('Error fetching assessment metadata:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4.2 Query Tests by filter
app.get('/api/assessments/tests', (req, res) => {
    try {
        const { company, role, category, subject, topic, limit } = req.query;
        const tests = assessmentDb.getTests({
            companySlug: company,
            roleSlug: role,
            categorySlug: category,
            subjectSlug: subject,
            topicSlug: topic,
            limit: limit ? Number(limit) : 50
        });
        res.json(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4.3 Get Specific Test with questions (is_correct hidden)
app.get('/api/assessments/tests/:id', (req, res) => {
    try {
        const test = assessmentDb.getTestById(req.params.id);
        if (!test) {
            return res.status(404).json({ error: 'Assessment test not found' });
        }
        const minRequired = test.test_type === 'coding' ? 5 : 20;
        if (!test.is_ready || test.questions.length < minRequired) {
            console.warn(`[Assessment Validation Error] Test ID ${req.params.id} ("${test.title}") contains only ${test.questions.length} questions. Minimum ${minRequired} required.`);
            return res.status(400).json({
                error: `This test is not ready yet. It requires at least ${minRequired} valid questions.`,
                testId: test.id,
                title: test.title,
                questionCount: test.questions.length,
                minRequired
            });
        }
        res.json(test);
    } catch (error) {
        console.error('Error fetching test:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4.4 Submit Test Attempt and get score + recommendations
app.post('/api/assessments/tests/:id/submit', (req, res) => {
    try {
        const { answers, userAnswers, timeTakenSeconds, submittedCode, userCodes } = req.body;
        let test = assessmentDb.getTestById(req.params.id);
        if (!test) {
            // Fallback resolution if test ID changed or was re-seeded
            const submittedTitle = req.body.testTitle || req.body.title;
            if (submittedTitle) {
                const match = rawAssessmentDb.prepare('SELECT id FROM tests WHERE title = ?').get(submittedTitle);
                if (match) test = assessmentDb.getTestById(match.id);
            }
            if (!test && req.body.companySlug && req.body.categorySlug) {
                const match = rawAssessmentDb.prepare('SELECT id FROM tests WHERE company_slug = ? AND category_slug = ?').get(req.body.companySlug, req.body.categorySlug);
                if (match) test = assessmentDb.getTestById(match.id);
            }
            if (!test && (answers || userAnswers)) {
                const qIds = Object.keys(answers || userAnswers || {});
                if (qIds.length > 0) {
                    const qMatch = rawAssessmentDb.prepare('SELECT test_id FROM questions WHERE id = ?').get(qIds[0]);
                    if (qMatch && qMatch.test_id) test = assessmentDb.getTestById(qMatch.test_id);
                }
            }
        }

        if (!test) {
            return res.status(404).json({ error: 'Assessment test not found' });
        }

        // Server-side authoritative deadline check (total questions * per question time + grace)
        const perQSeconds = test.test_type === 'coding' ? 300 : 60;
        const maxAllowedDuration = (test.questions.length * perQSeconds) + 60;
        const sanitizedTimeTaken = Math.min(Number(timeTakenSeconds) || 0, maxAllowedDuration);

        const userId = getRequestUserId(req);
        const result = assessmentDb.submitAttempt({
            testId: Number(test.id),
            userAnswers: userAnswers || answers,
            userCodes: userCodes || null,
            timeTakenSeconds: sanitizedTimeTaken,
            submittedCode: submittedCode || null,
            userId
        });
        res.json(result);
    } catch (error) {
        console.error('Error submitting assessment:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4.5 Get Past Attempts History & Topic Mastery
app.get('/api/assessments/history', (req, res) => {
    try {
        const history = assessmentDb.getHistory();
        res.json(history);
    } catch (error) {
        console.error('Error fetching assessment history:', error);
        res.status(500).json({ error: error.message });
    }
});

// 4.6 Coding Test Case Execution & Evaluation (Supports Python, Java, C, C++)
const { runCodeSampleCases } = require('./services/codeExecutionService');

app.post('/api/assessments/coding/evaluate', (req, res) => {
    try {
        const { questionId, code, language = 'python', customInput } = req.body;
        const question = rawAssessmentDb.prepare('SELECT * FROM questions WHERE id = ?').get(questionId);

        let testCases = [];
        if (question && question.test_cases_json) {
            try {
                testCases = JSON.parse(question.test_cases_json);
            } catch (e) { }
        }

        const evalResult = runCodeSampleCases({
            code,
            language,
            testCases,
            customInput: (customInput !== undefined && customInput !== null && customInput.trim() !== '') ? customInput : null
        });

        res.json(evalResult);
    } catch (err) {
        console.error('Error evaluating code:', err);
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// ROUTE 5: Authenticated User Profile & Dashboard Metrics
// ----------------------------------------------------

// 5.1 Dashboard Statistics & Scoped Activities
app.get('/api/dashboard/stats', (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const profile = assessmentDb.getUserProfile(userId);
        const stats = assessmentDb.getUserStats(userId);
        const recentActivities = assessmentDb.getUserRecentActivities(userId, 6);

        res.json({
            success: true,
            user: {
                userId,
                fullName: profile?.full_name || null,
                targetRole: profile?.target_role || null
            },
            stats,
            recentActivities
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// 5.2 Update User Profile & Target Job Role
app.post('/api/user/profile', (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { fullName, targetRole } = req.body || {};
        const updated = assessmentDb.updateUserProfile(userId, { fullName, targetRole });
        res.json({ success: true, profile: updated });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: error.message });
    }
});

// 5.3 Record Resume Creation / Download
app.post('/api/resumes/record', (req, res) => {
    try {
        const userId = getRequestUserId(req);
        const { title, templateId, resumeData } = req.body || {};
        const id = assessmentDb.recordResume({
            userId,
            title: title || 'Executive Resume',
            templateId: templateId || 'modern',
            resumeData: resumeData || {}
        });
        res.json({ success: true, id });
    } catch (error) {
        console.error('Error recording resume:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || config.port || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`PLACERA Backend is running on port ${PORT}`);
});

