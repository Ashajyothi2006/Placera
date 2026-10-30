const { db } = require('./assessmentDb');
const { timeSpeedDistanceQuestions, ratioProportionQuestions, averagesQuestions } = require('./seedAptitudeTopics');
const { simpleCompoundInterestQuestions, permutationsCombinationsQuestions, numberSystemQuestions, problemsOnAgesQuestions } = require('./seedAptitudeTopics2');
const { directionsQuestions, syllogismsQuestions, seriesQuestions, puzzlesQuestions, verbalAbilityQuestions, dataInterpretationQuestions } = require('./seedAptitudeTopics3');
const { generateAptitudeForCompany } = require('./seedCompanyAptitude');
const { seedRealCodingAssessments } = require('./seedCompanyRealCoding');
const { generateCoreForCompany } = require('./seedCompanyCore');
const { generateVerbalForCompany } = require('./seedCompanyVerbal');

function seedCompleteAssessments() {
  console.log('--- Starting Complete Assessment Seeder ---');

  // Ensure Verbal Ability exists in assessment_categories
  try {
    db.prepare(`
      INSERT OR IGNORE INTO assessment_categories (name, slug, description)
      VALUES (?, ?, ?)
    `).run('Verbal Ability', 'verbal', 'English grammar, vocabulary, reading comprehension, and business communication.');
  } catch (e) {}

  // Prepare statements
  const insertTest = db.prepare(`
    INSERT INTO tests (
      title, company_slug, role_slug, category_slug, subject_slug, topic_slug, test_type, duration_minutes, total_questions, difficulty, is_pattern_based
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertQuestion = db.prepare(`
    INSERT INTO questions (
      test_id, topic_slug, question_text, question_type, difficulty, code_snippet, input_format, output_format, constraints, sample_input, sample_output, test_cases_json, starter_code_json, explanation
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertOption = db.prepare(`
    INSERT INTO question_options (question_id, option_text, is_correct, option_index) 
    VALUES (?, ?, ?, ?)
  `);

  function addMcqTestWith20Questions({ title, company_slug, role_slug, category_slug, subject_slug, topic_slug, duration = 20, difficulty = 'Medium', questionsList }) {
    if (!questionsList || questionsList.length < 20) {
      throw new Error(`Cannot add test "${title}": requires at least 20 questions, got ${questionsList ? questionsList.length : 0}`);
    }

    const testRes = insertTest.run(
      title,
      company_slug || null,
      role_slug || null,
      category_slug,
      subject_slug || null,
      topic_slug || null,
      'mcq',
      duration,
      questionsList.length,
      difficulty,
      company_slug ? 1 : 0
    );

    const testId = Number(testRes.lastInsertRowid);

    for (const q of questionsList) {
      const qText = q.question || q.q;
      const qDiff = q.difficulty || q.diff || 'Medium';
      const qExp = q.explanation || q.exp || 'Refer to standard solution.';
      const qOpts = q.options || q.opts || [];
      const qAns = (q.correct_index !== undefined ? q.correct_index : q.ans);

      const qRes = insertQuestion.run(
        testId,
        topic_slug || null,
        qText,
        'mcq',
        qDiff,
        q.code_snippet || null,
        null, null, null, null, null, null, null,
        qExp
      );
      const qId = Number(qRes.lastInsertRowid);

      for (let i = 0; i < qOpts.length; i++) {
        const isCorrect = (i === qAns) ? 1 : 0;
        insertOption.run(qId, qOpts[i], isCorrect, i);
      }
    }

    return testId;
  }

  // 1. Delete previous partial tests (MCQ < 20, Coding < 5)
  console.log('Cleaning partial tests...');
  const existingTests = db.prepare('SELECT id, title, category_slug, test_type, (SELECT COUNT(*) FROM questions WHERE test_id = tests.id) as q_cnt FROM tests').all();
  for (const t of existingTests) {
    const minRequired = (t.test_type === 'coding' || t.category_slug === 'coding') ? 5 : 20;
    if (t.q_cnt < minRequired) {
      console.log(`Removing partial test id=${t.id} "${t.title}" (${t.q_cnt} questions)...`);
      db.prepare('DELETE FROM tests WHERE id = ?').run(t.id);
    }
  }

  // 2. Add Aptitude Topic Tests for remaining topics (each topic has exactly 20 questions)
  const topicTestsToAdd = [
    {
      title: 'Time, Speed and Distance — Practice Test 1',
      topic_slug: 'time-speed-distance',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: timeSpeedDistanceQuestions
    },
    {
      title: 'Ratio and Proportion — Practice Test 1',
      topic_slug: 'ratio-and-proportion',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: ratioProportionQuestions
    },
    {
      title: 'Averages — Practice Test 1',
      topic_slug: 'averages',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: averagesQuestions
    },
    {
      title: 'Simple & Compound Interest — Practice Test 1',
      topic_slug: 'simple-compound-interest',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: simpleCompoundInterestQuestions
    },
    {
      title: 'Permutations & Combinations — Practice Test 1',
      topic_slug: 'permutations-combinations',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: permutationsCombinationsQuestions
    },
    {
      title: 'Number System — Practice Test 1',
      topic_slug: 'number-system',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: numberSystemQuestions
    },
    {
      title: 'Problems on Ages — Practice Test 1',
      topic_slug: 'problems-on-ages',
      subject_slug: 'quantitative',
      category_slug: 'aptitude',
      questionsList: problemsOnAgesQuestions
    },
    {
      title: 'Directions — Practice Test 1',
      topic_slug: 'directions',
      subject_slug: 'logical',
      category_slug: 'aptitude',
      questionsList: directionsQuestions
    },
    {
      title: 'Syllogisms — Practice Test 1',
      topic_slug: 'syllogisms',
      subject_slug: 'logical',
      category_slug: 'aptitude',
      questionsList: syllogismsQuestions
    },
    {
      title: 'Series & Patterns — Practice Test 1',
      topic_slug: 'series',
      subject_slug: 'logical',
      category_slug: 'aptitude',
      questionsList: seriesQuestions
    },
    {
      title: 'Puzzles & Seating — Practice Test 1',
      topic_slug: 'puzzles',
      subject_slug: 'logical',
      category_slug: 'aptitude',
      questionsList: puzzlesQuestions
    },
    {
      title: 'Verbal Ability & Grammar — Practice Test 1',
      topic_slug: 'verbal-ability',
      subject_slug: 'verbal',
      category_slug: 'aptitude',
      questionsList: verbalAbilityQuestions
    },
    {
      title: 'Data Interpretation — Practice Test 1',
      topic_slug: 'data-interpretation',
      subject_slug: 'data-interpretation',
      category_slug: 'aptitude',
      questionsList: dataInterpretationQuestions
    }
  ];

  for (const t of topicTestsToAdd) {
    const existing = db.prepare('SELECT id FROM tests WHERE topic_slug = ? AND company_slug IS NULL').get(t.topic_slug);
    if (!existing) {
      console.log(`Adding 20-Q Aptitude Topic test: ${t.title}`);
      addMcqTestWith20Questions({
        title: t.title,
        company_slug: null,
        role_slug: null,
        category_slug: t.category_slug,
        subject_slug: t.subject_slug,
        topic_slug: t.topic_slug,
        duration: 20,
        difficulty: 'Medium',
        questionsList: t.questionsList
      });
    }
  }

  // 3. Add Company-Specific Assessments (10 companies x 4 categories = 40 tests, each 20 Qs)
  const companies = [
    { slug: 'tcs', name: 'TCS' },
    { slug: 'infosys', name: 'Infosys' },
    { slug: 'wipro', name: 'Wipro' },
    { slug: 'accenture', name: 'Accenture' },
    { slug: 'cognizant', name: 'Cognizant' },
    { slug: 'capgemini', name: 'Capgemini' },
    { slug: 'deloitte', name: 'Deloitte' },
    { slug: 'amazon', name: 'Amazon' },
    { slug: 'microsoft', name: 'Microsoft' },
    { slug: 'google', name: 'Google' }
  ];

  for (const comp of companies) {
    // 3.1 Aptitude (20 Qs)
    const existingApt = db.prepare('SELECT id FROM tests WHERE company_slug = ? AND category_slug = ?').get(comp.slug, 'aptitude');
    if (!existingApt) {
      console.log(`Adding ${comp.name} Aptitude test (20 Qs)...`);
      addMcqTestWith20Questions({
        title: `${comp.name} — Quantitative & Analytical Assessment`,
        company_slug: comp.slug,
        role_slug: null, // Available to all roles
        category_slug: 'aptitude',
        subject_slug: 'quantitative',
        topic_slug: 'quantitative',
        duration: 20,
        difficulty: 'Medium',
        questionsList: generateAptitudeForCompany(comp.slug)
      });
    }

    // 3.2 Coding Tests (Real Programming tests handled by seedRealCodingAssessments)
    // (MCQ coding tests removed in accordance with user requirements)
    
    // 3.3 DSA section for company specific exams removed per user request
    const existingCompanyDSA = db.prepare('SELECT id FROM tests WHERE company_slug = ? AND category_slug = ?').all(comp.slug, 'dsa');
    for (const t of existingCompanyDSA) {
      db.prepare('DELETE FROM question_options WHERE question_id IN (SELECT id FROM questions WHERE test_id = ?)').run(t.id);
      db.prepare('DELETE FROM questions WHERE test_id = ?').run(t.id);
      db.prepare('DELETE FROM tests WHERE id = ?').run(t.id);
    }

    // 3.4 Core Concepts (20 Qs)
    const existingCore = db.prepare('SELECT id FROM tests WHERE company_slug = ? AND category_slug = ?').get(comp.slug, 'core_concepts');
    if (!existingCore) {
      console.log(`Adding ${comp.name} Core Technical Concepts test (20 Qs)...`);
      addMcqTestWith20Questions({
        title: `${comp.name} — Core Computer Science Concepts`,
        company_slug: comp.slug,
        role_slug: null,
        category_slug: 'core_concepts',
        subject_slug: 'os',
        topic_slug: 'os',
        duration: 20,
        difficulty: 'Medium',
        questionsList: generateCoreForCompany(comp.slug)
      });
    }

    // 3.5 Verbal Ability (20 Qs) for companies with verbal round (TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Deloitte)
    const verbalQuestions = generateVerbalForCompany(comp.slug);
    if (verbalQuestions && verbalQuestions.length >= 20) {
      const existingVerbal = db.prepare('SELECT id FROM tests WHERE company_slug = ? AND category_slug = ?').get(comp.slug, 'verbal');
      if (!existingVerbal) {
        console.log(`Adding ${comp.name} Verbal Ability assessment (20 Qs)...`);
        addMcqTestWith20Questions({
          title: `${comp.name} — Verbal Ability & English Communication`,
          company_slug: comp.slug,
          role_slug: null,
          category_slug: 'verbal',
          subject_slug: 'verbal',
          topic_slug: 'verbal-ability',
          duration: 20,
          difficulty: 'Medium',
          questionsList: verbalQuestions
        });
      }
    }
  }

  // Seed Real Programming Coding Assessments (Easy, Medium, Hard - 5 to 6 questions each)
  seedRealCodingAssessments();

  // Final database audit
  const finalTests = db.prepare(`
    SELECT t.id, t.title, t.company_slug, t.category_slug, t.test_type, COUNT(q.id) as question_count 
    FROM tests t 
    JOIN questions q ON q.test_id = t.id 
    GROUP BY t.id
  `).all();

  console.log(`--- Total Playable Tests: ${finalTests.length} ---`);
  let belowThreshold = 0;
  for (const t of finalTests) {
    const minRequired = (t.test_type === 'coding' || t.category_slug === 'coding') ? 5 : 20;
    if (t.question_count < minRequired) {
      console.error(`WARNING: Test ID ${t.id} "${t.title}" (${t.test_type}) has ONLY ${t.question_count} questions! Required: ${minRequired}`);
      belowThreshold++;
    }
  }

  if (belowThreshold === 0) {
    console.log(`SUCCESS: Every MCQ test has >= 20 questions, and every Coding test has 5-10 questions!`);
  }
}

if (require.main === module) {
  seedCompleteAssessments();
}

module.exports = { seedCompleteAssessments };
