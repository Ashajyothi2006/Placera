// Seed questions for Directions, Syllogisms, Series, Puzzles, Verbal Ability, Data Interpretation (20 questions each)

const directionsQuestions = [
  {
    question: "A man walks 5 km toward South and then turns to the right. After walking 3 km he turns to the left and walks 5 km. Now in which direction is he from the starting place?",
    options: ["West", "South", "South-West", "North-East"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Starting at (0, 0): walks 5 km South -> (0, -5). Turns right (facing South, right is West) 3 km -> (-3, -5). Turns left (South) 5 km -> (-3, -10). He is South-West of the origin."
  },
  {
    question: "Rahul walked 20 m towards north. Then he turned right and walked 30 m. Then he turned right and walked 35 m. Then he turned left and walked 15 m. Finally he turned left and walked 15 m. In which direction and how many meters is he from the starting point?",
    options: ["15 m West", "30 m East", "45 m East", "45 m West"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Origin (0, 0). North 20 -> (0, 20). Right (East) 30 -> (30, 20). Right (South) 35 -> (30, -15). Left (East) 15 -> (45, -15). Left (North) 15 -> (45, 0). He is at (45, 0), which is 45 m East."
  },
  {
    question: "One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. Which direction was he facing?",
    options: ["East", "West", "South", "North"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "In morning, sun is in East, so shadows fall towards West. The shadow fell to his right, meaning West is to his right. Facing South puts West to one's right side."
  },
  {
    question: "A child is looking for his father. He went 90 m in the East before turning to his right. He went 20 m before turning to his right again to look for his father at his uncle's place 30 m from this point. His father was not there. From here he went 100 m to the North before meeting his father in a street. How far did the son meet his father from the starting point?",
    options: ["80 m", "100 m", "120 m", "140 m"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "(0, 0) -> East 90 -> (90, 0). Right (South) 20 -> (90, -20). Right (West) 30 -> (60, -20). North 100 -> (60, 80). Distance = sqrt(60^2 + 80^2) = sqrt(3600 + 6400) = sqrt(10000) = 100 meters."
  },
  {
    question: "Kailash faces towards north. Turning to his right, he walks 25 m. He then turns to his left and walks 30 m. Next, he moves 25 m to his right. He then turns to his right again and walks 55 m. Finally, he turns to the right and moves 40 m. In which direction is he now from his starting point?",
    options: ["South-West", "South", "North-West", "South-East"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "(0, 0) -> Right (East) 25 -> (25, 0) -> Left (North) 30 -> (25, 30) -> Right (East) 25 -> (50, 30) -> Right (South) 55 -> (50, -25) -> Right (West) 40 -> (10, -25). Point (10, -25) is South-East of origin."
  },
  {
    question: "A clock is placed in such a way that at 12 noon its minute hand points towards North-East. In which direction does its hour hand point at 1:30 PM?",
    options: ["North", "South", "East", "South-East"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Normally at 12:00, hand points North. Here it is turned 45° clockwise to North-East. At 1:30 PM, hour hand is midway between 1 and 2 (45° clockwise from standard 12). With the 45° shift, it points directly East (45° + 45° = 90° = East)."
  },
  {
    question: "Starting from point X, Joy walked 15 m towards the west. He turned left and walked 20 m. He then turned left and walked 15 m. After this he turned to his right and walked 12 m. How far and in which direction is now Joy from X?",
    options: ["32 m, South", "47 m, East", "42 m, North", "27 m, South"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Origin (0,0) -> West 15 (-15, 0) -> Left (South) 20 (-15, -20) -> Left (East) 15 (0, -20) -> Right (South) 12 (0, -32). Distance is 32 m South."
  },
  {
    question: "One evening before sunset Rekha and Hema were talking to each other face to face. If Hema's shadow was exactly to the right of Hema, which direction was Rekha facing?",
    options: ["North", "South", "East", "West"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Before sunset, sun is in West, so shadow falls East. Hema's shadow is to her right, so East is to her right. Facing North puts East to one's right side. If Hema is facing North, Rekha (facing Hema) must be facing South wait. Let's check: facing South puts East to one's left. Facing North puts East to one's right. So Hema faces North. Rekha is facing Hema, so Rekha faces South? Wait, if Hema faces North, Rekha faces South. Let's re-verify: Hema's shadow to right of Hema => Hema faces North => Rekha faces South. But if option has North, let's make sure options and index match.",
    options: ["North", "South", "East", "West"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "In evening, shadows fall East. East is to Hema's right => Hema faces North. Since Rekha faces Hema, Rekha faces South."
  },
  {
    question: "Deepa moved a distance of 75 m towards the north. She then turned to the left and walking for about 25 m, turned left again and walked 80 m. Finally, she turned to the right at an angle of 45°. In which direction was she moving finally?",
    options: ["North-East", "North-West", "South-East", "South-West"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "She is walking South after turning left twice. Turning 45° to the right from South moves her direction into South-West."
  },
  {
    question: "A man is facing west. He turns 45° in the clockwise direction and then another 180° in the same direction and then 270° in the anti-clockwise direction. Which direction is he facing now?",
    options: ["South", "North-West", "West", "South-West"],
    correct_index: 3,
    difficulty: "Easy",
    explanation: "Net turn = +45° + 180° - 270° = -45° (i.e. 45° anti-clockwise). 45° anti-clockwise from West is South-West."
  },
  {
    question: "Village A is 20 km to the west of village B. Village C is 15 km to the south of village B. Village D is 15 km to the north of village C. What is the distance between village A and village D?",
    options: ["15 km", "20 km", "25 km", "30 km"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Since C is 15 km south of B and D is 15 km north of C, D is at the same position as B. The distance between A and D is the same as between A and B, which is 20 km."
  },
  {
    question: "Ravi walks 10 km towards North. From there he walks 6 km towards South. Then, he walks 3 km towards East. How far and in which direction is he with reference to his starting point?",
    options: ["5 km West", "5 km North-East", "7 km East", "7 km North-East"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "North 10, then South 6 => Net North = 4 km. Then East 3 km. Distance = sqrt(4^2 + 3^2) = 5 km in North-East direction."
  },
  {
    question: "If South-East becomes North, North-East becomes West and so on, what will West become?",
    options: ["North-East", "South-East", "North-West", "South-West"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "South-East (135°) becomes North (0°), which is a 135° anti-clockwise rotation. Rotating West (270°) by 135° anti-clockwise gives 135° = South-East."
  },
  {
    question: "A person starts from point A and travels 3 km eastwards to B and then turns left and travels thrice that distance to reach C. He again turns left and travels five times the distance between A and B to reach his destination D. What is the shortest distance between A and D?",
    options: ["12 km", "15 km", "16 km", "18 km"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "A = (0, 0). B = (3, 0). C = (3, 9) because thrice of 3 is 9. Left from North is West: travels 5 * 3 = 15 km West => D = (3 - 15, 9) = (-12, 9). Shortest distance AD = sqrt((-12)^2 + 9^2) = sqrt(144 + 81) = sqrt(225) = 15 km."
  },
  {
    question: "Two ladies P and Q start from the same point. P walks 15 m North, then turns left and walks 8 m. Q walks 9 m North, then turns right and walks 6 m. What is the shortest distance between them now?",
    options: ["sqrt(232) m", "15.23 m", "sqrt(232) m", "15.2 m"],
    options: ["14 m", "sqrt(232) m", "20 m", "16 m"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "P = (-8, 15). Q = (6, 9). dx = 6 - (-8) = 14. dy = 9 - 15 = -6. Distance = sqrt(14^2 + (-6)^2) = sqrt(196 + 36) = sqrt(232) m."
  },
  {
    question: "Kunal walks 10 km towards North. From there, he turns right and walks 5 km. Then, he turns right again and walks 10 km. How far is he from his starting point?",
    options: ["5 km", "10 km", "15 km", "20 km"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "(0,0) -> (0, 10) -> (5, 10) -> (5, 0). The final position is (5, 0), which is exactly 5 km from starting point."
  },
  {
    question: "Anil started walking towards South. After walking 50 m he turned right and walked 30 m. He then turned right again and walked 100 m. He turned right again and walked 30 m. In which direction and how far is he from his starting point?",
    options: ["50 m South", "50 m North", "100 m North", "100 m South"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "(0,0) -> South 50 (0, -50) -> Right (West) 30 (-30, -50) -> Right (North) 100 (-30, 50) -> Right (East) 30 (0, 50). He is 50 m North."
  },
  {
    question: "Facing towards the south, Ram walks 10 m. He then turns left and walks 15 m. He then turns left again and walks 10 m. How far and in which direction is he from his original position?",
    options: ["15 m East", "15 m West", "10 m North", "20 m East"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "He went South 10, East 15, North 10. He is 15 m directly East of the starting point."
  },
  {
    question: "A cat runs 20 m towards East and turns right, runs 10 m and turns right, runs 9 m and again turns left, runs 5 m and turns left, runs 12 m and finally turns left and runs 6 m. Now which direction is the cat facing?",
    options: ["East", "West", "North", "South"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Last direction of movement: previously facing East (after turning left from South), turns left => facing North."
  },
  {
    question: "A square field ABCD has corner A in South-West, B in North-West, C in North-East, and D in South-East. A person starts walking from A along AB and reaches midpoint of BC. In which direction is he from the center of the field?",
    options: ["North", "North-East", "North-West", "East"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Side BC runs from North-West to North-East. The midpoint of BC lies due North of the center of the field."
  }
];

const syllogismsQuestions = [
  {
    question: "Statements:\nI. All apples are fruits.\nII. All fruits are sweet.\nConclusions:\n1. All apples are sweet.\n2. Some sweet things are apples.",
    options: ["Only conclusion 1 follows", "Only conclusion 2 follows", "Either 1 or 2 follows", "Both 1 and 2 follow"],
    correct_index: 3,
    difficulty: "Easy",
    explanation: "All apples are fruits and all fruits are sweet implies All apples are sweet (Concl 1 follows). Hence, Some sweet things are apples (Concl 2 follows). Both follow."
  },
  {
    question: "Statements:\nI. Some cats are dogs.\nII. No dog is a bird.\nConclusions:\n1. Some cats are not birds.\n2. Some birds are cats.",
    options: ["Only 1 follows", "Only 2 follows", "Both 1 and 2 follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Cats that are dogs cannot be birds. Hence, those cats are definitely not birds. Conclusion 1 follows. Conclusion 2 is not necessarily true."
  },
  {
    question: "Statements:\nI. All books are pens.\nII. No pen is a pencil.\nConclusions:\n1. No book is a pencil.\n2. All pens are books.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Since all books are entirely inside pens, and pens have zero overlap with pencils, no book can be a pencil. All pens are books is a converse error."
  },
  {
    question: "Statements:\nI. Some mangoes are yellow.\nII. Some tiffin are yellow.\nConclusions:\n1. Some mangoes are tiffin.\n2. No mango is a tiffin.",
    options: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Neither follows"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Particular affirmative premises give no definite relation between mangoes and tiffin. But 'Some mangoes are tiffin' and 'No mango is tiffin' form a complementary pair (I and E). Hence, Either 1 or 2 follows."
  },
  {
    question: "Statements:\nI. All birds are tall.\nII. Some tall are peacocks.\nConclusions:\n1. Some birds are peacocks.\n2. Some peacocks are tall.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "From 'Some tall are peacocks', by immediate conversion, 'Some peacocks are tall' definitely follows. There is no definite connection between birds and peacocks."
  },
  {
    question: "Statements:\nI. No door is a dog.\nII. All dogs are cats.\nConclusions:\n1. No door is a cat.\n2. Some cats are dogs.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "All dogs are cats implies Some cats are dogs (Concl 2 follows). Cats outside dogs can be doors, so Concl 1 does not necessarily follow."
  },
  {
    question: "Statements:\nI. All cars are jeeps.\nII. All jeeps are four-wheelers.\nConclusions:\n1. All cars are four-wheelers.\n2. Some four-wheelers are cars.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Transitive property: All cars -> jeeps -> four-wheelers implies All cars are four-wheelers. By conversion, Some four-wheelers are cars. Both follow."
  },
  {
    question: "Statements:\nI. Some trees are papers.\nII. Some papers are pens.\nConclusions:\n1. Some trees are pens.\n2. Some pens are trees.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 3,
    difficulty: "Easy",
    explanation: "Two particular premises (I + I) yield no universal or particular valid conclusion between extreme terms. Neither follows."
  },
  {
    question: "Statements:\nI. All cups are plates.\nII. No plate is a spoon.\nConclusions:\n1. No cup is a spoon.\n2. Some plates are cups.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Since cups are inside plates and plates do not overlap spoons, no cup is a spoon. Also All cups are plates implies Some plates are cups. Both follow."
  },
  {
    question: "Statements:\nI. Most teachers are boys.\nII. Some boys are students.\nConclusions:\n1. Some students are boys.\n2. Some teachers are students.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "'Most' = 'Some'. 'Some boys are students' converts directly to 'Some students are boys' (Concl 1 follows). No direct link exists for Concl 2."
  },
  {
    question: "Statements:\nI. All flowers are trees.\nII. No fruit is tree.\nConclusions:\n1. No flower is fruit.\n2. Some trees are flowers.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Flowers are inside trees, trees have zero overlap with fruits => no flower is fruit (1 follows). All flowers are trees implies some trees are flowers (2 follows). Both follow."
  },
  {
    question: "Statements:\nI. Some actors are singers.\nII. All singers are dancers.\nConclusions:\n1. Some actors are dancers.\n2. No singer is actor.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Some actors are singers and all singers are dancers => Some actors are dancers (1 follows). Concl 2 contradicts premise I."
  },
  {
    question: "Statements:\nI. All lock are key.\nII. Some lock are door.\nConclusions:\n1. Some key are door.\n2. All door are lock.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "The intersection of lock and door is also inside key, so Some key are door (1 follows). All door are lock does not follow."
  },
  {
    question: "Statements:\nI. No pencil is pen.\nII. No pen is eraser.\nConclusions:\n1. All pencils are erasers.\n2. Some erasers are pencils.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 3,
    difficulty: "Easy",
    explanation: "Two negative premises (E + E) yield no definite relation. Neither conclusion follows."
  },
  {
    question: "Statements:\nI. All roses are red.\nII. Some red are flowers.\nConclusions:\n1. Some flowers are roses.\n2. No flower is rose.",
    options: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Neither follows"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "There is no definite conclusion between flowers and roses, but 'Some flowers are roses' and 'No flower is rose' form a complementary pair (I-E). Thus, Either 1 or 2 follows."
  },
  {
    question: "Statements:\nI. Every minister is student.\nII. Every student is inexperienced.\nConclusions:\n1. Every minister is inexperienced.\n2. Some inexperienced are ministers.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "'Every' = 'All'. All ministers -> students -> inexperienced => All ministers are inexperienced. Hence Some inexperienced are ministers. Both follow."
  },
  {
    question: "Statements:\nI. Only a few books are novel.\nII. All novels are literature.\nConclusions:\n1. Some books are not novel.\n2. Some literature are books.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "'Only a few' means both 'Some books are novel' and 'Some books are not novel'. So Concl 1 follows. Novels are inside literature and overlap books, so Some literature are books (Concl 2 follows). Both follow."
  },
  {
    question: "Statements:\nI. All circles are squares.\nII. Some squares are rectangles.\nConclusions:\n1. All circles being rectangles is a possibility.\n2. Some circles are rectangles.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "There is no negative restriction between circles and rectangles. Thus, the possibility that all circles are rectangles is valid (1 follows). But definite conclusion 2 does not follow."
  },
  {
    question: "Statements:\nI. Some pens are erasers.\nII. All erasers are umbrellas.\nConclusions:\n1. Some pens are umbrellas.\n2. Some umbrellas are pens.",
    options: ["Only 1 follows", "Only 2 follows", "Both follow", "Neither follows"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Some pens are erasers + All erasers are umbrellas => Some pens are umbrellas. And by conversion, Some umbrellas are pens. Both follow."
  },
  {
    question: "Statements:\nI. No man is sky.\nII. No sky is road.\nConclusions:\n1. No man is road.\n2. All roads are men.",
    options: ["Only 1 follows", "Only 2 follows", "Either 1 or 2 follows", "Neither follows"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "Two negative premises allow no definite relation between man and road. Neither follows."
  }
];

const seriesQuestions = [
  {
    question: "Find the next term in the series: 3, 7, 15, 31, 63, ?",
    options: ["95", "111", "127", "128"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Pattern: each term is (previous * 2) + 1. 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63. Next = 63 * 2 + 1 = 127."
  },
  {
    question: "Find the missing number: 2, 5, 10, 17, 26, ?",
    options: ["35", "36", "37", "38"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Pattern: n^2 + 1. 1^2+1=2, 2^2+1=5, 3^2+1=10, 4^2+1=17, 5^2+1=26. Next = 6^2 + 1 = 37."
  },
  {
    question: "Find the wrong number in the series: 7, 9, 16, 25, 41, 66, 105",
    options: ["16", "41", "66", "105"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "Fibonacci-like sum: 7+9=16, 9+16=25, 16+25=41, 25+41=66. Next should be 41 + 66 = 107. The given number is 105, which is wrong."
  },
  {
    question: "Find the next term: 1, 8, 27, 64, 125, ?",
    options: ["216", "225", "343", "196"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Cubes of consecutive integers: 1^3, 2^3, 3^3, 4^3, 5^3. Next = 6^3 = 216."
  },
  {
    question: "Complete the series: 4, 18, ?, 100, 180, 294",
    options: ["36", "48", "50", "64"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Pattern: n^3 - n^2. For n=2: 8-4=4. n=3: 27-9=18. n=4: 64-16=48. n=5: 125-25=100. n=6: 216-36=180. Missing term is 48."
  },
  {
    question: "Find the next term: 6, 11, 21, 36, 56, ?",
    options: ["71", "81", "86", "91"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Differences are: +5, +10, +15, +20. Next difference should be +25. 56 + 25 = 81."
  },
  {
    question: "Find the missing number in the series: 10, 14, 26, 62, 170, ?",
    options: ["494", "484", "504", "512"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Differences: 4 (3^1 + 1), 12 (3^2 + 3), 36 (3^3 + 9), 108 (3^4 + 27)... wait: 4 * 3 = 12, 12 * 3 = 36, 36 * 3 = 108. Next difference = 108 * 3 = 324. 170 + 324 = 494."
  },
  {
    question: "What comes next in the alphanumeric series: A2Z, B4Y, C8X, D16W, ?",
    options: ["E32V", "E24V", "E32U", "F32V"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "First letter increments: A, B, C, D -> E. Middle number doubles: 2, 4, 8, 16 -> 32. Last letter decrements: Z, Y, X, W -> V. Term is E32V."
  },
  {
    question: "Find the next term: 120, 99, 80, 63, 48, ?",
    options: ["35", "36", "38", "40"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Pattern: (n^2 - 1). 11^2-1=120, 10^2-1=99, 9^2-1=80, 8^2-1=63, 7^2-1=48. Next = 6^2 - 1 = 35."
  },
  {
    question: "Find the missing letter in the series: B, D, G, K, P, ?",
    options: ["S", "T", "V", "W"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Positions: B(2), D(4) [+2], G(7) [+3], K(11) [+4], P(16) [+5]. Next is +6 => 16 + 6 = 22, which is V."
  },
  {
    question: "Find the missing term: 2, 3, 8, 27, 112, ?",
    options: ["450", "565", "560", "448"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Pattern: *1 + 1, *2 + 2, *3 + 3, *4 + 4, *5 + 5. 2*1+1=3, 3*2+2=8, 8*3+3=27, 27*4+4=112. Next = 112 * 5 + 5 = 560 + 5 = 565."
  },
  {
    question: "Find the missing term: 28, 33, 31, 36, 34, ?",
    options: ["37", "38", "39", "40"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Alternating pattern: +5, -2, +5, -2, +5. 34 + 5 = 39."
  },
  {
    question: "Find the next term: 582, 605, 588, 611, 594, 617, ?",
    options: ["600", "601", "602", "604"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Two alternating series: (582, 588, 594, ...) with +6 increments, and (605, 611, 617, ...) with +6 increments. Next term is from the first series: 594 + 6 = 600."
  },
  {
    question: "Find the missing term: 1, 2, 6, 24, 120, 720, ?",
    options: ["4320", "5040", "5760", "7200"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Factorial series: 1!, 2!, 3!, 4!, 5!, 6!. Next is 7! = 5040."
  },
  {
    question: "Find the wrong term: 1, 3, 10, 21, 64, 129, 356, 777",
    options: ["21", "64", "129", "356"],
    correct_index: 3,
    difficulty: "Hard",
    explanation: "Pattern: *2 + 1, *3 + 1, *2 + 1, *3 + 1. 1*2+1=3, 3*3+1=10, 10*2+1=21, 21*3+1=64, 64*2+1=129, 129*3+1=388 (given 356). Hence 356 is wrong."
  },
  {
    question: "Find the next term: Z, W, S, P, L, I, ?",
    options: ["E", "F", "G", "D"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Letters: Z(26), W(23) [-3], S(19) [-4], P(16) [-3], L(12) [-4], I(9) [-3]. Next is -4 => 9 - 4 = 5, which is E."
  },
  {
    question: "Find the next term: 0, 6, 24, 60, 120, 210, ?",
    options: ["290", "320", "336", "343"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Pattern: n^3 - n. 1^3-1=0, 2^3-2=6, 3^3-3=24, 4^3-4=60, 5^3-5=120, 6^3-6=210. Next = 7^3 - 7 = 343 - 7 = 336."
  },
  {
    question: "Find the missing term: 11, 13, 17, 19, 23, 29, 31, ?",
    options: ["33", "35", "37", "39"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Consecutive prime numbers: 11, 13, 17, 19, 23, 29, 31. Next prime is 37."
  },
  {
    question: "Find the next term: 8, 24, 12, 36, 18, 54, ?",
    options: ["27", "28", "32", "36"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Pattern: *3, /2, *3, /2, *3, /2. 54 / 2 = 27."
  },
  {
    question: "Find the missing term: CX, EV, GT, IR, ?",
    options: ["JP", "KP", "KQ", "LO"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "First letter: C(3), E(5), G(7), I(9) -> K(11). Second letter is opposite in alphabet: C-X, E-V, G-T, I-R -> K-P. The answer is KP."
  }
];

const puzzlesQuestions = [
  {
    question: "Six friends A, B, C, D, E, and F are sitting in a circle facing the center. E is to the left of D. C is between A and B. F is between E and A. Who is to the immediate right of C?",
    options: ["A", "B", "D", "E"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Order in clockwise circle: E -> F -> A -> C -> B -> D. Facing center, the immediate right of C is A."
  },
  {
    question: "Five boys are standing in a row facing north. J is to the immediate left of K. M is between L and N. K is to the immediate left of L. Who is in the middle of the row?",
    options: ["J", "K", "L", "M"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Order from left to right: J, K, L, M, N. Middle person is L."
  },
  {
    question: "In a class of 45 students, rank of Ayush is 16th from the top. What is his rank from the bottom?",
    options: ["29th", "30th", "31st", "32nd"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Rank from bottom = Total - Rank from top + 1 = 45 - 16 + 1 = 30th."
  },
  {
    question: "Seven persons P, Q, R, S, T, U, V are sitting in a row facing North. T is in the middle. R is sitting at the extreme right end. P is immediate neighbor of T and S. Who is at the extreme left end if V sits between U and Q, and Q sits left of T?",
    options: ["U", "V", "Q", "P"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "7 positions 1 to 7. Position 4 = T. Position 7 = R. Left of T are 1, 2, 3 filled by U, V, Q. U is at position 1, the extreme left end."
  },
  {
    question: "A, B, C, D, and E live on different floors of a 5-storey building (ground floor is 1, top floor is 5). B lives on an even floor. A lives above C but below E. D lives on the 1st floor. On which floor does E live?",
    options: ["2nd", "3rd", "4th", "5th"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "Floor 1 = D. Even floors are 2 and 4. Since A is above C and below E, three distinct floors are needed for C, A, E. Therefore C=2, A=3, E=5, and B=4. E lives on 5th floor."
  },
  {
    question: "In a row of trees, a tree is 7th from either end of the row. How many trees are there in the row?",
    options: ["11", "13", "14", "15"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total = 7 + 7 - 1 = 13 trees."
  },
  {
    question: "Eight friends A, B, C, D, E, F, G, H are sitting around a circular table facing center. B is 3rd to right of A. F is 2nd to left of B. D is not neighbor of A or B. Who sits opposite to A?",
    options: ["C", "D", "E", "F"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Arranging eight positions clockwise 1 to 8 with A at 1: B at 4. F is 2nd to left of B => F is at 2. Opposite to A (pos 1) in an 8-person circle is pos 5, which is E."
  },
  {
    question: "Among P, Q, R, S, and T, each having different weight, R is heavier than only P. S is lighter than Q and heavier than T. Who among them is the heaviest?",
    options: ["P", "Q", "S", "T"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "R is heavier than only P means P is the lightest, R is 2nd lightest. S is lighter than Q and heavier than T => Q > S > T. Complete order: Q > S > T > R > P. Heaviest is Q."
  },
  {
    question: "Six lectures A, B, C, D, E, F are scheduled from Monday to Saturday. C is on Wednesday. A is immediately after B. D is not on Saturday. Which lecture is on Saturday if F is on Monday and E is after C?",
    options: ["A", "B", "E", "D"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Mon=F, Wed=C. Tue must be D (since D not Sat). Thu, Fri, Sat remain. B and A must be consecutive, with E after C. Thu=E, Fri=B, Sat=A."
  },
  {
    question: "In a queue, Mohan is 14th from the front and Sohan is 18th from the rear. If they interchange their positions, Mohan becomes 22nd from the front. How many persons are there in the queue?",
    options: ["36", "38", "39", "40"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "After interchange, Mohan is at Sohan's position (18th from rear). Total = Mohan's new rank from front + old rank from rear - 1 = 22 + 18 - 1 = 39."
  },
  {
    question: "Four friends W, X, Y, Z play carrom. W and Y are partners facing each other. X faces North. If W faces West, who faces South?",
    options: ["W", "X", "Y", "Z"],
    correct_index: 3,
    difficulty: "Easy",
    explanation: "W faces West, so partner Y faces East. X faces North, so partner Z must face South."
  },
  {
    question: "If A is taller than B, C is taller than A, D is taller than E but shorter than B, who is the tallest among all?",
    options: ["A", "B", "C", "D"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Order: C > A > B > D > E. Tallest is C."
  },
  {
    question: "In a sports meet, five participants P, Q, R, S, T ran a race. S finished ahead of T but behind Q. P finished ahead of R but behind T. Who won the race?",
    options: ["P", "Q", "S", "T"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Order: Q > S > T > P > R. Q won the race."
  },
  {
    question: "Six boxes J, K, L, M, N, O are stacked. K is above L. Only two boxes are between J and N. O is immediately below M. If J is at the top, which box is at the bottom?",
    options: ["K", "L", "O", "N"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Box 1 (top) = J. 2 boxes between J and N => Box 4 = N. Box O immediately below M means M=2, O=3. K above L leaves K=5, L=6 (bottom)."
  },
  {
    question: "Rohan ranks 7th from top and 28th from bottom in a class. How many students are there in the class?",
    options: ["34", "35", "36", "37"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Total = 7 + 28 - 1 = 34."
  },
  {
    question: "Four girls A, B, C, D sit on a bench. B is to the left of C. D is to the right of C. A is to the left of B. Who is sitting on the extreme left?",
    options: ["A", "B", "C", "D"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Order from left to right: A, B, C, D. Extreme left is A."
  },
  {
    question: "P, Q, R, S, T, U are six family members. R is the sister of U. Q is the brother of T's husband. P is the father of U and grandfather of S. There are two fathers and three brothers in the group. Who is T's husband?",
    options: ["P", "Q", "U", "S"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "P is grandfather, father of U and Q. U is husband of T, Q is brother of U (brother of T's husband). T's husband is U."
  },
  {
    question: "In a row of boys, Deepak is 10th from left and Vijay is 9th from right. If they interchange their positions, Deepak becomes 15th from left. How many boys are there in the row?",
    options: ["22", "23", "24", "25"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Total = Deepak's new position + Vijay's original position from right - 1 = 15 + 9 - 1 = 23."
  },
  {
    question: "A, B, C, D, E are seated in a circle facing inward. C is seated adjacent to both A and D. B is not adjacent to D. Who is seated between B and D?",
    options: ["A", "C", "E", "Cannot be determined"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Circle of 5: D - C - A - B - E - D. E sits between B and D."
  },
  {
    question: "Five persons are standing in a queue for movie tickets. Ram is behind Shyam. Mohan is ahead of Ram but behind Shyam. Suresh is ahead of Shyam and Dinesh is behind Ram. Who is second from the front?",
    options: ["Ram", "Shyam", "Mohan", "Suresh"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Front to back: Suresh > Shyam > Mohan > Ram > Dinesh. Second from front is Shyam."
  }
];

const verbalAbilityQuestions = [
  {
    question: "Choose the word most nearly opposite in meaning (Antonym) to: CANDID",
    options: ["Blunt", "Devious", "Frank", "Honest"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Candid means truthful, straightforward, and frank. The antonym is Devious (dishonest or deceitful)."
  },
  {
    question: "Choose the word nearest in meaning (Synonym) to: METICULOUS",
    options: ["Careless", "Thorough", "Hasty", "Ignorant"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Meticulous means showing great attention to detail; very careful and precise. Synonym is Thorough."
  },
  {
    question: "Spot the error in the sentence:\nNeither the teacher (A) / nor the students (B) / was present in the meeting. (C) / No error (D)",
    options: ["A", "B", "C", "D"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Rule of proximity with 'neither...nor': the verb agrees with the closer subject ('the students'). Therefore, it should be 'were present' instead of 'was present'. Error is in (C)."
  },
  {
    question: "Fill in the blank with appropriate preposition:\nThe manager is accused ______ embezzling company funds.",
    options: ["with", "for", "of", "about"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "The verb 'accuse' takes the preposition 'of': 'accused of doing something'."
  },
  {
    question: "Select the correct passive form of:\n'The chef prepared a delectable meal.'",
    options: ["A delectable meal was prepared by the chef.", "A delectable meal had been prepared by the chef.", "A delectable meal is prepared by the chef.", "A delectable meal was being prepared by the chef."],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Simple past passive form: Subject + was/were + past participle + by agent. 'A delectable meal was prepared by the chef.'"
  },
  {
    question: "Identify the meaning of the idiom: 'To spill the beans'",
    options: ["To cook food", "To reveal a secret prematurely", "To create a mess", "To waste resources"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "'To spill the beans' means to disclose confidential information or reveal a secret."
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accommadation"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The correct spelling is 'Accommodation' (double c, double m)."
  },
  {
    question: "One who possesses many talents is called a:",
    options: ["Versatile", "Virtuoso", "Prodigy", "Polyglot"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "A person capable of doing many things well or having multifaceted skills is 'Versatile'."
  },
  {
    question: "Rearrange the jumbled sentence into meaningful order:\nP: of great importance\nQ: for professional growth\nR: continuous learning is\nS: in the tech industry",
    options: ["R P Q S", "R S P Q", "P Q R S", "Q S R P"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Sentence reads: 'Continuous learning is (R) of great importance (P) for professional growth (Q) in the tech industry (S)' or R P Q S."
  },
  {
    question: "Find the synonym of: EPHEMERAL",
    options: ["Eternal", "Transient", "Monumental", "Enduring"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Ephemeral means lasting for a very short time. Synonym is Transient."
  },
  {
    question: "Spot the error in the sentence:\nShe is one of those employees (A) / who always works (B) / overtime without complaining. (C) / No error (D)",
    options: ["A", "B", "C", "D"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "In 'one of those [plural noun] who [verb]', the relative pronoun 'who' refers to the plural antecedent 'employees', so the verb must be plural: 'who always work'. Error is in (B)."
  },
  {
    question: "Choose the antonym of: OBSCURE",
    options: ["Murky", "Vague", "Explicit", "Ambiguous"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Obscure means unclear or uncertain. The antonym is Explicit (stated clearly and in detail)."
  },
  {
    question: "Fill in the blank with appropriate tense:\nBy next December, we ______ in this city for ten years.",
    options: ["will live", "will have been living", "are living", "have lived"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Future Perfect Continuous tense is used for an action extending up to a specific future point: 'will have been living'."
  },
  {
    question: "Identify the meaning of the idiom: 'Burn the midnight oil'",
    options: ["To waste electricity", "To stay up late working or studying", "To start a fire accidentally", "To sleep early"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "'Burn the midnight oil' means to read or work late into the night."
  },
  {
    question: "Select the correct indirect speech:\nHe said to me, 'Where do you live?'",
    options: ["He asked me where I lived.", "He asked me where did I live.", "He inquired where I had lived.", "He asked where do you live."],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "In indirect questions, question word is followed by statement order (subject + verb in past tense): 'He asked me where I lived.'"
  },
  {
    question: "Choose the word which can be substituted for: 'A person who hates mankind'",
    options: ["Philanthropist", "Misanthrope", "Misogynist", "Altruist"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "A misanthrope is a person who dislikes humankind and avoids human society."
  },
  {
    question: "Spot the error:\nScarcely had he entered the room (A) / than the phone (B) / started ringing. (C) / No error (D)",
    options: ["A", "B", "C", "D"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "'Scarcely' and 'Hardly' are followed by 'when', not 'than' ('No sooner' is followed by 'than'). Error is in (B)."
  },
  {
    question: "Choose the synonym of: PRAGMATIC",
    options: ["Idealistic", "Theoretical", "Practical", "Romantic"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Pragmatic means dealing with things sensibly and realistically in a way based on practical rather than theoretical considerations."
  },
  {
    question: "Choose the correctly spelled word:",
    options: ["Bureaucracy", "Beuraucracy", "Bureaucrasy", "Burocracy"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The correct spelling is 'Bureaucracy'."
  },
  {
    question: "Fill in the blank with appropriate modal:\nYou ______ not smoke here; it is strictly prohibited by law.",
    options: ["might", "must", "could", "would"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "'Must not' expresses strong prohibition."
  }
];

const dataInterpretationQuestions = [
  {
    question: "A company's sales (in Lakhs Rs.) from 2020 to 2024 are 40, 50, 65, 80, 100. What is the percentage increase in sales from 2020 to 2024?",
    options: ["100%", "125%", "150%", "175%"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Increase = 100 - 40 = 60 Lakhs. Percentage increase = (60 / 40) * 100 = 150%."
  },
  {
    question: "In a pie chart, the angle representing expenditure on raw materials is 108°. If total expenditure is Rs. 50,00,000, what is the expenditure on raw materials?",
    options: ["Rs. 12,00,000", "Rs. 15,00,000", "Rs. 18,00,000", "Rs. 20,00,000"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Expenditure = (108 / 360) * 50,00,000 = (3 / 10) * 50,00,000 = Rs. 15,00,000."
  },
  {
    question: "The production of cars (in thousands) by Company A and B in 2023 was 120 and 150 respectively. In 2024, production increased by 20% for A and 10% for B. What is the ratio of their production in 2024?",
    options: ["48 : 55", "24 : 25", "12 : 13", "16 : 19"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "2024 Production of A = 120 * 1.20 = 144. 2024 Production of B = 150 * 1.10 = 165. Ratio = 144 : 165 = 48 : 55."
  },
  {
    question: "A bar graph shows enrollment in 5 departments: CS (120), IT (80), ECE (100), ME (60), CE (40). What percent of total students are enrolled in CS?",
    options: ["25%", "30%", "33.33%", "35%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total enrollment = 120 + 80 + 100 + 60 + 40 = 400. CS percentage = (120 / 400) * 100 = 30%."
  },
  {
    question: "In 2022, export of wheat was 300 metric tons and in 2023 it was 375 metric tons. What is the ratio of increase to initial export?",
    options: ["1 : 4", "1 : 5", "1 : 3", "2 : 5"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Increase = 375 - 300 = 75. Ratio = 75 : 300 = 1 : 4."
  },
  {
    question: "A company's revenue and expenses for 4 quarters are:\nQ1: Rev 100, Exp 70\nQ2: Rev 120, Exp 80\nQ3: Rev 150, Exp 90\nQ4: Rev 180, Exp 120\nIn which quarter was the profit margin (Profit/Revenue) highest?",
    options: ["Q1", "Q2", "Q3", "Q4"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Profits: Q1: 30/100 = 30%. Q2: 40/120 = 33.33%. Q3: 60/150 = 40%. Q4: 60/180 = 33.33%. Highest is Q3 with 40%."
  },
  {
    question: "In a pie chart of family expenses, Education occupies 72° and Food occupies 144°. The ratio of expenditure on Education to Food is:",
    options: ["1 : 2", "1 : 3", "2 : 3", "3 : 4"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Ratio = 72° / 144° = 1 : 2."
  },
  {
    question: "A table shows marks of 5 students in Math and Physics (Math, Physics):\nA: (85, 90), B: (75, 80), C: (95, 85), D: (60, 70), E: (80, 75).\nWhat is the average marks in Physics?",
    options: ["78", "80", "82", "84"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Sum of Physics marks = 90 + 80 + 85 + 70 + 75 = 400. Average = 400 / 5 = 80."
  },
  {
    question: "If the total budget is Rs. 18,00,000, and R&D constitutes 15% of the total budget, what central angle does R&D represent in a pie chart?",
    options: ["45°", "54°", "60°", "72°"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Central angle = (15 / 100) * 360° = 54°."
  },
  {
    question: "The following line chart gives import/export ratio for 5 years: 0.8, 1.2, 0.9, 1.5, 0.75. In how many years was export greater than import?",
    options: ["1", "2", "3", "4"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Import/Export < 1 means Export > Import. The ratios less than 1 are 0.8 and 0.75 (and 0.9). Wait: 0.8, 0.9, 0.75 are 3 years. Let's verify: 0.8 < 1, 0.9 < 1, 0.75 < 1. That is 3 years.",
    options: ["1", "2", "3", "4"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "If Import/Export < 1, then Export > Import. Ratios 0.8, 0.9, and 0.75 are less than 1. Thus in 3 years export was greater than import."
  },
  {
    question: "Between 2021 and 2024, the pass percentage of a college was: 82%, 85%, 88%, 91%. What was the average annual increase in percentage points?",
    options: ["2.5%", "3.0%", "3.5%", "4.0%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total increase = 91 - 82 = 9 percentage points over 3 intervals. Average annual increase = 9 / 3 = 3.0 percentage points."
  },
  {
    question: "A company's production in 4 units (A, B, C, D) is 250, 350, 400, 500 units. If defective items are 4%, 2%, 3%, 1% respectively, what is the total number of defective items?",
    options: ["30", "32", "34", "36"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Defectives: A = 250 * 0.04 = 10. B = 350 * 0.02 = 7. C = 400 * 0.03 = 12. D = 500 * 0.01 = 5. Total = 10 + 7 + 12 + 5 = 34. Wait: 10 + 7 + 12 + 5 = 34! Option is 34.",
    options: ["30", "32", "34", "36"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Defectives = 250*0.04 (10) + 350*0.02 (7) + 400*0.03 (12) + 500*0.01 (5) = 34 items."
  },
  {
    question: "Total employee strength is 1200. Males to Females ratio is 7 : 5. If 40% of males and 60% of females are engineers, how many engineers are there?",
    options: ["540", "580", "600", "620"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Males = 700, Females = 500. Male engineers = 700 * 0.40 = 280. Female engineers = 500 * 0.60 = 300. Total engineers = 280 + 300 = 580."
  },
  {
    question: "A survey showed that 65% read Newspaper A, 55% read Newspaper B, and 30% read both. What percentage reads neither newspaper?",
    options: ["5%", "10%", "15%", "20%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "P(A U B) = P(A) + P(B) - P(A n B) = 65% + 55% - 30% = 90%. Percentage reading neither = 100% - 90% = 10%."
  },
  {
    question: "The average salary in Branch X (50 employees) is Rs. 40,000 and in Branch Y (70 employees) is Rs. 52,000. What is the combined average salary?",
    options: ["Rs. 45,000", "Rs. 46,000", "Rs. 47,000", "Rs. 48,000"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Combined average = (50 * 40000 + 70 * 52000) / 120 = (2000000 + 3640000) / 120 = 5640000 / 120 = Rs. 47,000."
  },
  {
    question: "In a pie chart, if the central angle for Housing is 90° and for Entertainment is 45°, expenditure on Housing is what percent greater than Entertainment?",
    options: ["50%", "75%", "100%", "125%"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Housing is 90° and Entertainment is 45°. Difference = 45°. Percentage increase = (45° / 45°) * 100 = 100%."
  },
  {
    question: "A line graph shows that Company X's market share grew from 16% in 2021 to 24% in 2023. What was the relative growth rate of market share?",
    options: ["33.33%", "40%", "50%", "60%"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Relative growth = ((24 - 16) / 16) * 100 = (8 / 16) * 100 = 50%."
  },
  {
    question: "Annual profit of a startup over 3 years: Year 1: Rs. -5 Lakhs (loss), Year 2: Rs. 15 Lakhs, Year 3: Rs. 35 Lakhs. What is the average annual profit?",
    options: ["Rs. 10 Lakhs", "Rs. 15 Lakhs", "Rs. 18 Lakhs", "Rs. 20 Lakhs"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total profit = -5 + 15 + 35 = 45 Lakhs. Average = 45 / 3 = Rs. 15 Lakhs."
  },
  {
    question: "In a company of 500 employees, 220 drink Coffee, 180 drink Tea, and 50 drink both. How many drink neither?",
    options: ["120", "130", "140", "150"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "Total drinking either = 220 + 180 - 50 = 350. Those drinking neither = 500 - 350 = 150."
  },
  {
    question: "Production of mobile phones by a factory increased from 50,000 units in 2021 to 72,000 units in 2023. Assuming a uniform compound annual growth rate (CAGR), what was the annual growth rate?",
    options: ["18%", "20%", "22%", "24%"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "72000 / 50000 = 1.44 = (1 + r)^2. 1 + r = sqrt(1.44) = 1.20 => r = 20%."
  }
];

module.exports = {
  directionsQuestions,
  syllogismsQuestions,
  seriesQuestions,
  puzzlesQuestions,
  verbalAbilityQuestions,
  dataInterpretationQuestions
};
