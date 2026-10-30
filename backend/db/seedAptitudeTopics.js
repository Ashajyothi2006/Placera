// Seed questions for remaining Aptitude topics (20 unique questions per topic)
// Every question has 4 options, a verified correct_index, difficulty, and detailed step-by-step mathematical explanation.

const timeSpeedDistanceQuestions = [
  {
    question: "A train running at 54 km/h crosses a pole in 20 seconds. What is the length of the train?",
    options: ["250 m", "300 m", "350 m", "400 m"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Speed in m/s = 54 * (5/18) = 15 m/s. Length of train = Speed * Time = 15 * 20 = 300 meters."
  },
  {
    question: "A man covers a distance of 120 km in 3 hours. If he travels the first half of the distance at 30 km/h, at what speed must he travel the remaining half?",
    options: ["40 km/h", "50 km/h", "60 km/h", "45 km/h"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Total distance = 120 km. First half = 60 km at 30 km/h takes 60/30 = 2 hours. Remaining time = 3 - 2 = 1 hour. Required speed for second 60 km = 60 / 1 = 60 km/h."
  },
  {
    question: "A train 240 m long passes a platform of equal length in 24 seconds. What is the speed of the train in km/h?",
    options: ["64 km/h", "72 km/h", "80 km/h", "60 km/h"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total distance = 240 + 240 = 480 m. Speed = 480 / 24 = 20 m/s. In km/h = 20 * (18/5) = 72 km/h."
  },
  {
    question: "Walking at 3/4 of his usual speed, a man reaches his office 15 minutes late. Find his usual time to cover the distance.",
    options: ["40 minutes", "45 minutes", "50 minutes", "60 minutes"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "If speed becomes 3/4, time becomes 4/3 of usual time T. (4/3)T - T = 15 min => T/3 = 15 => T = 45 minutes."
  },
  {
    question: "Two trains of lengths 150 m and 200 m travel in opposite directions at speeds of 40 km/h and 50 km/h. How long will they take to cross each other completely?",
    options: ["12 seconds", "14 seconds", "15 seconds", "16 seconds"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Total distance = 150 + 200 = 350 m. Relative speed = 40 + 50 = 90 km/h = 90 * (5/18) = 25 m/s. Time = 350 / 25 = 14 seconds."
  },
  {
    question: "A boat can travel with a speed of 13 km/h in still water. If the speed of the stream is 4 km/h, find the time taken by the boat to go 68 km downstream.",
    options: ["3 hours", "4 hours", "5 hours", "6 hours"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Downstream speed = 13 + 4 = 17 km/h. Time taken = Distance / Speed = 68 / 17 = 4 hours."
  },
  {
    question: "A man can row downstream at 14 km/h and upstream at 8 km/h. Find the speed of the stream.",
    options: ["2 km/h", "3 km/h", "4 km/h", "2.5 km/h"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Speed of stream = (Downstream speed - Upstream speed) / 2 = (14 - 8) / 2 = 6 / 2 = 3 km/h."
  },
  {
    question: "Two cars start from points A and B towards each other at 50 km/h and 60 km/h respectively. The distance between A and B is 330 km. After how many hours will they meet?",
    options: ["2.5 hours", "3 hours", "3.5 hours", "4 hours"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Relative speed = 50 + 60 = 110 km/h. Time to meet = 330 / 110 = 3 hours."
  },
  {
    question: "A person travels equal distances at speeds of 20 km/h, 30 km/h, and 60 km/h. What is his average speed for the whole journey?",
    options: ["30 km/h", "32 km/h", "35 km/h", "36 km/h"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Let each distance be 60 km (LCM of 20, 30, 60). Time taken = 60/20 + 60/30 + 60/60 = 3 + 2 + 1 = 6 hours. Total distance = 180 km. Average speed = 180 / 6 = 30 km/h."
  },
  {
    question: "If a boy walks at 4 km/h, he reaches school 10 minutes late. If he walks at 5 km/h, he reaches 5 minutes early. What is the distance to school?",
    options: ["4 km", "5 km", "6 km", "7 km"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Difference in time = 10 - (-5) = 15 minutes = 1/4 hour. D/4 - D/5 = 1/4 => D/20 = 1/4 => D = 5 km."
  },
  {
    question: "A thief is noticed by a policeman from a distance of 200 m. The thief starts running and the policeman chases him. If the thief runs at 10 km/h and the policeman at 11 km/h, what is the distance between them after 6 minutes?",
    options: ["100 m", "150 m", "120 m", "80 m"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Relative speed = 11 - 10 = 1 km/h = 1000 m / 60 min = (50/3) m/min. In 6 minutes, policeman gains (50/3) * 6 = 100 m. Remaining distance = 200 - 100 = 100 m."
  },
  {
    question: "A train passes two men walking in the same direction at 3 km/h and 5 km/h in 10 seconds and 11 seconds respectively. What is the speed of the train?",
    options: ["20 km/h", "23 km/h", "25 km/h", "28 km/h"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Let train speed be V km/h. Length L = (V - 3) * (5/18) * 10 = (V - 5) * (5/18) * 11. (V - 3) * 10 = (V - 5) * 11 => 10V - 30 = 11V - 55 => V = 25 km/h."
  },
  {
    question: "A car covers a distance of 720 km in 9 hours. What is its speed in meters per second?",
    options: ["20.5 m/s", "22.22 m/s", "24 m/s", "25 m/s"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Speed in km/h = 720 / 9 = 80 km/h. Speed in m/s = 80 * (5/18) = 400 / 18 = 22.22 m/s."
  },
  {
    question: "In a 100 m race, A beats B by 10 m and C by 19 m. In a race of 180 m, by what distance will B beat C?",
    options: ["15 m", "18 m", "20 m", "16 m"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "When A runs 100 m, B runs 90 m and C runs 81 m. When B runs 90 m, C runs 81 m => B beats C by 9 m in 90 m. In 180 m, B will beat C by 9 * 2 = 18 m."
  },
  {
    question: "A train travelling at 60 km/h crosses a 200 m long platform in 27 seconds. What is the length of the train?",
    options: ["250 m", "220 m", "240 m", "230 m"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Speed = 60 * (5/18) = 50/3 m/s. Total distance = Speed * Time = (50/3) * 27 = 450 m. Train length = 450 - 200 = 250 m."
  },
  {
    question: "Excluding stoppages, the speed of a bus is 54 km/h and including stoppages, it is 45 km/h. For how many minutes does the bus stop per hour?",
    options: ["9 minutes", "10 minutes", "12 minutes", "15 minutes"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Stoppage time per hour = [(Speed without stoppage - Speed with stoppage) / Speed without stoppage] * 60 = [(54 - 45) / 54] * 60 = (9/54) * 60 = 10 minutes."
  },
  {
    question: "A motorboat goes 30 km downstream and comes back to the starting point in 4 hours 30 minutes. If the speed of the stream is 5 km/h, find the speed of the motorboat in still water.",
    options: ["12 km/h", "14 km/h", "15 km/h", "16 km/h"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Let speed be B. 30/(B + 5) + 30/(B - 5) = 9/2. Testing B = 15: 30/20 + 30/10 = 1.5 + 3 = 4.5 hours. Hence, speed is 15 km/h."
  },
  {
    question: "Two runners start simultaneously from the same point on a circular track of 600 m in the same direction at 4 m/s and 6 m/s. When will they meet for the first time at the starting point?",
    options: ["300 seconds", "400 seconds", "600 seconds", "500 seconds"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Time taken by runner 1 = 600 / 4 = 150 s. Time taken by runner 2 = 600 / 6 = 100 s. LCM(150, 100) = 300 seconds."
  },
  {
    question: "A man rode a bicycle from town A to B at 12 km/h and returned at 9 km/h. If he took 3 hours 30 minutes in all, find the distance between A and B.",
    options: ["16 km", "18 km", "20 km", "24 km"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "D/12 + D/9 = 7/2 => (3D + 4D) / 36 = 7/2 => 7D / 36 = 7/2 => D = 18 km."
  },
  {
    question: "Two trains leave Delhi for Patna at 10:00 AM and 10:30 AM at speeds of 60 km/h and 75 km/h respectively. How many kilometers from Delhi will the second train overtake the first?",
    options: ["120 km", "140 km", "150 km", "160 km"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "In 30 mins (0.5 hr), first train travels 60 * 0.5 = 30 km. Relative speed = 75 - 60 = 15 km/h. Time to catch up = 30 / 15 = 2 hours. Distance from Delhi = 75 * 2 = 150 km."
  }
];

const ratioProportionQuestions = [
  {
    question: "If A : B = 2 : 3 and B : C = 4 : 5, find A : B : C.",
    options: ["8 : 12 : 15", "6 : 9 : 15", "8 : 10 : 15", "2 : 4 : 5"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Multiply first ratio by 4: A:B = 8:12. Multiply second ratio by 3: B:C = 12:15. Thus, A:B:C = 8:12:15."
  },
  {
    question: "Divide Rs. 1400 between A, B, and C in the ratio 2 : 3 : 5. What is B's share?",
    options: ["Rs. 280", "Rs. 420", "Rs. 700", "Rs. 350"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total parts = 2 + 3 + 5 = 10 parts. 1 part = 1400 / 10 = 140. B's share = 3 * 140 = Rs. 420."
  },
  {
    question: "Find the fourth proportional to 4, 9, and 12.",
    options: ["18", "24", "27", "36"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "4 / 9 = 12 / x => 4x = 108 => x = 27."
  },
  {
    question: "What is the mean proportional between 9 and 25?",
    options: ["12", "15", "16", "20"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Mean proportional = sqrt(a * b) = sqrt(9 * 25) = sqrt(225) = 15."
  },
  {
    question: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new ratio becomes 12 : 23. Find the smaller number.",
    options: ["27", "33", "36", "45"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Let numbers be 3x and 5x. (3x - 9)/(5x - 9) = 12/23 => 23(3x - 9) = 12(5x - 9) => 69x - 207 = 60x - 108 => 9x = 99 => x = 11. Smaller number = 3 * 11 = 33."
  },
  {
    question: "In a mixture of 60 liters, the ratio of milk and water is 2 : 1. How much water should be added so that the ratio becomes 1 : 2?",
    options: ["40 liters", "50 liters", "60 liters", "70 liters"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Milk = 40 L, Water = 20 L. For ratio 1:2, Milk/Water = 40/(20 + W) = 1/2 => 20 + W = 80 => W = 60 liters."
  },
  {
    question: "A sum of money is divided among P, Q, and R in the ratio 5 : 7 : 11. If R receives Rs. 2400 more than P, what is Q's share?",
    options: ["Rs. 2400", "Rs. 2800", "Rs. 3200", "Rs. 3500"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Difference between R and P = 11x - 5x = 6x = 2400 => x = 400. Q's share = 7 * 400 = Rs. 2800."
  },
  {
    question: "A bag contains coins of Rs. 1, 50 paise, and 25 paise in the ratio 3 : 4 : 8. If total amount is Rs. 140, find number of 50 paise coins.",
    options: ["40", "60", "80", "100"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Value ratio = 3(1) : 4(0.50) : 8(0.25) = 3 : 2 : 2. Total value parts = 7 parts = 140 => 1 part = Rs. 20. Value of 50p coins = 2 * 20 = Rs. 40. Number of 50p coins = 40 / 0.50 = 80."
  },
  {
    question: "If (x + y) : (x - y) = 7 : 3, find (x^2 + y^2) : (x^2 - y^2).",
    options: ["29 : 21", "25 : 21", "29 : 20", "21 : 19"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "By componendo and dividendo, x/y = (7 + 3)/(7 - 3) = 10/4 = 5/2. (x^2 + y^2)/(x^2 - y^2) = (25 + 4)/(25 - 4) = 29/21."
  },
  {
    question: "The salaries of A, B, and C are in ratio 2 : 3 : 5. If increments of 15%, 10%, and 20% are allowed, what will be their new salary ratio?",
    options: ["23 : 33 : 60", "21 : 31 : 55", "23 : 30 : 60", "25 : 33 : 60"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "New salaries = 2 * 1.15 : 3 * 1.10 : 5 * 1.20 = 2.30 : 3.30 : 6.00 = 23 : 33 : 60."
  },
  {
    question: "Three partners A, B, and C invest capital in ratio 3 : 4 : 5 for periods in ratio 5 : 4 : 3. In what ratio will their profits be divided?",
    options: ["15 : 16 : 15", "12 : 15 : 16", "15 : 12 : 15", "9 : 16 : 25"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Profit ratio = Capital * Time = 3*5 : 4*4 : 5*3 = 15 : 16 : 15."
  },
  {
    question: "If a : b = c : d = e : f = 1 : 2, find (3a + 5c + 7e) : (3b + 5d + 7f).",
    options: ["1 : 4", "1 : 2", "2 : 1", "3 : 5"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Since each numerator is 1/2 of its denominator, the ratio of linear combinations with same coefficients is also 1 : 2."
  },
  {
    question: "What number must be added to each of 6, 14, 18, and 38 so that the resulting numbers are in proportion?",
    options: ["1", "2", "3", "4"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "(6 + x)/(14 + x) = (18 + x)/(38 + x). Testing x = 2: 8/16 = 20/40 = 1/2. True. Hence, x = 2."
  },
  {
    question: "A vessel has 80 liters of milk and water in ratio 7 : 3. How much water must be added to make ratio 2 : 1?",
    options: ["4 liters", "5 liters", "6 liters", "8 liters"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Milk = 56 L, Water = 24 L. 56 / (24 + W) = 2/1 => 48 + 2W = 56 => 2W = 8 => W = 4 liters."
  },
  {
    question: "If x : y = 3 : 4, find the value of (5x - 2y) / (7x + 2y).",
    options: ["7 / 29", "8 / 27", "9 / 25", "7 / 25"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Substitute x = 3, y = 4: (5*3 - 2*4) / (7*3 + 2*4) = (15 - 8) / (21 + 8) = 7 / 29."
  },
  {
    question: "The ratio of boys and girls in a college is 7 : 8. If the percentage increase in boys and girls is 20% and 10% respectively, what will be the new ratio?",
    options: ["21 : 22", "18 : 19", "20 : 21", "21 : 20"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "New ratio = (7 * 1.20) : (8 * 1.10) = 8.4 : 8.8 = 84 : 88 = 21 : 22."
  },
  {
    question: "Find the third proportional to 16 and 36.",
    options: ["72", "81", "96", "108"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Third proportional c = b^2 / a = 36^2 / 16 = 1296 / 16 = 81."
  },
  {
    question: "Gold is 19 times as heavy as water and copper is 9 times as heavy as water. In what ratio should these be mixed to get an alloy 15 times as heavy as water?",
    options: ["2 : 3", "3 : 2", "4 : 3", "3 : 4"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Using rule of alligation: Gold (19), Copper (9), Mean (15). (15 - 9) : (19 - 15) = 6 : 4 = 3 : 2."
  },
  {
    question: "The expenditure and savings of a person are in ratio 5 : 3. If his income increases by 12% and expenditure by 15%, by what percent do his savings increase?",
    options: ["6%", "7%", "8%", "9%"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Let Income = 800, Expenditure = 500, Savings = 300. New Income = 800 * 1.12 = 896. New Expenditure = 500 * 1.15 = 575. New Savings = 896 - 575 = 321. Increase in savings = (21 / 300) * 100 = 7%."
  },
  {
    question: "Seats for Mathematics, Physics, and Biology in a school are in ratio 5 : 7 : 8. There is a proposal to increase these seats by 40%, 50%, and 75% respectively. What will be the ratio of increased seats?",
    options: ["2 : 3 : 4", "6 : 7 : 8", "6 : 8 : 9", "5 : 7 : 9"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "5 * 1.4 : 7 * 1.5 : 8 * 1.75 = 7 : 10.5 : 14 = 14 : 21 : 28 = 2 : 3 : 4."
  }
];

const averagesQuestions = [
  {
    question: "The average of 5 consecutive odd numbers is 27. What is the product of the first and last numbers?",
    options: ["675", "713", "725", "685"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Consecutive odd numbers centered at 27 are: 23, 25, 27, 29, 31. First = 23, Last = 31. Product = 23 * 31 = 713."
  },
  {
    question: "The average age of a class of 30 students is 15 years. If the teacher's age is included, the average increases by 1 year. What is the teacher's age?",
    options: ["44 years", "46 years", "48 years", "50 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total age of 30 students = 30 * 15 = 450. Total age of 31 persons = 31 * 16 = 496. Teacher's age = 496 - 450 = 46 years."
  },
  {
    question: "The average of 25 results is 18. That of the first 12 is 14 and of the last 12 is 17. Find the 13th result.",
    options: ["76", "78", "80", "82"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Total of 25 = 25 * 18 = 450. Sum of first 12 = 12 * 14 = 168. Sum of last 12 = 12 * 17 = 204. 13th result = 450 - (168 + 204) = 450 - 372 = 78."
  },
  {
    question: "A batsman scores 87 runs in his 17th innings and thus increases his average by 3. What is his average after the 17th innings?",
    options: ["36", "38", "39", "40"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Let average after 16 innings be A. 16A + 87 = 17(A + 3) => 16A + 87 = 17A + 51 => A = 36. Average after 17th innings = 36 + 3 = 39."
  },
  {
    question: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one weighing 65 kg. What is the weight of the new person?",
    options: ["80 kg", "82 kg", "85 kg", "88 kg"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Weight of new person = Replaced weight + Total increase = 65 + (8 * 2.5) = 65 + 20 = 85 kg."
  },
  {
    question: "The average score of 40 students is 68. Later it was discovered that a score of 84 was misread as 48. What is the correct average?",
    options: ["68.7", "68.9", "69.1", "69.5"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Difference = 84 - 48 = +36. Average increase = 36 / 40 = 0.9. Correct average = 68 + 0.9 = 68.9."
  },
  {
    question: "The average salary of all workers in a workshop is Rs. 8000. The average salary of 7 technicians is Rs. 12000 and the rest is Rs. 6000. Find total number of workers.",
    options: ["18", "21", "24", "27"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "By alligation: (12000 - 8000) : (8000 - 6000) = 4000 : 2000 = 2 : 1. Ratio of technicians to rest is 1 : 2. Rest = 7 * 2 = 14. Total = 7 + 14 = 21 workers."
  },
  {
    question: "The average of first 50 natural numbers is:",
    options: ["25", "25.5", "26", "26.5"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Average of first n natural numbers = (n + 1) / 2 = 51 / 2 = 25.5."
  },
  {
    question: "The average temperature of Monday, Tuesday, and Wednesday was 37°C and that of Tuesday, Wednesday, and Thursday was 34°C. If temperature on Thursday was 4/5 of Monday, find temperature on Thursday.",
    options: ["36°C", "35°C", "34°C", "33°C"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "M - Th = 3 * (37 - 34) = 9. Since Th = 4/5 M => M - 4/5 M = 9 => M/5 = 9 => M = 45°C. Th = (4/5) * 45 = 36°C."
  },
  {
    question: "A library has an average of 510 visitors on Sundays and 240 on other days. What is the average number of visitors per day in a month of 30 days beginning with Sunday?",
    options: ["275", "285", "295", "305"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "A 30-day month starting on Sunday has 5 Sundays and 25 other days. Total visitors = 5*510 + 25*240 = 2550 + 6000 = 8550. Average = 8550 / 30 = 285."
  },
  {
    question: "The average of six numbers is 30. If the average of first four is 25 and that of last three is 35, find the fourth number.",
    options: ["25", "30", "35", "40"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Sum of 6 = 180. Sum of first 4 + last 3 = 4*25 + 3*35 = 100 + 105 = 205. Fourth number = 205 - 180 = 25."
  },
  {
    question: "A car owner buys petrol at Rs. 7.50, Rs. 8.00, and Rs. 8.50 per liter for three successive years. What is the average cost per liter if he spends Rs. 4000 each year?",
    options: ["Rs. 7.98", "Rs. 8.00", "Rs. 8.02", "Rs. 8.10"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Liters bought = 4000/7.50 + 4000/8.00 + 4000/8.50 = 533.33 + 500 + 470.59 = 1503.92 L. Total spent = 12000. Average price = 12000 / 1503.92 = Rs. 7.98."
  },
  {
    question: "The average age of 24 boys and their teacher is 15 years. When the teacher's age is excluded, the average decreases by 1 year. Find the teacher's age.",
    options: ["38 years", "39 years", "40 years", "41 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total of 25 = 25 * 15 = 375. Total of 24 boys = 24 * 14 = 336. Teacher's age = 375 - 336 = 39 years."
  },
  {
    question: "The average of 7 consecutive numbers is 20. The largest of these numbers is:",
    options: ["21", "22", "23", "24"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Middle number (4th) is 20. The 7 numbers are 17, 18, 19, 20, 21, 22, 23. Largest = 23."
  },
  {
    question: "The average weight of 3 men A, B, and C is 84 kg. Another man D joins the group and the average becomes 80 kg. If another man E whose weight is 3 kg more than D replaces A, the average weight of B, C, D, and E becomes 79 kg. Find weight of A.",
    options: ["70 kg", "72 kg", "75 kg", "78 kg"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "A+B+C = 252. A+B+C+D = 320 => D = 68 kg. E = 71 kg. B+C+D+E = 316 => B+C + 68 + 71 = 316 => B+C = 177. A = 252 - 177 = 75 kg."
  },
  {
    question: "A cricketer has a certain average for 10 innings. In the 11th innings, he scores 108 runs, thereby increasing his average by 6 runs. What is his new average?",
    options: ["42", "44", "48", "50"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "10A + 108 = 11(A + 6) => 10A + 108 = 11A + 66 => A = 42. New average = 42 + 6 = 48."
  },
  {
    question: "Average of 10 numbers is 7. If each number is multiplied by 12, then the average of new set of numbers is:",
    options: ["19", "70", "84", "82"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Multiplying each observation by k multiplies the overall average by k. New average = 7 * 12 = 84."
  },
  {
    question: "Find the average of all prime numbers between 30 and 50.",
    options: ["38.8", "39.8", "40.2", "41.0"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Primes between 30 and 50 are 31, 37, 41, 43, 47. Sum = 199. Average = 199 / 5 = 39.8."
  },
  {
    question: "The average of 8 numbers is 14. The average of 6 of these numbers is 16. What is the average of the remaining two numbers?",
    options: ["6", "8", "9", "10"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Sum of 8 = 112. Sum of 6 = 96. Sum of remaining 2 = 112 - 96 = 16. Average = 16 / 2 = 8."
  },
  {
    question: "In an exam, the average marks obtained by students was 60. On rectifying errors, marks of 100 candidates changed from 60 to 30 each and average reduced to 45. Find total candidates.",
    options: ["150", "180", "200", "220"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Total decrease in marks = 100 * 30 = 3000. Total decrease in average = 60 - 45 = 15. Number of candidates = 3000 / 15 = 200."
  }
];

module.exports = {
  timeSpeedDistanceQuestions,
  ratioProportionQuestions,
  averagesQuestions
};
