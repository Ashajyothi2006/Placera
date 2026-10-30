// Company-Specific Data Structures & Algorithms (DSA) Question Banks (20 questions per company)
// Covers Arrays, Linked Lists, Stacks, Queues, Trees, BST, Heaps, Graphs, Hashing, and DP.

function generateDSAForCompany(companySlug) {
  const companyPrefix = companySlug.toUpperCase();
  const pool = [
    {
      q: `[${companyPrefix} Linked Lists] What is the time complexity of detecting a cycle in a singly linked list using Floyd's Tortoise and Hare algorithm?`,
      opts: ["O(1) time, O(n) space", "O(n) time, O(1) space", "O(n log n) time, O(1) space", "O(n^2) time, O(1) space"],
      ans: 1,
      diff: "Easy",
      exp: "Floyd's algorithm uses two pointers (slow and fast) moving at 1x and 2x speeds, detecting a loop in linear O(n) time and constant O(1) extra space."
    },
    {
      q: `[${companyPrefix} Binary Trees] If a binary tree with n nodes has an inorder traversal of: 4, 2, 5, 1, 3 and preorder traversal of: 1, 2, 4, 5, 3, what is its postorder traversal?`,
      opts: ["4, 5, 2, 3, 1", "4, 2, 5, 3, 1", "5, 4, 2, 3, 1", "3, 5, 4, 2, 1"],
      ans: 0,
      diff: "Medium",
      exp: "Root is 1. Left subtree contains 4, 2, 5 (root 2, left 4, right 5). Right subtree is 3. Postorder traversal (Left, Right, Root) is: 4, 5, 2, 3, 1."
    },
    {
      q: `[${companyPrefix} Stacks] Which data structure is used internally by compilers for syntax checking of balanced brackets and evaluating postfix expressions?`,
      opts: ["Queue", "Stack", "Priority Queue", "Circular Buffer"],
      ans: 1,
      diff: "Easy",
      exp: "Stacks follow LIFO (Last In First Out) principle, making them ideal for nesting structures, parentheses balancing, and reverse Polish notation evaluation."
    },
    {
      q: `[${companyPrefix} BST] What is the worst-case time complexity of searching for a value in an un-balanced Binary Search Tree (BST)?`,
      opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      ans: 2,
      diff: "Easy",
      exp: "When a BST is degenerate (skewed like a linked list with sorted input), tree height becomes n, yielding O(n) worst-case search complexity."
    },
    {
      q: `[${companyPrefix} Graph Algorithms] Which algorithm is best suited to find the shortest path from a single source node in a graph with non-negative edge weights?`,
      opts: ["Bellman-Ford Algorithm", "Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Kruskal's Algorithm"],
      ans: 1,
      diff: "Medium",
      exp: "Dijkstra's algorithm using a Min-Heap priority queue computes shortest paths in O((V + E) log V) time for graphs with non-negative edge weights."
    },
    {
      q: `[${companyPrefix} Sorting] Which of the following sorting algorithms is NOT stable in its standard array-based implementation?`,
      opts: ["Merge Sort", "Insertion Sort", "Quick Sort", "Bubble Sort"],
      ans: 2,
      diff: "Medium",
      exp: "Standard Quick Sort swaps non-adjacent elements over the pivot, potentially altering the relative order of duplicate elements and making it unstable."
    },
    {
      q: `[${companyPrefix} Heaps] In a Min-Heap with n elements, what is the time complexity to extract the minimum element?`,
      opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      ans: 1,
      diff: "Easy",
      exp: "Extracting the root takes O(1) to remove, but restoring the heap property (heapify-down) takes O(log n) time."
    },
    {
      q: `[${companyPrefix} Dynamic Programming] What is the time complexity of solving the 0/1 Knapsack problem with n items and capacity W using 2D DP?`,
      opts: ["O(2^n)", "O(n * W)", "O(n + W)", "O(W log n)"],
      ans: 1,
      diff: "Medium",
      exp: "The standard dynamic programming table has dimensions (n + 1) x (W + 1), requiring O(n * W) pseudo-polynomial time and space."
    },
    {
      q: `[${companyPrefix} Queues] In a circular queue implemented using an array of size N, what condition indicates that the queue is completely full?`,
      opts: ["(front == rear)", "(rear + 1) % N == front", "rear == N - 1", "front == 0"],
      ans: 1,
      diff: "Medium",
      exp: "In circular queue array implementation with one slot left open or modulo arithmetic, full condition is (rear + 1) % N == front."
    },
    {
      q: `[${companyPrefix} Hashing] When collision occurs in a hash table using open addressing, which probing technique reduces primary clustering?`,
      opts: ["Linear Probing", "Quadratic Probing", "Separate Chaining", "Direct Addressing"],
      ans: 1,
      diff: "Hard",
      exp: "Quadratic probing uses quadratic polynomial increments h(k, i) = (h(k) + c1*i + c2*i^2) mod m, preventing primary clusters formed by linear probing."
    },
    {
      q: `[${companyPrefix} AVL Trees] In an AVL tree, what are the permissible values of the balance factor for any node?`,
      opts: ["-1, 0, +1", "-2, 0, +2", "0 only", "-1, 1"],
      ans: 0,
      diff: "Easy",
      exp: "By definition, an AVL tree maintains a balance factor (height(left) - height(right)) of -1, 0, or +1 at every node."
    },
    {
      q: `[${companyPrefix} Graph Traversal] Which traversal on a Directed Acyclic Graph (DAG) produces a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v?`,
      opts: ["Breadth-First Search (BFS)", "Topological Sort", "Preorder Traversal", "Dijkstra's Order"],
      ans: 1,
      diff: "Medium",
      exp: "Topological sorting linearly orders vertices of a DAG adhering to dependency directions, solvable via Kahn's algorithm or DFS post-order reversal in O(V + E)."
    },
    {
      q: `[${companyPrefix} Array Algorithms] What is Kadane's algorithm used for, and what is its optimal time complexity?`,
      opts: ["Finding median in O(n log n)", "Finding maximum subarray sum in O(n)", "Rotating array in O(n^2)", "Finding missing number in O(log n)"],
      ans: 1,
      diff: "Easy",
      exp: "Kadane's algorithm finds the maximum sum contiguous subarray in a single pass O(n) time and O(1) space."
    },
    {
      q: `[${companyPrefix} Disjoint Sets] What are the time complexities of union-find operations with Path Compression and Union by Rank?`,
      opts: ["O(log n)", "O(1)", "O(alpha(n)) - Inverse Ackermann", "O(n)"],
      ans: 2,
      diff: "Hard",
      exp: "Combining path compression with union by rank guarantees nearly constant amortized time O(alpha(n)) per operation, where alpha is the extremely slowly growing inverse Ackermann function."
    },
    {
      q: `[${companyPrefix} Strings & Tries] What is the time complexity to search for a string of length L in a Trie containing N total keys?`,
      opts: ["O(N * L)", "O(L)", "O(log N)", "O(N)"],
      ans: 1,
      diff: "Medium",
      exp: "Trie lookups traverse one node per character in the target key, taking O(L) time regardless of the total number of keys in the Trie."
    },
    {
      q: `[${companyPrefix} Minimum Spanning Tree] Which algorithm maintains a cut and iteratively adds the minimum-weight crossing edge to grow the tree?`,
      opts: ["Prim's Algorithm", "Kruskal's Algorithm", "Floyd's Algorithm", "Tarjan's Algorithm"],
      ans: 0,
      diff: "Medium",
      exp: "Prim's algorithm starts from a single vertex and greedily expands the connected component by choosing the minimum weight edge crossing the cut."
    },
    {
      q: `[${companyPrefix} Sliding Window] For finding the maximum element in every sliding window of size k in an array of size n, which data structure achieves O(n) total time?`,
      opts: ["Binary Heap", "Monotonic Deque", "Red-Black Tree", "Stack"],
      ans: 1,
      diff: "Hard",
      exp: "A monotonic double-ended queue (deque) storing indices of potential maxima in decreasing order allows adding and evicting elements in amortized O(1) per step, yielding O(n) overall."
    },
    {
      q: `[${companyPrefix} Binary Search] What is the minimum number of comparisons needed to find an element in a sorted array of 1024 elements using Binary Search in the worst case?`,
      opts: ["10", "11", "512", "1024"],
      ans: 1,
      diff: "Medium",
      exp: "Worst-case comparisons = floor(log2(n)) + 1 = floor(log2(1024)) + 1 = 10 + 1 = 11 comparisons."
    },
    {
      q: `[${companyPrefix} Trees] What is the lowest common ancestor (LCA) of nodes 4 and 5 in a binary tree where root is 1, left child of 1 is 2, right is 3, and children of 2 are 4 and 5?`,
      opts: ["1", "2", "3", "None"],
      ans: 1,
      diff: "Easy",
      exp: "Both 4 and 5 are immediate children of node 2. Hence, node 2 is their lowest common ancestor."
    },
    {
      q: `[${companyPrefix} Dynamic Programming] What is the time complexity to find the Longest Common Subsequence (LCS) between two strings of lengths m and n using DP?`,
      opts: ["O(m + n)", "O(m * n)", "O(2^(m+n))", "O(m log n)"],
      ans: 1,
      diff: "Easy",
      exp: "The DP table dimensions are (m + 1) x (n + 1), and each subproblem is computed in constant time, leading to O(m * n) time complexity."
    }
  ];

  return pool.map((item, idx) => ({
    question: item.q,
    options: item.opts,
    correct_index: item.ans,
    difficulty: item.diff,
    explanation: item.exp
  }));
}

module.exports = { generateDSAForCompany };
