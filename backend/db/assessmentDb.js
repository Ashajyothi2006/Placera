const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../assessment.db');
const db = new DatabaseSync(dbPath);

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ats_analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      file_type TEXT,
      target_role TEXT,
      overall_score INTEGER,
      score_breakdown TEXT,
      analysis_json TEXT,
      extracted_preview TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      tier TEXT DEFAULT 'Tier 1',
      pattern_notes TEXT
    );

    CREATE TABLE IF NOT EXISTS job_roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS assessment_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category_slug TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      subject_slug TEXT,
      category_slug TEXT NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS tests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company_slug TEXT,
      role_slug TEXT,
      category_slug TEXT NOT NULL,
      subject_slug TEXT,
      topic_slug TEXT,
      test_type TEXT DEFAULT 'mcq', -- 'mcq' or 'coding'
      duration_minutes INTEGER DEFAULT 30,
      total_questions INTEGER DEFAULT 20,
      difficulty TEXT DEFAULT 'Mixed',
      is_pattern_based INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      test_id INTEGER NOT NULL,
      topic_slug TEXT,
      question_text TEXT NOT NULL,
      question_type TEXT DEFAULT 'mcq', -- 'mcq' or 'coding'
      difficulty TEXT DEFAULT 'Medium',
      code_snippet TEXT,
      input_format TEXT,
      output_format TEXT,
      constraints TEXT,
      sample_input TEXT,
      sample_output TEXT,
      test_cases_json TEXT,
      starter_code_json TEXT,
      explanation TEXT,
      FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS question_options (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id INTEGER NOT NULL,
      option_text TEXT NOT NULL,
      is_correct INTEGER NOT NULL DEFAULT 0,
      option_index INTEGER NOT NULL,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT DEFAULT 'guest_user',
      test_id INTEGER NOT NULL,
      test_title TEXT NOT NULL,
      company_name TEXT,
      category_slug TEXT,
      subject_name TEXT,
      topic_name TEXT,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage REAL NOT NULL,
      time_taken_seconds INTEGER DEFAULT 0,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS attempt_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      attempt_id INTEGER NOT NULL,
      question_id INTEGER NOT NULL,
      selected_option_index INTEGER,
      submitted_code TEXT,
      is_correct INTEGER DEFAULT 0,
      FOREIGN KEY (attempt_id) REFERENCES attempts(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tests_company ON tests(company_slug);
    CREATE INDEX IF NOT EXISTS idx_tests_category ON tests(category_slug);
    CREATE INDEX IF NOT EXISTS idx_tests_topic ON tests(topic_slug);
    CREATE INDEX IF NOT EXISTS idx_questions_test ON questions(test_id);
    CREATE INDEX IF NOT EXISTS idx_options_question ON question_options(question_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_completed ON attempts(completed_at);

    CREATE TABLE IF NOT EXISTS user_resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      template_id TEXT,
      resume_data_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS interview_evaluations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      target_role TEXT,
      target_company TEXT,
      overall_score INTEGER,
      communication_score INTEGER,
      technical_score INTEGER,
      relevance_score INTEGER,
      verdict TEXT,
      summary TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id TEXT PRIMARY KEY,
      full_name TEXT,
      target_role TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_resumes_user ON user_resumes(user_id);
    CREATE INDEX IF NOT EXISTS idx_interviews_user ON interview_evaluations(user_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
  `);

  try {
    db.exec("ALTER TABLE ats_analyses ADD COLUMN user_id TEXT DEFAULT 'guest_user';");
  } catch (e) {}
  try {
    db.exec('ALTER TABLE attempts ADD COLUMN correct_count INTEGER DEFAULT 0;');
  } catch (e) {}
  try {
    db.exec('ALTER TABLE attempts ADD COLUMN incorrect_count INTEGER DEFAULT 0;');
  } catch (e) {}
  try {
    db.exec('ALTER TABLE attempts ADD COLUMN unanswered_count INTEGER DEFAULT 0;');
  } catch (e) {}
  try {
    db.exec('ALTER TABLE attempts ADD COLUMN accuracy REAL DEFAULT 0;');
  } catch (e) {}
  try {
    db.exec("ALTER TABLE companies ADD COLUMN domain TEXT DEFAULT 'computer';");
  } catch (e) {}
  try {
    const coreCount = db.prepare("SELECT COUNT(*) as count FROM companies WHERE domain != 'computer'").get();
    if (coreCount && coreCount.count === 0) {
      const { seedCoreEngineering } = require('./seedCoreEngineering');
      seedCoreEngineering();
    }
  } catch (e) {}
}

// Ensure database is initialized
initDb();

// ----------------------------------------------------
// DATABASE ACCESS HELPERS
// ----------------------------------------------------

const assessmentDb = {
  // Get all metadata for UI filters and navigation
  getMetadata() {
    const companies = db.prepare('SELECT * FROM companies ORDER BY name ASC').all();
    const roles = db.prepare('SELECT * FROM job_roles ORDER BY title ASC').all();
    const categories = db.prepare('SELECT * FROM assessment_categories ORDER BY id ASC').all();
    const subjects = db.prepare('SELECT * FROM subjects ORDER BY name ASC').all();
    const topics = db.prepare('SELECT * FROM topics ORDER BY name ASC').all();

    // Query test counts per company and per topic
    const testCountsByTopic = db.prepare(`
      SELECT topic_slug, COUNT(*) as count 
      FROM tests 
      WHERE topic_slug IS NOT NULL 
      GROUP BY topic_slug
    `).all();

    const countsMap = {};
    for (const row of testCountsByTopic) {
      countsMap[row.topic_slug] = row.count;
    }

    return {
      companies,
      roles,
      categories,
      subjects,
      topics: topics.map(t => ({
        ...t,
        test_count: countsMap[t.slug] || 0
      }))
    };
  },

  // Query tests by filters
  getTests({ companySlug, roleSlug, categorySlug, subjectSlug, topicSlug, limit = 50 }) {
    let sql = `
      SELECT t.*, 
        (SELECT COUNT(*) FROM questions q WHERE q.test_id = t.id) as question_count
      FROM tests t 
      WHERE 1=1
    `;
    const params = [];

    if (companySlug) {
      sql += ' AND t.company_slug = ?';
      params.push(companySlug);
    }
    if (roleSlug && roleSlug !== 'all') {
      sql += ' AND (t.role_slug = ? OR t.role_slug IS NULL)';
      params.push(roleSlug);
    }
    if (categorySlug && categorySlug !== 'all') {
      sql += ' AND t.category_slug = ?';
      params.push(categorySlug);
    }
    if (subjectSlug && subjectSlug !== 'all') {
      sql += ' AND t.subject_slug = ?';
      params.push(subjectSlug);
    }
    if (topicSlug) {
      sql += ' AND t.topic_slug = ?';
      params.push(topicSlug);
    }

    sql += ' ORDER BY t.id ASC LIMIT ?';
    params.push(limit);

    return db.prepare(sql).all(...params);
  },

  // Get test details and questions for candidate (hides is_correct)
  getTestById(testId) {
    const test = db.prepare('SELECT * FROM tests WHERE id = ?').get(testId);
    if (!test) return null;

    const questions = db.prepare('SELECT * FROM questions WHERE test_id = ? ORDER BY id ASC').all(testId);

    const questionsWithOptions = questions.map(q => {
      const options = db.prepare(
        'SELECT id, option_text, option_index FROM question_options WHERE question_id = ? ORDER BY option_index ASC'
      ).all(q.id);

      let starterCode = null;
      if (q.starter_code_json) {
        try {
          starterCode = JSON.parse(q.starter_code_json);
        } catch (e) {}
      }

      let sampleTestCases = [];
      if (q.test_cases_json) {
        try {
          const parsed = JSON.parse(q.test_cases_json);
          sampleTestCases = parsed.slice(0, 2);
        } catch (e) {}
      }

      return {
        id: q.id,
        test_id: q.test_id,
        topic_slug: q.topic_slug,
        title: q.code_snippet || q.question_text.slice(0, 50),
        question_text: q.question_text,
        question_type: q.question_type,
        difficulty: q.difficulty,
        code_snippet: q.code_snippet,
        input_format: q.input_format,
        output_format: q.output_format,
        constraints: q.constraints,
        sample_input: q.sample_input,
        sample_output: q.sample_output,
        sample_test_cases: sampleTestCases,
        starter_code: starterCode,
        options: options.map(opt => ({
          id: opt.id,
          option_text: opt.option_text,
          option_index: opt.option_index
        }))
      };
    });

    const minRequired = test.test_type === 'coding' ? 5 : 20;
    const isReady = questionsWithOptions.length >= minRequired;

    return {
      ...test,
      duration_minutes: test.test_type === 'coding' ? Math.max(25, questionsWithOptions.length * 5) : questionsWithOptions.length,
      total_questions: questionsWithOptions.length,
      is_ready: isReady,
      validation_error: isReady ? null : `This test is not ready yet. It requires at least ${minRequired} valid questions. Found only ${questionsWithOptions.length}.`,
      questions: questionsWithOptions
    };
  },

  // Get test with correct answers and explanations for server-side evaluation
  getTestForEvaluation(testId) {
    const test = db.prepare('SELECT * FROM tests WHERE id = ?').get(testId);
    if (!test) return null;

    const questions = db.prepare('SELECT * FROM questions WHERE test_id = ? ORDER BY id ASC').all(testId);

    const questionsWithOptions = questions.map(q => {
      const options = db.prepare(
        'SELECT id, option_text, option_index, is_correct FROM question_options WHERE question_id = ? ORDER BY option_index ASC'
      ).all(q.id);

      const correctOption = options.find(o => o.is_correct === 1);

      return {
        ...q,
        options,
        correct_option_index: correctOption ? correctOption.option_index : -1
      };
    });

    return {
      ...test,
      questions: questionsWithOptions
    };
  },

  // Save completed attempt and calculate score, performance, and recommendations
  submitAttempt({ testId, userAnswers, answers, timeTakenSeconds = 0, submittedCode = null, userCodes = null, userId = 'guest_user' }) {
    const test = this.getTestForEvaluation(testId);
    if (!test) throw new Error('Test not found');

    // Normalize user answers to a map of { [question_id]: selectedIndex }
    let answersMap = {};
    const rawAnswers = userAnswers || answers || {};
    if (Array.isArray(rawAnswers)) {
      for (const item of rawAnswers) {
        if (item && item.question_id !== undefined) {
          const sel = item.selected_option_index !== undefined ? item.selected_option_index : item.user_selected_index;
          answersMap[item.question_id] = sel;
        }
      }
    } else if (typeof rawAnswers === 'object' && rawAnswers !== null) {
      answersMap = rawAnswers;
    }

    let score = 0;
    const totalQuestions = test.questions.length;
    const detailedResults = [];
    const topicStats = {};

    const { evaluateProblemSubmission } = require('../services/codeExecutionService');

    for (const q of test.questions) {
      const topic = q.topic_slug || test.topic_slug || 'General';
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;

      if (q.question_type === 'coding') {
        let codeData = null;
        if (userCodes && userCodes[q.id]) {
          codeData = typeof userCodes[q.id] === 'object' ? userCodes[q.id] : { code: userCodes[q.id], language: 'python' };
        } else if (submittedCode && typeof submittedCode === 'object' && submittedCode[q.id]) {
          codeData = typeof submittedCode[q.id] === 'object' ? submittedCode[q.id] : { code: submittedCode[q.id], language: 'python' };
        } else if (typeof submittedCode === 'string') {
          codeData = { code: submittedCode, language: 'python' };
        }

        const candidateCode = codeData ? (codeData.code || '') : '';
        const candidateLang = codeData ? (codeData.language || 'python') : 'python';

        let testCases = [];
        if (q.test_cases_json) {
          try { testCases = JSON.parse(q.test_cases_json); } catch (e) {}
        }

        const evalRes = evaluateProblemSubmission({
          problemId: q.id,
          problemTitle: q.code_snippet || q.question_text.slice(0, 50),
          code: candidateCode,
          language: candidateLang,
          testCases
        });

        const isCorrect = evalRes.status === 'Accepted' ? 1 : 0;
        if (isCorrect) {
          score += 1;
          topicStats[topic].correct += 1;
        } else if (evalRes.passedCount > 0) {
          score += Math.round((evalRes.passedCount / Math.max(1, evalRes.totalCount)) * 100) / 100;
        }

        detailedResults.push({
          question_id: q.id,
          question_text: q.question_text,
          question_type: 'coding',
          difficulty: q.difficulty,
          topic_slug: topic,
          title: q.code_snippet || q.question_text.slice(0, 50),
          is_correct: isCorrect,
          status: evalRes.status,
          language: candidateLang,
          passed_test_cases: evalRes.passedCount,
          total_test_cases: evalRes.totalCount,
          execution_time: evalRes.executionTime,
          explanation: q.explanation || 'Optimal solution implemented.',
          submitted_code: candidateCode,
          test_results: evalRes.results
        });
      } else {
        const userSelected = answersMap[q.id] !== undefined && answersMap[q.id] !== null ? Number(answersMap[q.id]) : null;
        const isCorrect = userSelected === q.correct_option_index ? 1 : 0;
        if (isCorrect) {
          score += 1;
          topicStats[topic].correct += 1;
        }

        detailedResults.push({
          question_id: q.id,
          question_text: q.question_text,
          question_type: 'mcq',
          difficulty: q.difficulty,
          topic_slug: topic,
          user_selected_index: userSelected,
          correct_option_index: q.correct_option_index,
          is_correct: isCorrect,
          explanation: q.explanation || 'Refer to the standard formula and derivation.',
          options: q.options.map(o => ({
            option_index: o.option_index,
            option_text: o.option_text,
            is_correct: o.is_correct === 1
          }))
        });
      }
    }

    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    let answeredCount = 0;
    let unansweredCount = 0;
    for (const item of detailedResults) {
      if (item.question_type === 'mcq') {
        if (item.user_selected_index !== null && item.user_selected_index !== undefined) {
          answeredCount++;
        } else {
          unansweredCount++;
        }
      } else {
        if (item.submitted_code && item.submitted_code.trim().length > 0) {
          answeredCount++;
        } else {
          unansweredCount++;
        }
      }
    }

    const correctCount = score;
    const incorrectCount = Math.max(0, totalQuestions - correctCount - unansweredCount);
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : (totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0);

    // Persist attempt in SQLite
    const insertAttempt = db.prepare(`
      INSERT INTO attempts (
        user_id, test_id, test_title, company_name, category_slug, subject_name, topic_name, score, total_questions, percentage, time_taken_seconds, correct_count, incorrect_count, unanswered_count, accuracy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertAttempt.run(
      (userId || 'guest_user').trim().toLowerCase(),
      test.id,
      test.title,
      test.company_slug || 'General',
      test.category_slug,
      test.subject_slug || '',
      test.topic_slug || '',
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      correctCount,
      incorrectCount,
      unansweredCount,
      accuracy
    );

    const attemptId = Number(result.lastInsertRowid);

    // Persist individual answers
    const insertAnswer = db.prepare(`
      INSERT INTO attempt_answers (
        attempt_id, question_id, selected_option_index, submitted_code, is_correct
      ) VALUES (?, ?, ?, ?, ?)
    `);

    for (const item of detailedResults) {
      insertAnswer.run(
        attemptId,
        item.question_id,
        item.user_selected_index !== undefined ? item.user_selected_index : null,
        item.submitted_code || null,
        item.is_correct
      );
    }

    // Calculate strong and weak areas based on actual attempt answers
    const strongAreas = [];
    const weakAreas = [];
    const recommendations = [];

    for (const [topic, stats] of Object.entries(topicStats)) {
      const topicPct = Math.round((stats.correct / stats.total) * 100);
      const friendlyName = topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      if (topicPct >= 70) {
        strongAreas.push(`${friendlyName} (${topicPct}% accuracy)`);
      } else {
        weakAreas.push(`${friendlyName} (${topicPct}% accuracy)`);
        recommendations.push({
          topic: friendlyName,
          topic_slug: topic,
          action: `Practice ${friendlyName} Practice Test 2 to reinforce key formulas and problem-solving speed.`
        });
      }
    }

    if (recommendations.length === 0) {
      recommendations.push({
        topic: test.title,
        action: 'Great performance! Try taking a company-specific timed assessment or a higher difficulty mock test.'
      });
    }

    const passStatus = percentage >= 75 ? 'Placement Ready (Distinction)' : (percentage >= 60 ? 'Passing Score (Proficient)' : 'Needs Revision (< 60%)');

    return {
      attempt_id: attemptId,
      test_id: test.id,
      test_title: test.title,
      company_slug: test.company_slug,
      category_slug: test.category_slug,
      score,
      total_questions: totalQuestions,
      correct: correctCount,
      incorrect: incorrectCount,
      unanswered: unansweredCount,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      unanswered_count: unansweredCount,
      accuracy,
      percentage,
      time_taken_seconds: timeTakenSeconds,
      strong_areas: strongAreas,
      weak_areas: weakAreas,
      recommendations,
      test_type: test.test_type,
      coding_summary: test.test_type === 'coding' ? {
        solved_count: detailedResults.filter(r => r.status === 'Accepted').length,
        partially_solved_count: detailedResults.filter(r => r.status === 'Partially Accepted').length,
        unsolved_count: detailedResults.filter(r => r.status !== 'Accepted' && r.status !== 'Partially Accepted').length,
        total_test_cases_passed: detailedResults.reduce((acc, r) => acc + (r.passed_test_cases || 0), 0),
        total_test_cases: detailedResults.reduce((acc, r) => acc + (r.total_test_cases || 0), 0)
      } : null,
      detailed_results: detailedResults
    };
  },

  // Get test history & performance analytics
  getHistory() {
    const attempts = db.prepare(`
      SELECT * FROM attempts 
      ORDER BY completed_at DESC 
      LIMIT 100
    `).all();

    // Calculate overall stats
    const totalAttempts = attempts.length;
    let avgPercentage = 0;
    let bestPercentage = 0;

    if (totalAttempts > 0) {
      const sum = attempts.reduce((acc, curr) => acc + curr.percentage, 0);
      avgPercentage = Math.round(sum / totalAttempts);
      bestPercentage = Math.max(...attempts.map(a => a.percentage));
    }

    // Aggregate topic performance
    const topicPerformance = db.prepare(`
      SELECT 
        topic_name,
        COUNT(*) as attempts_count,
        ROUND(AVG(percentage), 1) as avg_score,
        MAX(percentage) as best_score
      FROM attempts
      WHERE topic_name IS NOT NULL AND topic_name != ''
      GROUP BY topic_name
    `).all();

    return {
      total_attempts: totalAttempts,
      avg_percentage: avgPercentage,
      best_percentage: bestPercentage,
      attempts,
      topic_performance: topicPerformance
    };
  },

  // Save ATS Analysis
  saveAtsAnalysis(data) {
    try {
      const stmt = db.prepare(`
        INSERT INTO ats_analyses (filename, file_type, target_role, overall_score, score_breakdown, analysis_json, extracted_preview, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        data.filename || '',
        data.file_type || '',
        data.target_role || '',
        data.overall_score || 0,
        JSON.stringify(data.score_breakdown || {}),
        JSON.stringify(data.analysis || {}),
        (data.extracted_preview || '').slice(0, 1000),
        ((data.userId || data.user_id || 'guest_user')).trim().toLowerCase()
      );
      return result.lastInsertRowid;
    } catch (e) {
      console.error('Error saving ATS analysis to db:', e);
      return null;
    }
  },

  // Get Latest ATS Analyses
  getLatestAtsAnalyses(limit = 5, userId = null) {
    try {
      if (userId) {
        const rows = db.prepare(`
          SELECT * FROM ats_analyses WHERE LOWER(user_id) = ? ORDER BY created_at DESC LIMIT ?
        `).all(userId.trim().toLowerCase(), limit);
        return rows.map(r => ({
          ...r,
          score_breakdown: JSON.parse(r.score_breakdown || '{}'),
          analysis: JSON.parse(r.analysis_json || '{}')
        }));
      }
      const rows = db.prepare(`
        SELECT * FROM ats_analyses ORDER BY created_at DESC LIMIT ?
      `).all(limit);
      return rows.map(r => ({
        ...r,
        score_breakdown: JSON.parse(r.score_breakdown || '{}'),
        analysis: JSON.parse(r.analysis_json || '{}')
      }));
    } catch (e) {
      console.error('Error getting ATS analysis from db:', e);
      return [];
    }
  },

  // ----------------------------------------------------
  // USER PROFILES & TARGET ROLE
  // ----------------------------------------------------
  getUserProfile(userId) {
    try {
      const normUserId = (userId || 'guest_user').trim().toLowerCase();
      const row = db.prepare('SELECT * FROM user_profiles WHERE LOWER(user_id) = ?').get(normUserId);
      return row || null;
    } catch (e) {
      console.error('Error getting user profile:', e);
      return null;
    }
  },

  updateUserProfile(userId, data = {}) {
    try {
      const normUserId = (userId || 'guest_user').trim().toLowerCase();
      const existing = db.prepare('SELECT * FROM user_profiles WHERE LOWER(user_id) = ?').get(normUserId);
      if (existing) {
        db.prepare(`
          UPDATE user_profiles 
          SET full_name = COALESCE(?, full_name), 
              target_role = COALESCE(?, target_role),
              updated_at = CURRENT_TIMESTAMP
          WHERE LOWER(user_id) = ?
        `).run(data.fullName || null, data.targetRole || null, normUserId);
      } else {
        db.prepare(`
          INSERT INTO user_profiles (user_id, full_name, target_role)
          VALUES (?, ?, ?)
        `).run(normUserId, data.fullName || null, data.targetRole || null);
      }
      return this.getUserProfile(normUserId);
    } catch (e) {
      console.error('Error updating user profile:', e);
      return null;
    }
  },

  // ----------------------------------------------------
  // RESUME RECORDING
  // ----------------------------------------------------
  recordResume({ userId, title, templateId, resumeData }) {
    try {
      const normUserId = (userId || 'guest_user').trim().toLowerCase();
      const stmt = db.prepare(`
        INSERT INTO user_resumes (user_id, title, template_id, resume_data_json)
        VALUES (?, ?, ?, ?)
      `);
      const res = stmt.run(
        normUserId,
        title || 'Untitled Resume',
        templateId || 'modern',
        JSON.stringify(resumeData || {})
      );
      return res.lastInsertRowid;
    } catch (e) {
      console.error('Error recording resume:', e);
      return null;
    }
  },

  // ----------------------------------------------------
  // MOCK INTERVIEW EVALUATIONS
  // ----------------------------------------------------
  recordInterviewEvaluation({ userId, targetRole, targetCompany, overallScore, communicationScore, technicalScore, relevanceScore, verdict, summary }) {
    try {
      const normUserId = (userId || 'guest_user').trim().toLowerCase();
      const stmt = db.prepare(`
        INSERT INTO interview_evaluations (
          user_id, target_role, target_company, overall_score, communication_score, technical_score, relevance_score, verdict, summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const res = stmt.run(
        normUserId,
        targetRole || 'Software Engineer',
        targetCompany || 'Tech Company',
        overallScore || 0,
        communicationScore || 0,
        technicalScore || 0,
        relevanceScore || 0,
        verdict || 'Completed',
        summary || ''
      );
      return res.lastInsertRowid;
    } catch (e) {
      console.error('Error recording interview evaluation:', e);
      return null;
    }
  },

  // ----------------------------------------------------
  // DASHBOARD USER METRICS & STATISTICS (Multi-User Scoped)
  // ----------------------------------------------------
  getUserStats(userId) {
    const normUserId = (userId || 'guest_user').trim().toLowerCase();

    // 1. Resumes created: user_resumes count
    const resumeRow = db.prepare('SELECT COUNT(*) as count FROM user_resumes WHERE LOWER(user_id) = ?').get(normUserId);
    const resumesCreated = resumeRow?.count || 0;

    // 2. Interviews completed:
    const interviewRow = db.prepare('SELECT COUNT(*) as count FROM interview_evaluations WHERE LOWER(user_id) = ?').get(normUserId);
    const interviewsCompleted = interviewRow?.count || 0;

    // 3. Assessments passed (percentage >= 60):
    const assessmentPassedRow = db.prepare('SELECT COUNT(*) as count FROM attempts WHERE LOWER(user_id) = ? AND percentage >= 60').get(normUserId);
    const assessmentsPassed = assessmentPassedRow?.count || 0;

    // Total attempts
    const assessmentTotalRow = db.prepare('SELECT COUNT(*) as count FROM attempts WHERE LOWER(user_id) = ?').get(normUserId);
    const totalAssessments = assessmentTotalRow?.count || 0;

    // 4. Placement Score calculation (real average of available evaluations)
    const avgAssessmentRow = db.prepare('SELECT AVG(percentage) as avg_score FROM attempts WHERE LOWER(user_id) = ?').get(normUserId);
    const avgAssessment = avgAssessmentRow?.avg_score != null ? Math.round(avgAssessmentRow.avg_score) : null;

    const avgInterviewRow = db.prepare('SELECT AVG(overall_score) as avg_score FROM interview_evaluations WHERE LOWER(user_id) = ?').get(normUserId);
    const avgInterview = avgInterviewRow?.avg_score != null ? Math.round(avgInterviewRow.avg_score) : null;

    const avgAtsRow = db.prepare('SELECT AVG(overall_score) as avg_score FROM ats_analyses WHERE LOWER(user_id) = ?').get(normUserId);
    const avgAts = avgAtsRow?.avg_score != null ? Math.round(avgAtsRow.avg_score) : null;

    let placementScore = null;
    const scoreParts = [];
    if (avgAssessment !== null) scoreParts.push(avgAssessment);
    if (avgInterview !== null) scoreParts.push(avgInterview);
    if (avgAts !== null) scoreParts.push(avgAts);

    if (scoreParts.length > 0) {
      const sum = scoreParts.reduce((a, b) => a + b, 0);
      placementScore = Math.round(sum / scoreParts.length);
    }

    // 5. Placement Readiness calculation:
    // Milestones:
    // - Resume created: +25%
    // - Mock interview completed: +30%
    // - Assessment attempted: +25%
    // - Assessment passed: +20%
    let placementReadiness = null;
    if (resumesCreated > 0 || interviewsCompleted > 0 || totalAssessments > 0) {
      let readiness = 0;
      if (resumesCreated > 0) readiness += 25;
      if (interviewsCompleted > 0) readiness += 30;
      if (totalAssessments > 0) readiness += 25;
      if (assessmentsPassed > 0) readiness += 20;
      placementReadiness = Math.min(100, readiness);
    }

    return {
      resumesCreated,
      interviewsCompleted,
      assessmentsPassed,
      totalAssessments,
      placementScore, // null if no data
      placementReadiness // null if no data
    };
  },

  // ----------------------------------------------------
  // RECENT ACTIVITIES (Multi-User Scoped)
  // ----------------------------------------------------
  getUserRecentActivities(userId, limit = 5) {
    const normUserId = (userId || 'guest_user').trim().toLowerCase();
    const activities = [];

    // Resumes
    try {
      const resumes = db.prepare(`
        SELECT title, template_id, created_at 
        FROM user_resumes 
        WHERE LOWER(user_id) = ? 
        ORDER BY created_at DESC LIMIT ?
      `).all(normUserId, limit);

      for (const r of resumes) {
        activities.push({
          type: 'resume',
          title: `Updated "${r.title || 'Executive Resume'}"`,
          description: `Applied ${r.template_id ? r.template_id.charAt(0).toUpperCase() + r.template_id.slice(1) : 'Executive'} template and updated project accomplishments.`,
          timestamp: r.created_at
        });
      }
    } catch (e) {}

    // ATS Analyses
    try {
      const atsList = db.prepare(`
        SELECT filename, overall_score, target_role, created_at 
        FROM ats_analyses 
        WHERE LOWER(user_id) = ? 
        ORDER BY created_at DESC LIMIT ?
      `).all(normUserId, limit);

      for (const a of atsList) {
        activities.push({
          type: 'resume',
          title: `ATS Analysis: "${a.filename || 'Resume'}"`,
          description: `Scored ${a.overall_score}/100 optimization rating for ${a.target_role || 'Technical Role'}.`,
          timestamp: a.created_at
        });
      }
    } catch (e) {}

    // Mock Interviews
    try {
      const interviews = db.prepare(`
        SELECT target_role, target_company, overall_score, verdict, created_at 
        FROM interview_evaluations 
        WHERE LOWER(user_id) = ? 
        ORDER BY created_at DESC LIMIT ?
      `).all(normUserId, limit);

      for (const iv of interviews) {
        activities.push({
          type: 'interview',
          title: `Completed Mock Interview (${iv.target_company || 'Google'} Round)`,
          description: `${iv.target_role || 'System Design'}: ${iv.overall_score}% overall response rating.`,
          timestamp: iv.created_at
        });
      }
    } catch (e) {}

    // Assessments
    try {
      const attempts = db.prepare(`
        SELECT test_title, score, total_questions, percentage, completed_at 
        FROM attempts 
        WHERE LOWER(user_id) = ? 
        ORDER BY completed_at DESC LIMIT ?
      `).all(normUserId, limit);

      for (const at of attempts) {
        const passed = at.percentage >= 60;
        activities.push({
          type: 'assessment',
          title: `Completed Exam: "${at.test_title}"`,
          description: `Scored ${at.percentage}% (${at.score}/${at.total_questions}) - ${passed ? 'Passed' : 'Needs Practice'}.`,
          timestamp: at.completed_at
        });
      }
    } catch (e) {}

    // Career Agent
    try {
      const convs = db.prepare(`
        SELECT title, created_at 
        FROM career_agent_conversations 
        WHERE LOWER(user_id) = ? 
        ORDER BY created_at DESC LIMIT ?
      `).all(normUserId, limit);

      for (const c of convs) {
        activities.push({
          type: 'agent',
          title: `Career Agent Strategy Session`,
          description: `Reviewed "${c.title}" preparation roadmap.`,
          timestamp: c.created_at
        });
      }
    } catch (e) {}

    // Sort by timestamp DESC
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return activities.slice(0, limit);
  }
};

module.exports = {
  db,
  initDb,
  assessmentDb
};
