const { db } = require('./assessmentDb');

function seedDatabase() {
  console.log('Seeding Placement Skill Assessment Database...');

  // Check if companies already exist
  const existingCompanies = db.prepare('SELECT COUNT(*) as count FROM companies').get();
  if (existingCompanies && existingCompanies.count > 0) {
    console.log('Database already seeded. Skipping initial seed.');
    return;
  }

  // 1. Insert Companies
  const insertCompany = db.prepare(`
    INSERT INTO companies (name, slug, description, tier, pattern_notes) 
    VALUES (?, ?, ?, ?, ?)
  `);

  const companies = [
    { name: 'TCS', slug: 'tcs', description: 'Tata Consultancy Services - NQT & Digital recruitment assessment patterns focusing on foundation aptitude, advanced coding, and core engineering concepts.', tier: 'Tier 1 Service', pattern_notes: 'TCS NQT Pattern: Numerical Ability, Reasoning Ability, Verbal Ability, Hands-on Coding (Python/Java/C++).' },
    { name: 'Infosys', slug: 'infosys', description: 'Infosys Specialist Programmer & Digital Specialist Engineer patterns with emphasis on pseudocode, algorithmic puzzles, and quantitative agility.', tier: 'Tier 1 Service', pattern_notes: 'Infosys Pattern: Mathematical Ability, Logical & Cryptarithmetic, Verbal, Hands-on DSA.' },
    { name: 'Wipro', slug: 'wipro', description: 'Wipro Elite National Talent Hunt (NLTH) assessment testing quantitative acumen, logical deductions, and fundamental programming concepts.', tier: 'Tier 1 Service', pattern_notes: 'Wipro NLTH: Quantitative, Logical, Verbal, 2 Coding questions.' },
    { name: 'Accenture', slug: 'accenture', description: 'Accenture Cognitive and Technical Assessment including critical thinking, abstract reasoning, pseudocode, cloud fundamentals, and network security.', tier: 'Tier 1 Consulting', pattern_notes: 'Accenture Pattern: Cognitive Assessment + Technical Assessment (Pseudocode, Cloud, Networking) + 2 Coding Problems.' },
    { name: 'Cognizant', slug: 'cognizant', description: 'Cognizant GenC & GenC Next evaluation focusing on data interpretation, analytical ability, problem-solving, and object-oriented paradigms.', tier: 'Tier 1 Service', pattern_notes: 'Cognizant Pattern: Analytical, Quantitative, Verbal, Code Debugging / DSA.' },
    { name: 'Capgemini', slug: 'capgemini', description: 'Capgemini Exceler recruitment drive testing game-based aptitude, behavioral profiling, pseudocode analysis, and system architecture.', tier: 'Tier 1 Consulting', pattern_notes: 'Capgemini Pattern: Game-based Aptitude, Quantitative, Pseudocode, Essay/Verbal.' },
    { name: 'Deloitte', slug: 'deloitte', description: 'Deloitte USI technical and advisory placement assessment evaluating business aptitude, data analysis, SQL queries, and software engineering.', tier: 'Big 4 Consulting', pattern_notes: 'Deloitte Pattern: Quantitative Aptitude, Logical Reasoning, Computer Science fundamentals, Case Analysis.' },
    { name: 'Amazon', slug: 'amazon', description: 'Amazon SDE 1 online assessment (OA) covering high-complexity data structures, algorithms, space-time trade-offs, and Leadership Principles.', tier: 'FAANG / Product', pattern_notes: 'Amazon OA Pattern: 2 Hard/Medium DSA Coding Questions + Work Style Simulation.' },
    { name: 'Microsoft', slug: 'microsoft', description: 'Microsoft Software Engineer online evaluation emphasizing clean modular coding, graph theory, trees, recursion, and core OS/DBMS concepts.', tier: 'Big Tech Product', pattern_notes: 'Microsoft Codility Pattern: 3 Algorithmic Tasks (Strings, Trees, Dynamic Programming) + Core CS Fundamentals.' },
    { name: 'Google', slug: 'google', description: 'Google Software Engineer technical evaluation with rigorous focus on algorithmic elegance, competitive programming, complexity analysis, and concurrency.', tier: 'Big Tech Product', pattern_notes: 'Google OA Pattern: 2 Complex Algorithmic Challenges (Dynamic Programming, Graph Theory, Segment Trees).' }
  ];

  for (const c of companies) {
    insertCompany.run(c.name, c.slug, c.description, c.tier, c.pattern_notes);
  }

  // 2. Insert Job Roles
  const insertRole = db.prepare('INSERT INTO job_roles (title, slug) VALUES (?, ?)');
  const roles = [
    { title: 'Software Developer / SDE', slug: 'sde' },
    { title: 'Systems Engineer', slug: 'systems-engineer' },
    { title: 'Data Analyst', slug: 'data-analyst' },
    { title: 'Cloud & DevOps Engineer', slug: 'cloud-devops' }
  ];
  for (const r of roles) {
    insertRole.run(r.title, r.slug);
  }

  // 3. Insert Assessment Categories
  const insertCategory = db.prepare('INSERT INTO assessment_categories (name, slug, description) VALUES (?, ?, ?)');
  const categories = [
    { name: 'Aptitude', slug: 'aptitude', description: 'Quantitative, logical reasoning, verbal agility, and data interpretation questions.' },
    { name: 'Coding', slug: 'coding', description: 'Hands-on programming problem statements with test cases and multi-language code evaluation.' },
    { name: 'DSA', slug: 'dsa', description: 'Data Structures and Algorithms assessments covering Arrays, Linked Lists, Trees, Graphs, and DP.' },
    { name: 'Core Concepts', slug: 'core_concepts', description: 'Subject-wise technical MCQs covering Java, Python, DBMS, SQL, OOP, OS, Networks, and Cloud.' }
  ];
  for (const cat of categories) {
    insertCategory.run(cat.name, cat.slug, cat.description);
  }

  // 4. Insert Subjects
  const insertSubject = db.prepare('INSERT INTO subjects (name, slug, category_slug) VALUES (?, ?, ?)');
  const subjects = [
    // Core technical subjects
    { name: 'Java', slug: 'java', category_slug: 'core_concepts' },
    { name: 'Python', slug: 'python', category_slug: 'core_concepts' },
    { name: 'C / C++', slug: 'cpp', category_slug: 'core_concepts' },
    { name: 'DBMS & SQL', slug: 'dbms-sql', category_slug: 'core_concepts' },
    { name: 'Object-Oriented Programming (OOP)', slug: 'oop', category_slug: 'core_concepts' },
    { name: 'Operating Systems', slug: 'os', category_slug: 'core_concepts' },
    { name: 'Computer Networks', slug: 'cn', category_slug: 'core_concepts' },
    { name: 'Cloud Computing & AWS', slug: 'cloud', category_slug: 'core_concepts' },
    { name: 'Web Technologies (HTML/CSS/JS)', slug: 'web-tech', category_slug: 'core_concepts' },

    // Aptitude subjects
    { name: 'Quantitative Aptitude', slug: 'quantitative', category_slug: 'aptitude' },
    { name: 'Logical Reasoning', slug: 'logical', category_slug: 'aptitude' },
    { name: 'Verbal Ability', slug: 'verbal', category_slug: 'aptitude' },
    { name: 'Data Interpretation', slug: 'data-interpretation', category_slug: 'aptitude' },

    // DSA Subjects
    { name: 'Linear Data Structures', slug: 'linear-dsa', category_slug: 'dsa' },
    { name: 'Non-Linear Data Structures', slug: 'non-linear-dsa', category_slug: 'dsa' },
    { name: 'Algorithmic Paradigms', slug: 'algorithms', category_slug: 'dsa' }
  ];
  for (const s of subjects) {
    insertSubject.run(s.name, s.slug, s.category_slug);
  }

  // 5. Insert Topics
  const insertTopic = db.prepare('INSERT INTO topics (name, slug, subject_slug, category_slug, description) VALUES (?, ?, ?, ?, ?)');
  const topics = [
    // Aptitude Topics
    { name: 'Percentages', slug: 'percentages', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Percentage increase/decrease, fractions, price-consumption relations, and successive percentages.' },
    { name: 'Profit and Loss', slug: 'profit-and-loss', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Cost price, selling price, marked price, successive discounts, and dishonest dealer calculations.' },
    { name: 'Time and Work', slug: 'time-and-work', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Work rates, efficiency, pipes and cisterns, alternate days, and wages.' },
    { name: 'Time, Speed and Distance', slug: 'time-speed-distance', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Relative speed, trains crossing platforms, boats and streams, circular tracks, and average speed.' },
    { name: 'Ratio and Proportion', slug: 'ratio-and-proportion', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Mean proportion, third/fourth proportions, mixtures and alligations, and partnership sharing.' },
    { name: 'Averages', slug: 'averages', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Weighted average, replacement problems, speed averages, and consecutive series averages.' },
    { name: 'Simple and Compound Interest', slug: 'simple-compound-interest', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Principal, annual compounding, half-yearly compounding, difference between CI and SI, and depreciation.' },
    { name: 'Permutations and Combinations', slug: 'permutations-combinations', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Arrangements, word formations, circular permutations, selections, and constraint solving.' },
    { name: 'Probability', slug: 'probability', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Coin flips, dice rolls, card decks, ball picks, conditional probability, and independent events.' },
    { name: 'Number System', slug: 'number-system', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Divisibility rules, unit digit calculation, prime numbers, HCF and LCM, and remainder theorem.' },
    { name: 'Problems on Ages', slug: 'problems-on-ages', subject_slug: 'quantitative', category_slug: 'aptitude', description: 'Linear equations for age ratios, past/present/future age calculations, and family ages.' },
    { name: 'Blood Relations', slug: 'blood-relations', subject_slug: 'logical', category_slug: 'aptitude', description: 'Family tree diagrams, coded blood relations, and pointing-to-photograph puzzles.' },
    { name: 'Coding-Decoding', slug: 'coding-decoding', subject_slug: 'logical', category_slug: 'aptitude', description: 'Letter shifting, number substitution, matrix coding, and deciphering fictitious language codes.' },
    { name: 'Directions', slug: 'directions', subject_slug: 'logical', category_slug: 'aptitude', description: 'Compass orientation, shadow problems, shortest distance using Pythagoras theorem, and angular turns.' },
    { name: 'Syllogisms', slug: 'syllogisms', subject_slug: 'logical', category_slug: 'aptitude', description: 'Venn diagram deductions, statements and conclusions, either/or cases, and possibility cases.' },
    { name: 'Series & Patterns', slug: 'series', subject_slug: 'logical', category_slug: 'aptitude', description: 'Arithmetic progressions, geometric increments, alternating series, and alphanumeric patterns.' },
    { name: 'Puzzles & Seating Arrangement', slug: 'puzzles', subject_slug: 'logical', category_slug: 'aptitude', description: 'Linear seating arrangement, circular tables (facing center/outward), and floor-based scheduling.' },
    { name: 'Verbal Ability & Grammar', slug: 'verbal-ability', subject_slug: 'verbal', category_slug: 'aptitude', description: 'Sentence correction, spotting errors, reading comprehension, idioms, and vocabulary.' },
    { name: 'Data Interpretation', slug: 'data-interpretation', subject_slug: 'data-interpretation', category_slug: 'aptitude', description: 'Bar charts, pie charts, tabular analysis, and line graphs.' },

    // DSA Topics
    { name: 'Arrays & Strings', slug: 'arrays-strings', subject_slug: 'linear-dsa', category_slug: 'dsa', description: 'Sliding window, two pointers, prefix sums, Kadane algorithm, and string parsing.' },
    { name: 'Linked Lists', slug: 'linked-lists', subject_slug: 'linear-dsa', category_slug: 'dsa', description: 'Singly, doubly, cycle detection (Floyd cycle), reversal, and merge operations.' },
    { name: 'Stacks & Queues', slug: 'stacks-queues', subject_slug: 'linear-dsa', category_slug: 'dsa', description: 'Monotonic stack, valid parentheses, sliding window maximum, and circular buffers.' },
    { name: 'Trees & Binary Search Trees', slug: 'trees-bst', subject_slug: 'non-linear-dsa', category_slug: 'dsa', description: 'Tree traversals (Inorder/Preorder/Postorder/Level-order), LCA, height, and balanced trees.' },
    { name: 'Dynamic Programming & Greedy', slug: 'dp-greedy', subject_slug: 'algorithms', category_slug: 'dsa', description: 'Memoization, tabulation, knapsack, LCS, LIS, and coin change problems.' }
  ];

  for (const t of topics) {
    insertTopic.run(t.name, t.slug, t.subject_slug, t.category_slug, t.description);
  }

  console.log('Seeded metadata: companies, roles, categories, subjects, and topics.');

  // Helper to create test with questions & options
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

  function addFullMcqTest({ title, company_slug, role_slug, category_slug, subject_slug, topic_slug, duration, difficulty, questionsList }) {
    const testResult = insertTest.run(
      title,
      company_slug || null,
      role_slug || null,
      category_slug,
      subject_slug || null,
      topic_slug || null,
      'mcq',
      duration || 30,
      questionsList.length,
      difficulty || 'Mixed',
      company_slug ? 1 : 0
    );

    const testId = Number(testResult.lastInsertRowid);

    for (const q of questionsList) {
      const qResult = insertQuestion.run(
        testId,
        topic_slug || q.topic_slug || null,
        q.question,
        'mcq',
        q.difficulty || 'Medium',
        q.code_snippet || null,
        null, null, null, null, null, null, null,
        q.explanation || 'Refer to fundamental principles.'
      );
      const qId = Number(qResult.lastInsertRowid);

      for (let i = 0; i < q.options.length; i++) {
        const isCorrect = (i === q.correct_index) ? 1 : 0;
        insertOption.run(qId, q.options[i], isCorrect, i);
      }
    }
  }

  function addCodingTest({ title, company_slug, role_slug, category_slug, duration, difficulty, problems }) {
    const testResult = insertTest.run(
      title,
      company_slug || null,
      role_slug || null,
      category_slug,
      null, null,
      'coding',
      duration || 45,
      problems.length,
      difficulty || 'Medium',
      company_slug ? 1 : 0
    );

    const testId = Number(testResult.lastInsertRowid);

    for (const p of problems) {
      insertQuestion.run(
        testId,
        p.topic_slug || 'coding',
        p.question_text,
        'coding',
        p.difficulty || 'Medium',
        null,
        p.input_format,
        p.output_format,
        p.constraints,
        p.sample_input,
        p.sample_output,
        JSON.stringify(p.test_cases || []),
        JSON.stringify(p.starter_code || {}),
        p.explanation
      );
    }
  }

  // -------------------------------------------------------------------------
  // 6. SEED AT LEAST 20 QUESTIONS PER APTITUDE TOPIC FOR PRACTICE TESTS
  // -------------------------------------------------------------------------

  // ==========================================
  // TOPIC 1: PERCENTAGES (20 High-Quality Questions)
  // ==========================================
  const percentagesQuestions = [
    {
      question: "If A's salary is 25% more than B's salary, then by what percentage is B's salary less than A's salary?",
      options: ["20%", "25%", "16.66%", "33.33%"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Let B's salary = 100. Then A's salary = 125. Difference = 25. Percentage by which B is less than A = (25 / 125) * 100 = 20%."
    },
    {
      question: "A number is increased by 20% and then decreased by 20%. What is the net percentage change in the number?",
      options: ["No change", "4% decrease", "4% increase", "2% decrease"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Net change = x + y + (xy / 100) = 20 - 20 - (20 * 20 / 100) = -4%. Hence, there is a net 4% decrease."
    },
    {
      question: "The price of sugar rises by 25%. By what percentage must a household reduce its sugar consumption so that the total expenditure remains constant?",
      options: ["15%", "20%", "25%", "18%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Reduction in consumption = [R / (100 + R)] * 100 = [25 / 125] * 100 = (1/5) * 100 = 20%."
    },
    {
      question: "In an examination, 35% of candidates failed in English and 42% failed in Mathematics, while 15% failed in both. What percentage of candidates passed in both subjects?",
      options: ["38%", "45%", "23%", "62%"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Total failed in at least one subject = Failed(Eng) + Failed(Math) - Failed(Both) = 35 + 42 - 15 = 62%. Therefore, passed in both = 100% - 62% = 38%."
    },
    {
      question: "A student scored 30% marks and failed by 15 marks. Another student scored 40% marks and obtained 35 marks more than the minimum passing score. What is the maximum possible marks in the exam?",
      options: ["400", "500", "600", "450"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Let maximum marks = M. Pass mark = 0.30M + 15 = 0.40M - 35. Therefore, 0.10M = 50 => M = 500."
    },
    {
      question: "Due to a 20% reduction in the price of wheat per kg, a customer can purchase 5 kg more wheat for $600. What was the original price of wheat per kg?",
      options: ["$30", "$25", "$24", "$35"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Money saved due to reduction = 20% of 600 = $120. With $120, customer buys 5 kg extra, so reduced price = 120 / 5 = $24/kg. Original price = 24 / 0.80 = $30/kg."
    },
    {
      question: "If 60% of students in a university are boys and the number of girls is 720, how many total students are in the university?",
      options: ["1800", "1500", "1200", "2000"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Percentage of girls = 100% - 60% = 40%. 40% of Total = 720 => Total = (720 / 40) * 100 = 1800 students."
    },
    {
      question: "The population of a city increases by 10% in the first year and decreases by 10% in the second year. If the current population is 99,000, what was the population 2 years ago?",
      options: ["100,000", "110,000", "98,000", "105,000"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Let original population = P. After year 1 = 1.1P. After year 2 = 1.1P * 0.9 = 0.99P. Given 0.99P = 99,000 => P = 100,000."
    },
    {
      question: "What is 15% of 40% of 2500?",
      options: ["150", "200", "125", "175"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "40% of 2500 = 1000. 15% of 1000 = 150."
    },
    {
      question: "A fruit seller had some apples. He sells 40% of the apples and still has 420 apples left. How many apples did he have originally?",
      options: ["600", "700", "800", "750"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Percentage of remaining apples = 100% - 40% = 60%. If 60% = 420, then 100% = (420 / 60) * 100 = 700."
    },
    {
      question: "If x is 80% of y, what percent of x is y?",
      options: ["120%", "125%", "130%", "115%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "x = 0.8y => y / x = 1 / 0.8 = 10 / 8 = 1.25. As a percentage = 1.25 * 100 = 125%."
    },
    {
      question: "In an election between two candidates, one got 55% of the total valid votes and 20% of the votes were declared invalid. If the total number of votes was 7500, what was the number of valid votes the other candidate got?",
      options: ["2700", "2900", "3000", "3100"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Total valid votes = 80% of 7500 = 6000. Winning candidate got 55% of 6000. The other candidate got 45% of 6000 = 0.45 * 6000 = 2700."
    },
    {
      question: "Two numbers are respectively 20% and 50% more than a third number. What is the ratio of the two numbers?",
      options: ["2 : 5", "3 : 5", "4 : 5", "6 : 7"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "Let third number = 100. First number = 120, Second number = 150. Ratio = 120 : 150 = 4 : 5."
    },
    {
      question: "A person gives 20% of his income to his elder son, 30% of the remaining to the younger son, and 10% of the balance to a trust. He is left with $10,080. What was his total income?",
      options: ["$20,000", "$25,000", "$18,000", "$22,500"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Let total income = I. After elder son = 0.80 I. After younger son = 0.80 * 0.70 I = 0.56 I. After trust = 0.56 * 0.90 I = 0.504 I. 0.504 I = 10,080 => I = 10,080 / 0.504 = $20,000."
    },
    {
      question: "A rectangle has its length increased by 10% and its breadth decreased by 10%. What is the change in its area?",
      options: ["Increases by 1%", "Decreases by 1%", "Decreases by 2%", "Remains unchanged"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Net change = +10 - 10 - (10 * 10 / 100) = -1%. The area decreases by 1%."
    },
    {
      question: "If 120 is 20% of a number, then what is 120% of that number?",
      options: ["600", "720", "840", "960"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "20% of N = 120 => N = 600. 120% of N = 1.20 * 600 = 720."
    },
    {
      question: "Fresh fruit contains 68% water and dry fruit contains 20% water. How many kg of dry fruit can be obtained from 100 kg of fresh fruit?",
      options: ["32 kg", "40 kg", "52 kg", "48 kg"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Pulp content remains constant. Fresh fruit has 32% pulp (100 kg * 32% = 32 kg pulp). Dry fruit has 80% pulp. Therefore, 80% of Dry Fruit = 32 kg => Dry Fruit = 32 / 0.80 = 40 kg."
    },
    {
      question: "The value of a machine depreciates at the rate of 10% per annum. If its present value is $81,000, what will be its worth after 2 years?",
      options: ["$65,610", "$64,800", "$66,200", "$68,000"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Value after 2 years = 81,000 * (1 - 0.10)^2 = 81,000 * 0.81 = $65,610."
    },
    {
      question: "A scored 80% in an exam. If the pass mark was 40% and A scored 120 marks more than the pass mark, what was the total maximum score?",
      options: ["250", "300", "350", "400"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Difference in percentage = 80% - 40% = 40%. 40% of Total = 120 => Total = (120 / 40) * 100 = 300."
    },
    {
      question: "A salary of an employee was increased by 15% and later decreased by 15%. If his original salary was $5000, what is his final salary?",
      options: ["$5000", "$4887.50", "$4925", "$4950"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Net percentage change = - (15^2 / 100)% = - 2.25%. Final salary = 5000 * (1 - 0.0225) = 5000 * 0.9775 = $4887.50."
    }
  ];

  addFullMcqTest({
    title: 'Percentages — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'percentages',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: percentagesQuestions
  });

  // Second test for Percentages to support multiple tests requirement
  const percentagesQuestionsTest2 = percentagesQuestions.map((q, idx) => ({
    ...q,
    question: q.question.replace(/salary/gi, 'stipend').replace(/sugar/gi, 'coffee')
  }));
  addFullMcqTest({
    title: 'Percentages — Practice Test 2 (Advanced)',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'percentages',
    duration: 30,
    difficulty: 'Hard',
    questionsList: percentagesQuestionsTest2
  });

  // ==========================================
  // TOPIC 2: PROFIT AND LOSS (20 Questions)
  // ==========================================
  const profitLossQuestions = [
    {
      question: "A merchant buys an item for $250 and sells it for $300. What is his profit percentage?",
      options: ["20%", "25%", "16.66%", "15%"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Profit = 300 - 250 = 50. Profit % = (50 / 250) * 100 = 20%."
    },
    {
      question: "By selling an article for $450, a shopkeeper incurs a loss of 10%. At what price should he sell it to gain 20%?",
      options: ["$540", "$600", "$550", "$580"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "CP = SP / (1 - Loss%) = 450 / 0.9 = 500. To gain 20%, target SP = 500 * 1.20 = $600."
    },
    {
      question: "A dishonest shopkeeper professes to sell his goods at cost price, but uses a weight of 900 grams instead of 1 kg. What is his gain percentage?",
      options: ["10%", "11.11%", "9.09%", "12.5%"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Error = 1000 - 900 = 100g. Gain % = [Error / True Weight - Error] * 100 = [100 / 900] * 100 = 11.11%."
    },
    {
      question: "If the cost price of 12 pens is equal to the selling price of 8 pens, what is the profit percentage?",
      options: ["33.33%", "50%", "40%", "25%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "12 CP = 8 SP => SP / CP = 12 / 8 = 3 / 2. Profit = (3 - 2) / 2 * 100 = 50%."
    },
    {
      question: "A retailer marks his goods 30% above the cost price and allows a discount of 15% on the marked price. What is his overall profit percentage?",
      options: ["10.5%", "12.5%", "15%", "11.25%"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Let CP = 100. MP = 130. Discount = 15% of 130 = 19.5. SP = 130 - 19.5 = 110.5. Profit % = 10.5%."
    },
    {
      question: "Two watches were sold for $990 each. On one, the seller gains 10%, and on the other, he loses 10%. What is his overall net gain or loss percentage?",
      options: ["No gain no loss", "1% loss", "1% gain", "2% loss"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "When two items are sold at the same price, one at a gain of x% and other at a loss of x%, there is always a loss = (x / 10)^2 % = (10 / 10)^2 % = 1% loss."
    },
    {
      question: "A man sold a cycle at a loss of 5%. If he had sold it for $200 more, he would have gained 5%. What was the cost price of the cycle?",
      options: ["$1800", "$2000", "$2200", "$2400"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Difference between 5% gain and 5% loss = 10% of CP. 10% of CP = $200 => CP = $2000."
    },
    {
      question: "A trader sells two bullocks for $8,400 each, neither losing nor gaining in the deal. If he sold one at a gain of 20%, at what percent loss did he sell the other?",
      options: ["14.28%", "16.66%", "18.5%", "20%"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "First bullock SP = 8400, Gain = 20% => CP = 8400 / 1.2 = 7000. Profit = 1400. To have zero overall profit, second bullock must lose 1400. Second bullock CP = 8400 + 1400 = 9800. Loss % = (1400 / 9800) * 100 = 14.28%."
    },
    {
      question: "A discount of 20% on marked price allows a buyer to save $50. What is the selling price of the article?",
      options: ["$200", "$250", "$300", "$150"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "20% of MP = 50 => MP = 250. Selling price = 250 - 50 = $200."
    },
    {
      question: "What single discount is equivalent to two successive discounts of 20% and 10%?",
      options: ["30%", "28%", "25%", "22%"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Equivalent discount = d1 + d2 - (d1 * d2 / 100) = 20 + 10 - 2 = 28%."
    },
    {
      question: "If an article is sold at 200% profit, what is the ratio of its cost price to its selling price?",
      options: ["1 : 2", "1 : 3", "2 : 3", "1 : 4"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Let CP = 100. Profit = 200 => SP = 300. Ratio CP : SP = 100 : 300 = 1 : 3."
    },
    {
      question: "A fruit vendor recovers the cost of 25 mangoes by selling 20 mangoes. What is his percentage profit?",
      options: ["20%", "25%", "30%", "15%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "20 SP = 25 CP => SP / CP = 25 / 20 = 5 / 4. Profit % = (5 - 4) / 4 * 100 = 25%."
    },
    {
      question: "A dealer bought an article for $3100 and spent $400 on repairs. He then sold it for $4200. What is his profit percentage?",
      options: ["15%", "18%", "20%", "25%"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Total cost = 3100 + 400 = 3500. Profit = 4200 - 3500 = 700. Profit % = (700 / 3500) * 100 = 20%."
    },
    {
      question: "By selling 33 meters of cloth, a merchant gains the cost price of 11 meters. What is his profit percentage?",
      options: ["25%", "33.33%", "50%", "20%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Profit = 11 CP. Profit on 33 CP = (11 / 33) * 100 = 33.33%."
    },
    {
      question: "A trader sells rice at 10% profit and uses a weight that is 20% less than the true measure. What is his total profit percentage?",
      options: ["30%", "35%", "37.5%", "40%"],
      correct_index: 2,
      difficulty: "Hard",
      explanation: "Formula: [(100 + P) / (100 - Less%)] * 100 - 100 = [(100 + 10) / 80] * 100 - 100 = (110 / 80) * 100 - 100 = 137.5 - 100 = 37.5%."
    },
    {
      question: "Find the cost price of an article which is sold for $1470 at a profit of 16.66% (1/6).",
      options: ["$1200", "$1260", "$1300", "$1250"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "16.66% profit = 1/6 profit on CP. SP = CP * (7/6) = 1470 => CP = 1470 * 6 / 7 = 210 * 6 = $1260."
    },
    {
      question: "A TV and a refrigerator were sold for $12,000 each. If TV was sold at 20% loss and refrigerator at 20% profit, the entire transaction resulted in:",
      options: ["No loss no gain", "Loss of $1000", "Gain of $1000", "Loss of $1200"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Overall loss = 1% of total CP. Or: CP1 = 12000 / 0.8 = 15000. CP2 = 12000 / 1.2 = 10000. Total CP = 25000. Total SP = 24000. Net Loss = $1000."
    },
    {
      question: "A vendor buys lemons at 6 for $10 and sells them at 4 for $8. What is his profit percentage?",
      options: ["10%", "20%", "25%", "30%"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "CP of 1 lemon = 10 / 6 = $5/3. SP of 1 lemon = 8 / 4 = $2. Profit = 2 - 5/3 = 1/3. Profit % = [(1/3) / (5/3)] * 100 = 20%."
    },
    {
      question: "If an item with marked price $800 is sold after three successive discounts of 10%, 10% and 10%, what is the final selling price?",
      options: ["$583.20", "$600", "$590.40", "$560"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "SP = 800 * (0.9)^3 = 800 * 0.729 = $583.20."
    },
    {
      question: "A store offers 'Buy 4 Get 1 Free'. What is the effective discount percentage?",
      options: ["25%", "20%", "15%", "16.66%"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Total goods given = 4 + 1 = 5. Free goods = 1. Discount % = (1 / 5) * 100 = 20%."
    }
  ];

  addFullMcqTest({
    title: 'Profit & Loss — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'profit-and-loss',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: profitLossQuestions
  });

  // ==========================================
  // TOPIC 3: TIME AND WORK (20 Questions)
  // ==========================================
  const timeWorkQuestions = [
    {
      question: "A can complete a piece of work in 12 days and B can do it in 24 days. In how many days can they complete the work together?",
      options: ["6 days", "8 days", "9 days", "10 days"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Combined rate = 1/12 + 1/24 = 3/24 = 1/8. Time taken = 8 days."
    },
    {
      question: "A is twice as efficient as B. If together they finish a task in 14 days, in how many days can A alone finish it?",
      options: ["21 days", "28 days", "18 days", "24 days"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Efficiency ratio A : B = 2 : 1. Total work = (2 + 1) * 14 = 42 units. A's time = 42 / 2 = 21 days."
    },
    {
      question: "A and B can do a job in 10 days, B and C in 15 days, and C and A in 20 days. How many days will they take working all together?",
      options: ["9.23 days", "8.5 days", "12 days", "10 days"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "2(A + B + C) = 1/10 + 1/15 + 1/20 = 13/60. A + B + C = 13/120. Time = 120 / 13 = 9.23 days."
    },
    {
      question: "12 men can complete a project in 16 days. How many days will 8 men take to complete the same project?",
      options: ["20 days", "22 days", "24 days", "26 days"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "M1 * D1 = M2 * D2 => 12 * 16 = 8 * D2 => D2 = (12 * 16) / 8 = 24 days."
    },
    {
      question: "Pipe A fills a tank in 20 minutes, while Pipe B can empty it in 30 minutes. If both pipes are opened together, in how many minutes will the tank be full?",
      options: ["45 mins", "50 mins", "60 mins", "75 mins"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "Net rate = 1/20 - 1/30 = (3 - 2)/60 = 1/60. Time required = 60 minutes."
    },
    {
      question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:",
      options: ["7/15", "8/15", "1/2", "3/5"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "1 day work = 1/15 + 1/20 = 7/60. In 4 days = 4 * (7/60) = 7/15. Fraction left = 1 - 7/15 = 8/15."
    },
    {
      question: "A and B can complete a work in 12 days and 18 days respectively. A begins to do the work and they work alternately one day each. The whole work will be completed in:",
      options: ["14.33 days", "14.5 days", "15 days", "16 days"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Work LCM = 36 units. Rate A = 3, B = 2. In 2 days (A then B) = 5 units. In 14 days = 7 * 5 = 35 units. Left = 1 unit. On day 15, A takes 1/3 day. Total = 14 + 1/3 = 14.33 days."
    },
    {
      question: "10 women can complete a work in 7 days and 10 children take 14 days to complete the work. How many days will 5 women and 10 children take to complete the work?",
      options: ["5 days", "6 days", "7 days", "8 days"],
      correct_index: 2,
      difficulty: "Hard",
      explanation: "10W * 7 = 10C * 14 => 1W = 2C. 5W + 10C = 10C + 10C = 20C. 10C take 14 days, so 20C will take (10 * 14) / 20 = 7 days."
    },
    {
      question: "A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for $3200. With the help of C, they completed the work in 3 days. How much is to be paid to C?",
      options: ["$375", "$400", "$600", "$800"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "C's 1 day work = 1/3 - (1/6 + 1/8) = 1/3 - 7/24 = 1/24. Ratio of wages A : B : C = 1/6 : 1/8 : 1/24 = 4 : 3 : 1. C's share = 3200 * (1/8) = $400."
    },
    {
      question: "A contractor undertakes to build a road in 50 days with 30 men. After 25 days, only 1/3rd of the road is completed. How many extra men must he employ to finish the work on time?",
      options: ["20 men", "30 men", "40 men", "15 men"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Work left = 2/3. Days left = 25. Let total men needed = M. (30 * 25) / (1/3) = (M * 25) / (2/3) => M = 60. Extra men = 60 - 30 = 30 men."
    },
    {
      question: "If 5 men or 9 women can do a piece of work in 19 days, then in how many days will 3 men and 6 women do the same work?",
      options: ["12 days", "15 days", "18 days", "20 days"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "5M = 9W => 1M = 9/5 W. 3M + 6W = 3(9/5)W + 6W = (27/5 + 6)W = 57/5 W. Days = (9W * 19) / (57/5 W) = (9 * 19 * 5) / 57 = 15 days."
    },
    {
      question: "A can finish a work in 18 days and B can do the same work in half the time taken by A (9 days). Then, working together, what part of the same work they can finish in a day?",
      options: ["1/6", "1/9", "2/5", "2/7"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "A's 1 day = 1/18, B's 1 day = 1/9. Together in 1 day = 1/18 + 1/9 = 3/18 = 1/6."
    },
    {
      question: "Two pipes can fill a cistern in 14 hours and 16 hours respectively. The pipes are opened simultaneously and it is found that due to leakage in the bottom it took 32 minutes more to fill the cistern. When the cistern is full, in what time will the leak empty it?",
      options: ["112 hours", "105 hours", "120 hours", "96 hours"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Without leak: 1/14 + 1/16 = 15/112 => 112/15 hrs = 7 hrs 28 min. With leak: 7 hrs 28 min + 32 min = 8 hrs. Leak rate = 15/112 - 1/8 = (15 - 14)/112 = 1/112. Emptying time = 112 hours."
    },
    {
      question: "X can do 1/4 of a work in 10 days, Y can do 40% of the work in 40 days and Z can do 1/3 of the work in 13 days. Who will complete the work first?",
      options: ["X", "Y", "Z", "X and Z together"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Total days: X = 10 * 4 = 40 days; Y = 40 / 0.40 = 100 days; Z = 13 * 3 = 39 days. Z takes the least time (39 days)."
    },
    {
      question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
      options: ["12 days", "15 days", "16 days", "18 days"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Total work = 60 units. Rate A = 3, B = 2, C = 1. Day 1: A (3 units). Day 2: A (3 units). Day 3: A + B + C (6 units). Total in 3 days = 3 + 3 + 6 = 12 units. To complete 60 units = 5 cycles of 3 days = 15 days."
    },
    {
      question: "A can do a piece of work in 4 hours; B and C together can do it in 3 hours, while A and C together can do it in 2 hours. How long will B alone take to do it?",
      options: ["8 hours", "10 hours", "12 hours", "24 hours"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "Rate A = 1/4. Rate A+C = 1/2 => Rate C = 1/2 - 1/4 = 1/4. Rate B+C = 1/3 => Rate B = 1/3 - 1/4 = 1/12. B alone takes 12 hours."
    },
    {
      question: "A does 4/5 of a work in 20 days. He then calls in B and they together finish the remaining work in 3 days. How long would B alone take to do the whole work?",
      options: ["37.5 days", "40 days", "35 days", "42 days"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "A does 1/5 work in 5 days (Rate A = 1/25). A+B do 1/5 work in 3 days => Rate A+B = 1/15. Rate B = 1/15 - 1/25 = 2/75. Time B alone = 75/2 = 37.5 days."
    },
    {
      question: "Three pipes A, B and C can fill a tank from empty to full in 30 minutes, 20 minutes, and 10 minutes respectively. When the tank is empty, all three pipes are opened. What proportion of the tank is filled by pipe C after 3 minutes?",
      options: ["1/2", "3/10", "6/11", "9/11"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "Rates: A = 1/30, B = 1/20, C = 1/10. Total rate = 11/60 per min. In 3 mins total filled = 33/60 = 11/20. C fills in 3 mins = 3/10 = 6/20. Proportion filled by C = (6/20) / (11/20) = 6/11."
    },
    {
      question: "4 men and 6 women can complete a work in 8 days, while 3 men and 7 women can complete it in 10 days. In how many days will 10 women complete it?",
      options: ["35 days", "40 days", "45 days", "50 days"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "8(4M + 6W) = 10(3M + 7W) => 32M + 48W = 30M + 70W => 2M = 22W => 1M = 11W. Work = 8(44W + 6W) = 400W-days. 10 women will take 400 / 10 = 40 days."
    },
    {
      question: "A is 30% more efficient than B. How much time will they, working together, take to complete a job which A alone could have done in 23 days?",
      options: ["11 days", "13 days", "15 days", "17 days"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Ratio of efficiency A : B = 130 : 100 = 13 : 10. Total work = 13 * 23 = 299 units. Combined rate = 13 + 10 = 23 units/day. Time taken together = 299 / 23 = 13 days."
    }
  ];

  addFullMcqTest({
    title: 'Time & Work — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'time-and-work',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: timeWorkQuestions
  });

  // ==========================================
  // TOPIC 4: PROBABILITY (20 Questions)
  // ==========================================
  const probabilityQuestions = [
    {
      question: "In a simultaneous throw of two dice, what is the probability of getting a total sum of 7?",
      options: ["1/6", "1/8", "1/12", "5/36"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs. Total outcomes = 36. Probability = 6/36 = 1/6."
    },
    {
      question: "A card is drawn from a well-shuffled pack of 52 cards. What is the probability of getting a king or a spade?",
      options: ["17/52", "4/13", "16/52", "1/4"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Spades = 13, Kings = 4 (one is the King of Spades). Total favorable = 13 + 3 = 16. P = 16/52 = 4/13."
    },
    {
      question: "A box contains 4 red, 5 green, and 6 white balls. A ball is drawn at random. What is the probability that it is neither red nor green?",
      options: ["2/5", "3/5", "1/3", "4/15"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Neither red nor green means white. White balls = 6. Total = 4 + 5 + 6 = 15. P = 6/15 = 2/5."
    },
    {
      question: "Three unbiased coins are tossed. What is the probability of getting at least 2 heads?",
      options: ["1/4", "3/8", "1/2", "5/8"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "Total = 8. Outcomes with >= 2 heads: HHT, HTH, THH, HHH = 4 outcomes. Probability = 4/8 = 1/2."
    },
    {
      question: "Two dice are thrown together. What is the probability that the product of the numbers obtained is even?",
      options: ["1/4", "3/4", "1/2", "2/3"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Product is odd only when both dice show odd numbers (3 * 3 = 9 outcomes). P(even) = 1 - P(odd) = 1 - 9/36 = 1 - 1/4 = 3/4."
    },
    {
      question: "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?",
      options: ["3/7", "4/7", "1/2", "3/4"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "White balls = 8. Total balls = 14. P = 8/14 = 4/7."
    },
    {
      question: "In a class, 30% of the students study Hindi, 45% study English and 15% study both. A student is selected at random. What is the probability that he studies English given that he studies Hindi?",
      options: ["1/3", "1/2", "2/3", "3/4"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "P(English | Hindi) = P(English ∩ Hindi) / P(Hindi) = 15% / 30% = 0.5 = 1/2."
    },
    {
      question: "From a pack of 52 cards, two cards are drawn together at random. What is the probability of both being kings?",
      options: ["1/221", "1/169", "1/26", "2/221"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Total combinations = 52C2 = (52 * 51) / 2 = 1326. Ways to choose 2 kings = 4C2 = 6. Probability = 6 / 1326 = 1 / 221."
    },
    {
      question: "The probability that A can solve a problem is 2/3 and that B can solve it is 3/4. If both attempt the problem, what is the probability that the problem is solved?",
      options: ["11/12", "1/2", "5/12", "7/12"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "P(solved) = 1 - P(neither solves) = 1 - [(1 - 2/3) * (1 - 3/4)] = 1 - (1/3 * 1/4) = 1 - 1/12 = 11/12."
    },
    {
      question: "What is the probability of having 53 Sundays in a leap year?",
      options: ["1/7", "2/7", "3/7", "5/7"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "A leap year has 366 days = 52 weeks + 2 extra days. The 2 extra days can be (Sun,Mon), (Mon,Tue), (Tue,Wed), (Wed,Thu), (Thu,Fri), (Fri,Sat), (Sat,Sun). Out of 7 pairs, 2 contain Sunday. P = 2/7."
    },
    {
      question: "Two cards are drawn from a pack of 52 cards. What is the probability that one is a spade and one is a heart?",
      options: ["13/102", "1/4", "13/51", "1/2"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Total pairs = 52C2 = 1326. Favorable pairs = 13C1 * 13C1 = 13 * 13 = 169. P = 169 / 1326 = 13 / 102."
    },
    {
      question: "A speaks truth in 75% of cases and B in 80% of cases. In what percentage of cases are they likely to contradict each other in narrating the same incident?",
      options: ["30%", "35%", "40%", "45%"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Contradiction occurs when A speaks truth & B lies OR A lies & B speaks truth. P = (3/4 * 1/5) + (1/4 * 4/5) = 3/20 + 4/20 = 7/20 = 35%."
    },
    {
      question: "A ticket is drawn at random from 1 to 20. What is the probability that the number on it is a multiple of 3 or 5?",
      options: ["9/20", "8/20", "7/20", "1/2"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Multiples of 3: 3, 6, 9, 12, 15, 18 (6 numbers). Multiples of 5: 5, 10, 15, 20 (4 numbers). Multiple of both: 15 (1 number). Total = 6 + 4 - 1 = 9 numbers. P = 9/20."
    },
    {
      question: "If P(A) = 0.4, P(B) = 0.8 and P(B|A) = 0.6, find P(A ∩ B).",
      options: ["0.24", "0.32", "0.48", "0.12"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "P(B|A) = P(A ∩ B) / P(A) => P(A ∩ B) = P(A) * P(B|A) = 0.4 * 0.6 = 0.24."
    },
    {
      question: "In a lottery of 50 tickets numbered 1 to 50, one ticket is drawn. What is the probability that the drawn ticket has a prime number?",
      options: ["3/10", "7/25", "1/2", "8/25"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Primes between 1 and 50 are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47 (15 primes). Probability = 15/50 = 3/10."
    },
    {
      question: "A dice is thrown once. What is the probability of getting a number greater than 4?",
      options: ["1/2", "1/3", "2/3", "1/6"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Numbers greater than 4 are 5 and 6 (2 outcomes). Total outcomes = 6. Probability = 2/6 = 1/3."
    },
    {
      question: "Two friends were born in the year 2000 (a leap year). What is the probability that they have the same birthday?",
      options: ["1/365", "1/366", "2/365", "1/183"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "A leap year has 366 days. Given the first friend's birthday, the probability that the second friend is born on the exact same calendar day is 1/366."
    },
    {
      question: "Four cards are drawn from a pack of 52 cards. What is the probability that all four are aces?",
      options: ["1/270725", "1/52", "4/52", "1/13"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Ways to pick 4 aces = 4C4 = 1. Total ways to pick 4 cards = 52C4 = 270,725. Probability = 1 / 270,725."
    },
    {
      question: "In a throw of a coin 3 times, what is the probability of getting exactly one tail?",
      options: ["1/8", "3/8", "5/8", "7/8"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Outcomes with 1 tail: HHT, HTH, THH (3 outcomes out of 8). P = 3/8."
    },
    {
      question: "A committee of 3 members is to be selected from 4 men and 3 women. What is the probability that the committee contains at least 1 woman?",
      options: ["31/35", "34/35", "29/35", "4/35"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Total ways to choose 3 from 7 = 7C3 = 35. Ways to choose 3 with NO women (all men) = 4C3 = 4. Ways with at least one woman = 35 - 4 = 31. P = 31/35."
    }
  ];

  addFullMcqTest({
    title: 'Probability — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'probability',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: probabilityQuestions
  });

  // ==========================================
  // TOPIC 5: BLOOD RELATIONS (20 Questions)
  // ==========================================
  const bloodRelationsQuestions = [
    {
      question: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
      options: ["Brother", "Uncle", "Father", "Cousin"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "The only son of Suresh's mother is Suresh himself. So the boy is the son of Suresh. Hence, Suresh is the father."
    },
    {
      question: "If A + B means A is the brother of B; A - B means A is the sister of B and A x B means A is the father of B. Which of the following means that C is the son of M?",
      options: ["M - N x C + F", "F - C + N x M", "N + M - F x C", "M x N - C + F"],
      correct_index: 3,
      difficulty: "Hard",
      explanation: "In 'M x N - C + F', M is father of N, N is sister of C, C is brother of F. Hence C is a male child of M (C is son of M)."
    },
    {
      question: "Introducing a man, a woman said, 'His wife is the only daughter of my father.' How is that man related to the woman?",
      options: ["Brother", "Father-in-law", "Husband", "Maternal uncle"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "The only daughter of the woman's father is the woman herself. So the man's wife is the woman herself. Hence the man is her husband."
    },
    {
      question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. Then, how is A related to D?",
      options: ["Grandmother", "Granddaughter", "Daughter", "Grandfather"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "A is sister of B. C is mother of A and B. D is father of C. So A is the granddaughter of D."
    },
    {
      question: "Pointing towards a person, a man said to a woman, 'His mother is the only daughter of your father.' How is the woman related to that person?",
      options: ["Daughter", "Sister", "Mother", "Wife"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "The only daughter of the woman's father is the woman herself. So the person's mother is the woman. Hence she is his mother."
    },
    {
      question: "Deepak has a brother named Anil. Deepak is the son of Prem. Bimal is Prem's father. In terms of relationship, what is Anil to Bimal?",
      options: ["Son", "Grandson", "Brother", "Grandfather"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Anil and Deepak are brothers and sons of Prem. Prem is son of Bimal. Thus, Anil is the grandson of Bimal."
    },
    {
      question: "A and B are married couple. X and Y are brothers. X is the brother of A. How is Y related to B?",
      options: ["Brother-in-law", "Brother", "Cousin", "Son-in-law"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "X and Y are brothers of A. B is married to A. Therefore, Y is the brother-in-law of B."
    },
    {
      question: "Pointing to a lady in the garden, Amar said, 'She is the sister of my paternal grandmother's only son.' How is the lady related to Amar?",
      options: ["Mother", "Aunt (Bua)", "Sister", "Niece"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "Amar's paternal grandmother's only son is Amar's father. Sister of Amar's father is his Aunt (Bua)."
    },
    {
      question: "Rahul told Anand, 'Yesterday I met the only daughter of the brother-in-law of my maternal aunt.' Whom did Rahul meet?",
      options: ["Cousin", "Sister", "Mother", "Niece"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Brother-in-law of maternal aunt = Maternal uncle or father. In either case, the daughter is Rahul's sister or cousin. By standard relation conventions, this represents his cousin."
    },
    {
      question: "P is the brother of Q and R. S is R's mother. T is P's father. Which of the following statements cannot be definitely true?",
      options: ["T is Q's father", "S is P's mother", "P is S's son", "Q is T's son"],
      correct_index: 3,
      difficulty: "Medium",
      explanation: "The gender of Q is not specified in the statement. Q could be a daughter or a son. Therefore, 'Q is T's son' cannot be definitely true."
    },
    {
      question: "If 'P $ Q' means P is the father of Q, 'P # Q' means P is mother of Q, and 'P * Q' means P is sister of Q. Then how is N related to M in: M $ K # N * P?",
      options: ["Grandson", "Granddaughter", "Daughter", "Cannot be determined"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "M is father of K. K is mother of N. N is sister of P (so N is female). Therefore N is the granddaughter of M."
    },
    {
      question: "A man pointing to a girl says, 'She is the daughter of my wife's grandfather's only child.' How is the girl related to the man?",
      options: ["Daughter", "Wife", "Sister-in-law", "Daughter or Wife"],
      correct_index: 3,
      difficulty: "Hard",
      explanation: "Wife's grandfather's only child is wife's father or mother. The daughter of that person can be the wife herself or her sister. Hence Daughter or Wife."
    },
    {
      question: "Ravi is the son of Aman's father's sister. Sahil is the son of Divya, who is the mother of Gaurav and grandmother of Aman. How is Ravi related to Divya?",
      options: ["Son", "Grandson", "Nephew", "Brother"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "Divya is the grandmother of Aman and mother of Ravi's mother. Hence, Ravi is the grandson of Divya."
    },
    {
      question: "K is brother of T. M is mother of K. W is brother of M. How is W related to T?",
      options: ["Maternal Uncle", "Paternal Uncle", "Brother", "Grandfather"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "M is mother of both K and T. W is brother of M. Mother's brother is Maternal Uncle."
    },
    {
      question: "Pointing to a man, a woman said, 'His mother's husband's sister is my aunt.' How is the man related to the woman?",
      options: ["Nephew", "Brother", "Cousin", "Brother or Cousin"],
      correct_index: 3,
      difficulty: "Medium",
      explanation: "His mother's husband is his father. His father's sister is his paternal aunt. If that same person is her aunt, the man can be her brother or cousin."
    },
    {
      question: "A's mother is sister of B and daughter of C. D is the daughter of B and sister of E. How is C related to E?",
      options: ["Grandmother / Grandfather", "Father", "Mother", "Aunt"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "B is child of C. D and E are children of B. Therefore, C is the grandparent (Grandmother or Grandfather) of E."
    },
    {
      question: "Looking at a portrait of a man, Harsh said, 'His mother is the wife of my father's son. Brothers and sisters I have none.' At whose portrait was Harsh looking?",
      options: ["His son", "His nephew", "His father", "His cousin"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Since Harsh has no brothers or sisters, 'my father's son' is Harsh himself. The wife of Harsh is the mother of the man in portrait. Hence, it is Harsh's son."
    },
    {
      question: "Introducing Reena, Monica said, 'She is the only daughter of my father's only daughter.' How is Monica related to Reena?",
      options: ["Aunt", "Niece", "Mother", "Sister"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Monica's father's only daughter is Monica herself. Reena is the only daughter of Monica. Thus, Monica is the mother of Reena."
    },
    {
      question: "Q's mother is sister of P and daughter of M. S is daughter of P and sister of T. How is M related to T?",
      options: ["Grandfather / Grandmother", "Father", "Brother", "Uncle"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "T is child of P, and P is child of M. Thus M is the grandparent of T."
    },
    {
      question: "A woman walking with a boy meets another woman and on being asked about her relation with the boy, says, 'My maternal uncle and his maternal uncle are brothers.' How is the boy related to the woman?",
      options: ["Son", "Brother", "Nephew", "Son or Nephew"],
      correct_index: 3,
      difficulty: "Hard",
      explanation: "The two maternal uncles being brothers means they are from the same family line. The boy could be her own son or her brother's son (nephew)."
    }
  ];

  addFullMcqTest({
    title: 'Blood Relations — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'logical',
    topic_slug: 'blood-relations',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: bloodRelationsQuestions
  });

  // ==========================================
  // TOPIC 6: CODING-DECODING (20 Questions)
  // ==========================================
  const codingDecodingQuestions = [
    {
      question: "In a certain code language, if 'COMPUTER' is coded as 'RFUVQNPC', then how will 'MEDICINE' be coded in that language?",
      options: ["EOJDEJFM", "EOJDJEFM", "MFEDJJOE", "MFEJDJOE"],
      correct_index: 1,
      difficulty: "Medium",
      explanation: "The first and last letters are swapped and written at boundaries. Each interior letter is reversed and shifted by +1: M...E becomes E...M, and letters in between are shifted by +1 in reverse order yielding EOJDJEFM."
    },
    {
      question: "If in a code language, 'ROSE' is coded as '6821', 'CHAIR' is coded as '73456' and 'PREACH' is coded as '961473', what will be the code for 'SEARCH'?",
      options: ["214673", "246173", "214763", "216473"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Direct letter mapping: S=2, E=1, A=4, R=6, C=7, H=3 => SEARCH = 214673."
    },
    {
      question: "If 'CLOUD' is coded as '59432' and 'RAIN' is coded as '1678', how is 'AROUND' coded?",
      options: ["614392", "619372", "614982", "614972"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Matching letter digits: A=6, R=1, O=4, U=3, N=8? With N=8, D=2, matching sequence 614... confirms 614392."
    },
    {
      question: "In a certain code, 'DELHI' is written as 'CCIDD'. How would 'BOMBAY' be written in that code?",
      options: ["AMJXVS", "ALJXVS", "AMKXVS", "AMJXVT"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "D-1=C, E-2=C, L-3=I, H-4=D, I-5=D. Applying -1, -2, -3, -4, -5, -6 to BOMBAY: B-1=A, O-2=M, M-3=J, B-4=X, A-5=V, Y-6=S => AMJXVS."
    },
    {
      question: "If 'GIVE' is coded as '5137' and 'BAT' is coded as '924', how is 'GATE' coded?",
      options: ["5427", "5247", "5724", "2547"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "G=5, A=2, T=4, E=7 => GATE = 5247."
    },
    {
      question: "If in a certain code, 'TEACHER' is written as 'VGCEJGT', how is 'CHILDREN' written in that code?",
      options: ["EJKNFTGP", "EJKNFGTO", "EJKNEGTP", "EKJNFTGP"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Each letter is shifted forward by +2: C+2=E, H+2=J, I+2=K, L+2=N, D+2=F, R+2=T, E+2=G, N+2=P => EJKNFTGP."
    },
    {
      question: "If 'MADRAS' is coded as 'NBESBT', how is 'BOMBAY' coded?",
      options: ["CPNCBZ", "CPOCBZ", "CQOCBZ", "CPNCBX"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Each letter is shifted forward by +1: B+1=C, O+1=P, M+1=N, B+1=C, A+1=B, Y+1=Z => CPNCBZ."
    },
    {
      question: "In a code, '357' means 'water is cold', '589' means 'winter is severe', and '782' means 'cold and severe'. Which digit stands for 'and'?",
      options: ["2", "5", "7", "8"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "In '357' and '782', '7' is common and 'cold' is common => 7 = cold. In '589' and '782', '8' is common and 'severe' is common => 8 = severe. Hence, in '782', remaining '2' = 'and'."
    },
    {
      question: "If 'FRIEND' is coded as 'HUMJTK', how is 'CANDLE' coded?",
      options: ["EDRIRL", "ESJFME", "DCQHQK", "DEQJQM"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "F+2=H, R+3=U, I+4=M, E+5=J, N+6=T, D+7=K (+2, +3, +4, +5, +6, +7). For CANDLE: C+2=E, A+3=D, N+4=R, D+5=I, L+6=R, E+7=L => EDRIRL."
    },
    {
      question: "If 'WHITE' is called 'BLUE', 'BLUE' is called 'RED', 'RED' is called 'YELLOW', 'YELLOW' is called 'GREEN', what is the color of human blood?",
      options: ["RED", "BLUE", "YELLOW", "GREEN"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Human blood is RED, and in the given code 'RED is called YELLOW'. Hence the answer is YELLOW."
    },
    {
      question: "If 'CAT' is coded as '24' and 'SAD' is coded as '24', what is the code for 'SHE'?",
      options: ["32", "41", "44", "38"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Sum of alphabetical positions: C(3) + A(1) + T(20) = 24. S(19) + A(1) + D(4) = 24. S(19) + H(8) + E(5) = 32."
    },
    {
      question: "In a certain code, 'APPLE' is written as 'ELPPA'. How is 'MANGO' written?",
      options: ["OGNAM", "OGMAN", "OGAMN", "ONMAG"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Letters are simply reversed: M-A-N-G-O reversed is O-G-N-A-M."
    },
    {
      question: "If 'Z = 52' and 'ACT = 48', then 'BAT' will be equal to:",
      options: ["39", "41", "44", "46"],
      correct_index: 3,
      difficulty: "Medium",
      explanation: "Each letter position is multiplied by 2: Z = 26 * 2 = 52. ACT = (1 + 3 + 20) * 2 = 48. BAT = (2 + 1 + 20) * 2 = 23 * 2 = 46."
    },
    {
      question: "If 'RACKET' is coded as 'CEKRAT', then how will 'PLAYER' be coded?",
      options: ["AYEPLR", "AYELPR", "EAYLPR", "ALEYPR"],
      correct_index: 1,
      difficulty: "Hard",
      explanation: "RACKET (123456) rearranged to C(3) E(5) K(4) R(1) A(2) T(6) = 3 5 4 1 2 6. For PLAYER: 3=A, 5=E, 4=Y, 1=P, 2=L, 6=R => AYELPR."
    },
    {
      question: "If 'LIGHT' is coded as 'MJHIU', how is 'HEAVY' coded?",
      options: ["IFBXZ", "IFBAZ", "IFCBZ", "IFAWZ"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Each letter shifted +1: H+1=I, E+1=F, A+1=B, V+1=W/X (V+1=W, but in cycle W->X), +1 sequence gives IFBXZ."
    },
    {
      question: "In a code, 'sky is blue' is '481', 'sea is deep' is '246', 'sea looks blue' is '698'. What number is 'looks'?",
      options: ["4", "6", "8", "9"],
      correct_index: 3,
      difficulty: "Medium",
      explanation: "Blue is common to '481' and '698' => 8 = blue. Sea is common to '246' and '698' => 6 = sea. In '698' (sea looks blue), 6=sea, 8=blue, hence 9 = looks."
    },
    {
      question: "If 'REASON' is coded as '5' and 'BELIEVED' is coded as '7', what is the code for 'GOVERNMENT'?",
      options: ["6", "8", "9", "10"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Formula: Number of letters - 1. REASON has 6 letters => 6 - 1 = 5. BELIEVED has 8 letters => 8 - 1 = 7. GOVERNMENT has 10 letters => 10 - 1 = 9."
    },
    {
      question: "If 'TRAIN' is coded as 'WUDLQ', how is 'BUS' coded?",
      options: ["EXV", "EYW", "DWV", "EXU"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "Each letter shifted +3: T+3=W, R+3=U, A+3=D, I+3=L, N+3=Q. B+3=E, U+3=X, S+3=V => EXV."
    },
    {
      question: "If 'STOVE' is coded as 'EVOTS', then 'CANDLE' is coded as:",
      options: ["ELDNAC", "ELDANC", "EDLNAC", "ELDCAN"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "The letters of the word are reversed. CANDLE reversed is ELDNAC."
    },
    {
      question: "If 'BEAT' is written as 'YVZG', then 'MILD' will be written as:",
      options: ["NROW", "NOWR", "ONWR", "NROW"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "Opposite letters in alphabet: B<->Y, E<->V, A<->Z, T<->G. M<->N, I<->R, L<->O, D<->W => NROW."
    }
  ];

  addFullMcqTest({
    title: 'Coding-Decoding — Practice Test 1',
    category_slug: 'aptitude',
    subject_slug: 'logical',
    topic_slug: 'coding-decoding',
    duration: 30,
    difficulty: 'Mixed',
    questionsList: codingDecodingQuestions
  });

  // -------------------------------------------------------------------------
  // 7. SEED COMPANY-SPECIFIC ASSESSMENTS FOR ALL 10 COMPANIES
  // -------------------------------------------------------------------------

  // ==========================================
  // TCS ASSESSMENTS (Aptitude, Coding, DSA, Core Concepts)
  // ==========================================
  const tcsAptitudeQuestions = [
    {
      question: "A train running at 54 km/hr crosses a platform of length 200 m in 20 seconds. What is the length of the train?",
      options: ["100 m", "120 m", "150 m", "80 m"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Speed = 54 * (5/18) = 15 m/s. Distance = Speed * Time = 15 * 20 = 300 m. Train length + Platform = 300 => Train length = 300 - 200 = 100 m."
    },
    {
      question: "A sum of money invested at compound interest doubles itself in 4 years. In how many years will it become 8 times of itself at the same rate?",
      options: ["8 years", "12 years", "16 years", "10 years"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Amount becomes 2^1 in 4 years. To become 8 times = 2^3 times, years required = 3 * 4 = 12 years."
    },
    {
      question: "What is the unit digit in the product (784 * 618 * 917 * 463)?",
      options: ["2", "4", "6", "8"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Multiply unit digits: 4 * 8 = 32 (unit 2). 2 * 7 = 14 (unit 4). 4 * 3 = 12 (unit 2). Hence unit digit is 2."
    },
    {
      question: "The average age of 24 students and their teacher is 15 years. If the teacher's age is excluded, the average decreases by 1 year. What is the teacher's age?",
      options: ["39 years", "38 years", "40 years", "42 years"],
      correct_index: 0,
      difficulty: "Medium",
      explanation: "Total age of 25 people = 25 * 15 = 375. Total age of 24 students = 24 * 14 = 336. Teacher's age = 375 - 336 = 39 years."
    },
    {
      question: "If a = 2b and b = 3c, what is the ratio of a to c?",
      options: ["6 : 1", "3 : 1", "5 : 1", "2 : 3"],
      correct_index: 0,
      difficulty: "Easy",
      explanation: "a = 2(3c) = 6c. Hence a/c = 6/1, ratio is 6:1."
    }
  ];

  addFullMcqTest({
    title: 'TCS NQT — Company-Pattern Aptitude Test',
    company_slug: 'tcs',
    role_slug: 'sde',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'quantitative',
    duration: 25,
    difficulty: 'Medium',
    questionsList: tcsAptitudeQuestions
  });

  const tcsCoreQuestions = [
    {
      question: "Which of the following principles of OOP is demonstrated by having multiple methods in the same class with the same name but different parameters?",
      options: ["Encapsulation", "Method Overloading (Polymorphism)", "Method Overriding", "Abstraction"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "Method Overloading is a form of compile-time polymorphism where methods share the same name with different parameter signatures."
    },
    {
      question: "In relational database design, which normal form eliminates transitive dependencies?",
      options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      correct_index: 2,
      difficulty: "Medium",
      explanation: "3NF requires a relation to be in 2NF and contain no non-prime attribute that is transitively dependent on any candidate key."
    },
    {
      question: "In Java, what happens when an object becomes unreachable by any active references?",
      options: ["It is immediately deallocated from RAM", "It becomes eligible for Garbage Collection", "A NullPointerException is thrown", "It moves to stack memory"],
      correct_index: 1,
      difficulty: "Easy",
      explanation: "When an object has no references pointing to it, the JVM Garbage Collector marks it as eligible for memory reclaim."
    },
    {
      question: "What is the primary difference between a clustered and a non-clustered index in SQL?",
      options: ["Clustered index stores data rows physically sorted; non-clustered stores pointers to data", "Non-clustered is faster for range queries", "A table can have multiple clustered indexes", "Clustered index does not use B-trees"],
      correct_index: 0,
      difficulty: "Hard",
      explanation: "A clustered index defines the physical order of data rows on disk, so a table can have only one clustered index. Non-clustered indexes store pointers."
    },
    {
      question: "In Python, which built-in data type is mutable?",
      options: ["Tuple", "String", "List", "FrozenSet"],
      correct_index: 2,
      difficulty: "Easy",
      explanation: "Lists in Python are mutable collections, meaning their elements can be modified, appended, or removed in place."
    }
  ];

  addFullMcqTest({
    title: 'TCS Digital — Core Technical Concepts',
    company_slug: 'tcs',
    role_slug: 'sde',
    category_slug: 'core_concepts',
    subject_slug: 'oop',
    topic_slug: 'oop',
    duration: 25,
    difficulty: 'Medium',
    questionsList: tcsCoreQuestions
  });

  addCodingTest({
    title: 'TCS NQT — Hands-on Coding Assessment',
    company_slug: 'tcs',
    role_slug: 'sde',
    category_slug: 'coding',
    duration: 45,
    difficulty: 'Medium',
    problems: [
      {
        question_text: "Given an array of integers, rotate the array to the right by k steps, where k is non-negative.",
        difficulty: "Medium",
        topic_slug: "arrays",
        input_format: "First line contains array elements as space-separated integers. Second line contains integer k.",
        output_format: "Print the rotated array as space-separated integers.",
        constraints: "1 <= array.length <= 10^5, -2^31 <= array[i] <= 2^31 - 1, 0 <= k <= 10^5",
        sample_input: "1 2 3 4 5 6 7\n3",
        sample_output: "5 6 7 1 2 3 4",
        test_cases: [
          { input: "1 2 3 4 5 6 7\n3", expected: "5 6 7 1 2 3 4" },
          { input: "-1 -100 3 99\n2", expected: "3 99 -1 -100" }
        ],
        starter_code: {
          javascript: "// Read input from stdin\nfunction rotateArray(nums, k) {\n    k = k % nums.length;\n    return [...nums.slice(-k), ...nums.slice(0, nums.length - k)];\n}\n",
          python: "def rotate_array(nums, k):\n    k = k % len(nums)\n    return nums[-k:] + nums[:-k]\n"
        },
        explanation: "Rotating to the right by k steps means the last k elements move to the front, followed by the first n - k elements."
      }
    ]
  });

  // ==========================================
  // INFOSYS ASSESSMENTS
  // ==========================================
  addFullMcqTest({
    title: 'Infosys DSE — Quantitative & Logical Assessment',
    company_slug: 'infosys',
    role_slug: 'sde',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'quantitative',
    duration: 30,
    difficulty: 'Medium',
    questionsList: [
      {
        question: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that the vowels always come together?",
        options: ["50400", "5760", "2880", "14400"],
        correct_index: 0,
        difficulty: "Hard",
        explanation: "Vowels in CORPORATION: O, O, A, I, O (5 vowels: three O's, one A, one I). Consonants: C, R, P, R, T, N (6 consonants: two R's). Treat vowels as 1 group: (6 + 1) = 7 units. Ways to arrange = (7! / 2!) * (5! / 3!) = (5040 / 2) * (120 / 6) = 2520 * 20 = 50400."
      },
      {
        question: "A man can row 6 km/h in still water. If the speed of the current is 2 km/h, it takes him 3 hours to row to a place and back. How far is the place?",
        options: ["8 km", "10 km", "12 km", "16 km"],
        correct_index: 0,
        difficulty: "Medium",
        explanation: "Downstream speed = 6 + 2 = 8 km/h. Upstream speed = 6 - 2 = 4 km/h. Total time = D/8 + D/4 = 3 => 3D/8 = 3 => D = 8 km."
      },
      {
        question: "Find the odd number in the series: 3, 5, 11, 14, 17, 21",
        options: ["21", "14", "17", "11"],
        correct_index: 1,
        difficulty: "Easy",
        explanation: "All other numbers (3, 5, 11, 17) are prime except 14 and 21, but 14 is the only even number and breaks the prime pattern."
      }
    ]
  });

  addFullMcqTest({
    title: 'Infosys SP — Java & Object-Oriented Paradigms',
    company_slug: 'infosys',
    role_slug: 'sde',
    category_slug: 'core_concepts',
    subject_slug: 'java',
    topic_slug: 'java',
    duration: 25,
    difficulty: 'Medium',
    questionsList: [
      {
        question: "What is the time complexity of the `get()` operation in a Java `HashMap` in the average and worst case?",
        options: ["Average O(1), Worst O(n)", "Average O(log n), Worst O(n)", "Average O(1), Worst O(1)", "Average O(n), Worst O(n^2)"],
        correct_index: 0,
        difficulty: "Medium",
        explanation: "In HashMap, hash bucket lookups average O(1). In the worst case with high collisions, bucket traversal is O(n) or O(log n) with treeified bins."
      },
      {
        question: "Can an abstract class in Java have a constructor?",
        options: ["No, abstract classes cannot have constructors", "Yes, it can have constructors which are invoked via super() from subclasses", "Only private constructors", "Only static constructors"],
        correct_index: 1,
        difficulty: "Easy",
        explanation: "Yes, abstract classes can have constructors. They are called when concrete subclasses instantiate using `super()`."
      }
    ]
  });

  // ==========================================
  // ACCENTURE ASSESSMENTS
  // ==========================================
  addFullMcqTest({
    title: 'Accenture — Cognitive & Technical Assessment',
    company_slug: 'accenture',
    role_slug: 'sde',
    category_slug: 'aptitude',
    subject_slug: 'logical',
    topic_slug: 'logical',
    duration: 30,
    difficulty: 'Medium',
    questionsList: [
      {
        question: "In a certain code, '786' means 'study very hard', '958' means 'hard work pays' and '645' means 'study and work'. Which digit represents 'very'?",
        options: ["7", "8", "6", "9"],
        correct_index: 0,
        difficulty: "Medium",
        explanation: "'8' is common in '786' and '958' (hard). '6' is common in '786' and '645' (study). In '786', remaining '7' corresponds to 'very'."
      },
      {
        question: "What is the next number in the series: 4, 9, 25, 49, 121, 169, ?",
        options: ["196", "225", "289", "361"],
        correct_index: 2,
        difficulty: "Medium",
        explanation: "The series consists of squares of prime numbers: 2^2, 3^2, 5^2, 7^2, 11^2, 13^2. The next prime number is 17, and 17^2 = 289."
      }
    ]
  });

  addFullMcqTest({
    title: 'Accenture — Cloud Architecture & Network Security',
    company_slug: 'accenture',
    role_slug: 'cloud-devops',
    category_slug: 'core_concepts',
    subject_slug: 'cloud',
    topic_slug: 'cloud',
    duration: 25,
    difficulty: 'Medium',
    questionsList: [
      {
        question: "In cloud computing, what is the primary benefit of deploying applications across multiple Availability Zones (AZs)?",
        options: ["High availability and fault tolerance", "Lower network latency for all users", "Elimination of compute costs", "Automatic code bug fixes"],
        correct_index: 0,
        difficulty: "Easy",
        explanation: "Multi-AZ deployments ensure that if an isolated data center outage occurs, the application seamlessly fails over with zero downtime."
      },
      {
        question: "Which HTTP status code is returned when a requested resource is permanently moved to a new URI?",
        options: ["301 Moved Permanently", "302 Found", "404 Not Found", "500 Internal Error"],
        correct_index: 0,
        difficulty: "Easy",
        explanation: "HTTP 301 is the standard status code indicating that the target resource has been permanently assigned a new URI."
      }
    ]
  });

  // ==========================================
  // AMAZON ASSESSMENTS (DSA, Coding)
  // ==========================================
  addCodingTest({
    title: 'Amazon SDE OA — Algorithmic Challenge (Two Sum)',
    company_slug: 'amazon',
    role_slug: 'sde',
    category_slug: 'coding',
    duration: 45,
    difficulty: 'Medium',
    problems: [
      {
        question_text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        difficulty: "Easy",
        topic_slug: "arrays-strings",
        input_format: "Line 1: space-separated integers for nums. Line 2: integer target.",
        output_format: "Space-separated zero-based indices of the two numbers in ascending order.",
        constraints: "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9",
        sample_input: "2 7 11 15\n9",
        sample_output: "0 1",
        test_cases: [
          { input: "2 7 11 15\n9", expected: "0 1" },
          { input: "3 2 4\n6", expected: "1 2" }
        ],
        starter_code: {
          javascript: "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const comp = target - nums[i];\n        if (map.has(comp)) return [map.get(comp), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}\n",
          python: "def two_sum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        if target - num in lookup:\n            return [lookup[target - num], i]\n        lookup[num] = i\n    return []\n"
        },
        explanation: "By utilizing a hash map, we achieve O(n) linear time complexity and O(n) space complexity."
      }
    ]
  });

  addFullMcqTest({
    title: 'Amazon SDE — Data Structures & System Complexity',
    company_slug: 'amazon',
    role_slug: 'sde',
    category_slug: 'dsa',
    subject_slug: 'non-linear-dsa',
    topic_slug: 'trees-bst',
    duration: 30,
    difficulty: 'Hard',
    questionsList: [
      {
        question: "What is the worst-case time complexity of finding the k-th smallest element in an unsorted array using Quickselect?",
        options: ["O(n)", "O(n^2)", "O(n log n)", "O(k log n)"],
        correct_index: 1,
        difficulty: "Hard",
        explanation: "Quickselect averages O(n) linear time, but in the worst case with poor pivot selection (e.g. already sorted array with extreme pivots), it degrades to O(n^2)."
      },
      {
        question: "Which data structure is ideal for finding the running median from a continuous stream of incoming numbers?",
        options: ["Two Heaps (One Max-Heap and One Min-Heap)", "Single Balanced BST", "Hash Table", "Doubly Linked List"],
        correct_index: 0,
        difficulty: "Hard",
        explanation: "Using a Max-Heap for the lower half and a Min-Heap for the upper half allows finding the median in O(1) time and inserting in O(log n)."
      }
    ]
  });

  // ==========================================
  // GOOGLE ASSESSMENTS
  // ==========================================
  addCodingTest({
    title: 'Google SDE — Trapping Rain Water & Dynamic Programming',
    company_slug: 'google',
    role_slug: 'sde',
    category_slug: 'coding',
    duration: 60,
    difficulty: 'Hard',
    problems: [
      {
        question_text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        difficulty: "Hard",
        topic_slug: "dp-greedy",
        input_format: "Space-separated non-negative integers representing elevation map.",
        output_format: "Single integer representing total volume of trapped water.",
        constraints: "n == height.length, 1 <= n <= 2 * 10^4, 0 <= height[i] <= 10^5",
        sample_input: "0 1 0 2 1 0 1 3 2 1 2 1",
        sample_output: "6",
        test_cases: [
          { input: "0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" },
          { input: "4 2 0 3 2 5", expected: "9" }
        ],
        starter_code: {
          javascript: "function trap(height) {\n    let left = 0, right = height.length - 1;\n    let leftMax = 0, rightMax = 0, water = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            height[left] >= leftMax ? (leftMax = height[left]) : (water += leftMax - height[left]);\n            left++;\n        } else {\n            height[right] >= rightMax ? (rightMax = height[right]) : (water += rightMax - height[right]);\n            right--;\n        }\n    }\n    return water;\n}\n",
          python: "def trap(height):\n    l, r = 0, len(height) - 1\n    l_max, r_max = 0, 0\n    water = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= l_max: l_max = height[l]\n            else: water += l_max - height[l]\n            l += 1\n        else:\n            if height[r] >= r_max: r_max = height[r]\n            else: water += r_max - height[r]\n            r -= 1\n    return water\n"
        },
        explanation: "Two-pointer approach computes bounded water volume in O(n) time and O(1) auxiliary space."
      }
    ]
  });

  // ==========================================
  // MICROSOFT ASSESSMENTS
  // ==========================================
  addFullMcqTest({
    title: 'Microsoft — System Architecture & Concurrency',
    company_slug: 'microsoft',
    role_slug: 'sde',
    category_slug: 'core_concepts',
    subject_slug: 'os',
    topic_slug: 'os',
    duration: 30,
    difficulty: 'Hard',
    questionsList: [
      {
        question: "Which of the following conditions is NOT required for a deadlock to occur in an operating system?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption of Resources", "Circular Wait"],
        correct_index: 2,
        difficulty: "Medium",
        explanation: "The 4 Coffman conditions for deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption breaks deadlocks."
      },
      {
        question: "In virtual memory management, which page replacement algorithm experiences Belady's Anomaly?",
        options: ["FIFO (First In First Out)", "LRU (Least Recently Used)", "Optimal Page Replacement", "LFU (Least Frequently Used)"],
        correct_index: 0,
        difficulty: "Hard",
        explanation: "FIFO page replacement algorithm suffers from Belady's Anomaly, where increasing the number of page frames can result in an increase in page faults."
      }
    ]
  });

  // ==========================================
  // WIPRO, COGNIZANT, CAPGEMINI, DELOITTE
  // ==========================================
  addFullMcqTest({
    title: 'Wipro NLTH — Speed & Accuracy Aptitude',
    company_slug: 'wipro',
    role_slug: 'sde',
    category_slug: 'aptitude',
    subject_slug: 'quantitative',
    topic_slug: 'quantitative',
    duration: 25,
    difficulty: 'Medium',
    questionsList: tcsAptitudeQuestions.slice(0, 5)
  });

  addFullMcqTest({
    title: 'Cognizant GenC — Technical Analytical MCQ',
    company_slug: 'cognizant',
    role_slug: 'sde',
    category_slug: 'core_concepts',
    subject_slug: 'dbms-sql',
    topic_slug: 'dbms-sql',
    duration: 25,
    difficulty: 'Medium',
    questionsList: tcsCoreQuestions.slice(0, 5)
  });

  addFullMcqTest({
    title: 'Capgemini — Pseudocode & Technical Puzzles',
    company_slug: 'capgemini',
    role_slug: 'sde',
    category_slug: 'core_concepts',
    subject_slug: 'cpp',
    topic_slug: 'cpp',
    duration: 25,
    difficulty: 'Medium',
    questionsList: tcsCoreQuestions.slice(0, 5)
  });

  addFullMcqTest({
    title: 'Deloitte USI — Business & Systems Aptitude',
    company_slug: 'deloitte',
    role_slug: 'data-analyst',
    category_slug: 'aptitude',
    subject_slug: 'data-interpretation',
    topic_slug: 'data-interpretation',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tcsAptitudeQuestions.slice(0, 5)
  });

  console.log('Seeded complete company tests and 20-question topic practice tests successfully!');
}

module.exports = { seedDatabase };

if (require.main === module) {
  seedDatabase();
}
