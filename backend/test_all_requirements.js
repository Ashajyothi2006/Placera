const { assessmentDb, db } = require('./db/assessmentDb');

const API_BASE = 'http://localhost:5000/api/assessments';

async function runTests() {
  console.log('====================================================');
  console.log('STARTING SKILL ASSESSMENT COMPREHENSIVE VERIFICATION');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${message}`);
      process.exitCode = 1;
    }
  }

  try {
    // 1. Verify all tests in database have at least 20 questions
    console.log('--- TEST 1: Database Test Question Counts ---');
    const allTests = assessmentDb.getTests({ limit: 200 });
    assert(allTests.length >= 50, `Found ${allTests.length} tests in database (expected >= 50)`);

    let allHave20Plus = true;
    let minQ = 999;
    let maxQ = 0;
    for (const t of allTests) {
      const fullTest = assessmentDb.getTestById(t.id);
      const qCount = fullTest.questions.length;
      if (qCount < 20) {
        allHave20Plus = false;
        console.error(`Test ID ${t.id} ("${t.title}") has only ${qCount} questions!`);
      }
      if (qCount < minQ) minQ = qCount;
      if (qCount > maxQ) maxQ = qCount;
    }
    assert(allHave20Plus, `Every single test in the database has at least 20 questions (Min: ${minQ}, Max: ${maxQ})`);

    // 2. Verify all 10 companies have all 4 categories (Aptitude, Coding, DSA, Core Concepts)
    console.log('\n--- TEST 2: Company-Specific Coverage (10 Companies x 4 Categories) ---');
    const meta = assessmentDb.getMetadata();
    const companies = meta.companies;
    assert(companies.length === 10, `Found 10 companies: ${companies.map(c => c.name).join(', ')}`);

    const requiredCategories = ['aptitude', 'coding', 'dsa', 'core_concepts'];
    let allCompaniesCovered = true;
    for (const c of companies) {
      const cTests = assessmentDb.getTests({ companySlug: c.slug, limit: 100 });
      const foundCats = new Set(cTests.map(t => t.category_slug));
      const missing = requiredCategories.filter(cat => !foundCats.has(cat));
      if (missing.length > 0) {
        allCompaniesCovered = false;
        console.error(`Company ${c.name} is missing categories: ${missing.join(', ')}`);
      }
    }
    assert(allCompaniesCovered, 'All 10 companies have tests for Aptitude, Coding, DSA, and Core Concepts');

    // 3. Verify Aptitude Preparation Topics Coverage
    console.log('\n--- TEST 3: Aptitude Preparation Topic Coverage ---');
    const aptitudeTopics = meta.topics.filter(t => t.category_slug === 'aptitude');
    let allTopicsHaveTests = true;
    for (const topic of aptitudeTopics) {
      const topicTests = assessmentDb.getTests({ topicSlug: topic.slug, limit: 10 });
      if (topicTests.length === 0) {
        allTopicsHaveTests = false;
        console.error(`Aptitude Topic "${topic.name}" (${topic.slug}) has no tests!`);
      }
    }
    assert(allTopicsHaveTests, `All ${aptitudeTopics.length} aptitude topics have playable 20-question practice tests`);

    // 4. Verify Question Quality & Valid Answer Mapping
    console.log('\n--- TEST 4: Question Quality & Correct Answer Validation ---');
    const allQuestions = db.prepare('SELECT * FROM questions').all();
    let allQuestionsValid = true;
    let questionsWithCorrectAnswerMatch = 0;

    for (const q of allQuestions) {
      const options = db.prepare('SELECT * FROM question_options WHERE question_id = ?').all(q.id);
      if (options.length < 2) {
        allQuestionsValid = false;
        console.error(`Question ID ${q.id} has fewer than 2 options!`);
      }
      const hasCorrect = options.some(o => o.is_correct === 1);
      if (!hasCorrect) {
        allQuestionsValid = false;
        console.error(`Question ID ${q.id} has no marked correct option!`);
      } else {
        questionsWithCorrectAnswerMatch++;
      }
      if (!q.explanation || q.explanation.trim().length === 0) {
        allQuestionsValid = false;
        console.error(`Question ID ${q.id} is missing explanation!`);
      }
    }
    assert(allQuestionsValid, `All ${allQuestions.length} questions have valid text, >= 2 options, marked correct answer, and explanation`);
    assert(questionsWithCorrectAnswerMatch === allQuestions.length, `100% of questions (${questionsWithCorrectAnswerMatch}/${allQuestions.length}) have valid matching correct options`);

    // 5. Verify API: Duration & Minimum 20 Questions Validation
    console.log('\n--- TEST 5: API Test Details & Duration Calculation ---');
    const sampleTest = allTests[0];
    const apiTestRes = await fetch(`${API_BASE}/tests/${sampleTest.id}`);
    assert(apiTestRes.status === 200, `API GET /tests/${sampleTest.id} responded with 200 OK`);
    const testData = await apiTestRes.json();
    assert(testData.questions.length >= 20, `Test has ${testData.questions.length} questions (>= 20)`);
    assert(testData.duration_minutes === testData.questions.length, `Duration is exactly 1 minute per question: ${testData.duration_minutes} mins`);

    // 6. Verify Submitting Test & Accurate Metrics Persistence
    console.log('\n--- TEST 6: Submission Scoring & Database Persistence ---');
    const evalTest = assessmentDb.getTestForEvaluation(testData.id);
    const answersPayload = {};
    let expectedCorrect = 0;
    let expectedIncorrect = 0;
    let expectedUnanswered = 0;

    evalTest.questions.forEach((q, idx) => {
      const correctIdx = q.correct_option_index;
      // choose an incorrect index
      const incorrectIdx = (correctIdx + 1) % q.options.length;

      if (idx < 10) {
        answersPayload[q.id] = correctIdx;
        expectedCorrect++;
      } else if (idx < 15) {
        answersPayload[q.id] = incorrectIdx;
        expectedIncorrect++;
      } else {
        // Leave unanswered
        expectedUnanswered++;
      }
    });

    const submitRes = await fetch(`${API_BASE}/tests/${testData.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: answersPayload,
        timeTakenSeconds: 300,
        submittedCode: null
      })
    });

    assert(submitRes.status === 200, 'API POST /tests/:id/submit responded with 200 OK');
    const result = await submitRes.json();
    assert(result.score === 10, `Score is ${result.score} (expected 10)`);
    assert(result.correct_count === 10, `Correct count is ${result.correct_count} (expected 10)`);
    assert(result.incorrect_count === 5, `Incorrect count is ${result.incorrect_count} (expected 5)`);
    assert(result.unanswered_count === 5, `Unanswered count is ${result.unanswered_count} (expected 5)`);
    assert(result.total_questions === testData.questions.length, `Total questions is ${result.total_questions}`);
    assert(result.percentage === 50, `Percentage is ${result.percentage}% (expected 50%)`);

    // 7. Verify Attempt in History API
    console.log('\n--- TEST 7: History API Persistence ---');
    const historyRes = await fetch(`${API_BASE}/history`);
    assert(historyRes.status === 200, 'API GET /history responded with 200 OK');
    const histData = await historyRes.json();
    assert(histData.total_attempts >= 1, `Total attempts in history: ${histData.total_attempts}`);
    const latestAttempt = histData.attempts[0];
    assert(latestAttempt.id === result.attempt_id, `Latest attempt ID matches: ${latestAttempt.id}`);

    // 8. Verify Server Deadline Protection (Submissions exceeding max allowed duration are clamped to allowed limit)
    console.log('\n--- TEST 8: Server-Side Authoritative Deadline Protection ---');
    const excessiveTime = (testData.questions.length * 60) + 9999;
    const overTimeRes = await fetch(`${API_BASE}/tests/${testData.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: answersPayload,
        timeTakenSeconds: excessiveTime,
        submittedCode: null
      })
    });
    const overTimeData = await overTimeRes.json();
    const maxAllowedSeconds = (testData.questions.length * 60) + 30;
    assert(overTimeRes.status === 200, 'API POST /tests/:id/submit successfully processed clamped submission');
    assert(overTimeData.time_taken_seconds <= maxAllowedSeconds, `Time taken ${overTimeData.time_taken_seconds}s clamped to max allowed limit (${maxAllowedSeconds}s)`);

    console.log('\n====================================================');
    console.log(`ALL VERIFICATION SUITES COMPLETED: ${passedTests}/${totalTests} PASSED`);
    console.log('====================================================');
  } catch (error) {
    console.error('Unexpected error during verification:', error);
    process.exitCode = 1;
  }
}

runTests();
