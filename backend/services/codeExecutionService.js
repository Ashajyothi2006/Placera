const { spawnSync } = require('child_process');
const vm = require('vm');

/**
 * Static Syntax & Compilation Validator for C, C++, and Java
 */
function validateSyntaxAndStructure(code, language) {
  const lines = code.split('\n');

  // 1. Bracket & Quote Matching
  const stack = [];
  let inString = false;
  let inChar = false;
  let inMultiComment = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    let inSingleComment = false;

    for (let col = 0; col < line.length; col++) {
      const ch = line[col];
      const nextCh = line[col + 1] || '';

      if (inMultiComment) {
        if (ch === '*' && nextCh === '/') {
          inMultiComment = false;
          col++;
        }
        continue;
      }

      if (inSingleComment) continue;

      if (!inString && !inChar && ch === '/' && nextCh === '/') {
        inSingleComment = true;
        break;
      }
      if (!inString && !inChar && ch === '/' && nextCh === '*') {
        inMultiComment = true;
        col++;
        continue;
      }

      if (!inChar && ch === '"' && (col === 0 || line[col - 1] !== '\\')) {
        inString = !inString;
        continue;
      }
      if (!inString && ch === "'" && (col === 0 || line[col - 1] !== '\\')) {
        inChar = !inChar;
        continue;
      }

      if (inString || inChar) continue;

      if (ch === '{' || ch === '(' || ch === '[') {
        stack.push({ ch, line: lineIdx + 1, col: col + 1 });
      } else if (ch === '}' || ch === ')' || ch === ']') {
        if (stack.length === 0) {
          return {
            isValid: false,
            errorType: 'Compilation Error',
            message: `Syntax Error: Unmatched closing bracket '${ch}' at line ${lineIdx + 1}, col ${col + 1}`
          };
        }
        const top = stack.pop();
        const expected = top.ch === '{' ? '}' : (top.ch === '(' ? ')' : ']');
        if (ch !== expected) {
          return {
            isValid: false,
            errorType: 'Compilation Error',
            message: `Syntax Error: Mismatched brackets. Opened '${top.ch}' at line ${top.line} but closed with '${ch}' at line ${lineIdx + 1}`
          };
        }
      }
    }
  }

  if (stack.length > 0) {
    const unclosed = stack.pop();
    return {
      isValid: false,
      errorType: 'Compilation Error',
      message: `Syntax Error: Unclosed '${unclosed.ch}' opened at line ${unclosed.line}`
    };
  }

  // 2. Language-Specific Structural Checks
  if (language === 'java') {
    const hasClass = /class\s+[A-Za-z0-9_]+/i.test(code);
    const hasMain = /public\s+static\s+void\s+main\s*\(\s*String\s*(\[\s*\]\s*[A-Za-z0-9_]+|[A-Za-z0-9_]+\s*\[\s*\])/.test(code);
    if (!hasClass) {
      return {
        isValid: false,
        errorType: 'Compilation Error',
        message: 'Java Compilation Error: class definition not found. Expected: public class Main { ... }'
      };
    }
    if (!hasMain) {
      return {
        isValid: false,
        errorType: 'Compilation Error',
        message: 'Java Compilation Error: Main method not found. Expected: public static void main(String[] args)'
      };
    }
  } else if (language === 'c' || language === 'cpp') {
    const hasMain = /(int|void)\s+main\s*\(/.test(code);
    if (!hasMain) {
      return {
        isValid: false,
        errorType: 'Compilation Error',
        message: `${language.toUpperCase()} Compilation Error: undefined reference to 'main'. Expected: int main() { ... }`
      };
    }
  }

  // 3. Statement semicolon check for C/C++/Java (detect common missing semicolons)
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('#')) continue;
    if (trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed.endsWith(':') || trimmed.endsWith(';')) continue;
    if (/^(if|for|while|else|public|private|protected|class|struct|namespace|typedef|do)\b/.test(trimmed)) continue;
    if (trimmed.endsWith(',') || trimmed.endsWith('(') || trimmed.endsWith('+') || trimmed.endsWith('-') || trimmed.endsWith('*') || trimmed.endsWith('/')) continue;
    
    // Check if next line continues the statement
    const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
    if (nextLine.startsWith('{') || nextLine.startsWith('?') || nextLine.startsWith(':') || nextLine.startsWith('.') || nextLine.startsWith('&&') || nextLine.startsWith('||')) continue;

    // Potential missing semicolon
    if (/^[A-Za-z0-9_]+(\s+[A-Za-z0-9_]+)?\s*(=|\+=|-=|\*=|\/=|<<|>>|\.|\()/.test(trimmed) || /^return\b/.test(trimmed) || /^System\.out/.test(trimmed) || /^printf\b/.test(trimmed) || /^cout\b/.test(trimmed)) {
      return {
        isValid: false,
        errorType: 'Compilation Error',
        message: `${language.toUpperCase()} Compilation Error at line ${i + 1}: expected ';' before end of line: "${trimmed}"`
      };
    }
  }

  return { isValid: true };
}

/**
 * Transpiles and executes algorithmic C/C++/Java in a sandboxed JavaScript runtime
 */
function transpileAndExecuteInSandbox(code, language, inputStr) {
  const rawTokens = (inputStr || '').trim().split(/\s+/).filter(Boolean);
  let tokenIdx = 0;

  let jsCode = code;

  // 1. Remove preprocessor, namespace, package & import lines
  jsCode = jsCode.replace(/#include\s+<[^>]+>/g, '');
  jsCode = jsCode.replace(/#include\s+"[^"]+"/g, '');
  jsCode = jsCode.replace(/using\s+namespace\s+std\s*;/g, '');
  jsCode = jsCode.replace(/package\s+[a-zA-Z0-9_.]+;/g, '');
  jsCode = jsCode.replace(/import\s+[a-zA-Z0-9_.*]+;/g, '');
  jsCode = jsCode.replace(/ios_base::sync_with_stdio\([^)]*\);/g, '');
  jsCode = jsCode.replace(/cin\.tie\([^)]*\);/g, '');

  // 2. Main function FIRST (before type replacement)
  jsCode = jsCode.replace(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/g, 'function __runMain() {');
  jsCode = jsCode.replace(/(int|void)\s+main\s*\([^)]*\)\s*\{/g, 'function __runMain() {');

  // 3. Remove class wrapper in Java and its matching closing brace
  if (language === 'java') {
    jsCode = jsCode.replace(/public\s+class\s+[A-Za-z0-9_]+\s*\{/g, '');
    jsCode = jsCode.replace(/class\s+[A-Za-z0-9_]+\s*\{/g, '');
    const lastBrace = jsCode.lastIndexOf('}');
    if (lastBrace !== -1) {
      jsCode = jsCode.slice(0, lastBrace) + jsCode.slice(lastBrace + 1);
    }
  }

  // 4. Scanner & IO
  jsCode = jsCode.replace(/Scanner\s+[a-zA-Z0-9_]+\s*=\s*new\s+Scanner\([^)]*\);/g, 'let sc = {};');
  jsCode = jsCode.replace(/[a-zA-Z0-9_]+\.nextInt\s*\(\s*\)/g, '__readToken()');
  jsCode = jsCode.replace(/[a-zA-Z0-9_]+\.next\s*\(\s*\)/g, '__readString()');
  jsCode = jsCode.replace(/[a-zA-Z0-9_]+\.nextLine\s*\(\s*\)/g, '__readLine()');
  jsCode = jsCode.replace(/[a-zA-Z0-9_]+\.hasNextInt\s*\(\s*\)/g, '(__hasToken())');

  // cin >> a >> b;
  jsCode = jsCode.replace(/cin\s*>>\s*([^;]+);/g, (match, expr) => {
    const vars = expr.split('>>').map(v => v.trim()).filter(Boolean);
    return vars.map(v => `${v} = __readToken();`).join(' ');
  });

  // scanf("%d %d", &a, &b);
  jsCode = jsCode.replace(/scanf\s*\(\s*"[^"]*"\s*,\s*([^)]+)\);/g, (match, args) => {
    const vars = args.split(',').map(a => a.trim().replace(/^&/, '')).filter(Boolean);
    return vars.map(v => `${v} = __readToken();`).join(' ');
  });

  // cout
  jsCode = jsCode.replace(/cout\s*<<\s*([^;]+);/g, (match, expr) => {
    const parts = expr.split('<<').map(p => p.trim()).filter(p => p !== 'endl' && p !== '"\\n"' && p !== "'\\n'");
    return `__print(${parts.join(', ')});`;
  });

  // printf
  jsCode = jsCode.replace(/printf\s*\(\s*"([^"]*)"\s*(?:,\s*([^)]+))?\);/g, (match, fmt, args) => {
    if (!args) return `__print(${JSON.stringify(fmt.replace(/\\n/g, '\n'))});`;
    const argList = args.split(',').map(a => a.trim()).filter(Boolean);
    return `__printFormatted(${JSON.stringify(fmt)}, ${argList.join(', ')});`;
  });

  // System.out.println / print
  jsCode = jsCode.replace(/System\.out\.println\s*\(([^)]*)\);/g, '__println($1);');
  jsCode = jsCode.replace(/System\.out\.print\s*\(([^)]*)\);/g, '__print($1);');

  // 5. Replace type declarations
  jsCode = jsCode.replace(/(^|[;{}()\s])(?:int|long\s+long|long|double|float|char|bool|boolean|short|String|string|auto)\s+([a-zA-Z_])/gm, '$1let $2');

  // Replace other function definitions e.g. int solve(
  jsCode = jsCode.replace(/(^|[;{}()\s])(?:int|void|bool|boolean|string|long)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/gm, '$1function $2(');

  // Replace vectors / arrays / maps
  jsCode = jsCode.replace(/vector<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(\([^)]*\))?/g, 'let $1 = []');
  jsCode = jsCode.replace(/int\[\]\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*new\s+int\[[^\]]+\]/g, 'let $1 = []');
  jsCode = jsCode.replace(/long\[\]\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*new\s+long\[[^\]]+\]/g, 'let $1 = []');
  jsCode = jsCode.replace(/Map<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*new\s+HashMap<>[^;]*/g, 'let $1 = new Map()');
  jsCode = jsCode.replace(/unordered_map<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, 'let $1 = new Map()');
  jsCode = jsCode.replace(/map<[^>]+>\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, 'let $1 = new Map()');

  // Map helper methods
  jsCode = jsCode.replace(/\.containsKey\(([^)]+)\)/g, '.has($1)');
  jsCode = jsCode.replace(/\.count\(([^)]+)\)/g, '(.has($1) ? 1 : 0)');
  jsCode = jsCode.replace(/\.put\(([^,]+),\s*([^)]+)\)/g, '.set($1, $2)');

  let outputBuffer = '';
  const sandbox = {
    __hasToken: () => tokenIdx < rawTokens.length,
    __readToken: () => {
      if (tokenIdx < rawTokens.length) {
        const val = rawTokens[tokenIdx++];
        return isNaN(Number(val)) ? val : Number(val);
      }
      return 0;
    },
    __readString: () => tokenIdx < rawTokens.length ? rawTokens[tokenIdx++] : '',
    __readLine: () => inputStr,
    __print: (...args) => { outputBuffer += args.join(' '); },
    __println: (...args) => { outputBuffer += args.join(' ') + '\n'; },
    __printFormatted: (fmt, ...args) => {
      let res = fmt.replace(/\\n/g, '\n');
      for (const a of args) res = res.replace(/%[difs]/, String(a));
      outputBuffer += res;
    },
    Math: Math,
    max: Math.max,
    min: Math.min,
    abs: Math.abs,
    console: { log: (...args) => { outputBuffer += args.join(' ') + '\n'; } }
  };

  const wrapped = `${jsCode}\nif (typeof __runMain === 'function') __runMain();`;
  const context = vm.createContext(sandbox);
  new vm.Script(wrapped).runInContext(context, { timeout: 3000 });

  return outputBuffer.trim();
}

/**
 * Executes code against a single test case
 */
function executeTestCase({ code, language, input, expected, timeoutMs = 3000 }) {
  const inputStr = (input || '').replace(/\r\n/g, '\n');
  const startTime = Date.now();
  let actual = '';
  let error = null;
  let status = 'Passed';

  try {
    if (language === 'python') {
      const child = spawnSync('python', ['-c', code], {
        input: inputStr,
        timeout: timeoutMs,
        encoding: 'utf-8'
      });

      if (child.error) {
        if (child.error.code === 'ETIMEDOUT') {
          error = 'Time Limit Exceeded (3.0 seconds exceeded)';
          status = 'Time Limit Exceeded';
        } else {
          error = child.error.message;
          status = 'Runtime Error';
        }
      } else if (child.stderr && child.stderr.trim().length > 0) {
        const stderr = child.stderr.trim();
        if (/SyntaxError|IndentationError|TabError/.test(stderr)) {
          error = stderr;
          status = 'Compilation Error';
        } else {
          error = stderr;
          status = 'Runtime Error';
        }
      } else {
        actual = (child.stdout || '').trim();
      }
    } else if (['c', 'cpp', 'java'].includes(language)) {
      // 1. Static validation first
      const validation = validateSyntaxAndStructure(code, language);
      if (!validation.isValid) {
        return {
          passed: false,
          actual: '',
          expected,
          error: validation.message,
          status: 'Compilation Error',
          runtimeSeconds: 0.01
        };
      }

      // Check if code is just empty starter template
      const isPlaceholder = /#\s*Write your solution|pass|return 0;\s*\}\s*$/.test(code.trim()) && !/(cout|printf|System\.out|print)/.test(code);
      if (isPlaceholder) {
        return {
          passed: false,
          actual: '',
          expected,
          error: 'No output was generated. Please implement your solution.',
          status: 'Wrong Answer',
          runtimeSeconds: 0.02
        };
      }

      // 2. Sandboxed execution
      actual = transpileAndExecuteInSandbox(code, language, inputStr);
    } else {
      throw new Error(`Unsupported programming language: ${language}`);
    }
  } catch (err) {
    if (err.message && err.message.includes('timed out')) {
      error = 'Time Limit Exceeded (3.0 seconds exceeded)';
      status = 'Time Limit Exceeded';
    } else {
      error = err.message || 'Execution error';
      status = 'Runtime Error';
    }
  }

  const runtimeSeconds = Math.max(0.01, (Date.now() - startTime) / 1000);

  // Normalization for comparison: normalize whitespace and newlines
  const normActual = (actual || '').trim().replace(/\r\n/g, '\n').replace(/\s+/g, ' ');
  const normExpected = expected !== null && expected !== undefined ? String(expected).trim().replace(/\r\n/g, '\n').replace(/\s+/g, ' ') : null;

  let passed = false;
  if (!error) {
    if (normExpected === null) {
      passed = true;
    } else {
      passed = normActual === normExpected;
      if (!passed) {
        status = 'Wrong Answer';
      }
    }
  }

  return {
    passed,
    actual,
    expected,
    error,
    status: passed ? 'Passed' : status,
    runtimeSeconds: Number(runtimeSeconds.toFixed(3))
  };
}

/**
 * Public Method: Run candidate code against sample test cases (Run Code button)
 */
function runCodeSampleCases({ code, language = 'python', testCases = [], customInput = null }) {
  if (customInput !== null && customInput !== undefined && customInput.trim() !== '') {
    const singleRes = executeTestCase({
      code,
      language,
      input: customInput,
      expected: null
    });
    return {
      results: [{
        testCaseIndex: 1,
        input: customInput,
        expected: null,
        actual: singleRes.actual,
        passed: !singleRes.error,
        error: singleRes.error,
        status: singleRes.status,
        runtimeSeconds: singleRes.runtimeSeconds
      }],
      allPassed: !singleRes.error,
      status: singleRes.status
    };
  }

  // Use provided sample test cases (up to 3 sample cases)
  const sampleCases = testCases.slice(0, 3);
  const results = [];
  let allPassed = true;
  let dominantStatus = 'Accepted';

  for (let i = 0; i < sampleCases.length; i++) {
    const tc = sampleCases[i];
    const execRes = executeTestCase({
      code,
      language,
      input: tc.input,
      expected: tc.expected
    });

    if (!execRes.passed) {
      allPassed = false;
      if (dominantStatus === 'Accepted') {
        dominantStatus = execRes.status;
      }
    }

    results.push({
      testCaseIndex: i + 1,
      input: tc.input,
      expected: tc.expected,
      actual: execRes.actual,
      passed: execRes.passed,
      error: execRes.error,
      status: execRes.status,
      runtimeSeconds: execRes.runtimeSeconds
    });
  }

  return {
    results,
    allPassed,
    status: allPassed ? 'Accepted' : dominantStatus
  };
}

/**
 * Public Method: Evaluate full submission across all test cases (Submit Code)
 * Conceals raw inputs/outputs of hidden test cases to protect test integrity.
 */
function evaluateProblemSubmission({ problemId, problemTitle, code, language = 'python', testCases = [] }) {
  if (!code || code.trim().length === 0) {
    return {
      problemId,
      problemTitle,
      status: 'Unsolved',
      passedCount: 0,
      totalCount: testCases.length,
      scorePercent: 0,
      executionTime: '0.00s',
      results: []
    };
  }

  const results = [];
  let passedCount = 0;
  let totalRuntime = 0;
  let hasCompilationError = false;
  let hasRuntimeError = false;
  let hasTimeout = false;
  let firstErrorMessage = null;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const isSample = i < 2; // First 2 are sample test cases, rest are hidden

    const execRes = executeTestCase({
      code,
      language,
      input: tc.input,
      expected: tc.expected
    });

    totalRuntime += execRes.runtimeSeconds;

    if (execRes.passed) {
      passedCount++;
    } else {
      if (execRes.status === 'Compilation Error') hasCompilationError = true;
      if (execRes.status === 'Runtime Error') hasRuntimeError = true;
      if (execRes.status === 'Time Limit Exceeded') hasTimeout = true;
      if (!firstErrorMessage && execRes.error) firstErrorMessage = execRes.error;
    }

    results.push({
      testCaseIndex: i + 1,
      isSample,
      passed: execRes.passed,
      // For sample cases, show details; for hidden cases, conceal raw input
      input: isSample ? tc.input : '[Hidden Test Case]',
      expected: isSample ? tc.expected : '[Hidden Expected Output]',
      actual: isSample ? execRes.actual : (execRes.passed ? '[Output Passed]' : '[Output Hidden]'),
      error: isSample ? execRes.error : (execRes.error ? 'Test case failed execution' : null),
      status: execRes.status
    });
  }

  const totalCount = testCases.length;
  const scorePercent = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
  const avgRuntime = totalCount > 0 ? (totalRuntime / totalCount).toFixed(2) + 's' : '0.05s';

  let status = 'Wrong Answer';
  if (hasCompilationError) {
    status = 'Compilation Error';
  } else if (hasTimeout) {
    status = 'Time Limit Exceeded';
  } else if (hasRuntimeError) {
    status = 'Runtime Error';
  } else if (passedCount === totalCount && totalCount > 0) {
    status = 'Accepted';
  } else if (passedCount > 0) {
    status = 'Partially Accepted';
  }

  return {
    problemId,
    problemTitle,
    language,
    status,
    passedCount,
    totalCount,
    scorePercent,
    executionTime: avgRuntime,
    errorMessage: firstErrorMessage,
    results
  };
}

module.exports = {
  validateSyntaxAndStructure,
  executeTestCase,
  transpileAndExecuteInSandbox,
  runCodeSampleCases,
  evaluateProblemSubmission
};
