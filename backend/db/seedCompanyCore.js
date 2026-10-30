// Company-Specific Core Technical Concepts Question Banks (20 questions per company)
// Covers OS, DBMS, Networks, OOP, System Architecture, and Cloud.

function generateCoreForCompany(companySlug) {
  const companyPrefix = companySlug.toUpperCase();
  const pool = [
    {
      q: `[${companyPrefix} Operating Systems] Which CPU scheduling algorithm can lead to starvation for processes with longer burst times?`,
      opts: ["Round Robin (RR)", "First-Come First-Served (FCFS)", "Shortest Job First (SJF)", "Priority Scheduling without Aging"],
      ans: 2,
      diff: "Medium",
      exp: "In non-preemptive or preemptive SJF, if shorter jobs continuously enter the ready queue, longer burst jobs may suffer indefinitely from starvation."
    },
    {
      q: `[${companyPrefix} DBMS] Which of the following is NOT a property of ACID transactions in relational databases?`,
      opts: ["Atomicity", "Consistency", "Concurrency", "Durability"],
      ans: 2,
      diff: "Easy",
      exp: "ACID stands for Atomicity, Consistency, Isolation, Durability. 'Concurrency' is not one of the ACID acronym letters (Isolation manages concurrency)."
    },
    {
      q: `[${companyPrefix} Computer Networks] In the TCP/IP suite, which layer is responsible for end-to-end reliable data transmission and flow control?`,
      opts: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
      ans: 1,
      diff: "Easy",
      exp: "The Transport Layer (utilizing protocols like TCP) manages process-to-process delivery, flow control, sequence numbers, acknowledgments, and error correction."
    },
    {
      q: `[${companyPrefix} OOP Principles] In Object-Oriented Programming, what is the term for having multiple methods in the same class with the same name but different parameter signatures?`,
      opts: ["Method Overriding", "Method Overloading", "Encapsulation", "Dynamic Binding"],
      ans: 1,
      diff: "Easy",
      exp: "Method overloading occurs at compile time when methods share the same identifier but differ in parameter count, type, or order."
    },
    {
      q: `[${companyPrefix} OS Deadlocks] Which of the following is NOT one of Coffman's four necessary conditions for a deadlock to occur?`,
      opts: ["Mutual Exclusion", "Hold and Wait", "Preemptive Resource Allocation", "Circular Wait"],
      ans: 2,
      diff: "Medium",
      exp: "The 4 Coffman conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlocks cannot occur."
    },
    {
      q: `[${companyPrefix} Normalization] A relation where every non-key attribute is non-transitively dependent on the primary key satisfies which normal form?`,
      opts: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
      ans: 2,
      diff: "Medium",
      exp: "3NF requires the relation to be in 2NF and have no transitive functional dependencies of non-prime attributes on candidate keys."
    },
    {
      q: `[${companyPrefix} Computer Networks] Which HTTP status code represents '401 Unauthorized' vs '403 Forbidden'?`,
      opts: [
        "401 means authentication required/failed; 403 means authenticated but lacks permission",
        "401 means page moved permanently; 403 means server error",
        "401 means bad gateway; 403 means service unavailable",
        "Both codes mean exactly the same thing"
      ],
      ans: 0,
      diff: "Easy",
      exp: "401 indicates missing or invalid authentication credentials. 403 indicates the server understands who you are, but you are not permitted access to the resource."
    },
    {
      q: `[${companyPrefix} OS Virtual Memory] What problem occurs when a computer's operating system spends more time swapping pages into and out of memory than executing processes?`,
      opts: ["Starvation", "Deadlock", "Thrashing", "Paging anomaly"],
      ans: 2,
      diff: "Medium",
      exp: "Thrashing occurs when the system's working set cannot fit in physical memory, causing continuous page faults and thrashing the disk I/O."
    },
    {
      q: `[${companyPrefix} SQL Indexing] What is the primary data structure utilized by standard relational databases (such as MySQL InnoDB or PostgreSQL) for B-Tree indexes?`,
      opts: ["Binary Search Tree", "B+ Tree", "Hash Table", "Skip List"],
      ans: 1,
      diff: "Medium",
      exp: "B+ Trees store all actual record pointers in leaf nodes linked as a doubly linked list, enabling efficient range scans and logarithmic search depth."
    },
    {
      q: `[${companyPrefix} TCP Handshake] How many packets are exchanged in a standard TCP connection establishment handshake?`,
      opts: ["2 (SYN, ACK)", "3 (SYN, SYN-ACK, ACK)", "4 (SYN, ACK, DATA, FIN)", "1 (SYN)"],
      ans: 1,
      diff: "Easy",
      exp: "TCP uses a 3-way handshake: Client sends SYN -> Server responds with SYN-ACK -> Client replies with ACK."
    },
    {
      q: `[${companyPrefix} OOP Inheritance] What problem arises in languages supporting multiple inheritance when two classes inherit from a common ancestor, and a fourth class inherits from both?`,
      opts: ["The Dangling Pointer Problem", "The Diamond Problem", "The Memory Leak Dilemma", "The Interface Trap"],
      ans: 1,
      diff: "Easy",
      exp: "The Diamond Problem occurs in multiple inheritance when a class inherits from two classes that share a common base class, leading to ambiguity in method resolution."
    },
    {
      q: `[${companyPrefix} DBMS Isolation Levels] In ANSI SQL isolation levels, which level guarantees protection against Dirty Reads, Non-repeatable Reads, and Phantom Reads?`,
      opts: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      ans: 3,
      diff: "Hard",
      exp: "Serializable is the highest isolation level. It prevents dirty reads, non-repeatable reads, and phantom reads by enforcing serial execution order."
    },
    {
      q: `[${companyPrefix} OS Concurrency] What is the difference between a mutex and a binary semaphore?`,
      opts: [
        "A mutex can be unlocked by any thread, while a semaphore cannot",
        "A mutex has ownership and must be released by the same thread that acquired it; a semaphore has no ownership",
        "A binary semaphore supports multiple permits; a mutex supports only zero",
        "They are identical in all operating systems"
      ],
      ans: 1,
      diff: "Hard",
      exp: "A mutex enforces thread ownership (only the thread that locked it may unlock it). A binary semaphore is a signaling mechanism with no ownership constraint."
    },
    {
      q: `[${companyPrefix} Computer Networks] What protocol is used to map an IP address (IPv4) to its corresponding physical MAC address on a local area network?`,
      opts: ["DNS", "DHCP", "ARP (Address Resolution Protocol)", "NAT"],
      ans: 2,
      diff: "Easy",
      exp: "ARP (Address Resolution Protocol) broadcasts a query across the local link layer to obtain the MAC address associated with a given IPv4 destination."
    },
    {
      q: `[${companyPrefix} Cloud & System Design] In distributed systems, what does the CAP theorem state regarding Consistency, Availability, and Partition Tolerance?`,
      opts: [
        "All three can be achieved simultaneously in any distributed network",
        "A distributed system can guarantee at most two of the three properties simultaneously in the presence of network partitions",
        "Consistency and Availability can always be preserved during partition failures",
        "None of the three can ever be maintained reliably"
      ],
      ans: 1,
      diff: "Medium",
      exp: "Brewer's CAP Theorem states that in the event of network partition (P), a distributed data store must choose between Consistency (C) and Availability (A)."
    },
    {
      q: `[${companyPrefix} Software Engineering] Which design pattern provides a single point of access to an object and ensures only one instance of that class is created throughout the application lifecycle?`,
      opts: ["Factory Pattern", "Singleton Pattern", "Observer Pattern", "Adapter Pattern"],
      ans: 1,
      diff: "Easy",
      exp: "The Singleton Pattern restricts the instantiation of a class to one single instance, providing a global point of access to it."
    },
    {
      q: `[${companyPrefix} OS Memory Management] Belady's Anomaly occurs in which page replacement algorithm?`,
      opts: ["FIFO (First-In, First-Out)", "LRU (Least Recently Used)", "Optimal Page Replacement", "LFU (Least Frequently Used)"],
      ans: 0,
      diff: "Medium",
      exp: "Belady's Anomaly is a counter-intuitive phenomenon where increasing the number of page frames results in an increase in page faults under FIFO replacement."
    },
    {
      q: `[${companyPrefix} Computer Networks] What is the maximum payload size (MTU) for a standard Ethernet frame?`,
      opts: ["512 bytes", "1024 bytes", "1500 bytes", "65535 bytes"],
      ans: 2,
      diff: "Easy",
      exp: "The standard Maximum Transmission Unit (MTU) for Ethernet v2 frames is 1500 bytes."
    },
    {
      q: `[${companyPrefix} DBMS Joins] Which type of SQL join returns all rows from the left table and the matched rows from the right table, filling with NULL where no match exists?`,
      opts: ["INNER JOIN", "LEFT OUTER JOIN", "CROSS JOIN", "FULL OUTER JOIN"],
      ans: 1,
      diff: "Easy",
      exp: "LEFT JOIN (or LEFT OUTER JOIN) preserves all records from the left relation, padding right attributes with NULL if the ON predicate fails."
    },
    {
      q: `[${companyPrefix} SOLID Principles] Which SOLID principle states that high-level modules should not depend on low-level modules, but both should depend on abstractions?`,
      opts: [
        "Single Responsibility Principle",
        "Open-Closed Principle",
        "Liskov Substitution Principle",
        "Dependency Inversion Principle"
      ],
      ans: 3,
      diff: "Medium",
      exp: "The Dependency Inversion Principle (DIP) dictates that high-level business logic should rely on abstract interfaces rather than concrete low-level implementations."
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

module.exports = { generateCoreForCompany };
