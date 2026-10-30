const { db } = require('./assessmentDb');

function seedCoreEngineering() {
  console.log('Seeding Core Engineering Companies (Electronics, Electrical, Civil, Mechanical)...');

  // 1. Ensure 'domain' column exists on companies table
  try {
    db.exec("ALTER TABLE companies ADD COLUMN domain TEXT DEFAULT 'computer';");
    console.log("Added 'domain' column to companies table.");
  } catch (e) {
    // Column already exists
  }

  // Update existing IT companies to have domain = 'computer'
  db.exec("UPDATE companies SET domain = 'computer' WHERE domain IS NULL OR domain = '';");

  // 2. Insert Core Engineering Job Roles
  const insertRole = db.prepare('INSERT OR IGNORE INTO job_roles (title, slug) VALUES (?, ?)');
  const newRoles = [
    { title: 'Electronics & Embedded Engineer', slug: 'electronics-engineer' },
    { title: 'Electrical & Power Engineer', slug: 'electrical-engineer' },
    { title: 'Civil & Structural Engineer', slug: 'civil-engineer' },
    { title: 'Mechanical & Automotive Engineer', slug: 'mechanical-engineer' }
  ];
  for (const r of newRoles) {
    insertRole.run(r.title, r.slug);
  }

  // 3. Insert Core Engineering Companies
  const insertCompany = db.prepare(`
    INSERT INTO companies (name, slug, description, tier, pattern_notes, domain)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const coreCompanies = [
    // Electronics Companies
    {
      name: 'Texas Instruments',
      slug: 'texas-instruments',
      tier: 'Core Electronics / Semiconductor',
      description: 'Texas Instruments technical recruitment assessment focusing on Analog Circuits, Op-Amps, Digital Logic, Microcontrollers, Embedded C, and technical aptitude.',
      pattern_notes: 'TI Pattern: Core Electronics & Embedded Systems (20 Qs), Quantitative & Analytical Aptitude (20 Qs).',
      domain: 'electronics'
    },
    {
      name: 'Qualcomm',
      slug: 'qualcomm',
      tier: 'Core Electronics / Wireless & VLSI',
      description: 'Qualcomm campus & off-campus evaluation covering Digital Systems, Verilog/VLSI, Computer Architecture, Embedded Systems, and analytical problem-solving.',
      pattern_notes: 'Qualcomm Pattern: Digital Logic & VLSI Architecture (20 Qs), Analytical & Engineering Aptitude (20 Qs).',
      domain: 'electronics'
    },
    {
      name: 'Intel',
      slug: 'intel',
      tier: 'Core Semiconductor & Microprocessors',
      description: 'Intel Graduate Hardware & Systems Engineer assessment evaluating Microprocessor Architecture, Digital Design, CMOS VLSI, Circuit Theory, and quantitative reasoning.',
      pattern_notes: 'Intel Pattern: Microprocessor Architecture & Digital Design (20 Qs), Analytical Reasoning & Technical Aptitude (20 Qs).',
      domain: 'electronics'
    },

    // Electrical Companies
    {
      name: 'Siemens',
      slug: 'siemens',
      tier: 'Core Electrical & Industrial Automation',
      description: 'Siemens Graduate Trainee Engineer assessment testing Power Systems, Electrical Machines, Control Systems, Power Electronics, and engineering aptitude.',
      pattern_notes: 'Siemens Pattern: Core Electrical Machines & Power Systems (20 Qs), Quantitative & Analytical Aptitude (20 Qs).',
      domain: 'electrical'
    },
    {
      name: 'Schneider Electric',
      slug: 'schneider-electric',
      tier: 'Core Energy & Power Distribution',
      description: 'Schneider Electric technical recruitment evaluating Switchgear & Protection, Transformers, Power Distribution, Industrial Automation, and logical ability.',
      pattern_notes: 'Schneider Pattern: Switchgear, Protection & Power Distribution (20 Qs), Analytical & Engineering Aptitude (20 Qs).',
      domain: 'electrical'
    },
    {
      name: 'ABB',
      slug: 'abb',
      tier: 'Core Power Grids & Robotics',
      description: 'ABB engineering assessment covering AC/DC Drives, Grid Stability, Transformers, Motor Control, Industrial Robotics, and analytical reasoning.',
      pattern_notes: 'ABB Pattern: Drives, Power Grids & Industrial Control (20 Qs), Quantitative & Reasoning Aptitude (20 Qs).',
      domain: 'electrical'
    },

    // Civil Companies
    {
      name: 'L&T Construction',
      slug: 'lnt-construction',
      tier: 'Core Infrastructure & EPC',
      description: 'L&T Construction Graduate Engineer Trainee (GET) assessment focusing on Structural Engineering, Concrete Technology, Surveying, Geotechnical, and aptitude.',
      pattern_notes: 'L&T Civil Pattern: Structural Engineering & Concrete Technology (20 Qs), Quantitative & Engineering Aptitude (20 Qs).',
      domain: 'civil'
    },
    {
      name: 'Tata Projects',
      slug: 'tata-projects',
      tier: 'Core Civil & Industrial EPC',
      description: 'Tata Projects recruitment evaluating Construction Technology, Strength of Materials, Fluid Mechanics, Environmental Engineering, and logical aptitude.',
      pattern_notes: 'Tata Projects Pattern: Geotechnical, Fluid Mechanics & Construction Engineering (20 Qs), Analytical & Civil Aptitude (20 Qs).',
      domain: 'civil'
    },

    // Mechanical Companies
    {
      name: 'Tata Motors',
      slug: 'tata-motors',
      tier: 'Core Automotive OEM',
      description: 'Tata Motors GET assessment testing IC Engines, Automotive Systems, Thermodynamics, Strength of Materials, Theory of Machines, and aptitude.',
      pattern_notes: 'Tata Motors Pattern: Automotive Systems, IC Engines & Machine Design (20 Qs), Quantitative & Mechanical Aptitude (20 Qs).',
      domain: 'mechanical'
    },
    {
      name: 'L&T Heavy Engineering',
      slug: 'lnt-heavy',
      tier: 'Core Heavy Engineering & Manufacturing',
      description: 'L&T Heavy Engineering assessment evaluating Manufacturing Processes, Fluid Mechanics, Heat Transfer, Machine Design, and engineering mathematics.',
      pattern_notes: 'L&T Mech Pattern: Thermodynamics, Manufacturing & Strength of Materials (20 Qs), Quantitative & Analytical Aptitude (20 Qs).',
      domain: 'mechanical'
    }
  ];

  for (const comp of coreCompanies) {
    const existing = db.prepare('SELECT id FROM companies WHERE slug = ?').get(comp.slug);
    if (!existing) {
      insertCompany.run(comp.name, comp.slug, comp.description, comp.tier, comp.pattern_notes, comp.domain);
      console.log(`Inserted company: ${comp.name} (${comp.domain})`);
    } else {
      db.prepare('UPDATE companies SET domain = ?, tier = ?, description = ?, pattern_notes = ? WHERE slug = ?')
        .run(comp.domain, comp.tier, comp.description, comp.pattern_notes, comp.slug);
    }
  }

  // Prepared statements for Tests, Questions, Options
  const insertTest = db.prepare(`
    INSERT INTO tests (
      title, company_slug, role_slug, category_slug, subject_slug, topic_slug, test_type, duration_minutes, total_questions, difficulty, is_pattern_based
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertQuestion = db.prepare(`
    INSERT INTO questions (
      test_id, topic_slug, question_text, question_type, difficulty, explanation
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertOption = db.prepare(`
    INSERT INTO question_options (question_id, option_text, is_correct, option_index) 
    VALUES (?, ?, ?, ?)
  `);

  function addFullMcqTest({ title, company_slug, role_slug, category_slug, duration, difficulty, questionsList }) {
    // Check if test already exists
    const existingTest = db.prepare('SELECT id FROM tests WHERE title = ?').get(title);
    if (existingTest) {
      console.log(`Test "${title}" already exists (ID: ${existingTest.id}). Skipping.`);
      return;
    }

    const testResult = insertTest.run(
      title,
      company_slug,
      role_slug || null,
      category_slug,
      null, null,
      'mcq',
      duration || 30,
      questionsList.length,
      difficulty || 'Medium',
      1
    );

    const testId = Number(testResult.lastInsertRowid);

    for (const q of questionsList) {
      const qResult = insertQuestion.run(
        testId,
        category_slug,
        q.question,
        'mcq',
        q.difficulty || 'Medium',
        q.explanation || 'Refer to domain fundamentals.'
      );
      const qId = Number(qResult.lastInsertRowid);

      for (let i = 0; i < q.options.length; i++) {
        const isCorrect = (i === q.correct_index) ? 1 : 0;
        insertOption.run(qId, q.options[i], isCorrect, i);
      }
    }
    console.log(`Created Test: "${title}" with ${questionsList.length} questions.`);
  }

  // Load question banks and seed
  const { coreTestsList } = require('./coreEngineeringQuestions');
  for (const t of coreTestsList) {
    addFullMcqTest(t);
  }

  console.log('Seeded all Core Engineering company tests successfully!');
}

module.exports = { seedCoreEngineering };

if (require.main === module) {
  seedCoreEngineering();
}
