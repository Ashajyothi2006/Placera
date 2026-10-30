const { db } = require('./assessmentDb');
const { 
  easyCodingProblems, 
  mediumCodingProblems, 
  hardCodingProblems 
} = require('./realCodingProblemBank');

// Template generator for starter code
function generateStarterTemplate(problem, lang) {
  switch (lang) {
    case 'python':
      return `# ${problem.title} (${problem.difficulty})
# Topic: ${problem.topic}
import sys

def solution():
    # Read input from standard input (sys.stdin)
    # Write your solution logic here
    pass

if __name__ == '__main__':
    solution()
`;
    case 'java':
      return `// ${problem.title} (${problem.difficulty})
// Topic: ${problem.topic}
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Write your solution logic here
        
    }
}
`;
    case 'c':
      return `/* ${problem.title} (${problem.difficulty}) */
/* Topic: ${problem.topic} */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    /* Write your solution logic here */
    
    return 0;
}
`;
    case 'cpp':
      return `// ${problem.title} (${problem.difficulty})
// Topic: ${problem.topic}
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Write your solution logic here
    
    return 0;
}
`;
    default:
      return '';
  }
}

function seedRealCodingAssessments() {
  console.log('--- Starting Real Coding Assessments Seeder ---');

  // 1. Remove all old MCQ coding tests and their questions/options
  console.log('Cleaning up existing MCQ coding tests...');
  const oldCodingTests = db.prepare("SELECT id FROM tests WHERE category_slug = 'coding'").all();
  for (const t of oldCodingTests) {
    db.prepare('DELETE FROM questions WHERE test_id = ?').run(t.id);
    db.prepare('DELETE FROM tests WHERE id = ?').run(t.id);
  }
  console.log(`Removed ${oldCodingTests.length} old coding tests.`);

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

  const companies = [
    { slug: 'tcs', name: 'TCS', offset: 0 },
    { slug: 'infosys', name: 'Infosys', offset: 1 },
    { slug: 'wipro', name: 'Wipro', offset: 2 },
    { slug: 'accenture', name: 'Accenture', offset: 3 },
    { slug: 'cognizant', name: 'Cognizant', offset: 4 },
    { slug: 'capgemini', name: 'Capgemini', offset: 5 },
    { slug: 'deloitte', name: 'Deloitte', offset: 6 },
    { slug: 'amazon', name: 'Amazon', offset: 7 },
    { slug: 'microsoft', name: 'Microsoft', offset: 8 },
    { slug: 'google', name: 'Google', offset: 9 }
  ];

  // Helper to slice problems with wrap-around
  function getProblemSlice(pool, offset, count) {
    const list = [];
    for (let i = 0; i < count; i++) {
      const idx = (offset + i) % pool.length;
      list.push(pool[idx]);
    }
    return list;
  }

  let totalTestsCreated = 0;
  let totalProblemsCreated = 0;

  for (const comp of companies) {
    // TIER 1: Medium Coding Assessment (6 problems) - Main required level
    const mediumProblems = getProblemSlice(mediumCodingProblems, comp.offset, 6);
    const medTestRes = insertTest.run(
      `${comp.name} — Medium Coding Assessment`,
      comp.slug,
      null,
      'coding',
      'algorithms',
      'coding',
      'coding',
      mediumProblems.length * 5, // 5 mins per coding problem or 30 mins
      mediumProblems.length,
      'Medium',
      1
    );
    const medTestId = Number(medTestRes.lastInsertRowid);
    totalTestsCreated++;

    for (const prob of mediumProblems) {
      const starterTemplates = {
        python: generateStarterTemplate(prob, 'python'),
        java: generateStarterTemplate(prob, 'java'),
        c: generateStarterTemplate(prob, 'c'),
        cpp: generateStarterTemplate(prob, 'cpp')
      };

      insertQuestion.run(
        medTestId,
        prob.topic,
        prob.description,
        'coding',
        prob.difficulty,
        prob.title, // Title stored in code_snippet or used by UI
        prob.input_format,
        prob.output_format,
        prob.constraints,
        prob.sample_input,
        prob.sample_output,
        JSON.stringify(prob.test_cases || []),
        JSON.stringify(starterTemplates),
        prob.explanation || `Optimal approach involves ${prob.topic}. Complexity: O(N) time, O(1) or O(N) auxiliary space.`
      );
      totalProblemsCreated++;
    }

    // TIER 2: Hard Coding Assessment (6 problems) - Main required level
    const hardProblems = getProblemSlice(hardCodingProblems, comp.offset, 6);
    const hardTestRes = insertTest.run(
      `${comp.name} — Hard Advanced Coding Assessment`,
      comp.slug,
      null,
      'coding',
      'algorithms',
      'coding',
      'coding',
      hardProblems.length * 6, // 36 mins
      hardProblems.length,
      'Hard',
      1
    );
    const hardTestId = Number(hardTestRes.lastInsertRowid);
    totalTestsCreated++;

    for (const prob of hardProblems) {
      const starterTemplates = {
        python: generateStarterTemplate(prob, 'python'),
        java: generateStarterTemplate(prob, 'java'),
        c: generateStarterTemplate(prob, 'c'),
        cpp: generateStarterTemplate(prob, 'cpp')
      };

      insertQuestion.run(
        hardTestId,
        prob.topic,
        prob.description,
        'coding',
        prob.difficulty,
        prob.title,
        prob.input_format,
        prob.output_format,
        prob.constraints,
        prob.sample_input,
        prob.sample_output,
        JSON.stringify(prob.test_cases || []),
        JSON.stringify(starterTemplates),
        prob.explanation || `Advanced optimal algorithm for ${prob.topic}. Complexity meets competitive programming constraints.`
      );
      totalProblemsCreated++;
    }

    // TIER 3: Easy Coding Assessment (5 problems)
    const easyProblems = getProblemSlice(easyCodingProblems, comp.offset, 5);
    const easyTestRes = insertTest.run(
      `${comp.name} — Foundation Coding Assessment`,
      comp.slug,
      null,
      'coding',
      'algorithms',
      'coding',
      'coding',
      easyProblems.length * 5, // 25 mins
      easyProblems.length,
      'Easy',
      1
    );
    const easyTestId = Number(easyTestRes.lastInsertRowid);
    totalTestsCreated++;

    for (const prob of easyProblems) {
      const starterTemplates = {
        python: generateStarterTemplate(prob, 'python'),
        java: generateStarterTemplate(prob, 'java'),
        c: generateStarterTemplate(prob, 'c'),
        cpp: generateStarterTemplate(prob, 'cpp')
      };

      insertQuestion.run(
        easyTestId,
        prob.topic,
        prob.description,
        'coding',
        prob.difficulty,
        prob.title,
        prob.input_format,
        prob.output_format,
        prob.constraints,
        prob.sample_input,
        prob.sample_output,
        JSON.stringify(prob.test_cases || []),
        JSON.stringify(starterTemplates),
        prob.explanation || `Fundamental solution for ${prob.topic}. Complexity: linear or logarithmic time.`
      );
      totalProblemsCreated++;
    }
  }

  console.log(`Successfully created ${totalTestsCreated} real coding tests with ${totalProblemsCreated} real programming problems!`);
  console.log(`Every coding test has 5 to 6 real coding problems with Python, Java, C, and C++ starter templates and test cases.`);
}

if (require.main === module) {
  seedRealCodingAssessments();
}

module.exports = { seedRealCodingAssessments };
