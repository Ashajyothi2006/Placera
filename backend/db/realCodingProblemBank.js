// Real Programming Coding Problem Bank (30 High-Quality Problems: 10 Easy, 10 Medium, 10 Hard)
// Every problem contains:
// - Title, Topic, Difficulty
// - Complete problem statement, input_format, output_format, constraints
// - Sample input & output
// - Comprehensive test cases (with edge cases)
// - Language starter templates for Python, Java, C, and C++

const easyCodingProblems = [
  {
    title: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return the 0-based indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice. Print the two indices separated by a space in ascending order.",
    input_format: "First line: N (number of elements)\nSecond line: N space-separated integers\nThird line: target integer",
    output_format: "Print the two indices separated by a space.",
    constraints: "2 <= N <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    sample_input: "4\n2 7 11 15\n9",
    sample_output: "0 1",
    test_cases: [
      { input: "4\n2 7 11 15\n9", expected: "0 1" },
      { input: "3\n3 2 4\n6", expected: "1 2" },
      { input: "2\n3 3\n6", expected: "0 1" },
      { input: "5\n-1 -2 -3 -4 -5\n-8", expected: "2 4" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    target = int(data[n+1])
    
    seen = {}
    for i, x in enumerate(nums):
        diff = target - x
        if diff in seen:
            print(f"{seen[diff]} {i}")
            return
        seen[x] = i

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                System.out.println(map.get(comp) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[10005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target;
    scanf("%d", &target);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (nums[i] + nums[j] == target) {
                printf("%d %d\\n", i, j);
                return 0;
            }
        }
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;
    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) {
        int comp = target - nums[i];
        if (mp.count(comp)) {
            cout << mp[comp] << " " << i << "\\n";
            return 0;
        }
        mp[nums[i]] = i;
    }
    return 0;
}
`
    }
  },
  {
    title: "Valid Palindrome",
    topic: "Strings & Two Pointers",
    difficulty: "Easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nPrint `true` if it is a palindrome, or `false` otherwise.",
    input_format: "Single line containing string S.",
    output_format: "Print 'true' or 'false'.",
    constraints: "1 <= length(S) <= 10^5",
    sample_input: "A man, a plan, a canal: Panama",
    sample_output: "true",
    test_cases: [
      { input: "A man, a plan, a canal: Panama", expected: "true" },
      { input: "race a car", expected: "false" },
      { input: "Was it a car or a cat I saw?", expected: "true" }
    ],
    starter_code: {
      python: `import sys

def solution():
    s = sys.stdin.read().strip()
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    print("true" if cleaned == cleaned[::-1] else "false")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) sb.append(Character.toLowerCase(c));
        }
        String cleaned = sb.toString();
        String rev = sb.reverse().toString();
        System.out.println(cleaned.equals(rev) ? "true" : "false");
    }
}
`,
      c: `#include <stdio.h>
#include <ctype.h>
#include <string.h>

int main() {
    char s[100005];
    if (!fgets(s, sizeof(s), stdin)) { printf("true\\n"); return 0; }
    char cleaned[100005];
    int len = 0;
    for (int i = 0; s[i]; i++) {
        if (isalnum((unsigned char)s[i])) cleaned[len++] = tolower((unsigned char)s[i]);
    }
    int l = 0, r = len - 1;
    while (l < r) {
        if (cleaned[l] != cleaned[r]) { printf("false\\n"); return 0; }
        l++; r--;
    }
    printf("true\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) { cout << "true\\n"; return 0; }
    string cl = "";
    for (char c : s) if (isalnum(c)) cl += tolower(c);
    string rev = cl;
    reverse(rev.begin(), rev.end());
    cout << (cl == rev ? "true" : "false") << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays & Dynamic Programming",
    difficulty: "Easy",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day.\n\nMaximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nPrint the maximum profit you can achieve. If you cannot achieve any profit, print 0.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print maximum profit.",
    constraints: "1 <= N <= 10^5\n0 <= prices[i] <= 10^4",
    sample_input: "6\n7 1 5 3 6 4",
    sample_output: "5",
    test_cases: [
      { input: "6\n7 1 5 3 6 4", expected: "5" },
      { input: "5\n7 6 4 3 1", expected: "0" },
      { input: "2\n2 4", expected: "2" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    prices = [int(x) for x in data[1:n+1]]
    min_p = float('inf')
    max_prof = 0
    for p in prices:
        if p < min_p:
            min_p = p
        elif p - min_p > max_prof:
            max_prof = p - min_p
    print(max_prof)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int i = 0; i < n; i++) {
            int p = sc.nextInt();
            if (p < minPrice) minPrice = p;
            else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
        }
        System.out.println(maxProfit);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int min_p = 1000000000, max_prof = 0;
    for (int i = 0; i < n; i++) {
        int p; scanf("%d", &p);
        if (p < min_p) min_p = p;
        else if (p - min_p > max_prof) max_prof = p - min_p;
    }
    printf("%d\\n", max_prof);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int min_p = INT_MAX, max_prof = 0;
    for (int i = 0; i < n; i++) {
        int p; cin >> p;
        if (p < min_p) min_p = p;
        else if (p - min_p > max_prof) max_prof = p - min_p;
    }
    cout << max_prof << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Contains Duplicate",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    description: "Given an integer array `nums`, print `true` if any value appears at least twice in the array, and print `false` if every element is distinct.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print 'true' or 'false'.",
    constraints: "1 <= N <= 10^5\n-10^9 <= nums[i] <= 10^9",
    sample_input: "4\n1 2 3 1",
    sample_output: "true",
    test_cases: [
      { input: "4\n1 2 3 1", expected: "true" },
      { input: "4\n1 2 3 4", expected: "false" },
      { input: "5\n1 1 1 3 3", expected: "true" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    print("true" if len(set(nums)) < len(nums) else "false")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        Set<Integer> set = new HashSet<>();
        boolean dup = false;
        for (int i = 0; i < n; i++) {
            if (!set.add(sc.nextInt())) dup = true;
        }
        System.out.println(dup ? "true" : "false");
    }
}
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    qsort(arr, n, sizeof(int), cmp);
    for (int i = 1; i < n; i++) {
        if (arr[i] == arr[i - 1]) { printf("true\\n"); free(arr); return 0; }
    }
    printf("false\\n");
    free(arr);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    unordered_set<int> s;
    bool dup = false;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (s.count(x)) dup = true;
        s.insert(x);
    }
    cout << (dup ? "true" : "false") << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Valid Anagram",
    topic: "Strings & Hashing",
    difficulty: "Easy",
    description: "Given two strings `s` and `t`, print `true` if `t` is an anagram of `s`, and `false` otherwise.",
    input_format: "First line: string s\nSecond line: string t",
    output_format: "Print 'true' or 'false'.",
    constraints: "1 <= length(s), length(t) <= 5 * 10^4",
    sample_input: "anagram\nnagaram",
    sample_output: "true",
    test_cases: [
      { input: "anagram\nnagaram", expected: "true" },
      { input: "rat\ncar", expected: "false" },
      { input: "silent\nlisten", expected: "true" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if len(data) < 2:
        return
    s, t = data[0], data[1]
    print("true" if sorted(s) == sorted(t) else "false")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String t = sc.next();
        if (s.length() != t.length()) { System.out.println("false"); return; }
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c - 'a']++;
        for (char c : t.toCharArray()) cnt[c - 'a']--;
        for (int c : cnt) if (c != 0) { System.out.println("false"); return; }
        System.out.println("true");
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[50005], t[50005];
    if (scanf("%s %s", s, t) != 2) return 0;
    if (strlen(s) != strlen(t)) { printf("false\\n"); return 0; }
    int cnt[26] = {0};
    for (int i = 0; s[i]; i++) { cnt[s[i] - 'a']++; cnt[t[i] - 'a']--; }
    for (int i = 0; i < 26; i++) if (cnt[i] != 0) { printf("false\\n"); return 0; }
    printf("true\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    sort(s.begin(), s.end());
    sort(t.begin(), t.end());
    cout << (s == t ? "true" : "false") << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Missing Number",
    topic: "Bit Manipulation & Math",
    difficulty: "Easy",
    description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print the missing integer.",
    constraints: "1 <= N <= 10^4\n0 <= nums[i] <= N",
    sample_input: "3\n3 0 1",
    sample_output: "2",
    test_cases: [
      { input: "3\n3 0 1", expected: "2" },
      { input: "2\n0 1", expected: "2" },
      { input: "9\n9 6 4 2 3 5 7 0 1", expected: "8" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    expected = n * (n + 1) // 2
    print(expected - sum(nums))

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int expected = n * (n + 1) / 2;
        int sum = 0;
        for (int i = 0; i < n; i++) sum += sc.nextInt();
        System.out.println(expected - sum);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long exp = (long long)n * (n + 1) / 2, sum = 0;
    for (int i = 0; i < n; i++) { int x; scanf("%d", &x); sum += x; }
    printf("%lld\\n", exp - sum);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    long long exp = 1LL * n * (n + 1) / 2, sum = 0;
    for (int i = 0; i < n; i++) { int x; cin >> x; sum += x; }
    cout << exp - sum << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Reverse String",
    topic: "Two Pointers",
    difficulty: "Easy",
    description: "Write a program that takes a string `s` and prints the reversed string.",
    input_format: "Single line containing string s.",
    output_format: "Print reversed string.",
    constraints: "1 <= length(s) <= 10^5",
    sample_input: "hello",
    sample_output: "olleh",
    test_cases: [
      { input: "hello", expected: "olleh" },
      { input: "algorithm", expected: "mhtirogla" },
      { input: "madam", expected: "madam" }
    ],
    starter_code: {
      python: `import sys

def solution():
    s = sys.stdin.read().strip()
    print(s[::-1])

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        System.out.println(new StringBuilder(s).reverse().toString());
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100005];
    if (scanf("%s", s) != 1) return 0;
    int n = strlen(s);
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        char tmp = s[i]; s[i] = s[j]; s[j] = tmp;
    }
    printf("%s\\n", s);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    reverse(s.begin(), s.end());
    cout << s << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Single Number",
    topic: "Bit Manipulation",
    difficulty: "Easy",
    description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print the single unique integer.",
    constraints: "1 <= N <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4",
    sample_input: "3\n2 2 1",
    sample_output: "1",
    test_cases: [
      { input: "3\n2 2 1", expected: "1" },
      { input: "5\n4 1 2 1 2", expected: "4" },
      { input: "1\n99", expected: "99" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    res = 0
    for x in data[1:n+1]:
        res ^= int(x)
    print(res)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int res = 0;
        for (int i = 0; i < n; i++) res ^= sc.nextInt();
        System.out.println(res);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int res = 0;
    for (int i = 0; i < n; i++) { int x; scanf("%d", &x); res ^= x; }
    printf("%d\\n", res);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int res = 0;
    for (int i = 0; i < n; i++) { int x; cin >> x; res ^= x; }
    cout << res << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Move Zeroes",
    topic: "Two Pointers",
    difficulty: "Easy",
    description: "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print the space-separated modified array.",
    constraints: "1 <= N <= 10^4\n-2^31 <= nums[i] <= 2^31 - 1",
    sample_input: "5\n0 1 0 3 12",
    sample_output: "1 3 12 0 0",
    test_cases: [
      { input: "5\n0 1 0 3 12", expected: "1 3 12 0 0" },
      { input: "1\n0", expected: "0" },
      { input: "4\n4 2 4 0", expected: "4 2 4 0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    non_zeros = [x for x in nums if x != 0]
    res = non_zeros + [0] * (n - len(non_zeros))
    print(' '.join(map(str, res)))

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (x != 0) nums[idx++] = x;
        }
        for (int i = 0; i < n; i++) System.out.print(nums[i] + (i == n - 1 ? "" : " "));
        System.out.println();
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[10005] = {0};
    int idx = 0;
    for (int i = 0; i < n; i++) {
        int x; scanf("%d", &x);
        if (x != 0) nums[idx++] = x;
    }
    for (int i = 0; i < n; i++) printf("%d%s", nums[i], (i == n - 1 ? "" : " "));
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n, 0);
    int idx = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x != 0) nums[idx++] = x;
    }
    for (int i = 0; i < n; i++) cout << nums[i] << (i == n - 1 ? "" : " ");
    cout << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    description: "Given a sorted array of distinct integers `nums` in ascending order, search for `target`. Print its 0-based index if present, or `-1` if not present.",
    input_format: "First line: N\nSecond line: N space-separated integers\nThird line: target",
    output_format: "Print index or -1.",
    constraints: "1 <= N <= 10^4\n-10^4 < nums[i], target < 10^4",
    sample_input: "6\n-1 0 3 5 9 12\n9",
    sample_output: "4",
    test_cases: [
      { input: "6\n-1 0 3 5 9 12\n9", expected: "4" },
      { input: "6\n-1 0 3 5 9 12\n2", expected: "-1" },
      { input: "1\n5\n5", expected: "0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    target = int(data[n+1])
    l, r = 0, n - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            print(m)
            return
        elif nums[m] < target:
            l = m + 1
        else:
            r = m - 1
    print(-1)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        int l = 0, r = n - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) { System.out.println(m); return; }
            else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        System.out.println(-1);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[10005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target; scanf("%d", &target);
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) { printf("%d\\n", m); return 0; }
        else if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    printf("-1\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target; cin >> target;
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) { cout << m << "\\n"; return 0; }
        else if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    cout << -1 << "\\n";
    return 0;
}
`
    }
  }
];

const mediumCodingProblems = [
  {
    title: "Maximum Subarray Sum",
    topic: "Arrays & Dynamic Programming (Kadane)",
    difficulty: "Medium",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print maximum subarray sum.",
    constraints: "1 <= N <= 10^5\n-10^4 <= nums[i] <= 10^4",
    sample_input: "9\n-2 1 -3 4 -1 2 1 -5 4",
    sample_output: "6",
    test_cases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { input: "1\n1", expected: "1" },
      { input: "5\n5 4 -1 7 8", expected: "23" },
      { input: "3\n-3 -2 -1", expected: "-1" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    max_sum = cur_sum = nums[0]
    for x in nums[1:]:
        cur_sum = max(x, cur_sum + x)
        max_sum = max(max_sum, cur_sum)
    print(max_sum)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int curSum = sc.nextInt();
        int maxSum = curSum;
        for (int i = 1; i < n; i++) {
            int x = sc.nextInt();
            curSum = Math.max(x, curSum + x);
            maxSum = Math.max(maxSum, curSum);
        }
        System.out.println(maxSum);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int x; scanf("%d", &x);
    int cur_sum = x, max_sum = x;
    for (int i = 1; i < n; i++) {
        scanf("%d", &x);
        cur_sum = (x > cur_sum + x) ? x : cur_sum + x;
        if (cur_sum > max_sum) max_sum = cur_sum;
    }
    printf("%d\\n", max_sum);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    int x; cin >> x;
    int cur_sum = x, max_sum = x;
    for (int i = 1; i < n; i++) {
        cin >> x;
        cur_sum = max(x, cur_sum + x);
        max_sum = max(max_sum, cur_sum);
    }
    cout << max_sum << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Two Sum II - Sorted Array",
    topic: "Two Pointers",
    difficulty: "Medium",
    description: "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number.\n\nPrint the two 1-based indices separated by a single space.",
    input_format: "First line: N\nSecond line: N space-separated integers\nThird line: target",
    output_format: "Print the two 1-based indices.",
    constraints: "2 <= N <= 3 * 10^4\n-1000 <= numbers[i] <= 1000",
    sample_input: "4\n2 7 11 15\n9",
    sample_output: "1 2",
    test_cases: [
      { input: "4\n2 7 11 15\n9", expected: "1 2" },
      { input: "3\n2 3 4\n6", expected: "1 3" },
      { input: "2\n-1 0\n-1", expected: "1 2" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    target = int(data[n+1])
    l, r = 0, n - 1
    while l < r:
        s = nums[l] + nums[r]
        if s == target:
            print(f"{l + 1} {r + 1}")
            return
        elif s < target:
            l += 1
        else:
            r -= 1

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        int l = 0, r = n - 1;
        while (l < r) {
            int sum = nums[l] + nums[r];
            if (sum == target) {
                System.out.println((l + 1) + " " + (r + 1));
                return;
            } else if (sum < target) l++;
            else r--;
        }
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[30005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target; scanf("%d", &target);
    int l = 0, r = n - 1;
    while (l < r) {
        int s = nums[l] + nums[r];
        if (s == target) {
            printf("%d %d\\n", l + 1, r + 1);
            return 0;
        } else if (s < target) l++;
        else r--;
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target; cin >> target;
    int l = 0, r = n - 1;
    while (l < r) {
        int s = nums[l] + nums[r];
        if (s == target) {
            cout << (l + 1) << " " << (r + 1) << "\\n";
            return 0;
        } else if (s < target) l++;
        else r--;
    }
    return 0;
}
`
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window & Hashing",
    difficulty: "Medium",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    input_format: "Single line containing string s.",
    output_format: "Print length of longest unique substring.",
    constraints: "0 <= length(s) <= 5 * 10^4",
    sample_input: "abcabcbb",
    sample_output: "3",
    test_cases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: "", expected: "0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    s = sys.stdin.read().rstrip('\\r\\n')
    char_map = {}
    max_len = 0
    l = 0
    for r, c in enumerate(s):
        if c in char_map and char_map[c] >= l:
            l = char_map[c] + 1
        char_map[c] = r
        max_len = max(max_len, r - l + 1)
    print(max_len)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNextLine() ? sc.nextLine() : "";
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (map.containsKey(c) && map.get(c) >= l) {
                l = map.get(c) + 1;
            }
            map.put(c, r);
            maxLen = Math.max(maxLen, r - l + 1);
        }
        System.out.println(maxLen);
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[50005];
    if (!fgets(s, sizeof(s), stdin)) { printf("0\\n"); return 0; }
    int n = strlen(s);
    if (n > 0 && (s[n-1] == '\\n' || s[n-1] == '\\r')) s[--n] = '\\0';
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int max_len = 0, l = 0;
    for (int r = 0; r < n; r++) {
        unsigned char c = (unsigned char)s[r];
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        if (r - l + 1 > max_len) max_len = r - l + 1;
    }
    printf("%d\\n", max_len);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    if (!getline(cin, s)) { cout << 0 << "\\n"; return 0; }
    vector<int> last(256, -1);
    int max_len = 0, l = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        unsigned char c = s[r];
        if (last[c] >= l) l = last[c] + 1;
        last[c] = r;
        max_len = max(max_len, r - l + 1);
    }
    cout << max_len << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Product of Array Except Self",
    topic: "Prefix & Suffix Products",
    difficulty: "Medium",
    description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print space-separated product array.",
    constraints: "2 <= N <= 10^5\n-30 <= nums[i] <= 30",
    sample_input: "4\n1 2 3 4",
    sample_output: "24 12 8 6",
    test_cases: [
      { input: "4\n1 2 3 4", expected: "24 12 8 6" },
      { input: "5\n-1 1 0 -3 3", expected: "0 0 9 0 0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    print(' '.join(map(str, res)))

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        for (int i = 0; i < n; i++) System.out.print(res[i] + (i == n - 1 ? "" : " "));
        System.out.println();
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[10005], res[10005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int p = 1;
    for (int i = 0; i < n; i++) { res[i] = p; p *= nums[i]; }
    p = 1;
    for (int i = n - 1; i >= 0; i--) { res[i] *= p; p *= nums[i]; }
    for (int i = 0; i < n; i++) printf("%d%s", res[i], (i == n - 1 ? "" : " "));
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n), res(n, 1);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int p = 1;
    for (int i = 0; i < n; i++) { res[i] = p; p *= nums[i]; }
    p = 1;
    for (int i = n - 1; i >= 0; i--) { res[i] *= p; p *= nums[i]; }
    for (int i = 0; i < n; i++) cout << res[i] << (i == n - 1 ? "" : " ");
    cout << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Container With Most Water",
    topic: "Two Pointers",
    difficulty: "Medium",
    description: "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`-th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print maximum water capacity.",
    constraints: "2 <= N <= 10^5\n0 <= height[i] <= 10^4",
    sample_input: "9\n1 8 6 2 5 4 8 3 7",
    sample_output: "49",
    test_cases: [
      { input: "9\n1 8 6 2 5 4 8 3 7", expected: "49" },
      { input: "2\n1 1", expected: "1" },
      { input: "5\n4 3 2 1 4", expected: "16" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    h = [int(x) for x in data[1:n+1]]
    l, r = 0, n - 1
    max_area = 0
    while l < r:
        area = min(h[l], h[r]) * (r - l)
        max_area = max(max_area, area)
        if h[l] < h[r]:
            l += 1
        else:
            r -= 1
    print(max_area)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        int l = 0, r = n - 1, maxArea = 0;
        while (l < r) {
            int area = Math.min(h[l], h[r]) * (r - l);
            if (area > maxArea) maxArea = area;
            if (h[l] < h[r]) l++;
            else r--;
        }
        System.out.println(maxArea);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[10005];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    int l = 0, r = n - 1, max_a = 0;
    while (l < r) {
        int min_h = (h[l] < h[r]) ? h[l] : h[r];
        int area = min_h * (r - l);
        if (area > max_a) max_a = area;
        if (h[l] < h[r]) l++;
        else r--;
    }
    printf("%d\\n", max_a);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    int l = 0, r = n - 1, max_a = 0;
    while (l < r) {
        int a = min(h[l], h[r]) * (r - l);
        max_a = max(max_a, a);
        if (h[l] < h[r]) l++;
        else r--;
    }
    cout << max_a << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    difficulty: "Medium",
    description: "Given the array `nums` after possible unknown rotation and an integer `target`, return the 0-based index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must achieve an `O(log n)` runtime complexity.",
    input_format: "First line: N\nSecond line: N space-separated integers\nThird line: target",
    output_format: "Print index or -1.",
    constraints: "1 <= N <= 5000\n-10^4 <= nums[i] <= 10^4",
    sample_input: "7\n4 5 6 7 0 1 2\n0",
    sample_output: "4",
    test_cases: [
      { input: "7\n4 5 6 7 0 1 2\n0", expected: "4" },
      { input: "7\n4 5 6 7 0 1 2\n3", expected: "-1" },
      { input: "1\n1\n0", expected: "-1" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    target = int(data[n+1])
    l, r = 0, n - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target:
            print(m)
            return
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]:
                r = m - 1
            else:
                l = m + 1
        else:
            if nums[m] < target <= nums[r]:
                l = m + 1
            else:
                r = m - 1
    print(-1)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        int l = 0, r = n - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (nums[m] == target) { System.out.println(m); return; }
            if (nums[l] <= nums[m]) {
                if (nums[l] <= target && target < nums[m]) r = m - 1;
                else l = m + 1;
            } else {
                if (nums[m] < target && target <= nums[r]) l = m + 1;
                else r = m - 1;
            }
        }
        System.out.println(-1);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[5005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target; scanf("%d", &target);
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) { printf("%d\\n", m); return 0; }
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    printf("-1\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target; cin >> target;
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) { cout << m << "\\n"; return 0; }
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    cout << -1 << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Subarray Sum Equals K",
    topic: "Prefix Sum & Hash Map",
    difficulty: "Medium",
    description: "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.",
    input_format: "First line: N\nSecond line: N space-separated integers\nThird line: k",
    output_format: "Print count of matching subarrays.",
    constraints: "1 <= N <= 2 * 10^4\n-1000 <= nums[i] <= 1000",
    sample_input: "3\n1 1 1\n2",
    sample_output: "2",
    test_cases: [
      { input: "3\n1 1 1\n2", expected: "2" },
      { input: "3\n1 2 3\n3", expected: "2" },
      { input: "5\n1 -1 0 1 -1\n0", expected: "6" }
    ],
    starter_code: {
      python: `import sys
from collections import defaultdict

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    k = int(data[n+1])
    count = 0
    cur_sum = 0
    prefix_sums = defaultdict(int)
    prefix_sums[0] = 1
    for x in nums:
        cur_sum += x
        count += prefix_sums[cur_sum - k]
        prefix_sums[cur_sum] += 1
    print(count)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int k = sc.nextInt();
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int cur = 0, count = 0;
        for (int x : nums) {
            cur += x;
            count += map.getOrDefault(cur - k, 0);
            map.put(cur, map.getOrDefault(cur, 0) + 1);
        }
        System.out.println(count);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[20005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int k; scanf("%d", &k);
    int count = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += nums[j];
            if (sum == k) count++;
        }
    }
    printf("%d\\n", count);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int k; cin >> k;
    unordered_map<int, int> mp;
    mp[0] = 1;
    int cur = 0, count = 0;
    for (int x : nums) {
        cur += x;
        if (mp.count(cur - k)) count += mp[cur - k];
        mp[cur]++;
    }
    cout << count << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Merge Intervals",
    topic: "Intervals & Sorting",
    difficulty: "Medium",
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and print the resulting intervals sorted by start time.",
    input_format: "First line: N (number of intervals)\nNext N lines: start_i end_i",
    output_format: "Print each merged interval on a new line: start end",
    constraints: "1 <= N <= 10^4\n0 <= start_i <= end_i <= 10^4",
    sample_input: "4\n1 3\n2 6\n8 10\n15 18",
    sample_output: "1 6\n8 10\n15 18",
    test_cases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expected: "1 6\n8 10\n15 18" },
      { input: "2\n1 4\n4 5", expected: "1 5" },
      { input: "1\n1 4", expected: "1 4" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    intervals = []
    idx = 1
    for _ in range(n):
        intervals.append([int(data[idx]), int(data[idx+1])])
        idx += 2
    intervals.sort(key=lambda x: x[0])
    merged = []
    for iv in intervals:
        if not merged or merged[-1][1] < iv[0]:
            merged.append(iv)
        else:
            merged[-1][1] = max(merged[-1][1], iv[1])
    for iv in merged:
        print(f"{iv[0]} {iv[1]}")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[][] iv = new int[n][2];
        for (int i = 0; i < n; i++) { iv[i][0] = sc.nextInt(); iv[i][1] = sc.nextInt(); }
        Arrays.sort(iv, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> res = new ArrayList<>();
        for (int[] cur : iv) {
            if (res.isEmpty() || res.get(res.size() - 1)[1] < cur[0]) {
                res.add(cur);
            } else {
                res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], cur[1]);
            }
        }
        for (int[] x : res) System.out.println(x[0] + " " + x[1]);
    }
}
`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct { int start, end; } Interval;
int cmp(const void *a, const void *b) { return ((Interval*)a)->start - ((Interval*)b)->start; }

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    Interval iv[10005];
    for (int i = 0; i < n; i++) scanf("%d %d", &iv[i].start, &iv[i].end);
    qsort(iv, n, sizeof(Interval), cmp);
    Interval merged[10005];
    int m_count = 0;
    for (int i = 0; i < n; i++) {
        if (m_count == 0 || merged[m_count - 1].end < iv[i].start) {
            merged[m_count++] = iv[i];
        } else {
            if (iv[i].end > merged[m_count - 1].end) merged[m_count - 1].end = iv[i].end;
        }
    }
    for (int i = 0; i < m_count; i++) printf("%d %d\\n", merged[i].start, merged[i].end);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int, int>> iv(n);
    for (int i = 0; i < n; i++) cin >> iv[i].first >> iv[i].second;
    sort(iv.begin(), iv.end());
    vector<pair<int, int>> res;
    for (auto &x : iv) {
        if (res.empty() || res.back().second < x.first) res.push_back(x);
        else res.back().second = max(res.back().second, x.second);
    }
    for (auto &x : res) cout << x.first << " " << x.second << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "String Compression",
    topic: "Two Pointers & Strings",
    difficulty: "Medium",
    description: "Given a string of characters `chars`, compress it by grouping consecutive repeating characters. Each group should be replaced by the character followed by the group's length (if length > 1).\n\nPrint the compressed string.",
    input_format: "Single line containing string S.",
    output_format: "Print compressed string.",
    constraints: "1 <= length(S) <= 2000",
    sample_input: "aabcccccaaa",
    sample_output: "a2bc5a3",
    test_cases: [
      { input: "aabcccccaaa", expected: "a2bc5a3" },
      { input: "a", expected: "a" },
      { input: "abbbbbbbbbbbb", expected: "ab12" }
    ],
    starter_code: {
      python: `import sys

def solution():
    s = sys.stdin.read().strip()
    if not s:
        return
    res = []
    i = 0
    while i < len(s):
        char = s[i]
        count = 0
        while i < len(s) and s[i] == char:
            count += 1
            i += 1
        res.append(char)
        if count > 1:
            res.append(str(count))
    print(''.join(res))

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            char c = s.charAt(i);
            int count = 0;
            while (i < s.length() && s.charAt(i) == c) { count++; i++; }
            sb.append(c);
            if (count > 1) sb.append(count);
        }
        System.out.println(sb.toString());
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[2005];
    if (scanf("%s", s) != 1) return 0;
    int n = strlen(s);
    int i = 0;
    while (i < n) {
        char c = s[i];
        int count = 0;
        while (i < n && s[i] == c) { count++; i++; }
        printf("%c", c);
        if (count > 1) printf("%d", count);
    }
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    string res = "";
    int i = 0, n = s.size();
    while (i < n) {
        char c = s[i];
        int count = 0;
        while (i < n && s[i] == c) { count++; i++; }
        res += c;
        if (count > 1) res += to_string(count);
    }
    cout << res << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "3Sum",
    topic: "Sorting & Two Pointers",
    difficulty: "Medium",
    description: "Given an integer array nums, return all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nPrint each triplet on a new line in sorted order (triplets sorted internally, and lines sorted lexicographically). If no triplet exists, print 'None'.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print each triplet on a new line, or 'None'.",
    constraints: "3 <= N <= 3000\n-10^5 <= nums[i] <= 10^5",
    sample_input: "6\n-1 0 1 2 -1 -4",
    sample_output: "-1 -1 2\n-1 0 1",
    test_cases: [
      { input: "6\n-1 0 1 2 -1 -4", expected: "-1 -1 2\n-1 0 1" },
      { input: "3\n0 1 1", expected: "None" },
      { input: "3\n0 0 0", expected: "0 0 0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = sorted([int(x) for x in data[1:n+1]])
    res = []
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, n - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append(f"{nums[i]} {nums[l]} {nums[r]}")
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    if not res:
        print("None")
    else:
        for trip in res:
            print(trip)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        Arrays.sort(nums);
        List<String> res = new ArrayList<>();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(nums[i] + " " + nums[l] + " " + nums[r]);
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        if (res.isEmpty()) System.out.println("None");
        else for (String s : res) System.out.println(s);
    }
}
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[3005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    qsort(nums, n, sizeof(int), cmp);
    int found = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                printf("%d %d %d\\n", nums[i], nums[l], nums[r]);
                found = 1;
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    if (!found) printf("None\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    sort(nums.begin(), nums.end());
    vector<string> res;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = n - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                res.push_back(to_string(nums[i]) + " " + to_string(nums[l]) + " " + to_string(nums[r]));
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    if (res.empty()) cout << "None\\n";
    else for (auto &s : res) cout << s << "\\n";
    return 0;
}
`
    }
  }
];

const hardCodingProblems = [
  {
    title: "Trapping Rain Water",
    topic: "Two Pointers & Dynamic Programming",
    difficulty: "Hard",
    description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    input_format: "First line: N\nSecond line: N space-separated elevation integers",
    output_format: "Print total trapped rain water units.",
    constraints: "1 <= N <= 2 * 10^4\n0 <= height[i] <= 10^5",
    sample_input: "12\n0 1 0 2 1 0 1 3 2 1 2 1",
    sample_output: "6",
    test_cases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" },
      { input: "6\n4 2 0 3 2 5", expected: "9" },
      { input: "3\n3 0 2", expected: "2" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    h = [int(x) for x in data[1:n+1]]
    if n < 3:
        print(0)
        return
    l, r = 0, n - 1
    left_max, right_max = h[l], h[r]
    water = 0
    while l < r:
        if left_max < right_max:
            l += 1
            left_max = max(left_max, h[l])
            water += left_max - h[l]
        else:
            r -= 1
            right_max = max(right_max, h[r])
            water += right_max - h[r]
    print(water)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        if (n < 3) { System.out.println(0); return; }
        int l = 0, r = n - 1, leftMax = h[0], rightMax = h[n - 1];
        long water = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, h[l]);
                water += leftMax - h[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, h[r]);
                water += rightMax - h[r];
            }
        }
        System.out.println(water);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[20005];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    if (n < 3) { printf("0\\n"); return 0; }
    int l = 0, r = n - 1, left_max = h[0], right_max = h[n - 1];
    long long water = 0;
    while (l < r) {
        if (left_max < right_max) {
            l++;
            if (h[l] > left_max) left_max = h[l];
            water += left_max - h[l];
        } else {
            r--;
            if (h[r] > right_max) right_max = h[r];
            water += right_max - h[r];
        }
    }
    printf("%lld\\n", water);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    if (n < 3) { cout << 0 << "\\n"; return 0; }
    int l = 0, r = n - 1, lmax = h[0], rmax = h[n - 1];
    long long water = 0;
    while (l < r) {
        if (lmax < rmax) {
            l++;
            lmax = max(lmax, h[l]);
            water += lmax - h[l];
        } else {
            r--;
            rmax = max(rmax, h[r]);
            water += rmax - h[r];
        }
    }
    cout << water << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Sliding Window Maximum",
    topic: "Monotonic Queue & Deque",
    difficulty: "Hard",
    description: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nPrint the max sliding window values separated by spaces.",
    input_format: "First line: N\nSecond line: N space-separated integers\nThird line: k",
    output_format: "Print space-separated maximum values.",
    constraints: "1 <= N <= 10^5\n1 <= k <= N",
    sample_input: "8\n1 3 -1 -3 5 3 6 7\n3",
    sample_output: "3 3 5 5 6 7",
    test_cases: [
      { input: "8\n1 3 -1 -3 5 3 6 7\n3", expected: "3 3 5 5 6 7" },
      { input: "1\n1\n1", expected: "1" },
      { input: "4\n9 11 8 5\n2", expected: "11 11 8" }
    ],
    starter_code: {
      python: `import sys
from collections import deque

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    k = int(data[n+1])
    q = deque()
    res = []
    for i, x in enumerate(nums):
        while q and q[0] <= i - k:
            q.popleft()
        while q and nums[q[-1]] <= x:
            q.pop()
        q.append(i)
        if i >= k - 1:
            res.append(nums[q[0]])
    print(' '.join(map(str, res)))

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int k = sc.nextInt();
        Deque<Integer> q = new ArrayDeque<>();
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            while (!q.isEmpty() && q.peekFirst() <= i - k) q.pollFirst();
            while (!q.isEmpty() && nums[q.peekLast()] <= nums[i]) q.pollLast();
            q.offerLast(i);
            if (i >= k - 1) res.add(nums[q.peekFirst()]);
        }
        for (int i = 0; i < res.size(); i++) System.out.print(res.get(i) + (i == res.size() - 1 ? "" : " "));
        System.out.println();
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[100005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int k; scanf("%d", &k);
    int q[100005], head = 0, tail = 0;
    int first = 1;
    for (int i = 0; i < n; i++) {
        while (head < tail && q[head] <= i - k) head++;
        while (head < tail && nums[q[tail - 1]] <= nums[i]) tail--;
        q[tail++] = i;
        if (i >= k - 1) {
            if (!first) printf(" ");
            printf("%d", nums[q[head]]);
            first = 0;
        }
    }
    printf("\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int k; cin >> k;
    deque<int> q;
    vector<int> res;
    for (int i = 0; i < n; i++) {
        while (!q.empty() && q.front() <= i - k) q.pop_front();
        while (!q.empty() && nums[q.back()] <= nums[i]) q.pop_back();
        q.push_back(i);
        if (i >= k - 1) res.push_back(nums[q.front()]);
    }
    for (int i = 0; i < (int)res.size(); i++) cout << res[i] << (i == (int)res.size() - 1 ? "" : " ");
    cout << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Minimum Window Substring",
    topic: "Sliding Window & Hash Map",
    difficulty: "Hard",
    description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, print an empty string (or `\"\"`).",
    input_format: "First line: string s\nSecond line: string t",
    output_format: "Print minimum window substring.",
    constraints: "1 <= length(s), length(t) <= 10^5",
    sample_input: "ADOBECODEBANC\nABC",
    sample_output: "BANC",
    test_cases: [
      { input: "ADOBECODEBANC\nABC", expected: "BANC" },
      { input: "a\na", expected: "a" },
      { input: "a\naa", expected: "" }
    ],
    starter_code: {
      python: `import sys
from collections import Counter

def solution():
    data = sys.stdin.read().split()
    if len(data) < 2:
        return
    s, t = data[0], data[1]
    if not t or not s:
        print("")
        return
    t_cnt = Counter(t)
    have, need = 0, len(t_cnt)
    window = {}
    res, res_len = [-1, -1], float('inf')
    l = 0
    for r, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in t_cnt and window[c] == t_cnt[c]:
            have += 1
        while have == need:
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1
            window[s[l]] -= 1
            if s[l] in t_cnt and window[s[l]] < t_cnt[s[l]]:
                have -= 1
            l += 1
    l, r = res
    print(s[l:r+1] if res_len != float('inf') else "")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next(), t = sc.next();
        int[] tmap = new int[128];
        for (char c : t.toCharArray()) tmap[c]++;
        int count = t.length(), l = 0, minLen = Integer.MAX_VALUE, start = 0;
        for (int r = 0; r < s.length(); r++) {
            if (tmap[s.charAt(r)]-- > 0) count--;
            while (count == 0) {
                if (r - l + 1 < minLen) { minLen = r - l + 1; start = l; }
                if (++tmap[s.charAt(l)] > 0) count++;
                l++;
            }
        }
        System.out.println(minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen));
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[100005], t[100005];
    if (scanf("%s %s", s, t) != 2) return 0;
    int tmap[128] = {0};
    int tlen = strlen(t), slen = strlen(s);
    for (int i = 0; i < tlen; i++) tmap[(unsigned char)t[i]]++;
    int count = tlen, l = 0, min_len = 1000000, start = 0;
    for (int r = 0; r < slen; r++) {
        if (tmap[(unsigned char)s[r]]-- > 0) count--;
        while (count == 0) {
            if (r - l + 1 < min_len) { min_len = r - l + 1; start = l; }
            if (++tmap[(unsigned char)s[l]] > 0) count++;
            l++;
        }
    }
    if (min_len > slen) printf("\\n");
    else {
        s[start + min_len] = '\\0';
        printf("%s\\n", s + start);
    }
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    vector<int> tmap(128, 0);
    for (char c : t) tmap[c]++;
    int count = t.size(), l = 0, min_len = INT_MAX, start = 0;
    for (int r = 0; r < (int)s.size(); r++) {
        if (tmap[s[r]]-- > 0) count--;
        while (count == 0) {
            if (r - l + 1 < min_len) { min_len = r - l + 1; start = l; }
            if (++tmap[s[l]] > 0) count++;
            l++;
        }
    }
    cout << (min_len == INT_MAX ? "" : s.substr(start, min_len)) << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Largest Rectangle in Histogram",
    topic: "Monotonic Stack",
    difficulty: "Hard",
    description: "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    input_format: "First line: N\nSecond line: N space-separated bar heights",
    output_format: "Print maximum rectangular area.",
    constraints: "1 <= N <= 10^5\n0 <= heights[i] <= 10^4",
    sample_input: "6\n2 1 5 6 2 3",
    sample_output: "10",
    test_cases: [
      { input: "6\n2 1 5 6 2 3", expected: "10" },
      { input: "2\n2 4", expected: "4" },
      { input: "1\n5", expected: "5" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    heights = [int(x) for x in data[1:n+1]]
    stack = []
    max_area = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    for i, h in stack:
        max_area = max(max_area, h * (n - i))
    print(max_area)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        Deque<Integer> stack = new ArrayDeque<>();
        long maxArea = 0;
        for (int i = 0; i <= n; i++) {
            int curH = (i == n) ? 0 : h[i];
            while (!stack.isEmpty() && h[stack.peek()] > curH) {
                int height = h[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, (long)height * width);
            }
            stack.push(i);
        }
        System.out.println(maxArea);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int h[100005];
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    int stack[100005], top = -1;
    long long max_area = 0;
    for (int i = 0; i <= n; i++) {
        int cur_h = (i == n) ? 0 : h[i];
        while (top >= 0 && h[stack[top]] > cur_h) {
            int height = h[stack[top--]];
            int width = (top < 0) ? i : i - stack[top] - 1;
            long long area = (long long)height * width;
            if (area > max_area) max_area = area;
        }
        stack[++top] = i;
    }
    printf("%lld\\n", max_area);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> h(n);
    for (int i = 0; i < n; i++) cin >> h[i];
    stack<int> st;
    long long max_area = 0;
    for (int i = 0; i <= n; i++) {
        int cur_h = (i == n) ? 0 : h[i];
        while (!st.empty() && h[st.top()] > cur_h) {
            int height = h[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            max_area = max(max_area, 1LL * height * width);
        }
        st.push(i);
    }
    cout << max_area << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "First Missing Positive",
    topic: "Array Index Hashing",
    difficulty: "Hard",
    description: "Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums`.\n\nYou must implement an algorithm that runs in `O(n)` time and uses `O(1)` auxiliary space.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print smallest missing positive integer.",
    constraints: "1 <= N <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1",
    sample_input: "3\n1 2 0",
    sample_output: "3",
    test_cases: [
      { input: "3\n1 2 0", expected: "3" },
      { input: "4\n3 4 -1 1", expected: "2" },
      { input: "5\n7 8 9 11 12", expected: "1" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            target = nums[i] - 1
            nums[i], nums[target] = nums[target], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            print(i + 1)
            return
    print(n + 1)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int target = nums[i] - 1;
                int tmp = nums[i]; nums[i] = nums[target]; nums[target] = tmp;
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) { System.out.println(i + 1); return; }
        }
        System.out.println(n + 1);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[100005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            int t = nums[i] - 1;
            int tmp = nums[i]; nums[i] = nums[t]; nums[t] = tmp;
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) { printf("%d\\n", i + 1); return 0; }
    }
    printf("%d\\n", n + 1);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            swap(nums[i], nums[nums[i] - 1]);
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) { cout << (i + 1) << "\\n"; return 0; }
    }
    cout << (n + 1) << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Edit Distance",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    description: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
    input_format: "First line: word1\nSecond line: word2",
    output_format: "Print minimum edit operations.",
    constraints: "0 <= length(word1), length(word2) <= 500",
    sample_input: "horse\nros",
    sample_output: "3",
    test_cases: [
      { input: "horse\nros", expected: "3" },
      { input: "intention\nexecution", expected: "5" },
      { input: "a\nb", expected: "1" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    w1 = data[0] if len(data) > 0 else ""
    w2 = data[1] if len(data) > 1 else ""
    m, n = len(w1), len(w2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if w1[i - 1] == w2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    print(dp[m][n])

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String w1 = sc.hasNext() ? sc.next() : "";
        String w2 = sc.hasNext() ? sc.next() : "";
        int m = w1.length(), n = w2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        System.out.println(dp[m][n]);
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int min3(int a, int b, int c) {
    int m = a < b ? a : b;
    return m < c ? m : c;
}

int main() {
    char w1[505] = "", w2[505] = "";
    scanf("%s", w1);
    scanf("%s", w2);
    int m = strlen(w1), n = strlen(w2);
    int dp[505][505];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i - 1] == w2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min3(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    printf("%d\\n", dp[m][n]);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string w1 = "", w2 = "";
    cin >> w1 >> w2;
    int m = w1.size(), n = w2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i - 1] == w2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
        }
    }
    cout << dp[m][n] << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Median of Two Sorted Arrays",
    topic: "Binary Search",
    difficulty: "Hard",
    description: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be `O(log (m+n))`. Print the median formatted to 1 decimal place.",
    input_format: "First line: M\nSecond line: M space-separated integers\nThird line: N\nFourth line: N space-separated integers",
    output_format: "Print median formatted to 1 decimal place.",
    constraints: "0 <= M, N <= 1000\n1 <= M + N <= 2000",
    sample_input: "2\n1 3\n1\n2",
    sample_output: "2.0",
    test_cases: [
      { input: "2\n1 3\n1\n2", expected: "2.0" },
      { input: "2\n1 2\n2\n3 4", expected: "2.5" },
      { input: "0\n\n1\n1", expected: "1.0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    m = int(data[0])
    nums1 = [int(x) for x in data[1:m+1]]
    n = int(data[m+1])
    nums2 = [int(x) for x in data[m+2:m+2+n]]
    merged = sorted(nums1 + nums2)
    total = len(merged)
    if total % 2 == 1:
        print(f"{float(merged[total // 2]):.1f}")
    else:
        print(f"{(merged[total // 2 - 1] + merged[total // 2]) / 2.0:.1f}")

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < m; i++) list.add(sc.nextInt());
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) list.add(sc.nextInt());
        Collections.sort(list);
        int total = list.size();
        if (total % 2 == 1) {
            System.out.printf(Locale.US, "%.1f\\n", (double)list.get(total / 2));
        } else {
            System.out.printf(Locale.US, "%.1f\\n", (list.get(total / 2 - 1) + list.get(total / 2)) / 2.0);
        }
    }
}
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < m; i++) scanf("%d", &arr[i]);
    int n; scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[m + i]);
    int total = m + n;
    qsort(arr, total, sizeof(int), cmp);
    if (total % 2 == 1) printf("%.1f\\n", (double)arr[total / 2]);
    else printf("%.1f\\n", (arr[total / 2 - 1] + arr[total / 2]) / 2.0);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int m;
    if (!(cin >> m)) return 0;
    vector<int> a(m);
    for (int i = 0; i < m; i++) cin >> a[i];
    int n; cin >> n;
    vector<int> b(n);
    for (int i = 0; i < n; i++) cin >> b[i];
    vector<int> c;
    c.insert(c.end(), a.begin(), a.end());
    c.insert(c.end(), b.begin(), b.end());
    sort(c.begin(), c.end());
    int total = c.size();
    cout << fixed << setprecision(1);
    if (total % 2 == 1) cout << (double)c[total / 2] << "\\n";
    else cout << (c[total / 2 - 1] + c[total / 2]) / 2.0 << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Longest Valid Parentheses",
    topic: "Stack & Dynamic Programming",
    difficulty: "Hard",
    description: "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
    input_format: "Single line containing string s.",
    output_format: "Print length of longest valid parentheses substring.",
    constraints: "0 <= length(s) <= 3 * 10^4",
    sample_input: ")()())",
    sample_output: "4",
    test_cases: [
      { input: ")()())", expected: "4" },
      { input: "(()", expected: "2" },
      { input: "", expected: "0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    s = sys.stdin.read().strip()
    stack = [-1]
    max_len = 0
    for i, c in enumerate(s):
        if c == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)
            else:
                max_len = max(max_len, i - stack[-1])
    print(max_len)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.hasNext() ? sc.next() : "";
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(-1);
        int maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') {
                stack.push(i);
            } else {
                stack.pop();
                if (stack.isEmpty()) stack.push(i);
                else maxLen = Math.max(maxLen, i - stack.peek());
            }
        }
        System.out.println(maxLen);
    }
}
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    char s[30005];
    if (scanf("%s", s) != 1) { printf("0\\n"); return 0; }
    int stack[30005], top = 0;
    stack[0] = -1;
    int max_len = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') {
            stack[++top] = i;
        } else {
            top--;
            if (top < 0) { stack[++top] = i; }
            else {
                int len = i - stack[top];
                if (len > max_len) max_len = len;
            }
        }
    }
    printf("%d\\n", max_len);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) { cout << 0 << "\\n"; return 0; }
    stack<int> st;
    st.push(-1);
    int max_len = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] == '(') st.push(i);
        else {
            st.pop();
            if (st.empty()) st.push(i);
            else max_len = max(max_len, i - st.top());
        }
    }
    cout << max_len << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Coin Change - Minimum Coins",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, print `-1`.",
    input_format: "First line: N (number of denominations)\nSecond line: N space-separated coin values\nThird line: amount",
    output_format: "Print minimum coins needed or -1.",
    constraints: "1 <= N <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    sample_input: "3\n1 2 5\n11",
    sample_output: "3",
    test_cases: [
      { input: "3\n1 2 5\n11", expected: "3" },
      { input: "1\n2\n3", expected: "-1" },
      { input: "1\n1\n0", expected: "0" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    coins = [int(x) for x in data[1:n+1]]
    amount = int(data[n+1])
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    print(dp[amount] if dp[amount] != float('inf') else -1)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();
        int amount = sc.nextInt();
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (a - c >= 0) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
            }
        }
        System.out.println(dp[amount] > amount ? -1 : dp[amount]);
    }
}
`,
      c: `#include <stdio.h>

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int coins[15];
    for (int i = 0; i < n; i++) scanf("%d", &coins[i]);
    int amount; scanf("%d", &amount);
    int dp[10005];
    for (int i = 0; i <= amount; i++) dp[i] = 100000;
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int i = 0; i < n; i++) {
            if (a - coins[i] >= 0) {
                int cand = 1 + dp[a - coins[i]];
                if (cand < dp[a]) dp[a] = cand;
            }
        }
    }
    printf("%d\\n", dp[amount] > amount ? -1 : dp[amount]);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    int amount; cin >> amount;
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int c : coins) {
            if (a - c >= 0) dp[a] = min(dp[a], 1 + dp[a - c]);
        }
    }
    cout << (dp[amount] > amount ? -1 : dp[amount]) << "\\n";
    return 0;
}
`
    }
  },
  {
    title: "Maximum Product Subarray",
    topic: "Dynamic Programming",
    difficulty: "Hard",
    description: "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
    input_format: "First line: N\nSecond line: N space-separated integers",
    output_format: "Print maximum product of a contiguous subarray.",
    constraints: "1 <= N <= 2 * 10^4\n-10 <= nums[i] <= 10",
    sample_input: "4\n2 3 -2 4",
    sample_output: "6",
    test_cases: [
      { input: "4\n2 3 -2 4", expected: "6" },
      { input: "3\n-2 0 -1", expected: "0" },
      { input: "1\n-2", expected: "-2" }
    ],
    starter_code: {
      python: `import sys

def solution():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    res = max(nums)
    cur_min, cur_max = 1, 1
    for x in nums:
        if x == 0:
            cur_min, cur_max = 1, 1
            continue
        tmp = cur_max * x
        cur_max = max(x * cur_max, x * cur_min, x)
        cur_min = min(tmp, x * cur_min, x)
        res = max(res, cur_max)
    print(res)

if __name__ == '__main__':
    solution()
`,
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        long res = nums[0], curMin = 1, curMax = 1;
        for (int x : nums) {
            long tempMax = Math.max(x, Math.max(curMax * x, curMin * x));
            curMin = Math.min(x, Math.min(curMax * x, curMin * x));
            curMax = tempMax;
            res = Math.max(res, curMax);
        }
        System.out.println(res);
    }
}
`,
      c: `#include <stdio.h>

long long max3(long long a, long long b, long long c) {
    long long m = a > b ? a : b; return m > c ? m : c;
}
long long min3(long long a, long long b, long long c) {
    long long m = a < b ? a : b; return m < c ? m : c;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int nums[20005];
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    long long res = nums[0], cur_min = 1, cur_max = 1;
    for (int i = 0; i < n; i++) {
        long long x = nums[i];
        long long tmax = max3(x, cur_max * x, cur_min * x);
        cur_min = min3(x, cur_max * x, cur_min * x);
        cur_max = tmax;
        if (cur_max > res) res = cur_max;
    }
    printf("%lld\\n", res);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    long long res = nums[0], cur_min = 1, cur_max = 1;
    for (int x : nums) {
        long long tmax = max({1LL * x, cur_max * x, cur_min * x});
        cur_min = min({1LL * x, cur_max * x, cur_min * x});
        cur_max = tmax;
        res = max(res, cur_max);
    }
    cout << res << "\\n";
    return 0;
}
`
    }
  }
];

module.exports = {
  easyCodingProblems,
  mediumCodingProblems,
  hardCodingProblems
};
