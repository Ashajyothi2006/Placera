/**
 * Domain-Agnostic, Adaptive Technical Interview Engine
 * Supports:
 * - Direct candidate topic requests & real-time switching (Python, ML, Electronics, Electrical, etc.)
 * - Multi-domain resume analysis (ECE, EEE, Data Science/AI, Mechanical, Civil, Computer Science)
 * - Career stage adaptation (Student/Fresher, Lecturer/Professor, Experienced Employee)
 */

// ----------------------------------------------------
// 1. TOPIC EXTRACTION & DETECTION
// ----------------------------------------------------
const TOPIC_DEFINITIONS = [
    {
        id: 'python',
        name: 'Python',
        regex: /\b(python|python\s+programming|python\s+language)\b/i,
        questions: [
            "Certainly! Let's dive into Python questions. To start, could you explain the difference between mutable and immutable data types in Python, and how memory references behave for each?",
            "Good explanation! Could you explain how Python's Global Interpreter Lock, or GIL, works, and what approaches or libraries you use when you need true parallel execution in CPU-bound tasks?",
            "Understood. How do Python decorators work under the hood, and could you give an example of how you would write a custom decorator to measure execution time or handle caching?",
            "Let's look at generators and iterators. What is the fundamental difference between the return and yield keywords, and why are generators preferred when dealing with large datasets or streaming data?",
            "How do list comprehensions differ from standard loops in terms of execution speed and readability, and what is your approach to handling exceptions cleanly in Python using try, except, and finally blocks?",
            "How does Python manage memory under the hood—specifically reference counting versus the cyclic garbage collector?",
            "Could you explain how *args and **kwargs work in function definitions, and how Python handles multiple inheritance using the Method Resolution Order (MRO)?"
        ]
    },
    {
        id: 'java',
        name: 'Java',
        regex: /\b(java|core\s+java|java\s+programming)\b/i,
        questions: [
            "Certainly! Let's dive into Java questions. Could you explain the differences between the JVM, JRE, and JDK, and how the Java memory model divides Heap and Stack memory?",
            "How does the Java garbage collector detect and reclaim unreachable objects, and what is the difference between minor GC and major GC?",
            "Can you explain the key differences between an abstract class and an interface in modern Java (Java 8+), including default and static methods?",
            "In Java multithreading, how does the synchronized keyword work compared to Lock implementations like ReentrantLock, and how do you prevent deadlocks?",
            "How does Java handle exception hierarchies—specifically checked versus unchecked exceptions—and what is the try-with-resources statement?"
        ]
    },
    {
        id: 'cpp',
        name: 'C / C++',
        regex: /\b(c\+\+|cpp|c\s+language|c\s+programming)\b/i,
        questions: [
            "Certainly! Let's explore C and C++. Could you explain the differences between stack and heap memory allocation, and what happens during a memory leak or dangling pointer?",
            "In C++, what are virtual functions, how does the virtual table (vtable) enable runtime polymorphism, and what are virtual destructors used for?",
            "Can you explain the difference between pass-by-value, pass-by-reference, and pass-by-pointer in C++, including their performance implications?",
            "What are smart pointers in modern C++ (unique_ptr, shared_ptr, weak_ptr), and how do they implement the RAII principle to manage memory automatically?"
        ]
    },
    {
        id: 'ml_ds',
        name: 'Data Science & Machine Learning',
        regex: /\b(data\s+science|machine\s+learning|\bml\b|deep\s+learning|artificial\s+intelligence|\bai\b|nlp|computer\s+vision)\b/i,
        questions: [
            "Certainly! Let's dive into Data Science and Machine Learning. To start, could you explain the bias-variance tradeoff, and how regularization techniques like L1 Lasso and L2 Ridge help prevent overfitting?",
            "When evaluating a classification model on an imbalanced dataset, why is raw accuracy misleading, and how do you choose between Precision, Recall, F1-Score, and ROC-AUC?",
            "Can you explain how Gradient Descent optimizes model weights, and what differences exist between Batch, Stochastic, and Mini-batch Gradient Descent?",
            "In deep learning, how do activation functions like ReLU address the vanishing gradient problem compared to Sigmoid or Tanh, and what is the role of batch normalization?",
            "How do ensemble techniques like Bagging in Random Forest differ from Boosting in algorithms like XGBoost or LightGBM?"
        ]
    },
    {
        id: 'electronics',
        name: 'Electronics & Embedded Systems',
        regex: /\b(electronics|ece|vlsi|embedded|embedded\s+c|microcontroller|microprocessor|8051|arm|esp32|arduino|verilog|vhdl|fpga|i2c|spi|uart|circuit\s+design)\b/i,
        questions: [
            "Certainly! Let's focus on electronics and embedded systems. Could you explain the key architectural differences between a microprocessor and a microcontroller in terms of memory organization and real-time execution?",
            "When interfacing a microcontroller with sensors and peripherals, how do you evaluate I2C, SPI, and UART protocols regarding data rate, bus wiring, and hardware overhead?",
            "In embedded C firmware, how do you design an Interrupt Service Routine to ensure minimal latency, and why is the volatile keyword critical when declaring shared variables?",
            "In digital electronics and VLSI design, what are setup time and hold time constraints, and what causes metastability in flip-flops?",
            "How do you implement power management and low-power sleep modes in battery-operated microcontroller systems while maintaining timely sensor sampling?"
        ]
    },
    {
        id: 'electrical',
        name: 'Electrical Engineering & Power Systems',
        regex: /\b(electrical|eee|power\s+systems|power\s+electronics|control\s+systems|transformers?|induction\s+motors?|switchgear|grid|high\s+voltage)\b/i,
        questions: [
            "Certainly! Let's dive into electrical engineering questions. Could you explain the working principle of a three-phase induction motor, and how slip governs torque and rotor speed?",
            "In electrical power systems, what causes a poor power factor, what problems does it introduce on transmission lines, and how are capacitor banks sized for power factor correction?",
            "Looking at power electronics, how do Pulse Width Modulation (PWM) inverters convert DC to AC, and what switching techniques do you use to minimize harmonic distortion?",
            "What are the primary differences between open-circuit and short-circuit tests on a transformer, and what specific losses do they determine?",
            "When synchronizing an alternator to an infinite bus grid, what four conditions must be met, and how do protective relays detect and isolate grid faults?"
        ]
    },
    {
        id: 'mechanical',
        name: 'Mechanical Engineering',
        regex: /\b(mechanical|cad|solidworks|catia|ansys|thermodynamics|fluid\s+mechanics|heat\s+transfer|manufacturing|kinematics)\b/i,
        questions: [
            "Certainly! Let's focus on mechanical engineering. Could you explain the laws of thermodynamics and how the Carnot cycle represents the theoretical maximum efficiency for a heat engine?",
            "In mechanical design, what is the significance of the stress-strain curve, and how do you calculate the factor of safety for ductile versus brittle materials?",
            "When designing mechanical components using CAD, how do you apply Geometric Dimensioning and Tolerancing (GD&T) to ensure proper assembly fit?",
            "In fluid mechanics, what is the difference between laminar and turbulent flow, and how does the Reynolds number determine the flow regime in a pipe?"
        ]
    },
    {
        id: 'civil',
        name: 'Civil & Structural Engineering',
        regex: /\b(civil|structural|concrete|surveying|staad|revit|geotechnical|construction\s+management)\b/i,
        questions: [
            "Certainly! Let's explore civil engineering. Could you explain the difference between working stress design and limit state design methods in reinforced concrete structures?",
            "In structural analysis, what is the difference between a determinate and an indeterminate structure, and how do you calculate bending moment and shear force distributions?",
            "What tests are performed on fresh and hardened concrete on a job site to verify workability and compressive strength?",
            "In geotechnical engineering, what factors govern the bearing capacity of shallow foundations, and how do you prevent differential settlement?"
        ]
    },
    {
        id: 'dsa',
        name: 'Data Structures & Algorithms',
        regex: /\b(data\s+structures|algorithms|dsa|binary\s+tree|graph|dynamic\s+programming|sorting)\b/i,
        questions: [
            "Certainly! Let's practice Data Structures and Algorithms. Could you explain the time and space complexity differences between an Array and a Linked List for search, insertion, and deletion operations?",
            "How does a Hash Table achieve average O(1) time complexity, and how are hash collisions handled using chaining versus open addressing?",
            "Can you walk me through the logic of QuickSort versus MergeSort, detailing their worst-case time complexities and stability properties?",
            "When solving graph problems, how do you choose between Breadth-First Search (BFS) and Depth-First Search (DFS), and what are their typical use cases?",
            "In dynamic programming, what is the difference between top-down memoization and bottom-up tabulation, and how do you identify if a problem has optimal substructure and overlapping subproblems?"
        ]
    },
    {
        id: 'sql',
        name: 'SQL & Database Design',
        regex: /\b(sql|database|dbms|mysql|postgresql|relational\s+database|normalization)\b/i,
        questions: [
            "Certainly! Let's explore SQL and database design. Could you explain the differences between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with practical query examples?",
            "How do B-Tree indexes work in relational databases, and what are the trade-offs between indexing for read performance versus write latency?",
            "What are ACID properties in database transactions, and how do isolation levels like Read Committed versus Serializable prevent phenomena like dirty reads and phantom reads?",
            "Can you explain database normalization—specifically 1NF, 2NF, and 3NF—and under what scenarios would you deliberately denormalize a schema?"
        ]
    },
    {
        id: 'frontend',
        name: 'Frontend & React',
        regex: /\b(react|frontend|javascript|typescript|html|css|redux|web\s+development)\b/i,
        questions: [
            "Certainly! Let's dive into frontend development and React. Could you explain how the Virtual DOM works and how React's reconciliation algorithm diffs state updates?",
            "What is the difference between state and props, and how do you handle side effects cleanly using the useEffect hook without causing infinite loops?",
            "How do you manage complex application state—when would you use React Context versus state management libraries like Redux Toolkit or Zustand?",
            "How do you diagnose and eliminate client-side performance bottlenecks, such as unnecessary re-renders, large bundle sizes, and slow layout paints?"
        ]
    },
    {
        id: 'system_design',
        name: 'System Design & Architecture',
        regex: /\b(system\s+design|architecture|distributed\s+systems|microservices|scalability|load\s+balancer|caching)\b/i,
        questions: [
            "Certainly! Let's explore System Design and Distributed Systems. How would you design a scalable URL shortener like bit.ly, considering high read throughput, collision avoidance, and persistence?",
            "What is the CAP theorem, and how do distributed databases choose between consistency and availability during network partitions?",
            "When introducing caching layers like Redis, how do you handle cache invalidation, cache stampede, and cache penetration in high-traffic architectures?",
            "How do message brokers like Kafka or RabbitMQ enable asynchronous communication and decoupled microservices under peak traffic loads?"
        ]
    }
];

/**
 * Extracts candidate's requested topic from their spoken message
 */
function extractRequestedTopic(text) {
    if (!text) return null;
    const lower = text.toLowerCase().trim();

    // Specific intent patterns
    // e.g. "ask me questions on python language", "can you ask me questions on python", "practice questions on python", "ask me about electrical"
    const intentPattern = /(?:ask(?:\s+me)?(?:\s+(?:some\s+)?questions)?(?:\s+(?:on|about|in|regarding))|practice(?:\s+questions(?:\s+on)?)?|test\s+me\s+on|switch\s+to|focus\s+on|want\s+questions\s+(?:on|about)|can\s+we\s+do)\s+([a-zA-Z0-9+#.\s]{2,40})/i;
    const match = lower.match(intentPattern);

    if (match) {
        const rawTopic = match[1].trim();
        for (const t of TOPIC_DEFINITIONS) {
            if (t.regex.test(rawTopic)) return t;
        }
        // Custom topic not in predefined list
        const cleaned = rawTopic.replace(/\b(language|programming|topics|concepts|questions|side|engineering)\b/gi, '').trim();
        if (cleaned.length >= 2) {
            const formattedName = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
            return {
                id: cleaned.toLowerCase().replace(/\s+/g, '_'),
                name: formattedName,
                questions: [
                    `Certainly! Let's explore ${formattedName}. To start off, could you explain the fundamental principles and core architecture of ${formattedName}, and what major advantages it offers in practice?`,
                    `That's a solid breakdown. When working with ${formattedName}, what are the most common performance bottlenecks or technical challenges you encounter, and how do you troubleshoot them?`,
                    `Understood. Can you walk me through a specific implementation or project where you utilized ${formattedName}, explaining the key design decisions and trade-offs you made?`,
                    `Looking deeper into ${formattedName}, how do you ensure reliability, security, and maintainability when deploying or scaling it in real-world scenarios?`
                ]
            };
        }
    }

    // Direct mentions with practice keywords
    for (const t of TOPIC_DEFINITIONS) {
        if (t.regex.test(lower)) {
            if (/\b(question|practice|test|ask|discuss|start|focus|learn|quiz|interview)\b/i.test(lower) || lower.split(/\s+/).length <= 6) {
                return t;
            }
        }
    }

    return null;
}

/**
 * Searches chat history to find if a practice topic was previously requested
 */
function findActiveTopicInHistory(chatHistory = []) {
    for (let i = chatHistory.length - 1; i >= 0; i--) {
        const msg = chatHistory[i];
        if (msg.sender === 'Candidate') {
            const topic = extractRequestedTopic(msg.text);
            if (topic) {
                // Count AI questions asked since this request
                const aiTurnsAfter = chatHistory.slice(i + 1).filter(m => m.sender === 'AI').length;
                return { topic, requestedIndex: i, turnOnTopic: aiTurnsAfter };
            }
        }
    }
    return null;
}

// ----------------------------------------------------
// 2. DOMAIN & CAREER STAGE RECOGNITION
// ----------------------------------------------------
function detectResumeDomainAndStage(cleanResume = '', targetRole = '') {
    const combined = `${cleanResume} ${targetRole}`.toLowerCase();

    // 1. Career Stage / Persona
    let stage = 'PROFESSIONAL';
    let stageName = 'Experienced Industry Professional';
    if (/\b(lecturer|professor|assistant professor|associate professor|faculty|teaching assistant|educator|academia|academic)\b/i.test(combined)) {
        stage = 'LECTURER';
        stageName = 'Academic Lecturer / Professor';
    } else if (/\b(student|fresher|b\.?tech|b\.?e\.?|m\.?tech|mca|bca|bsc|msc|intern|trainee|undergraduate|final year|passout|batch of 202[0-9]|cgpa)\b/i.test(combined) && !/\b(senior|lead|principal|architect|years of experience)\b/i.test(combined)) {
        stage = 'STUDENT';
        stageName = 'Student / College Fresher';
    }

    // 2. Technical Domain with scoring
    const eceKeywords = [
        /\bece\b/gi, /\bvlsi\b/gi, /\bembedded\b/gi, /\bmicrocontroller\b/gi, /\bmicroprocessor\b/gi, 
        /\bverilog\b/gi, /\bvhdl\b/gi, /\bfpga\b/gi, /\barm\b/gi, /\b8051\b/gi, /\bpic\b/gi, 
        /\besp32\b/gi, /\barduino\b/gi, /\brtos\b/gi, /\bi2c\b/gi, /\bspi\b/gi, /\buart\b/gi, 
        /\bpcb\b/gi, /\bcircuit design\b/gi, /\bcadence\b/gi, /\bkeil\b/gi, /\bdsp\b/gi, 
        /\btelecommunication\b/gi, /\bantenna\b/gi, /\biot\b/gi, /\belectronics engineering\b/gi
    ];
    const eeeKeywords = [
        /\beee\b/gi, /\bpower systems?\b/gi, /\bpower electronics\b/gi, /\bcontrol systems?\b/gi, 
        /\bswitchgear\b/gi, /\btransformers?\b/gi, /\binduction motors?\b/gi, /\bsynchronous\b/gi, 
        /\btransmission lines?\b/gi, /\bgrid\b/gi, /\bhigh voltage\b/gi, /\bsimulink\b/gi, 
        /\bplc\b/gi, /\bscada\b/gi, /\belectric vehicle\b/gi, /\bbms\b/gi, /\binverters?\b/gi, 
        /\bconverters?\b/gi, /\belectrical engineering\b/gi
    ];
    const dsKeywords = [
        /\bdata science\b/gi, /\bmachine learning\b/gi, /\bdeep learning\b/gi, /\bartificial intelligence\b/gi, 
        /\bai\b/gi, /\bml\b/gi, /\bnlp\b/gi, /\bcomputer vision\b/gi, /\bcnn\b/gi, /\brnn\b/gi, 
        /\btransformers?\b/gi, /\bpytorch\b/gi, /\btensorflow\b/gi, /\bscikit\b/gi, /\bpandas\b/gi, 
        /\bnumpy\b/gi, /\bdata analyst\b/gi, /\bdata engineering\b/gi
    ];
    const mechKeywords = [
        /\bmechanical\b/gi, /\bsolidworks\b/gi, /\bcatia\b/gi, /\bautocad\b/gi, /\bansys\b/gi, 
        /\bthermodynamics\b/gi, /\bfluid mechanics\b/gi, /\bheat transfer\b/gi, /\bmanufacturing\b/gi, 
        /\bmachining\b/gi, /\bcad\/cam\b/gi, /\bautomotive\b/gi
    ];
    const civilKeywords = [
        /\bcivil engineering\b/gi, /\bstructural engineering\b/gi, /\bconcrete\b/gi, /\bsurveying\b/gi, 
        /\bstaad\b/gi, /\brevit\b/gi, /\bgeotechnical\b/gi, /\bconstruction management\b/gi
    ];

    const countMatches = (regexList) => regexList.reduce((acc, regex) => acc + (combined.match(regex) || []).length, 0);

    const scores = {
        ECE: countMatches(eceKeywords),
        EEE: countMatches(eeeKeywords),
        DS: countMatches(dsKeywords),
        MECH: countMatches(mechKeywords),
        CIVIL: countMatches(civilKeywords)
    };

    let domain = 'SOFTWARE';
    let domainName = 'Software Engineering & Computing';

    let maxScore = 0;
    let bestDomain = 'SOFTWARE';

    for (const [dom, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            bestDomain = dom;
        }
    }

    if (maxScore >= 1) {
        if (bestDomain === 'ECE') {
            domain = 'ELECTRONICS';
            domainName = 'Electronics & Embedded Systems (ECE)';
        } else if (bestDomain === 'EEE') {
            domain = 'ELECTRICAL';
            domainName = 'Electrical & Power Systems (EEE)';
        } else if (bestDomain === 'DS') {
            domain = 'DATA_SCIENCE';
            domainName = 'Data Science & Machine Learning';
        } else if (bestDomain === 'MECH') {
            domain = 'MECHANICAL';
            domainName = 'Mechanical Engineering';
        } else if (bestDomain === 'CIVIL') {
            domain = 'CIVIL';
            domainName = 'Civil & Structural Engineering';
        }
    }

    return { domainType: domain, domainName, stageType: stage, stageName };
}

/**
 * Analyzes parsed resume text to suggest candidate name, role, domain, and stage
 */
function analyzeResumeMetadata(extractedText = '', originalFilename = '') {
    const cleanText = (extractedText || '').replace(/[^\x20-\x7E\r\n\t]/g, ' ').trim();
    const domainInfo = detectResumeDomainAndStage(cleanText, '');

    // Extract Candidate Name
    let candidateName = '';
    const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
    const pdfKeywords = /^(stream|endstream|obj|endobj|xref|trailer|startxref|catalog|pages|page|font|type|length|filter|flatedecode|linearized)$/i;

    for (const line of lines.slice(0, 8)) {
        if (/^%PDF/i.test(line) || /obj\s*$/i.test(line) || /<<|>>/i.test(line) || /http/i.test(line) || /@/.test(line)) continue;
        const cleaned = line.replace(/resume|curriculum vitae|cv/gi, '').trim();
        if (pdfKeywords.test(cleaned)) continue;
        if (cleaned.length >= 2 && cleaned.length < 35 && !cleaned.includes(':') && /^[a-zA-Z\s.'-]+$/.test(cleaned)) {
            candidateName = cleaned;
            break;
        }
    }

    if (!candidateName && originalFilename) {
        let name = originalFilename.replace(/\.[^/.]+$/, '');
        name = name.replace(/resume|curriculum\s*vitae|cv/gi, '');
        name = name.replace(/[-_.]/g, ' ').trim();
        const parts = name.split(/\s+/).filter(Boolean);
        if (parts.length > 0) {
            candidateName = parts.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }
    }

    // Suggest target role based on detected domain & stage
    let suggestedRole = 'Software Engineer';
    if (domainInfo.stageType === 'LECTURER') {
        if (domainInfo.domainType === 'ELECTRONICS') suggestedRole = 'Lecturer / Assistant Professor in ECE';
        else if (domainInfo.domainType === 'ELECTRICAL') suggestedRole = 'Lecturer / Assistant Professor in EEE';
        else if (domainInfo.domainType === 'DATA_SCIENCE') suggestedRole = 'Lecturer / Assistant Professor in AI & Data Science';
        else if (domainInfo.domainType === 'MECHANICAL') suggestedRole = 'Lecturer / Assistant Professor in Mechanical Engineering';
        else if (domainInfo.domainType === 'CIVIL') suggestedRole = 'Lecturer / Assistant Professor in Civil Engineering';
        else suggestedRole = 'Lecturer / Assistant Professor in Computer Science';
    } else if (domainInfo.stageType === 'STUDENT') {
        if (domainInfo.domainType === 'ELECTRONICS') suggestedRole = 'Graduate Engineer Trainee - Electronics & Embedded';
        else if (domainInfo.domainType === 'ELECTRICAL') suggestedRole = 'Graduate Engineer Trainee - Electrical Engineering';
        else if (domainInfo.domainType === 'DATA_SCIENCE') suggestedRole = 'Junior Data Scientist / AI Trainee';
        else if (domainInfo.domainType === 'MECHANICAL') suggestedRole = 'Graduate Engineer Trainee - Mechanical';
        else if (domainInfo.domainType === 'CIVIL') suggestedRole = 'Graduate Engineer Trainee - Civil';
        else suggestedRole = 'Junior Software Engineer / Graduate Developer';
    } else {
        if (domainInfo.domainType === 'ELECTRONICS') suggestedRole = 'Embedded Systems & Electronics Engineer';
        else if (domainInfo.domainType === 'ELECTRICAL') suggestedRole = 'Electrical & Power Systems Engineer';
        else if (domainInfo.domainType === 'DATA_SCIENCE') suggestedRole = 'Data Scientist & Machine Learning Engineer';
        else if (domainInfo.domainType === 'MECHANICAL') suggestedRole = 'Mechanical Design Engineer';
        else if (domainInfo.domainType === 'CIVIL') suggestedRole = 'Civil & Structural Engineer';
        else suggestedRole = 'Senior Software Engineer';
    }

    return {
        candidateName: candidateName || 'Candidate',
        targetRole: suggestedRole,
        domainType: domainInfo.domainType,
        domainName: domainInfo.domainName,
        stageType: domainInfo.stageType,
        stageName: domainInfo.stageName
    };
}

// ----------------------------------------------------
// 3. ADAPTIVE INTERVIEW FALLBACK GENERATOR
// ----------------------------------------------------
function generateAdaptiveInterviewFallback({
    candidateAnswer = '',
    chatHistory = [],
    cleanResume = '',
    candidateName = '',
    targetRole = 'Software Engineer',
    targetCompany = 'Tech Enterprise',
    isStart = false
}) {
    const name = candidateName || 'Candidate';
    const domainInfo = detectResumeDomainAndStage(cleanResume, targetRole);

    if (isStart) {
        if (domainInfo.stageType === 'LECTURER') {
            return `Hello ${name}, welcome to your technical interview for the ${targetRole} position at ${targetCompany}. To start off, please introduce yourself, including your academic specialization and teaching experience.`;
        }
        if (domainInfo.stageType === 'STUDENT') {
            return `Hello ${name}, welcome to your technical interview for the ${targetRole} role at ${targetCompany}. To begin, please introduce yourself and tell me briefly about your academic journey and projects.`;
        }
        return `Hello ${name}, welcome to your technical interview for the ${targetRole} position at ${targetCompany}. To start off, please introduce yourself and briefly tell me about your background.`;
    }

    const answer = (candidateAnswer || '').trim();

    // ----------------------------------------------------
    // PRIORITY 1: CHECK FOR CANDIDATE TOPIC / PRACTICE REQUESTS
    // ----------------------------------------------------
    const explicitTopicRequest = extractRequestedTopic(answer);
    if (explicitTopicRequest) {
        const question1 = explicitTopicRequest.questions[0];
        return question1;
    }

    // Check if previous turn initiated a topic practice
    const activeTopic = findActiveTopicInHistory(chatHistory);
    if (activeTopic) {
        const turnOnTopic = activeTopic.turnOnTopic;
        const questions = activeTopic.topic.questions;
        if (turnOnTopic < questions.length) {
            let nextQuestion = questions[turnOnTopic];
            const hasExistingAck = /^(good|great|solid|understood|excellent|that's|spot on)/i.test(nextQuestion);
            if (!hasExistingAck) {
                const acknowledgments = [
                    "That's a very clear explanation.",
                    "Good breakdown on those concepts.",
                    "Understood, that makes technical sense.",
                    "Great articulation.",
                    "Solid explanation."
                ];
                const ack = acknowledgments[turnOnTopic % acknowledgments.length];
                nextQuestion = `${ack} ${nextQuestion}`;
            }
            return nextQuestion;
        }
    }

    // ----------------------------------------------------
    // PRIORITY 2: DOMAIN & STAGE SPECIFIC PROGRESSION
    // ----------------------------------------------------
    const candidateMsgs = chatHistory.filter(m => m.sender === 'Candidate');
    const turnCount = candidateMsgs.length;

    // Extract potential entities from resume without inventing
    const projectMatches = (cleanResume.match(/(?:project[s]?:|key projects:)([\s\S]*?)(?:technical skills:|experience:|education:|$)/i) || [])[1] || '';
    const extractedProjects = projectMatches
        .split('\n')
        .map(l => l.replace(/^[•\-\*]\s*/, '').split(':')[0].trim())
        .filter(p => p.length > 3 && p.length < 50);

    const firstProject = extractedProjects[0] || 'your core technical project';

    // Step 2: Follow-up on self-introduction
    if (turnCount <= 1) {
        if (domainInfo.stageType === 'LECTURER') {
            return `Thank you for sharing your academic background, ${name}. Given your experience in ${domainInfo.domainName}, how do you approach explaining complex foundational concepts to undergraduate students, and what laboratory experiments do you find most effective?`;
        }
        if (domainInfo.stageType === 'STUDENT') {
            if (firstProject !== 'your core technical project') {
                return `Thank you for the introduction, ${name}. I noticed on your resume you worked on ${firstProject}. Could you walk me through your specific role, what problem you aimed to solve, and what technical challenges you faced?`;
            }
            return `Thank you for the introduction, ${name}. Looking at your academic journey, could you tell me about your primary capstone project: what problem did it solve, and which specific tools or technologies did you use to build it?`;
        }
        return `Thank you for sharing that background, ${name}. I noticed on your resume you worked on ${firstProject}. Could you explain the main objective of that project and the key architectural decisions you made?`;
    }

    // Step 3: Technical deep-dive on implementation and challenges
    if (turnCount === 2) {
        if (domainInfo.stageType === 'LECTURER') {
            return `When students struggle with debugging or theoretical misconceptions in ${domainInfo.domainName}, what systematic troubleshooting methodology do you guide them through in the classroom?`;
        }
        if (domainInfo.domainType === 'ELECTRONICS') {
            return `Understood. In your electronics and embedded work, how do you handle hardware interrupts, sensor latency, and debouncing, and what are the critical considerations when writing an Interrupt Service Routine?`;
        }
        if (domainInfo.domainType === 'ELECTRICAL') {
            return `That makes sense. In electrical power systems, what causes a low power factor, what are its practical drawbacks on transmission lines, and how is power factor correction typically implemented?`;
        }
        if (domainInfo.domainType === 'DATA_SCIENCE') {
            return `Solid breakdown. When training machine learning models on skewed or real-world data, how do you handle severe class imbalance, and why is accuracy an unreliable metric compared to F1-Score or ROC-AUC?`;
        }
        if (domainInfo.domainType === 'MECHANICAL') {
            return `Understood. When designing mechanical components, how do you select appropriate materials based on yield strength versus tensile strength, and what factor of safety do you typically enforce?`;
        }
        if (domainInfo.domainType === 'CIVIL') {
            return `That makes sense. In structural design, what is the fundamental difference between working stress method and limit state design when calculating load factors?`;
        }
        return `Understood. Could you break down the foundational components of your architecture—specifically, how did you handle edge cases, latency bottlenecks, and failure recovery under high traffic?`;
    }

    // Step 4: Role-specific technical & problem-solving question
    if (turnCount === 3) {
        if (domainInfo.stageType === 'LECTURER') {
            return `How do you integrate modern industry tools, emerging research, and practical hands-on mini-projects into your standard university curriculum?`;
        }
        if (domainInfo.domainType === 'ELECTRONICS') {
            return `Let's focus on a core technical scenario for ${targetRole}: when interfacing a microcontroller with peripherals, how do you evaluate I2C versus SPI protocols in terms of speed, line count, and communication overhead?`;
        }
        if (domainInfo.domainType === 'ELECTRICAL') {
            return `Looking at core electrical engineering challenges: could you explain the working principle of a three-phase induction motor, and how slip relates to torque and synchronous speed?`;
        }
        if (domainInfo.domainType === 'DATA_SCIENCE') {
            return `Looking at ${targetRole} challenges: how do you design data ingestion pipelines to ensure data validation, low latency, and fault tolerance at scale?`;
        }
        if (domainInfo.domainType === 'MECHANICAL') {
            return `In thermal and fluid systems, could you explain how the Carnot cycle sets the upper bound of efficiency, and what practical factors prevent real engines from reaching it?`;
        }
        if (domainInfo.domainType === 'CIVIL') {
            return `In geotechnical and foundation design, how do you calculate bearing capacity for shallow foundations, and how do you mitigate uneven soil settlement?`;
        }
        return `Transitioning to a core engineering problem for a ${targetRole}: how would you design an idempotent API endpoint that ensures reliability during network timeouts or duplicate requests?`;
    }

    // Step 5: Engineering trade-offs and scenario
    if (turnCount === 4) {
        return `When evaluating architectural trade-offs between speed of delivery and long-term maintainability, what criteria do you use to decide when to refactor versus shipping iterative improvements?`;
    }

    // Step 6: Engineering reflection & closing
    if (turnCount === 5) {
        return `Can you share an instance where a technical assumption was proven wrong during execution or testing, and how you communicated and resolved it with your team?`;
    }

    // Step 7+: Wrap up
    return `Thank you, ${name}. That gives me a very clear understanding of your engineering depth, communication, and technical foundation. Do you have any questions for me about the role or the team at ${targetCompany}?`;
}

module.exports = {
    TOPIC_DEFINITIONS,
    extractRequestedTopic,
    findActiveTopicInHistory,
    detectResumeDomainAndStage,
    analyzeResumeMetadata,
    generateAdaptiveInterviewFallback
};
