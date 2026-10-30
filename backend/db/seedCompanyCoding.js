// Company-Specific Coding MCQs Question Banks (20 unique questions per company)
// Includes real code snippets, bug detection, output prediction, and algorithmic complexity.

function generateCodingForCompany(companySlug) {
  const companyPrefix = companySlug.toUpperCase();
  const pool = [
    {
      q: `[${companyPrefix} Python Output] What will be the output of the following Python snippet?`,
      code: "nums = [1, 2, 3, 4]\nnums.append([5, 6])\nprint(len(nums))",
      opts: ["4", "5", "6", "TypeError"],
      ans: 1,
      diff: "Easy",
      exp: "append() adds the list [5, 6] as a single element at index 4. The elements are now 1, 2, 3, 4, and [5, 6]. Hence len(nums) is 5."
    },
    {
      q: `[${companyPrefix} Java Logic] What is the output of the following Java code?`,
      code: "String s1 = new String(\"hello\");\nString s2 = new String(\"hello\");\nSystem.out.println((s1 == s2) + \" \" + s1.equals(s2));",
      opts: ["true true", "false false", "false true", "true false"],
      ans: 2,
      diff: "Easy",
      exp: "s1 == s2 compares reference memory addresses, which are distinct for objects created with 'new', evaluating to false. s1.equals(s2) compares textual content, evaluating to true."
    },
    {
      q: `[${companyPrefix} C++ Pointers] What will be printed by this C++ code?`,
      code: "int a[] = {10, 20, 30, 40};\nint *p = a;\ncout << *(p + 2) << endl;",
      opts: ["10", "20", "30", "40"],
      ans: 2,
      diff: "Easy",
      exp: "Pointer p points to the start of array a (index 0). p + 2 points to index 2 (value 30). Dereferencing with * yields 30."
    },
    {
      q: `[${companyPrefix} JavaScript Scoping] What is the result of executing this JavaScript snippet?`,
      code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
      opts: ["0 1 2", "3 3 3", "undefined undefined undefined", "0 0 0"],
      ans: 1,
      diff: "Medium",
      exp: "'var' has function scope, not block scope. By the time the event loop executes the timer callbacks, the loop has completed with i = 3, printing 3 three times."
    },
    {
      q: `[${companyPrefix} Recursion] What does the following recursive function compute for fun(4)?`,
      code: "def fun(n):\n    if n <= 1:\n        return 1\n    return n * fun(n - 1)",
      opts: ["10", "16", "24", "120"],
      ans: 2,
      diff: "Easy",
      exp: "This is the classic factorial implementation: fun(4) = 4 * 3 * 2 * 1 = 24."
    },
    {
      q: `[${companyPrefix} Memory & References] In Python, what will be the printed output?`,
      code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
      opts: ["[1, 2, 3]", "[1, 2, 3, 4]", "None", "Error"],
      ans: 1,
      diff: "Easy",
      exp: "Lists are mutable and 'b = a' copies the reference. Modifying b mutates the underlying list referenced by a, printing [1, 2, 3, 4]."
    },
    {
      q: `[${companyPrefix} Bitwise Operations] What is the output of the expression: (5 ^ 3) in most modern languages?`,
      code: "// 5 is 101 in binary, 3 is 011 in binary\nint result = 5 ^ 3;",
      opts: ["2", "6", "8", "15"],
      ans: 1,
      diff: "Medium",
      exp: "XOR (^) returns 1 where bits differ. 101 ^ 011 = 110 in binary, which is 6 in decimal."
    },
    {
      q: `[${companyPrefix} Complexity Analysis] What is the worst-case time complexity of the following code?`,
      code: "for i in range(n):\n    j = 1\n    while j < n:\n        j *= 2",
      opts: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      ans: 1,
      diff: "Medium",
      exp: "The outer loop runs n times. The inner loop doubles j each iteration, running log2(n) times. Total complexity = O(n * log n)."
    },
    {
      q: `[${companyPrefix} Java Static Context] What happens when attempting to compile this Java code?`,
      code: "class Test {\n    int count = 0;\n    public static void main(String[] args) {\n        System.out.println(count);\n    }\n}",
      opts: ["Prints 0", "Compile-time error: non-static variable cannot be referenced from static context", "Prints null", "Runtime NullPointerException"],
      ans: 1,
      diff: "Medium",
      exp: "The instance variable 'count' cannot be accessed directly from static method 'main' without instantiating an object of class Test."
    },
    {
      q: `[${companyPrefix} String Immutability] What is the printed output of the following Python code?`,
      code: "s = \"python\"\ns[0] = \"P\"\nprint(s)",
      opts: ["Python", "python", "TypeError: 'str' object does not support item assignment", "AttributeError"],
      ans: 2,
      diff: "Easy",
      exp: "Strings in Python are immutable objects. Attempting in-place item assignment raises a TypeError."
    },
    {
      q: `[${companyPrefix} SQL / Database Query] Which clause in SQL is used to filter results after an aggregation function has been applied?`,
      code: "SELECT dept, COUNT(*) FROM employees GROUP BY dept _____ COUNT(*) > 5;",
      opts: ["WHERE", "HAVING", "FILTER", "ORDER BY"],
      ans: 1,
      diff: "Easy",
      exp: "HAVING filters groups based on aggregate results after GROUP BY, whereas WHERE filters individual rows before grouping."
    },
    {
      q: `[${companyPrefix} Algorithm Tracing] What is returned by mystery(2, 5)?`,
      code: "def mystery(a, b):\n    if b == 0:\n        return 0\n    if b % 2 == 0:\n        return mystery(a + a, b // 2)\n    return a + mystery(a, b - 1)",
      opts: ["7", "10", "32", "25"],
      ans: 1,
      diff: "Hard",
      exp: "This is recursive peasant multiplication computing a * b. For a=2, b=5: 2 + mystery(2, 4) = 2 + mystery(4, 2) = 2 + mystery(8, 1) = 2 + 8 + 0 = 10."
    },
    {
      q: `[${companyPrefix} C++ Destructors] When inheriting classes in C++, why should a base class destructor be declared 'virtual'?`,
      code: "class Base {\npublic:\n    virtual ~Base() {}\n};",
      opts: ["To allow multiple inheritance", "To ensure proper cleanup of derived class resources when deleting via base pointer", "To make the base class abstract", "To speed up compilation"],
      ans: 1,
      diff: "Medium",
      exp: "A virtual destructor ensures that deleting a derived object via a base class pointer invokes the derived class destructor first, preventing memory leaks."
    },
    {
      q: `[${companyPrefix} Python Dict Keys] Which of the following data types CANNOT be used as a dictionary key in Python?`,
      opts: ["Tuple containing integers", "String", "List of integers", "Integer"],
      ans: 2,
      diff: "Easy",
      exp: "Dictionary keys in Python must be hashable and immutable. Lists are mutable and unhashable, raising a TypeError if used as keys."
    },
    {
      q: `[${companyPrefix} Exception Handling] What will be printed upon running this block?`,
      code: "try {\n    int a = 10 / 0;\n} catch (Exception e) {\n    System.out.print(\"Catch \");\n} finally {\n    System.out.print(\"Finally \");\n}",
      opts: ["Catch ", "Finally ", "Catch Finally ", "ArithmeticException"],
      ans: 2,
      diff: "Easy",
      exp: "The divide-by-zero throws ArithmeticException, caught by catch block (prints 'Catch '), and the finally block executes unconditionally (prints 'Finally ')."
    },
    {
      q: `[${companyPrefix} JavaScript Equality] What is the output of: console.log([] == ![])?`,
      code: "console.log([] == ![]);",
      opts: ["true", "false", "TypeError", "undefined"],
      ans: 0,
      diff: "Hard",
      exp: "In JS: ![] evaluates to false (as [] is truthy). So [] == false. In loose equality, both are coerced to numbers: [].toString() is \"\", Number(\"\") is 0, Number(false) is 0. 0 == 0 evaluates to true."
    },
    {
      q: `[${companyPrefix} Lambda / Functional] What is the result of the following Python expression?`,
      code: "res = list(map(lambda x: x * 2, filter(lambda x: x % 2 != 0, [1, 2, 3, 4, 5])))\nprint(res)",
      opts: ["[2, 6, 10]", "[4, 8]", "[2, 4, 6, 8, 10]", "[1, 3, 5]"],
      ans: 0,
      diff: "Medium",
      exp: "filter selects odd numbers: [1, 3, 5]. map multiplies each by 2: [2, 6, 10]."
    },
    {
      q: `[${companyPrefix} Two Pointers Logic] When checking if a sorted array contains two numbers that sum to target K, what is optimal time complexity?`,
      opts: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
      ans: 2,
      diff: "Easy",
      exp: "Using two pointers (left at 0, right at n-1), we can find the pair in a single pass O(n) time and O(1) space."
    },
    {
      q: `[${companyPrefix} Concurrency / Race Condition] What mechanism is used in Java to ensure that only one thread can execute a block of code at any given time?`,
      opts: ["volatile keyword", "synchronized block / lock", "transient keyword", "static modifier"],
      ans: 1,
      diff: "Medium",
      exp: "The 'synchronized' keyword or explicit ReentrantLock acquires an intrinsic monitor lock to ensure mutual exclusion across concurrent threads."
    },
    {
      q: `[${companyPrefix} Code Optimization] What is the best algorithmic approach to compute the n-th Fibonacci number in O(log n) time?`,
      opts: ["Bottom-up Tabulation", "Matrix Exponentiation", "Top-down Memoization", "Standard Recursion"],
      ans: 1,
      diff: "Hard",
      exp: "Using 2x2 matrix exponentiation [[1, 1], [1, 0]]^n via repeated squaring enables calculating Fib(n) in O(log n) time."
    }
  ];

  return pool.map((item, idx) => ({
    question: item.q,
    code_snippet: item.code || null,
    options: item.opts,
    correct_index: item.ans,
    difficulty: item.diff,
    explanation: item.exp
  }));
}

module.exports = { generateCodingForCompany };
