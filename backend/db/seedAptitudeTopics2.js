// Seed questions for Simple & Compound Interest, Permutations & Combinations, Number System, Problems on Ages (20 questions each)

const simpleCompoundInterestQuestions = [
  {
    question: "A sum of money at simple interest doubles itself in 8 years. In how many years will it become 4 times itself?",
    options: ["16 years", "20 years", "24 years", "32 years"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "At SI, to become 2 times, interest = P in 8 years. To become 4 times, interest = 3P. Time required = 3 * 8 = 24 years."
  },
  {
    question: "Find the simple interest on Rs. 7500 at 12% per annum for 2 years and 6 months.",
    options: ["Rs. 2100", "Rs. 2250", "Rs. 2400", "Rs. 2500"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "SI = (P * R * T) / 100 = (7500 * 12 * 2.5) / 100 = 75 * 30 = Rs. 2250."
  },
  {
    question: "What will be the compound interest on Rs. 25000 after 3 years at 12% per annum compounded annually?",
    options: ["Rs. 10123.20", "Rs. 10250.00", "Rs. 9840.50", "Rs. 10500.00"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "A = 25000 * (1 + 12/100)^3 = 25000 * (1.12)^3 = 25000 * 1.404928 = Rs. 35123.20. CI = 35123.20 - 25000 = Rs. 10123.20."
  },
  {
    question: "The difference between simple interest and compound interest on Rs. 1200 for one year at 10% per annum reckoned half-yearly is:",
    options: ["Rs. 2.50", "Rs. 3.00", "Rs. 3.75", "Rs. 4.00"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Half yearly rate = 5%, n = 2 periods. CI = 1200 * (1.05)^2 - 1200 = 1323 - 1200 = Rs. 123. SI = 1200 * 10 * 1 / 100 = Rs. 120. Difference = 123 - 120 = Rs. 3."
  },
  {
    question: "The difference between CI and SI on a certain sum of money for 2 years at 4% per annum is Rs. 1. Find the sum.",
    options: ["Rs. 625", "Rs. 650", "Rs. 675", "Rs. 700"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "For 2 years, Difference = P * (R/100)^2 => 1 = P * (4/100)^2 => 1 = P * (1/625) => P = Rs. 625."
  },
  {
    question: "A sum of money placed at compound interest doubles itself in 5 years. In how many years will it amount to 8 times itself?",
    options: ["10 years", "12 years", "15 years", "20 years"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "At CI, if money doubles in 5 years, it becomes 8 times (2^3) in 3 * 5 = 15 years."
  },
  {
    question: "At what rate percent per annum will Rs. 2000 amount to Rs. 2662 in 3 years, compounded annually?",
    options: ["8%", "9%", "10%", "12%"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "A/P = 2662 / 2000 = 1331 / 1000 = (11/10)^3. Therefore, 1 + R/100 = 11/10 => R = 10%."
  },
  {
    question: "A sum of Rs. 1550 was lent partly at 5% and partly at 8% simple interest. The total interest received after 3 years is Rs. 300. The ratio of money lent at 5% to that at 8% is:",
    options: ["5 : 8", "8 : 5", "16 : 15", "31 : 6"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Overall annual rate = (100 / 1550) * 100 = 200/31 %. By alligation: (8 - 200/31) : (200/31 - 5) = 48/31 : 45/31 = 48 : 45 = 16 : 15."
  },
  {
    question: "Compound interest on a sum for 2 years is Rs. 105 and simple interest is Rs. 100. Find the rate of interest per annum.",
    options: ["5%", "8%", "10%", "12%"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "SI for 1 year = 50. Extra interest in 2nd year = 105 - 100 = Rs. 5. This Rs. 5 is interest on Rs. 50. Rate = (5 / 50) * 100 = 10%."
  },
  {
    question: "In how many years will a sum of Rs. 800 at 10% per annum compound interest compounded semi-annually become Rs. 926.10?",
    options: ["1.5 years", "2 years", "2.5 years", "3 years"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Rate = 5% per half-year. 926.10 / 800 = 9261 / 8000 = (21/20)^3. Number of half-years = 3 => Time = 1.5 years."
  },
  {
    question: "A sum invested at compound interest amounts to Rs. 4624 in 2 years and to Rs. 4913 in 3 years. Find the sum.",
    options: ["Rs. 4000", "Rs. 4096", "Rs. 4200", "Rs. 4350"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Rate = (4913 - 4624)/4624 = 289/4624 = 1/16 = 6.25%. Sum = 4624 / (1 + 1/16)^2 = 4624 * (16/17)^2 = 4624 * 256 / 289 = 16 * 256 = Rs. 4096."
  },
  {
    question: "If the simple interest on a certain sum of money for 3 years at 8% per annum is half the compound interest on Rs. 4000 for 2 years at 10% per annum, find the sum.",
    options: ["Rs. 1500", "Rs. 1750", "Rs. 1850", "Rs. 2000"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "CI on 4000 = 4000 * (1.21 - 1) = Rs. 840. Half of CI = Rs. 420. SI = (P * 8 * 3)/100 = 420 => 24P / 100 = 420 => P = (420 * 100) / 24 = Rs. 1750."
  },
  {
    question: "A sum of Rs. 12000 deposited at compound interest becomes double after 5 years. After 20 years, it will become:",
    options: ["Rs. 96000", "Rs. 120000", "Rs. 192000", "Rs. 240000"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "In 20 years (4 cycles of 5 years), the amount becomes 2^4 = 16 times. Final amount = 12000 * 16 = Rs. 192000."
  },
  {
    question: "Find the effective annual rate of interest corresponding to a nominal rate of 6% per annum compounded half-yearly.",
    options: ["6.06%", "6.09%", "6.12%", "6.15%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Effective rate = (1 + 0.03)^2 - 1 = 1.0609 - 1 = 0.0609 = 6.09%."
  },
  {
    question: "A lends Rs. 2500 to B and a certain sum to C at the same time at 7% p.a. simple interest. If after 4 years, A altogether receives Rs. 1120 as interest from B and C, the sum lent to C is:",
    options: ["Rs. 1200", "Rs. 1500", "Rs. 1600", "Rs. 1800"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "SI from B = (2500 * 7 * 4) / 100 = Rs. 700. SI from C = 1120 - 700 = Rs. 420. (C * 7 * 4) / 100 = 420 => 28C / 100 = 420 => C = Rs. 1500."
  },
  {
    question: "A bank offers 5% compound interest calculated on half-yearly basis. A customer deposits Rs. 1600 each on 1st January and 1st July of a year. At the end of the year, the amount he would have gained by way of interest is:",
    options: ["Rs. 120", "Rs. 121", "Rs. 122", "Rs. 123"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "First deposit interest = 1600 * (1.025^2 - 1) = Rs. 81. Second deposit interest = 1600 * 0.025 = Rs. 40. Total interest = 81 + 40 = Rs. 121."
  },
  {
    question: "The population of a town increases by 5% annually. If its present population is 92610, what was its population 3 years ago?",
    options: ["75000", "80000", "82000", "85000"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "P * (1.05)^3 = 92610 => P * (21/20)^3 = 92610 => P * 9261 / 8000 = 92610 => P = 80000."
  },
  {
    question: "A person borrowed Rs. 500 at 3% per annum SI and Rs. 600 at 4.5% per annum SI on the agreement that the whole sum was to be returned only when total interest became Rs. 126. The number of years elapsed was:",
    options: ["2 years", "3 years", "4 years", "5 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Annual interest = (500 * 3)/100 + (600 * 4.5)/100 = 15 + 27 = Rs. 42. Number of years = 126 / 42 = 3 years."
  },
  {
    question: "What annual payment will discharge a debt of Rs. 1092 due in 3 years at 12% simple interest?",
    options: ["Rs. 325", "Rs. 330", "Rs. 340", "Rs. 350"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Let annual installment be x. Total amount = 3x + (x * 12 * (2 + 1)) / 100 = 3x + 0.36x = 3.36x = 1092 => x = 1092 / 3.36 = Rs. 325."
  },
  {
    question: "A sum of money invested at compound interest amounts to Rs. 800 in 3 years and to Rs. 840 in 4 years. The rate of interest per annum is:",
    options: ["4%", "5%", "6%", "7.5%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Interest for 4th year = 840 - 800 = Rs. 40. Rate = (40 / 800) * 100 = 5%."
  }
];

const permutationsCombinationsQuestions = [
  {
    question: "In how many different ways can the letters of the word 'LEADING' be arranged so that vowels always come together?",
    options: ["360", "480", "720", "5040"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Vowels are E, A, I (3 vowels). Consonants are L, D, N, G (4 consonants). Treating vowels as 1 block, we have 5 entities arranged in 5! = 120 ways. Vowels among themselves in 3! = 6 ways. Total = 120 * 6 = 720."
  },
  {
    question: "How many 3-digit numbers can be formed from the digits 2, 3, 5, 6, 7, and 9 which are divisible by 5 and none of the digits is repeated?",
    options: ["15", "20", "25", "30"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "For divisibility by 5, last digit must be 5 (1 option). Remaining 5 digits can fill first two places in 5 * 4 = 20 ways. Total = 20."
  },
  {
    question: "In how many ways can a committee of 5 members be formed from 6 men and 4 women consisting of 3 men and 2 women?",
    options: ["60", "90", "120", "180"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "6C3 * 4C2 = [ (6*5*4)/(3*2*1) ] * [ (4*3)/(2*1) ] = 20 * 6 = 120."
  },
  {
    question: "In how many different ways can the letters of the word 'CORPORATION' be arranged so that vowels always come together?",
    options: ["43200", "50400", "57600", "64800"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Vowels: O, O, A, I, O (5 vowels: 3 O's, 1 A, 1 I). Consonants: C, R, P, R, T, N (6 consonants: 2 R's). Entities = 6 + 1 = 7. Arranged in 7! / 2! = 2520 ways. Vowels arranged in 5! / 3! = 20 ways. Total = 2520 * 20 = 50400."
  },
  {
    question: "Out of 7 consonants and 4 vowels, how many words of 3 consonants and 2 vowels can be formed?",
    options: ["210", "1050", "25200", "21400"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Selection = 7C3 * 4C2 = 35 * 6 = 210. Arrangement of 5 chosen letters = 5! = 120. Total words = 210 * 120 = 25200."
  },
  {
    question: "In how many ways can 6 people be seated around a circular table?",
    options: ["120", "240", "720", "60"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Circular permutations of n distinct objects = (n - 1)! = (6 - 1)! = 5! = 120."
  },
  {
    question: "How many diagonals are there in a regular polygon with 12 sides?",
    options: ["48", "54", "60", "66"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Number of diagonals in n-sided polygon = n(n - 3) / 2 = 12 * 9 / 2 = 54."
  },
  {
    question: "A box contains 2 white balls, 3 black balls, and 4 red balls. In how many ways can 3 balls be drawn from the box if at least one black ball is to be included in the draw?",
    options: ["64", "65", "66", "70"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Total ways to choose 3 balls from 9 = 9C3 = 84. Ways to choose 3 balls with no black balls (from 6 non-black) = 6C3 = 20. Ways with at least one black = 84 - 20 = 64."
  },
  {
    question: "In how many ways can 4 boys and 3 girls be seated in a row such that no two girls sit together?",
    options: ["720", "1440", "2880", "1200"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "First seat 4 boys: 4! = 24 ways. They create 5 gaps. Seat 3 girls in 5 gaps: 5P3 = 5 * 4 * 3 = 60 ways. Total = 24 * 60 = 1440."
  },
  {
    question: "How many 4-letter words with or without meaning can be formed out of the letters of the word 'LOGARITHMS' if repetition of letters is not allowed?",
    options: ["4000", "5040", "2520", "720"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Word has 10 distinct letters. 10P4 = 10 * 9 * 8 * 7 = 5040."
  },
  {
    question: "How many different 6-digit numbers can be formed using digits 0, 1, 2, 3, 4, 5 without repetition?",
    options: ["600", "720", "500", "640"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "First digit cannot be 0 (5 choices). Remaining 5 digits can be arranged in 5! = 120 ways. Total = 5 * 120 = 600."
  },
  {
    question: "Find the number of ways of distributing 8 distinct gifts among 3 children so that each child gets at least one gift.",
    options: ["5796", "6561", "5880", "6000"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "By Stirling numbers / inclusion-exclusion: 3^8 - 3C1 * 2^8 + 3C2 * 1^8 = 6561 - 3*256 + 3 = 6561 - 768 + 3 = 5796."
  },
  {
    question: "In an election there are 5 candidates and 3 vacancies. A voter can vote for any number of candidates not greater than the number of vacancies. How many ways can a voter choose to vote?",
    options: ["20", "25", "30", "31"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Voter can vote for 1, 2, or 3 candidates: 5C1 + 5C2 + 5C3 = 5 + 10 + 10 = 25 ways."
  },
  {
    question: "How many numbers greater than 1000 can be formed using the digits 1, 2, 0, 4, 8 without repetition?",
    options: ["192", "216", "240", "120"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "4-digit numbers: 4 * 4 * 3 * 2 = 96. 5-digit numbers: 4 * 4 * 3 * 2 * 1 = 96. Total = 96 + 96 = 192."
  },
  {
    question: "If nC8 = nC2, then find the value of nC2.",
    options: ["36", "45", "55", "90"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "If nCx = nCy, then n = x + y. Here n = 8 + 2 = 10. 10C2 = (10 * 9) / 2 = 45."
  },
  {
    question: "In how many ways can 5 prizes be distributed among 4 boys when a boy can receive any number of prizes?",
    options: ["625", "1024", "120", "256"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Each prize can be awarded to any of the 4 boys. Total ways = 4^5 = 1024."
  },
  {
    question: "In how many ways can 7 beads of different colors be strung into a necklace?",
    options: ["720", "360", "5040", "2520"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Necklace can be turned over, so permutations = (n - 1)! / 2 = 6! / 2 = 720 / 2 = 360."
  },
  {
    question: "There are 10 points in a plane, of which no three are collinear except 4 points which lie on a straight line. Find the number of straight lines that can be formed.",
    options: ["40", "45", "41", "39"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Total lines without collinearity = 10C2 = 45. Lines lost due to 4 collinear points = 4C2 - 1 = 6 - 1 = 5. Total = 45 - 5 = 40."
  },
  {
    question: "Find the number of ways in which 12 identical apples can be distributed among 4 children.",
    options: ["455", "364", "220", "136"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Stars and bars formula: (n + r - 1) C (r - 1) = (12 + 4 - 1) C (4 - 1) = 15C3 = (15 * 14 * 13) / (3 * 2 * 1) = 455."
  },
  {
    question: "In how many ways can the letters of the word 'ASSASSINATION' be arranged?",
    options: ["10810800", "1081000", "5405400", "21621600"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Total letters = 13 (A: 3, S: 4, I: 2, N: 2, T: 1, O: 1). Permutations = 13! / (3! * 4! * 2! * 2!) = 10,810,800."
  }
];

const numberSystemQuestions = [
  {
    question: "What is the unit digit in the product (7^95 - 3^58)?",
    options: ["0", "4", "6", "7"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Cyclicity of 7 is 4. 95 mod 4 = 3 => 7^3 ends in 3. Cyclicity of 3 is 4. 58 mod 4 = 2 => 3^2 ends in 9. Unit digit = (13 - 9) = 4."
  },
  {
    question: "If a number is divisible by both 11 and 13, it must be necessarily:",
    options: ["Divisible by (11 + 13)", "Divisible by (13 - 11)", "Divisible by (11 * 13)", "None of these"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Since 11 and 13 are co-prime prime numbers, any number divisible by both must be divisible by their product (11 * 13 = 143)."
  },
  {
    question: "What least number must be added to 1056 to make the sum completely divisible by 23?",
    options: ["2", "3", "18", "21"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "1056 / 23 = 45 with a remainder of 21. Number to be added = 23 - 21 = 2."
  },
  {
    question: "Find the remainder when (67^67 + 67) is divided by 68.",
    options: ["1", "66", "67", "0"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "67 = -1 mod 68. (-1)^67 + 67 = -1 + 67 = 66 mod 68. The remainder is 66."
  },
  {
    question: "The sum of three consecutive multiples of 3 is 72. What is the largest number?",
    options: ["21", "24", "27", "30"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Let multiples be x - 3, x, x + 3. Sum = 3x = 72 => x = 24. Largest number = 24 + 3 = 27."
  },
  {
    question: "What is the greatest 4-digit number exactly divisible by 88?",
    options: ["9944", "9966", "9988", "9922"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Largest 4-digit number is 9999. 9999 / 88 gives quotient 113 and remainder 55. Required number = 9999 - 55 = 9944."
  },
  {
    question: "How many prime numbers are there between 1 and 100?",
    options: ["21", "24", "25", "26"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "There are exactly 25 prime numbers between 1 and 100."
  },
  {
    question: "The difference between a two-digit number and the number obtained by interchanging the digits is 36. What is the difference between the two digits?",
    options: ["3", "4", "5", "6"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "(10x + y) - (10y + x) = 9(x - y) = 36 => x - y = 4."
  },
  {
    question: "Find the HCF of 2/3, 8/9, 64/81, and 10/27.",
    options: ["2 / 81", "160 / 3", "160 / 81", "2 / 3"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "HCF of fractions = HCF of numerators / LCM of denominators = HCF(2, 8, 64, 10) / LCM(3, 9, 81, 27) = 2 / 81."
  },
  {
    question: "Find the LCM of 24, 36, and 40.",
    options: ["240", "360", "480", "720"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "24 = 2^3 * 3, 36 = 2^2 * 3^2, 40 = 2^3 * 5. LCM = 2^3 * 3^2 * 5 = 8 * 9 * 5 = 360."
  },
  {
    question: "The product of two numbers is 2028 and their HCF is 13. The number of such pairs is:",
    options: ["1", "2", "3", "4"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Let numbers be 13a and 13b. 13a * 13b = 2028 => 169ab = 2028 => ab = 12. Co-prime pairs (a, b) such that ab = 12 are (1, 12) and (3, 4). Thus, 2 pairs exist."
  },
  {
    question: "Find the unit digit in (264)^102 + (264)^103.",
    options: ["0", "2", "4", "6"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Powers of 4 alternate: 4^even ends in 6, 4^odd ends in 4. Unit digit = 6 + 4 = 10, so unit digit is 0."
  },
  {
    question: "A number when divided by 296 gives a remainder 75. When the same number is divided by 37, the remainder will be:",
    options: ["1", "2", "8", "11"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Since 296 is a multiple of 37 (296 = 37 * 8), the remainder when dividing by 37 is 75 mod 37 = 1."
  },
  {
    question: "What is the sum of all natural numbers from 1 to 100?",
    options: ["4950", "5000", "5050", "5100"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Sum = n(n + 1)/2 = 100 * 101 / 2 = 5050."
  },
  {
    question: "If 1*548 is divisible by 3, what is the smallest single digit that can replace *?",
    options: ["0", "2", "3", "5"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Sum of digits = 1 + * + 5 + 4 + 8 = 18 + *. For divisibility by 3, * must be 0, 3, 6, 9. Since * is the thousands digit (1*548), the smallest non-negative digit is 0 or if sum is 18 + * => * = 0. Wait, 18 is already divisible by 3, so smallest digit is 0. If 0 is not among options, next is 3.",
    options: ["0", "2", "3", "5"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Sum of digits = 1 + * + 5 + 4 + 8 = 18 + *. 18 + 0 = 18 which is divisible by 3. Hence smallest digit is 0."
  },
  {
    question: "How many numbers between 100 and 300 are divisible by 7?",
    options: ["27", "28", "29", "30"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "First number > 100 divisible by 7 is 105 (7*15). Last number < 300 is 294 (7*42). Count = 42 - 15 + 1 = 28."
  },
  {
    question: "Which of the following is a prime number?",
    options: ["117", "119", "121", "127"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "117 = 9 * 13; 119 = 7 * 17; 121 = 11^2. 127 is not divisible by 2, 3, 5, 7, 11. Hence 127 is prime."
  },
  {
    question: "What is the remainder when 2^31 is divided by 5?",
    options: ["1", "2", "3", "4"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "2^1 = 2, 2^2 = 4 = -1 mod 5. 2^31 = 2 * (2^2)^15 = 2 * (-1)^15 = 2 * (-1) = -2 = 3 mod 5."
  },
  {
    question: "The sum of squares of two numbers is 80 and the square of their difference is 36. The product of the two numbers is:",
    options: ["22", "24", "26", "28"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "(x - y)^2 = x^2 + y^2 - 2xy => 36 = 80 - 2xy => 2xy = 44 => xy = 22."
  },
  {
    question: "How many zeros are at the end of 100! (100 factorial)?",
    options: ["20", "24", "25", "28"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Number of zeros = floor(100/5) + floor(100/25) = 20 + 4 = 24 zeros."
  }
];

const problemsOnAgesQuestions = [
  {
    question: "Father is aged three times more than his son Sunil. After 8 years, he would be two and a half times of Sunil's age. After further 8 years, how many times would he be of Sunil's age?",
    options: ["2 times", "2.25 times", "2.5 times", "3 times"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Father = Son + 3*Son = 4*Son. F = 4S. (4S + 8) = 2.5(S + 8) => 4S + 8 = 2.5S + 20 => 1.5S = 12 => S = 8. Father = 32. After 16 years, F = 48, S = 24. Ratio = 48 / 24 = 2 times."
  },
  {
    question: "The ratio of ages of Tina and Rakesh is 9 : 10. Ten years ago, the ratio was 4 : 5. What is the present age of Rakesh?",
    options: ["18 years", "20 years", "22 years", "25 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "(9x - 10)/(10x - 10) = 4/5 => 45x - 50 = 40x - 40 => 5x = 10 => x = 2. Rakesh's age = 10 * 2 = 20 years."
  },
  {
    question: "A man is 24 years older than his son. In two years, his age will be twice the age of his son. The present age of his son is:",
    options: ["18 years", "20 years", "22 years", "24 years"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Let son's age be S. Father = S + 24. In 2 years: S + 26 = 2(S + 2) => S + 26 = 2S + 4 => S = 22 years."
  },
  {
    question: "Six years ago, the ratio of the ages of Kunal and Sagar was 6 : 5. Four years hence, the ratio of their ages will be 11 : 10. What is Sagar's present age?",
    options: ["14 years", "16 years", "18 years", "20 years"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Let ages 6 yrs ago be 6x and 5x. (6x + 10)/(5x + 10) = 11/10 => 60x + 100 = 55x + 110 => 5x = 10 => x = 2. Sagar's age 6 yrs ago = 10. Present age = 10 + 6 = 16 years."
  },
  {
    question: "The sum of the present ages of a father and his son is 60 years. Six years ago, father's age was five times the age of the son. After 6 years, son's age will be:",
    options: ["12 years", "14 years", "18 years", "20 years"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "F + S = 60. Six yrs ago, (F - 6) + (S - 6) = 48. F - 6 = 5(S - 6) => 6(S - 6) = 48 => S - 6 = 8 => S = 14. After 6 years, son's age = 14 + 6 = 20 years."
  },
  {
    question: "At present, the ratio between the ages of Arun and Deepak is 4 : 3. After 6 years, Arun's age will be 26 years. What is the age of Deepak at present?",
    options: ["12 years", "15 years", "18 years", "21 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Arun's present age = 26 - 6 = 20 years. 4x = 20 => x = 5. Deepak's age = 3 * 5 = 15 years."
  },
  {
    question: "Sachin is younger than Rahul by 7 years. If their ages are in the respective ratio of 7 : 9, how old is Sachin?",
    options: ["21 years", "24.5 years", "28 years", "31.5 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "9x - 7x = 2x = 7 => x = 3.5. Sachin's age = 7 * 3.5 = 24.5 years."
  },
  {
    question: "The present ages of three persons are in the proportion 4 : 7 : 9. Eight years ago, the sum of their ages was 56. Find their present ages.",
    options: ["16, 28, 36", "12, 21, 27", "20, 35, 45", "16, 24, 32"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Present sum = 56 + 3*8 = 80. 4x + 7x + 9x = 20x = 80 => x = 4. Ages are 16, 28, 36 years."
  },
  {
    question: "A person's present age is two-ninth of the age of his mother. After 10 years, he will be four-eleventh of the age of his mother. How old is the mother at present?",
    options: ["36 years", "45 years", "54 years", "63 years"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Let mother's age be M, son's age 2M/9. 2M/9 + 10 = 4/11 (M + 10) => (2M + 90)/9 = (4M + 40)/11 => 22M + 990 = 36M + 360 => 14M = 630 => M = 45 years."
  },
  {
    question: "The age of father 10 years ago was thrice the age of his son. Ten years hence, father's age will be twice that of his son. The ratio of their present ages is:",
    options: ["5 : 2", "7 : 3", "9 : 2", "13 : 4"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Let ages 10 yrs ago be 3x and x. In 20 yrs: 3x + 20 = 2(x + 20) => 3x + 20 = 2x + 40 => x = 20. Present ages: Father = 3(20) + 10 = 70. Son = 20 + 10 = 30. Ratio = 70 : 30 = 7 : 3."
  },
  {
    question: "Four years ago, the average age of A and B was 18 years. At present, the average age of A, B, and C is 24 years. What will be C's age after 8 years?",
    options: ["28 years", "32 years", "36 years", "40 years"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Present sum A + B = 2*18 + 2*4 = 36 + 8 = 44. Present sum A + B + C = 3 * 24 = 72. C's present age = 72 - 44 = 28 years. After 8 years, C = 28 + 8 = 36 years."
  },
  {
    question: "A mother said to her daughter, 'I was as old as you are at present at the time of your birth.' If the mother's age is 38 years now, the daughter's age five years ago was:",
    options: ["14 years", "16 years", "18 years", "19 years"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Let daughter's age be D. Mother was D years old when daughter was born. Mother's present age = D + D = 2D = 38 => D = 19 years. Five years ago, daughter was 19 - 5 = 14 years."
  },
  {
    question: "The ratio of the present ages of two brothers is 1 : 2 and 5 years ago the ratio was 1 : 3. What will be the ratio of their ages after 5 years?",
    options: ["2 : 3", "3 : 4", "3 : 5", "4 : 5"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "(x - 5)/(2x - 5) = 1/3 => 3x - 15 = 2x - 5 => x = 10. Present ages are 10 and 20. In 5 years: 15 and 25. Ratio = 15 : 25 = 3 : 5."
  },
  {
    question: "Ten years ago, A was half of B in age. If the ratio of their present ages is 3 : 4, what will be the total of their present ages?",
    options: ["28 years", "35 years", "42 years", "49 years"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "(3x - 10)/(4x - 10) = 1/2 => 6x - 20 = 4x - 10 => 2x = 10 => x = 5. Present ages are 15 and 20. Total = 15 + 20 = 35 years."
  },
  {
    question: "If 6 years are subtracted from the present age of Gagan and the remainder is divided by 18, then the present age of his grandson Anup is obtained. If Anup is 2 years younger to Madan whose age is 5 years, then what is Gagan's present age?",
    options: ["48 years", "54 years", "60 years", "66 years"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Madan = 5. Anup = 5 - 2 = 3. (G - 6) / 18 = 3 => G - 6 = 54 => G = 60 years."
  },
  {
    question: "The present ages of A, B, and C are in the ratio 8 : 14 : 22 respectively. The present ages of B, C, and D are in ratio 21 : 33 : 44 respectively. Which of the following represents the ratio of present ages of A and D?",
    options: ["2 : 3", "3 : 4", "4 : 11", "12 : 23"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "A : B : C = 8 : 14 : 22 = 4 : 7 : 11. B : C : D = 21 : 33 : 44 = 3*(7) : 3*(11) : 44. Since B:C is 7:11 in both, scale A:B:C by 3 => 12 : 21 : 33. Then A:B:C:D = 12 : 21 : 33 : 44. A : D = 12 : 44 = 3 : 11 wait, or 4:11 if 12/44 is 3/11. Let's verify: 12/44 = 3/11.",
    options: ["3 : 11", "3 : 4", "4 : 11", "12 : 23"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Multiply first ratio by 3: A:B:C = 12:21:33. Second ratio has B:C:D = 21:33:44. Thus A:B:C:D = 12:21:33:44. A : D = 12 : 44 = 3 : 11."
  },
  {
    question: "A father said to his son, 'I was your present age when you were born'. If the father is 46 years now, how old was the son 4 years ago?",
    options: ["18 years", "19 years", "20 years", "23 years"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Father's age = 2 * Son's age = 46 => Son's age = 23 years. Four years ago, son was 23 - 4 = 19 years."
  },
  {
    question: "The average age of a husband and wife was 23 years when they were married 5 years ago. The average age of the husband, wife, and a child who was born during the interval is 20 years now. How old is the child now?",
    options: ["2 years", "3 years", "4 years", "5 years"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Present sum of husband and wife = 2 * 23 + 2 * 5 = 46 + 10 = 56 years. Present sum of husband, wife, and child = 3 * 20 = 60 years. Child's age = 60 - 56 = 4 years."
  },
  {
    question: "Rajeev's age after 15 years will be 5 times his age 5 years back. What is the present age of Rajeev?",
    options: ["8 years", "10 years", "12 years", "15 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "R + 15 = 5(R - 5) => R + 15 = 5R - 25 => 4R = 40 => R = 10 years."
  },
  {
    question: "My brother is 3 years elder to me. My father was 28 years of age when my sister was born while my mother was 26 years of age when I was born. If my sister was 4 years of age when my brother was born, what was the age of my father when my brother was born?",
    options: ["30 years", "32 years", "34 years", "35 years"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Father was 28 when sister was born. Brother was born when sister was 4. Therefore, father was 28 + 4 = 32 years of age when brother was born."
  }
];

module.exports = {
  simpleCompoundInterestQuestions,
  permutationsCombinationsQuestions,
  numberSystemQuestions,
  problemsOnAgesQuestions
};
