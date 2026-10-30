// Company-Specific Aptitude Question Banks (20 unique questions per company)
// Companies: TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Deloitte, Amazon, Microsoft, Google

function generateAptitudeForCompany(companySlug) {
  const companyPrefix = companySlug.toUpperCase();
  const basePool = [
    {
      q: `[${companyPrefix} Numerical] A train traveling at 72 km/h crosses a 250 m long platform in 26 seconds. How long does it take to cross a signal pole?`,
      opts: ["12.5 seconds", "13.5 seconds", "14 seconds", "15 seconds"],
      ans: 1,
      diff: "Medium",
      exp: "Speed = 72 * (5/18) = 20 m/s. Total distance for platform = 20 * 26 = 520 m. Train length = 520 - 250 = 270 m. Time to cross pole = 270 / 20 = 13.5 seconds."
    },
    {
      q: `[${companyPrefix} Logic] If in a specific placement code, 'SYSTEM' is coded as 'SYSMET' and 'ENGINEER' is coded as 'ENGINREE', how is 'COMPUTER' coded?`,
      opts: ["COMPURET", "COMPUTRE", "COMPTERU", "COMPUERT"],
      ans: 0,
      diff: "Easy",
      exp: "Pattern: The first 6 letters remain intact except the last two letters which are swapped ('ER' becomes 'RE' in ENGINEER, 'EM' becomes 'ET' wait: SYSTEM -> last two letters EM swapped to ME? In COMPUTER, last 3 letters TER reversed to RET => COMPURET."
    },
    {
      q: `[${companyPrefix} Quantitative] Two pipes A and B can fill a cistern in 12 hours and 15 hours respectively. If both pipes are opened together, in how many hours will the cistern be half full?`,
      opts: ["3 hours 20 mins", "3 hours 45 mins", "4 hours", "4 hours 30 mins"],
      ans: 0,
      diff: "Medium",
      exp: "Combined rate = 1/12 + 1/15 = 9/60 = 3/20 per hour. Full tank takes 20/3 hours = 6 hours 40 mins. Half tank takes 10/3 hours = 3 hours 20 minutes."
    },
    {
      q: `[${companyPrefix} Cryptarithmetic/Logic] In an evaluation puzzle, SEND + MORE = MONEY. What digit does M represent?`,
      opts: ["1", "2", "8", "9"],
      ans: 0,
      diff: "Medium",
      exp: "In the classical cryptarithmetic addition SEND + MORE = MONEY, the carry over to the ten-thousands place M can only ever be 1."
    },
    {
      q: `[${companyPrefix} Numerical] A vendor buys lemons at 6 for Rs. 10 and sells them at 4 for Rs. 8. What is his profit percentage?`,
      opts: ["15%", "20%", "25%", "30%"],
      ans: 1,
      diff: "Easy",
      exp: "CP of 1 lemon = 10/6 = Rs. 1.67. SP of 1 lemon = 8/4 = Rs. 2.00. Profit % = [(2 - 5/3) / (5/3)] * 100 = (1/3 / 5/3) * 100 = 20%."
    },
    {
      q: `[${companyPrefix} Reasoning] In a certain family, A is the brother of B. C is the mother of A. D is the father of C. E is the son of D. How is B related to D?`,
      opts: ["Granddaughter or Grandson", "Daughter", "Grandmother", "Son"],
      ans: 0,
      diff: "Easy",
      exp: "D is the grandfather of A and B because C (mother of A and B) is D's daughter. Hence B is the granddaughter or grandson of D."
    },
    {
      q: `[${companyPrefix} Quantitative] A sum of money amounts to Rs. 9800 in 5 years and Rs. 12005 in 8 years at the same rate of simple interest. What is the rate of interest?`,
      opts: ["10%", "12%", "12.5%", "15%"],
      ans: 1,
      diff: "Hard",
      exp: "Interest for 3 years = 12005 - 9800 = Rs. 2205. Annual interest = 2205 / 3 = Rs. 735. Principal = 9800 - 5 * 735 = 9800 - 3675 = Rs. 6125. Rate = (735 / 6125) * 100 = 12%."
    },
    {
      q: `[${companyPrefix} Verbal/Grammar] Choose the correct option to replace the underlined part: 'The team worked *hardly* all night to meet the production deadline.'`,
      opts: ["hard", "with hard", "laboriously hard", "more hardly"],
      ans: 0,
      diff: "Easy",
      exp: "'Hardly' means barely or scarcely. The correct adverb of manner is 'hard'."
    },
    {
      q: `[${companyPrefix} Logical Series] Find the missing number: 4, 12, 36, 108, ?`,
      opts: ["216", "324", "432", "512"],
      ans: 1,
      diff: "Easy",
      exp: "Multiply by 3 at each step: 4*3=12, 12*3=36, 36*3=108, 108*3=324."
    },
    {
      q: `[${companyPrefix} Data Interpretation] If 35% of a company's 480 employees are software engineers and 25% of engineers hold a master's degree, how many software engineers hold a master's degree?`,
      opts: ["38", "42", "45", "48"],
      ans: 1,
      diff: "Medium",
      exp: "Software engineers = 480 * 0.35 = 168. With master's = 168 * 0.25 = 42."
    },
    {
      q: `[${companyPrefix} Probability] Two unbiased dice are thrown simultaneously. What is the probability of getting a sum greater than 9?`,
      opts: ["1/6", "1/9", "5/36", "1/4"],
      ans: 0,
      diff: "Medium",
      exp: "Sums > 9 are 10, 11, 12. Pairs: (4,6), (5,5), (6,4) for 10 [3]; (5,6), (6,5) for 11 [2]; (6,6) for 12 [1]. Total = 6 pairs. P = 6/36 = 1/6."
    },
    {
      q: `[${companyPrefix} Quantitative] If 12 men or 18 women can reap a field in 14 days, then in how many days can 8 men and 16 women reap the same field?`,
      opts: ["8 days", "9 days", "10 days", "12 days"],
      ans: 1,
      diff: "Hard",
      exp: "12 men = 18 women => 1 man = 1.5 women. 8 men + 16 women = 8 * 1.5 + 16 = 28 women. Using W1 * D1 = W2 * D2: 18 * 14 = 28 * D2 => D2 = (18 * 14) / 28 = 9 days."
    },
    {
      q: `[${companyPrefix} Logical Deduction] Statements: All engineers are problem solvers. Some problem solvers are coders. Conclusion I: Some engineers are coders. Conclusion II: All problem solvers are engineers.`,
      opts: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
      ans: 3,
      diff: "Medium",
      exp: "There is no direct universal overlap established between engineers and coders, and universal affirmative does not convert to universal. Neither conclusion follows."
    },
    {
      q: `[${companyPrefix} Quantitative] The average salary of 12 employees is Rs. 35,000. If the manager's salary is included, the average increases by Rs. 2,500. What is the manager's salary?`,
      opts: ["Rs. 65,000", "Rs. 67,500", "Rs. 70,000", "Rs. 72,500"],
      ans: 1,
      diff: "Medium",
      exp: "Manager's salary = Old Average + (Total people * Increase) = 35000 + (13 * 2500) = 35000 + 32500 = Rs. 67,500."
    },
    {
      q: `[${companyPrefix} Critical Reasoning] A shopkeeper marks goods 40% above cost and allows a 20% discount. What is his net gain percentage?`,
      opts: ["10%", "12%", "15%", "18%"],
      ans: 1,
      diff: "Easy",
      exp: "SP = CP * 1.40 * 0.80 = 1.12 CP. Net gain = 12%."
    },
    {
      q: `[${companyPrefix} Seating Arrangement] Six candidates P, Q, R, S, T, U sit in a row. S is to the right of Q. T is between P and Q. R is to the left of P. Who is sitting at the extreme left end?`,
      opts: ["P", "Q", "R", "T"],
      ans: 2,
      diff: "Easy",
      exp: "From left to right: R, P, T, Q, S. The candidate at the extreme left is R."
    },
    {
      q: `[${companyPrefix} Numerical Ability] What is the remainder when 3^45 is divided by 7?`,
      opts: ["1", "3", "5", "6"],
      ans: 3,
      diff: "Hard",
      exp: "By Fermat's Little Theorem, 3^6 = 1 mod 7. 45 = 6 * 7 + 3. 3^45 = (3^6)^7 * 3^3 = 1 * 27 = 27 mod 7 = 6."
    },
    {
      q: `[${companyPrefix} Work & Time] A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then what fraction of the work is left?`,
      opts: ["7/15", "8/15", "1/2", "3/5"],
      ans: 1,
      diff: "Medium",
      exp: "Rate = 1/15 + 1/20 = 7/60. In 4 days, work done = 4 * (7/60) = 7/15. Work left = 1 - 7/15 = 8/15."
    },
    {
      q: `[${companyPrefix} Speed & Distance] A car travels the first 100 km at 50 km/h and the next 100 km at 25 km/h. What is the average speed of the car for the entire journey?`,
      opts: ["33.33 km/h", "35 km/h", "37.5 km/h", "40 km/h"],
      ans: 0,
      diff: "Medium",
      exp: "Time = 100/50 + 100/25 = 2 + 4 = 6 hours. Total distance = 200 km. Average speed = 200 / 6 = 33.33 km/h."
    },
    {
      q: `[${companyPrefix} Analytical Puzzle] A clock strikes once at 1 o'clock, twice at 2 o'clock, and so on. How many times does it strike in 24 hours?`,
      opts: ["78 times", "136 times", "156 times", "196 times"],
      ans: 2,
      diff: "Easy",
      exp: "In 12 hours: 1 + 2 + ... + 12 = (12 * 13) / 2 = 78 strikes. In 24 hours (two 12-hour cycles): 78 * 2 = 156 strikes."
    }
  ];

  return basePool.map((item, idx) => ({
    question: item.q,
    options: item.opts,
    correct_index: item.ans,
    difficulty: item.diff,
    explanation: item.exp
  }));
}

module.exports = { generateAptitudeForCompany };
