/**
 * Comprehensive Question Banks for Core Engineering Companies:
 * - Electronics: Texas Instruments, Qualcomm, Intel
 * - Electrical: Siemens, Schneider Electric, ABB
 * - Civil: L&T Construction, Tata Projects
 * - Mechanical: Tata Motors, L&T Heavy Engineering
 * 
 * Exactly 20 questions per test, with 4 options and detailed explanations.
 */

// ============================================================================
// 1. ELECTRONICS COMPANIES (ECE)
// ============================================================================

// TEXAS INSTRUMENTS - CORE ELECTRONICS (20 Qs)
const tiCoreQuestions = [
  {
    question: "In an ideal Operational Amplifier inverting amplifier circuit with input resistor R1 = 10 kΩ and feedback resistor Rf = 100 kΩ, what is the closed-loop voltage gain?",
    options: ["-10", "10", "-11", "100"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "For an inverting Op-Amp amplifier, closed-loop gain Av = -Rf / R1 = -100k / 10k = -10."
  },
  {
    question: "If an Op-Amp has a slew rate of 2 V/μs, what is the maximum undistorted frequency for an output sinusoidal signal with a peak voltage of 10 V?",
    options: ["31.8 kHz", "63.6 kHz", "20.0 kHz", "100 kHz"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Slew rate SR = 2π * f_max * Vp => f_max = SR / (2π * Vp) = (2 * 10^6) / (2 * π * 10) ≈ 31,830 Hz = 31.8 kHz."
  },
  {
    question: "In a BJT Common Emitter amplifier, what is the phase shift between the input voltage and the collector output voltage?",
    options: ["0 degrees", "90 degrees", "180 degrees", "270 degrees"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "A Common Emitter BJT amplifier introduces a 180° phase inversion between the base input and collector output."
  },
  {
    question: "Which of the following is a key advantage of applying negative feedback to an amplifier circuit?",
    options: ["Increases voltage gain", "Increases bandwidth and improves stability", "Decreases input impedance", "Increases harmonic distortion"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Negative feedback sacrifices raw voltage gain in exchange for increased bandwidth, reduced distortion, improved gain stability, and control over input/output impedances."
  },
  {
    question: "According to the Barkhausen criterion, what are the two conditions required for sustained sinusoidal oscillations?",
    options: ["Loop gain |Aβ| = 1 and phase shift = 0° (or 360°)", "Loop gain |Aβ| < 1 and phase shift = 90°", "Loop gain |Aβ| = 0 and phase shift = 180°", "Loop gain |Aβ| > 10 and phase shift = 45°"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The Barkhausen criteria state that loop gain magnitude |Aβ| must equal 1, and the total loop phase shift must be 0° or integer multiples of 360°."
  },
  {
    question: "According to the Nyquist-Shannon sampling theorem, what is the minimum sampling rate required to avoid aliasing for a voice signal with maximum frequency of 4 kHz?",
    options: ["4 kHz", "8 kHz", "16 kHz", "2 kHz"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Nyquist rate f_s >= 2 * f_max = 2 * 4 kHz = 8 kHz."
  },
  {
    question: "In digital synchronous design, what is 'setup time' (t_setup) of a D flip-flop?",
    options: ["Time data must remain stable after clock edge", "Minimum time data must remain stable before active clock edge", "Time taken for output Q to change after clock edge", "Total clock period"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Setup time is the minimum duration the input data signal must remain valid and stable before the active clock edge arrives."
  },
  {
    question: "To prevent setup time violations in a synchronous circuit with clock period T_clk, which condition must be satisfied?",
    options: ["T_clk >= t_cq + t_comb + t_setup", "T_clk <= t_cq + t_comb", "t_hold >= t_cq + t_setup", "T_clk = t_setup - t_hold"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Clock period T_clk must be greater than or equal to flip-flop clock-to-Q delay (t_cq) + combinational logic delay (t_comb) + setup time (t_setup)."
  },
  {
    question: "What hardware technique is commonly used to resolve metastability when crossing asynchronous clock domains?",
    options: ["A single pull-down resistor", "Two flip-flop synchronizer chain", "High-pass RC filter", "Open-collector buffer"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "A two-stage flip-flop synchronizer chain gives the metastable output of the first flip-flop an entire clock period to settle to a valid logic level."
  },
  {
    question: "In the standard 8051 microcontroller architecture, what is the size of the internal on-chip Data RAM?",
    options: ["64 bytes", "128 bytes", "256 bytes", "512 bytes"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The standard 8051 microcontroller has 128 bytes of internal on-chip RAM (addresses 00H to 7FH)."
  },
  {
    question: "In the ARM Cortex-M architecture, which register serves as the Program Counter (PC)?",
    options: ["R13", "R14", "R15", "R12"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "In ARM Cortex-M: R13 is Stack Pointer (SP), R14 is Link Register (LR), and R15 is Program Counter (PC)."
  },
  {
    question: "Why is the 'volatile' keyword essential when declaring hardware register pointers or variables shared with an Interrupt Service Routine (ISR) in C?",
    options: ["To store the variable in flash ROM", "To tell the compiler not to optimize away reads/writes to memory", "To make variable execution faster", "To encrypt the memory address"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "The 'volatile' qualifier tells the compiler that the variable's value can change outside the immediate program flow (e.g. by hardware or an ISR), preventing aggressive caching in CPU registers."
  },
  {
    question: "How many active signal lines are required for standard I2C bus communication?",
    options: ["1 line (1-Wire)", "2 lines (SDA and SCL)", "4 lines (MOSI, MISO, SCK, CS)", "3 lines (TX, RX, GND)"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "I2C requires 2 bidirectional lines: Serial Data (SDA) and Serial Clock (SCL), both pulled high with resistors."
  },
  {
    question: "Which serial communication protocol operates in full-duplex using 4 dedicated lines (MOSI, MISO, SCK, and CS)?",
    options: ["UART", "I2C", "SPI", "CAN"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Serial Peripheral Interface (SPI) uses 4 lines: Master Out Slave In (MOSI), Master In Slave Out (MISO), Serial Clock (SCK), and Chip Select (CS/SS)."
  },
  {
    question: "What is the duty cycle of a PWM signal that is HIGH for 2 ms in a total period of 10 ms?",
    options: ["10%", "20%", "50%", "80%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Duty Cycle = (T_on / T_total) * 100 = (2 ms / 10 ms) * 100 = 20%."
  },
  {
    question: "Which type of Analog-to-Digital Converter (ADC) provides the fastest conversion speed at the expense of high hardware complexity?",
    options: ["Dual-slope integrating ADC", "Flash (Parallel) ADC", "Successive Approximation Register (SAR) ADC", "Delta-Sigma ADC"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Flash ADC converts in a single clock cycle using 2^N - 1 parallel comparators, making it the fastest ADC architecture."
  },
  {
    question: "For an 8-bit digital-to-analog converter (DAC) with a reference voltage of 5.10 V, what is the resolution voltage per step?",
    options: ["10 mV", "20 mV", "50 mV", "5 mV"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Resolution = Vref / (2^N - 1) = 5.10 V / 255 = 0.020 V = 20 mV."
  },
  {
    question: "What is the cutoff frequency of a first-order passive RC low-pass filter with R = 1 kΩ and C = 0.1 μF?",
    options: ["1.59 kHz", "3.18 kHz", "15.9 kHz", "795 Hz"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Cutoff frequency fc = 1 / (2π * R * C) = 1 / (2 * 3.1416 * 1000 * 10^-7) ≈ 1591.5 Hz = 1.59 kHz."
  },
  {
    question: "What is the maximum number of standard logic gate inputs that a single logic gate output can reliably drive without signal degradation called?",
    options: ["Fan-in", "Fan-out", "Propagation margin", "Noise margin"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Fan-out is the maximum number of digital inputs that can be driven by a single output while maintaining legitimate logic voltage levels."
  },
  {
    question: "In CMOS technology, why is static power dissipation virtually zero in steady-state logic levels?",
    options: ["Only resistors are used", "NMOS and PMOS transistors are never on simultaneously in steady state", "The supply voltage is zero", "Capacitors block all current"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "In CMOS, the pull-up network (PMOS) and pull-down network (NMOS) are complementary; one is off when the other is on, so no direct DC path to ground exists in steady state."
  }
];

// TEXAS INSTRUMENTS - APTITUDE (20 Qs)
const tiAptitudeQuestions = [
  {
    question: "A pulse generator frequency increases by 25%. By what percentage does the pulse period decrease?",
    options: ["20%", "25%", "15%", "33.3%"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Period T = 1 / f. If f becomes 1.25f, new period T' = T / 1.25 = 0.8T. Decrease = 1 - 0.8 = 0.20 = 20%."
  },
  {
    question: "An engineer tests 40 microcontrollers. The ratio of functional chips to defective chips is 7 : 1. How many chips are functional?",
    options: ["30", "35", "32", "28"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total parts = 7 + 1 = 8 parts. Functional chips = (7/8) * 40 = 35 chips."
  },
  {
    question: "A capacitor charges to 63.2% of its maximum voltage in 2 milliseconds. What is the time constant τ of the RC circuit?",
    options: ["1 ms", "2 ms", "4 ms", "6.32 ms"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "By definition, one time constant τ is the time taken to charge to 1 - e^-1 ≈ 63.2% of the supply voltage. Therefore, τ = 2 ms."
  },
  {
    question: "If a circuit draws 2.5 A current from a 120 V AC source at a power factor of 0.8 lagging, what is the real power consumed?",
    options: ["300 W", "240 W", "375 W", "150 W"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Real power P = V * I * cos(θ) = 120 * 2.5 * 0.8 = 240 W."
  },
  {
    question: "In a quality inspection of 1200 wafers, 3% are rejected at stage 1, and 5% of the remaining are rejected at stage 2. How many wafers pass both stages?",
    options: ["1106", "1100", "1104", "1110"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "After stage 1: 1200 * 0.97 = 1164. After stage 2: 1164 * 0.95 = 1105.8 ≈ 1106 wafers pass."
  },
  {
    question: "A digital counter counts from 0 to 255. How many bits are required in the counter register?",
    options: ["7 bits", "8 bits", "9 bits", "16 bits"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "2^8 = 256 states (0 through 255), which requires 8 bits."
  },
  {
    question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "48"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Pattern: 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42. Differences are +4, +6, +8, +10, +12."
  },
  {
    question: "A signal travels through a 15-meter coaxial cable at 2 * 10^8 m/s. What is the propagation delay through the cable?",
    options: ["75 ns", "15 ns", "30 ns", "150 ns"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Delay = Distance / Velocity = 15 / (2 * 10^8) = 7.5 * 10^-8 s = 75 ns."
  },
  {
    question: "Three resistors of 6 Ω, 3 Ω, and 2 Ω are connected in parallel. What is their equivalent resistance?",
    options: ["1 Ω", "2 Ω", "11 Ω", "0.5 Ω"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "1/Req = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1. Therefore Req = 1 Ω."
  },
  {
    question: "A sensor data packet has 64 bytes of payload and 16 bytes of header. What percentage of the total packet is payload?",
    options: ["75%", "80%", "85%", "64%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total packet = 64 + 16 = 80 bytes. Payload percentage = (64 / 80) * 100 = 80%."
  },
  {
    question: "A clock signal has a frequency of 50 MHz. What is the clock period in nanoseconds?",
    options: ["50 ns", "20 ns", "2 ns", "5 ns"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Period T = 1 / f = 1 / (50 * 10^6) = 20 * 10^-9 s = 20 ns."
  },
  {
    question: "In how many ways can 4 different IC test probes be placed into 4 distinct testing slots?",
    options: ["16", "24", "12", "64"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "4! = 4 * 3 * 2 * 1 = 24 ways."
  },
  {
    question: "A technician can solder 15 boards in 3 hours. An automated machine can solder 30 boards in 2 hours. Working together, how many boards can they solder in 6 hours?",
    options: ["90", "120", "100", "110"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Technician rate = 15 / 3 = 5 boards/hr. Machine rate = 30 / 2 = 15 boards/hr. Combined = 20 boards/hr. In 6 hours = 20 * 6 = 120 boards."
  },
  {
    question: "A logic analyzer samples at 100 MSamples/sec. How much time elapses between two consecutive samples?",
    options: ["10 ns", "100 ns", "1 ns", "0.1 μs"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "T = 1 / (100 * 10^6) = 10^-8 s = 10 ns."
  },
  {
    question: "If A is faster than B by 20%, and B takes 30 minutes to run an automated simulation, how long does A take?",
    options: ["24 minutes", "25 minutes", "20 minutes", "22 minutes"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Speed ratio A : B = 1.2 : 1 = 6 : 5. Time ratio is reciprocal = 5 : 6. If 6 units = 30 mins, 5 units = (30/6) * 5 = 25 minutes."
  },
  {
    question: "The binary number 11010110 in two's complement representation represents which decimal number?",
    options: ["-42", "-74", "214", "-38"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Most significant bit is 1 (negative). Invert bits: 00101001 (41). Add 1: 42. Value = -42."
  },
  {
    question: "A firmware binary of size 512 KB is downloaded over a serial UART link at 115200 baud (approx 11.52 KB/s). Roughly how long does the download take?",
    options: ["44.4 seconds", "22.2 seconds", "10 seconds", "88.8 seconds"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "512 KB / 11.52 KB/s ≈ 44.44 seconds."
  },
  {
    question: "What is the probability of obtaining at least one logic '1' when flipping 3 independent fair binary bits?",
    options: ["1/8", "7/8", "3/4", "1/2"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "P(at least one 1) = 1 - P(all 0s) = 1 - (1/2)^3 = 1 - 1/8 = 7/8."
  },
  {
    question: "A power amplifier has an efficiency of 75%. If it delivers 60 W of RF power to an antenna, what is the DC power drawn from the supply?",
    options: ["80 W", "75 W", "45 W", "90 W"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Efficiency = P_out / P_in => P_in = 60 / 0.75 = 80 W."
  },
  {
    question: "In a Boolean expression F = AB + A'C + BC, which term is redundant by the Consensus Theorem?",
    options: ["AB", "A'C", "BC", "None"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "By the Consensus Theorem: AB + A'C + BC = AB + A'C. The term BC is redundant."
  }
];

// QUALCOMM - CORE DIGITAL & VLSI (20 Qs)
const qualcommCoreQuestions = [
  {
    question: "In Verilog HDL, what is the fundamental difference between a blocking assignment (=) and a non-blocking assignment (<=)?",
    options: ["Blocking evaluates in parallel; non-blocking evaluates serially", "Blocking assignments execute sequentially; non-blocking evaluate concurrently in the Active region and update in NBA", "Non-blocking can only be used in assign statements", "Blocking is only for testbenches"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Blocking (=) executes sequentially within a procedural block. Non-blocking (<=) schedules updates concurrently, essential for modeling synchronous flip-flop registers without race conditions."
  },
  {
    question: "In a Mealy state machine, outputs are a function of:",
    options: ["Present state only", "Present state and current inputs", "Current inputs only", "Clock frequency only"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "In a Mealy machine, outputs depend on both the present state and current inputs. In a Moore machine, outputs depend strictly on the present state."
  },
  {
    question: "In Static Timing Analysis (STA), what does a negative setup slack value indicate?",
    options: ["The circuit runs faster than expected", "A setup timing violation exists and data arrives too late", "A hold time violation exists", "Clock skew is zero"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Slack = Required Arrival Time - Actual Arrival Time. Negative slack means data arrives after the required deadline, causing a timing violation."
  },
  {
    question: "What is the dynamic power dissipation formula in a digital CMOS gate?",
    options: ["P = V_dd * I_leak", "P = α * C_L * V_dd^2 * f", "P = C_L * V_dd * f^2", "P = 0.5 * I_sc * V_dd"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Dynamic switching power is given by P_dyn = α * C_L * V_dd^2 * f, where α is the switching activity factor, C_L is load capacitance, V_dd is supply voltage, and f is clock frequency."
  },
  {
    question: "Which of the following cache mapping techniques provides the highest hit ratio for general access patterns but requires associative comparison across all lines?",
    options: ["Direct Mapped Cache", "Fully Associative Cache", "2-Way Set Associative Cache", "Sectored Cache"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "A Fully Associative Cache allows any memory block to reside in any cache line, minimizing conflict misses at the expense of comparator hardware complexity."
  },
  {
    question: "In a 5-stage RISC processor pipeline (IF, ID, EX, MEM, WB), what type of hazard occurs when an instruction depends on the result of an earlier instruction still in the pipeline?",
    options: ["Structural hazard", "Data hazard (Read-After-Write)", "Control hazard", "Branch hazard"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "A Read-After-Write (RAW) data hazard occurs when an instruction requires operand data generated by a preceding instruction before it is committed to registers."
  },
  {
    question: "What C expression checks if a positive integer 'n' is a power of 2 using bitwise operations?",
    options: ["(n & (n - 1)) == 0", "(n | (n - 1)) == 0", "(n ^ (n - 1)) == 1", "(~n & n) == 0"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Powers of 2 have exactly one '1' bit (e.g., 8 is 1000). Subtracting 1 flips all bits up to that bit (7 is 0111). Performing bitwise AND yields 0: (n & (n - 1)) == 0."
  },
  {
    question: "According to the Shannon-Hartley theorem, what is the theoretical channel capacity C of a 2 MHz bandwidth channel with SNR = 15?",
    options: ["4 Mbps", "8 Mbps", "16 Mbps", "2 Mbps"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "C = B * log2(1 + SNR) = 2 MHz * log2(1 + 15) = 2 MHz * log2(16) = 2 MHz * 4 = 8 Mbps."
  },
  {
    question: "Why is Gray code preferred over binary code for pointers in asynchronous dual-clock FIFOs?",
    options: ["Gray code is faster to increment", "Only one bit changes between adjacent values, preventing multi-bit glitches", "Gray code uses fewer bits", "Gray code compresses data"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "In Gray code, only a single bit transitions between successive values. This prevents multi-bit synchronizer race conditions when sampling across clock domains."
  },
  {
    question: "In modern wireless transceivers, what is the role of a Low Noise Amplifier (LNA)?",
    options: ["To amplify high-power transmission signals to the antenna", "To amplify very weak received signals at the antenna while introducing minimal noise", "To convert DC power to RF power", "To demodulate QAM signals directly"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The LNA is the very first stage in the RF receiver chain, amplifying weak microvolt antenna signals while adding as little thermal noise as possible (low Noise Figure)."
  },
  {
    question: "What is the primary advantage of Orthogonal Frequency Division Multiplexing (OFDM) in 4G/5G wireless communication?",
    options: ["Low peak-to-average power ratio", "High resilience to multipath frequency-selective fading", "Does not require fast Fourier transforms", "Eliminates antenna size requirements"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "OFDM converts a wideband frequency-selective fading channel into multiple narrowband flat-fading subcarriers, dramatically simplifying equalization and eliminating inter-symbol interference (ISI)."
  },
  {
    question: "What is 'clock gating' in low-power ASIC/VLSI design?",
    options: ["Multiplexing two high-speed clocks", "Disabling the clock tree to idle logic blocks to eliminate dynamic power consumption", "Increasing clock frequency dynamically", "Adding buffers to decrease clock skew"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Clock gating uses logic gates (ICGs) to shut off the clock signal to registers whose values do not change in a given cycle, preventing useless capacitive charging."
  },
  {
    question: "In computer memory systems, which byte ordering places the least significant byte at the lowest memory address?",
    options: ["Big-endian", "Little-endian", "Bi-endian", "Middle-endian"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "In little-endian architectures (such as x86 and ARM default), the least significant byte (LSB) is stored at the lowest memory address."
  },
  {
    question: "What type of timing violation CANNOT be resolved by simply lowering the clock frequency?",
    options: ["Setup time violation", "Hold time violation", "Clock period violation", "Latency violation"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "Hold time depends on the minimum combinational delay between registers on the same or adjacent clock edge (t_cq + t_comb >= t_hold). It is independent of clock period; lowering frequency does not fix hold violations."
  },
  {
    question: "What hardware component handles data transfer between peripheral devices and main memory without continuous CPU intervention?",
    options: ["ALU", "DMA Controller", "Branch predictor", "Instruction decoder"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Direct Memory Access (DMA) controllers offload bulk data transfers directly between I/O peripherals and RAM, freeing the CPU for compute tasks."
  },
  {
    question: "What logic family implementation uses complementary pairs of PMOS and NMOS transistors?",
    options: ["TTL", "ECL", "CMOS", "NMOS logic"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "CMOS (Complementary Metal-Oxide-Semiconductor) utilizes paired PMOS and NMOS transistors."
  },
  {
    question: "What modulation scheme encodes 4 bits per transmitted symbol?",
    options: ["BPSK (1 bit)", "QPSK (2 bits)", "8-PSK (3 bits)", "16-QAM (4 bits)"],
    correct_index: 3,
    difficulty: "Medium",
    explanation: "16-QAM has 16 constellation points. Since 2^4 = 16, it transmits 4 bits per symbol."
  },
  {
    question: "In digital filter design, what is a key distinguishing characteristic of a Finite Impulse Response (FIR) filter compared to an IIR filter?",
    options: ["FIR filters are always unstable", "FIR filters can achieve strictly linear phase response and are inherently stable", "FIR filters require feedback loops", "FIR filters use fewer coefficients"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "FIR filters have only zeros (no poles other than at z=0), making them inherently stable with achievable perfect linear phase."
  },
  {
    question: "What is the purpose of adding a Cyclic Prefix in OFDM communication?",
    options: ["To increase data transmission rate", "To eliminate Inter-Symbol Interference (ISI) and maintain subcarrier orthogonality", "To encrypt user data packets", "To modulate carrier phase"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "The Cyclic Prefix copies the end of an OFDM symbol to the beginning, acting as a guard interval that absorbs multipath channel delay spreads and prevents ISI."
  },
  {
    question: "In C, what is the size of a pointer variable on a 64-bit architecture?",
    options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "On a 64-bit operating system and architecture, all memory pointers are 64 bits = 8 bytes in size."
  }
];

// QUALCOMM - APTITUDE (20 Qs)
const qualcommAptitudeQuestions = [
  {
    question: "A wireless receiver buffer of 200 MB fills at 25 MB/s and drains at 15 MB/s. How long until the buffer overflows?",
    options: ["10 seconds", "20 seconds", "15 seconds", "25 seconds"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Net fill rate = 25 - 15 = 10 MB/s. Time to overflow = 200 MB / 10 MB/s = 20 seconds."
  },
  {
    question: "A clock frequency is scaled down from 2.4 GHz to 1.8 GHz. What is the percentage reduction in frequency?",
    options: ["20%", "25%", "33.3%", "15%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Reduction = (2.4 - 1.8) / 2.4 = 0.6 / 2.4 = 0.25 = 25%."
  },
  {
    question: "In an array of 64 elements, what is the maximum number of comparisons required to find an element using Binary Search?",
    options: ["6", "7", "8", "64"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "log2(64) = 6 comparisons in the worst case."
  },
  {
    question: "A test engineer runs a script that has a 90% success rate on any single run. What is the probability that all 3 consecutive independent runs succeed?",
    options: ["72.9%", "81.0%", "90.0%", "65.6%"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "P = 0.9 * 0.9 * 0.9 = 0.729 = 72.9%."
  },
  {
    question: "If a circuit chip's voltage is reduced by 20%, by what percentage is the dynamic power reduced (assuming frequency remains constant)?",
    options: ["20%", "36%", "40%", "44%"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Power is proportional to V^2. New power = (0.8 V)^2 = 0.64 P. Reduction = 1 - 0.64 = 0.36 = 36%."
  },
  {
    question: "Two trains of length 150 m and 250 m travel in opposite directions at 60 km/h and 84 km/h respectively. How long do they take to cross each other completely?",
    options: ["10 seconds", "12 seconds", "15 seconds", "8 seconds"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Total distance = 150 + 250 = 400 m. Relative speed = 60 + 84 = 144 km/h = 144 * (5/18) = 40 m/s. Time = 400 / 40 = 10 seconds."
  },
  {
    question: "What is the 10th term of the arithmetic progression: 7, 13, 19, 25...?",
    options: ["55", "61", "67", "58"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "a = 7, d = 6. a_10 = a + (n - 1)d = 7 + (9 * 6) = 7 + 54 = 61."
  },
  {
    question: "A 4-core processor executes a parallelizable task in 15 seconds. If Amdahl's Law applies and 80% of the program is parallel, what was the sequential execution time on 1 core?",
    options: ["37.5 seconds", "40 seconds", "30 seconds", "60 seconds"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "Speedup S = 1 / ((1 - 0.8) + 0.8 / 4) = 1 / (0.2 + 0.2) = 1 / 0.4 = 2.5x. Sequential time = 15 * 2.5 = 37.5 seconds."
  },
  {
    question: "How many subnets can be created from a Class C network with a subnet mask of 255.255.255.224?",
    options: ["4", "8", "16", "32"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "224 in binary is 11100000 (3 subnet bits borrowed). Number of subnets = 2^3 = 8 subnets."
  },
  {
    question: "If 12 machines can assemble 72 smartphone chipsets in 6 hours, how many chipsets can 8 machines assemble in 9 hours?",
    options: ["72", "64", "48", "80"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "1 machine rate = 72 / (12 * 6) = 1 chipset/hour. 8 machines in 9 hours = 8 * 9 * 1 = 72 chipsets."
  },
  {
    question: "Find the odd one out: 121, 169, 225, 289, 361",
    options: ["121", "225", "289", "361"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "121 (11^2), 169 (13^2), 289 (17^2), 361 (19^2) are squares of prime numbers. 225 is 15^2 (composite number)."
  },
  {
    question: "A digital signal has a signal-to-noise ratio (SNR) of 30 dB. What is the linear power ratio?",
    options: ["30", "100", "1000", "10000"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "SNR(dB) = 10 * log10(SNR_linear) => 30 = 10 * log10(SNR_linear) => log10 = 3 => SNR_linear = 10^3 = 1000."
  },
  {
    question: "In how many ways can 5 engineers be seated in a row such that 2 specific engineers always sit together?",
    options: ["24", "48", "120", "60"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Treat the 2 engineers as 1 block. Total units = 4. Number of ways = 4! * 2! = 24 * 2 = 48 ways."
  },
  {
    question: "A battery capacity is 4000 mAh. If an embedded IoT node consumes an average current of 2 mA, what is the estimated battery life in days?",
    options: ["83.3 days", "100 days", "50 days", "120 days"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Operating hours = 4000 mAh / 2 mA = 2000 hours. In days = 2000 / 24 ≈ 83.33 days."
  },
  {
    question: "The sum of ages of a father and son is 50 years. Five years ago, the father's age was 7 times the son's age. What is the father's current age?",
    options: ["38 years", "40 years", "42 years", "45 years"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "5 years ago, sum was 50 - 10 = 40. Ratio was 7 : 1 (8 parts). Son was 5, Father was 35. Today father is 35 + 5 = 40 years."
  },
  {
    question: "A 16-bit DAC has a full-scale range of 10 V. What is its least significant bit (LSB) voltage?",
    options: ["152.6 μV", "305.2 μV", "1.52 mV", "61.0 μV"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "LSB = 10 V / (2^16 - 1) = 10 / 65535 ≈ 1.5258 * 10^-4 V ≈ 152.6 μV."
  },
  {
    question: "A packet transmission has a Bit Error Rate (BER) of 10^-4. For a 1000-bit packet, what is the approximate probability of zero bit errors?",
    options: ["90.5%", "99.0%", "85.0%", "95.5%"],
    correct_index: 0,
    difficulty: "Hard",
    explanation: "P(no error) = (1 - 10^-4)^1000 ≈ e^(-1000 * 10^-4) = e^(-0.1) ≈ 0.9048 = 90.5%."
  },
  {
    question: "A memory card is sold at a 15% discount for $68. What was its original marked price?",
    options: ["$80", "$75", "$85", "$90"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "0.85 * Marked Price = 68 => Marked Price = 68 / 0.85 = $80."
  },
  {
    question: "What is the angle between the hour hand and minute hand of a clock at 3:30?",
    options: ["75 degrees", "90 degrees", "60 degrees", "85 degrees"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Angle = |30 * H - 5.5 * M| = |30 * 3 - 5.5 * 30| = |90 - 165| = 75 degrees."
  },
  {
    question: "If a 32-bit register is shifted left by 3 bits, it is mathematically equivalent to multiplying the value by:",
    options: ["3", "6", "8", "9"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "A bitwise left shift by k positions multiplies the integer value by 2^k. For k = 3, 2^3 = 8."
  }
];

// ============================================================================
// 2. ELECTRICAL COMPANIES (EEE)
// ============================================================================

// SIEMENS - CORE ELECTRICAL (20 Qs)
const siemensCoreQuestions = [
  {
    question: "A 4-pole, 50 Hz three-phase induction motor operates at a full load speed of 1440 RPM. What is its percentage slip?",
    options: ["2%", "4%", "5%", "6%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Synchronous speed Ns = (120 * f) / P = (120 * 50) / 4 = 1500 RPM. Slip s = (Ns - N) / Ns = (1500 - 1440) / 1500 = 60 / 1500 = 0.04 = 4%."
  },
  {
    question: "In a power transformer, what condition yields maximum operating efficiency?",
    options: ["Hysteresis loss equals eddy current loss", "Copper loss equals core (iron) loss", "Copper loss is zero", "Core loss is zero"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Maximum transformer efficiency occurs when the variable copper losses (I^2 * R) equal the constant core/iron losses."
  },
  {
    question: "What test is performed on a transformer to determine its core losses and magnetizing branch parameters?",
    options: ["Short Circuit Test", "Open Circuit Test", "Sumpner's Test", "Polarity Test"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The Open Circuit (OC) test is conducted at rated voltage on the low-voltage side with the high-voltage side open, drawing only no-load core loss current."
  },
  {
    question: "What causes the 'Ferranti Effect' observed in long high-voltage transmission lines?",
    options: ["Line inductive reactance at heavy load", "Line charging capacitance under no-load or light load conditions", "High resistance of copper conductors", "Corona discharge during rain"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "The Ferranti Effect occurs when the receiving end voltage exceeds sending end voltage under no-load or light load conditions due to the line's distributed shunt capacitance."
  },
  {
    question: "In symmetrical components fault analysis, which sequence current flows through the neutral conductor during an unsymmetrical fault?",
    options: ["Positive sequence current", "Negative sequence current", "Three times the zero sequence current (3 * I_a0)", "Zero"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "The neutral current in a 3-phase system is I_n = I_a + I_b + I_c = 3 * I_a0. Only zero sequence currents return through the neutral path."
  },
  {
    question: "Which protective relay is installed on oil-immersed transformers to detect internal incipient faults and gas generation?",
    options: ["Buchholz relay", "Mho relay", "Overcurrent relay", "Thermal overload relay"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "A Buchholz relay is a gas-actuated protective device mounted on the pipe connecting the main transformer tank to the conservator tank."
  },
  {
    question: "What is the primary function of shunt capacitor banks in electrical transmission substations?",
    options: ["To absorb reactive power and reduce voltage", "To supply lagging reactive power (kVAR) and improve power factor", "To filter high-frequency lightning surges", "To step down voltage"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Shunt capacitor banks supply capacitive reactive power locally, neutralizing inductive reactive demand and raising line power factor and voltage levels."
  },
  {
    question: "In a synchronous generator, what happens to the terminal voltage when supplying a purely capacitive load at rated current?",
    options: ["Voltage drops significantly", "Terminal voltage rises due to magnetizing armature reaction", "Terminal voltage drops to zero", "Power factor becomes lagging"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "With a leading (capacitive) power factor load, the armature reaction flux directly aids the main field flux (direct-axis magnetizing effect), increasing generated terminal voltage."
  },
  {
    question: "What is the ripple frequency of a 3-phase full-wave bridge rectifier connected to a 50 Hz AC supply?",
    options: ["100 Hz", "150 Hz", "300 Hz", "600 Hz"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "A 3-phase 6-pulse bridge rectifier produces 6 output pulses per AC cycle. Ripple frequency = 6 * 50 Hz = 300 Hz."
  },
  {
    question: "In variable frequency drives (VFD) controlling induction motors, why is the V/f ratio kept constant below base speed?",
    options: ["To keep stator resistance low", "To maintain constant air-gap magnetic flux and avoid magnetic core saturation", "To increase slip to 100%", "To reduce rotor frequency"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Air-gap flux Φ is proportional to V / f. Maintaining a constant V/f ratio ensures that the magnetic flux remains at its rated value without saturating the core."
  },
  {
    question: "What type of DC motor is most suitable for electric traction and electric locomotive drives due to its high starting torque?",
    options: ["DC Shunt Motor", "DC Series Motor", "Cumulative Compound Motor", "Differentially Compounded Motor"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "In a DC series motor, field flux is proportional to armature current, making torque proportional to the square of armature current (T ∝ I_a^2), delivering tremendous starting torque."
  },
  {
    question: "Which controller term in a PID controller is responsible for eliminating steady-state error?",
    options: ["Proportional (P) term", "Integral (I) term", "Derivative (D) term", "Feedforward term"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The Integral term integrates error over time; as long as any non-zero steady-state offset exists, the integral continues to adjust the output until error reaches zero."
  },
  {
    question: "What is the critical clearing angle in power system transient stability determined by?",
    options: ["Equal Area Criterion", "Routh-Hurwitz stability criterion", "Nyquist plot", "Bode plot"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The Equal Area Criterion determines the maximum rotor angle at which a fault can be cleared (critical clearing angle) such that accelerating area equals decelerating area."
  },
  {
    question: "In high-voltage transmission lines, why are bundled conductors used instead of single solid conductors?",
    options: ["To increase line resistance", "To increase effective conductor radius, reducing corona loss and line inductance", "To decrease capacitance", "To make stringing easier"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Bundled conductors increase the self-GMR (geometric mean radius), which reduces the surface electric field gradient, substantially mitigating corona loss and reducing series reactance."
  },
  {
    question: "What is the primary purpose of a tertiary winding in a large three-phase star-star power transformer?",
    options: ["To boost high-voltage output", "To provide a closed delta path for third-harmonic currents and stabilize the neutral", "To cool the core", "To measure insulation resistance"],
    correct_index: 1,
    difficulty: "Hard",
    explanation: "A delta-connected tertiary winding provides a circulating path for third-harmonic zero-sequence currents, preventing distortion of phase voltages and stabilizing the neutral potential."
  },
  {
    question: "In an induction motor, what does a slip of s = 1 represent?",
    options: ["Synchronous speed operation", "Standstill (locked rotor) condition", "Generating mode", "Braking mode with reverse rotation"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "At standstill, rotor speed N = 0. Therefore slip s = (Ns - 0) / Ns = 1."
  },
  {
    question: "What type of distance relay is inherently directional and commonly used for long transmission line protection?",
    options: ["Impedance relay", "Reactance relay", "Mho (Admittance) relay", "Induction cup relay"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "A Mho (admittance) relay has a circular characteristic passing through the origin on the R-X diagram, making it inherently directional and ideal for long lines."
  },
  {
    question: "In a Programmable Logic Controller (PLC), what does a 'TON' instruction perform?",
    options: ["Timer Off-Delay", "Timer On-Delay", "Toggle Output Node", "Total Operating Network"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "A TON instruction is an On-Delay Timer that begins timing when its input rung goes true and sets its Done bit after a preset interval."
  },
  {
    question: "What is the turn-off mechanism of a Gate Turn-Off (GTO) thyristor?",
    options: ["Applying a negative gate current pulse", "Reversing anode-cathode voltage only", "Reducing anode current below holding current", "Increasing temperature"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Unlike conventional SCRs, a GTO can be turned off by extracting charge through a negative current pulse applied to the gate terminal."
  },
  {
    question: "Which of the following standards governs electromagnetic compatibility and harmonic limits in industrial power systems?",
    options: ["IEEE 519", "ISO 9001", "IEEE 802.3", "IEC 60068"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "IEEE 519 establishes recommended practices and requirements for harmonic control in electric power systems."
  }
];

// SIEMENS - APTITUDE (20 Qs)
const siemensAptitudeQuestions = [
  {
    question: "A power generation plant operates at 80% capacity factor. If its rated peak capacity is 500 MW, how many megawatt-hours (MWh) are generated in 24 hours?",
    options: ["9,600 MWh", "12,000 MWh", "8,000 MWh", "10,500 MWh"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Actual average generation = 500 * 0.8 = 400 MW. Energy in 24 hours = 400 MW * 24 h = 9,600 MWh."
  },
  {
    question: "An electric motor has an efficiency of 90% and delivers 18 kW mechanical output. What is the electrical input power?",
    options: ["20 kW", "16.2 kW", "22 kW", "19.8 kW"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Input = Output / Efficiency = 18 kW / 0.90 = 20 kW."
  },
  {
    question: "A factory reduces its monthly reactive energy consumption from 400 kVARh to 240 kVARh by installing capacitor banks. What is the percentage reduction?",
    options: ["35%", "40%", "45%", "60%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Reduction = (400 - 240) / 400 = 160 / 400 = 0.40 = 40%."
  },
  {
    question: "A step-down transformer has a primary-to-secondary turns ratio of 10 : 1. If primary current is 5 A, what is secondary current (assuming 100% efficiency)?",
    options: ["0.5 A", "50 A", "25 A", "5 A"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "I_s / I_p = N_p / N_s => I_s / 5 = 10 / 1 => I_s = 50 A."
  },
  {
    question: "Two substation feeders can energize a microgrid independently in 4 hours and 6 hours respectively. Working simultaneously, how long does it take?",
    options: ["2.4 hours", "2.5 hours", "3.0 hours", "5.0 hours"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Rate = 1/4 + 1/6 = 5/12 per hour. Time = 12 / 5 = 2.4 hours."
  },
  {
    question: "A 3-phase induction motor has full-load copper losses of 1200 W. At half load (50% load), what are the copper losses?",
    options: ["600 W", "300 W", "400 W", "150 W"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Copper loss is proportional to load squared: P_cu(half) = (0.5)^2 * 1200 = 0.25 * 1200 = 300 W."
  },
  {
    question: "A 400 V electrical busbar current increases from 100 A to 150 A. By what factor do the I^2 * R heating losses increase?",
    options: ["1.5 times", "2.25 times", "2.0 times", "1.75 times"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Loss ratio = (150 / 100)^2 = (1.5)^2 = 2.25 times."
  },
  {
    question: "In how many ways can 5 electrical safety switches be set to ON or OFF positions?",
    options: ["10", "25", "32", "64"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Each switch has 2 states. For 5 switches, total configurations = 2^5 = 32."
  },
  {
    question: "If current in an inductor increases at a rate of 50 A/s and induced EMF is 2.5 V, what is the inductance L?",
    options: ["0.05 H (50 mH)", "0.5 H", "125 mH", "20 mH"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "V = L * (di/dt) => 2.5 = L * 50 => L = 2.5 / 50 = 0.05 H = 50 mH."
  },
  {
    question: "A transmission line has a resistance of 4 Ω and reactance of 3 Ω. What is the total impedance magnitude?",
    options: ["7 Ω", "5 Ω", "1 Ω", "12 Ω"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "|Z| = sqrt(R^2 + X^2) = sqrt(4^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5 Ω."
  },
  {
    question: "A solar panel array produces 120 kWh on Monday, 140 kWh on Tuesday, 160 kWh on Wednesday, and 180 kWh on Thursday. What is the average daily output?",
    options: ["145 kWh", "150 kWh", "155 kWh", "160 kWh"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total = 120 + 140 + 160 + 180 = 600 kWh. Average = 600 / 4 = 150 kWh."
  },
  {
    question: "A turbine speed increases uniformly from 1200 RPM to 1800 RPM in 10 seconds. What is the angular acceleration in rad/s^2?",
    options: ["2π rad/s^2", "4π rad/s^2", "6π rad/s^2", "10 rad/s^2"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "ω1 = (2π * 1200)/60 = 40π rad/s. ω2 = (2π * 1800)/60 = 60π rad/s. α = (60π - 40π) / 10 = 2π rad/s^2."
  },
  {
    question: "What is the compound interest on an industrial investment of $10,000 for 2 years at 10% per annum compounded annually?",
    options: ["$2,000", "$2,100", "$2,200", "$2,050"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Amount = 10000 * (1.10)^2 = 10000 * 1.21 = $12,100. Compound Interest = 12100 - 10000 = $2,100."
  },
  {
    question: "An electrical meter reads 102.5 kWh, but the actual consumption was 100 kWh. What is the percentage error of the meter?",
    options: ["2.5%", "2.0%", "-2.5%", "1.5%"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Error % = ((Measured - True) / True) * 100 = ((102.5 - 100) / 100) * 100 = 2.5%."
  },
  {
    question: "A backup diesel generator consumes 20 liters of fuel per hour at full load. If fuel tank holds 350 liters, for how many hours can it run at full load?",
    options: ["16.5 hours", "17.5 hours", "18.0 hours", "17.0 hours"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Hours = 350 / 20 = 17.5 hours."
  },
  {
    question: "In a series RLC circuit at resonance, the inductive reactance XL = 50 Ω. What is the capacitive reactance XC?",
    options: ["25 Ω", "50 Ω", "100 Ω", "0 Ω"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "At resonance in an RLC circuit, inductive reactance equals capacitive reactance: XL = XC = 50 Ω."
  },
  {
    question: "A technician walks 30 m North, then 40 m East to inspect a transformer yard. What is the direct displacement distance from the start?",
    options: ["70 m", "50 m", "60 m", "45 m"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "By Pythagoras theorem: sqrt(30^2 + 40^2) = sqrt(900 + 1600) = sqrt(2500) = 50 m."
  },
  {
    question: "If 5 workers can wire an industrial control panel in 8 days, how many workers are needed to complete the wiring in 4 days?",
    options: ["8", "10", "12", "15"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total man-days = 5 * 8 = 40. Workers needed for 4 days = 40 / 4 = 10 workers."
  },
  {
    question: "A high-voltage transmission cable drum with diameter 1.4 m makes 100 complete rotations when unspooling. How many meters of cable are unspooled?",
    options: ["440 m", "280 m", "140 m", "314 m"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Circumference = π * d = (22/7) * 1.4 = 4.4 m. Total length = 100 * 4.4 = 440 m."
  },
  {
    question: "The power rating of an electric heater is 2000 W at 200 V. If voltage drops to 180 V, what is the power output (assuming constant resistance)?",
    options: ["1800 W", "1620 W", "1500 W", "1700 W"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Resistance R = V^2 / P = (200 * 200) / 2000 = 20 Ω. New power at 180 V = (180 * 180) / 20 = 32400 / 20 = 1620 W."
  }
];

// ============================================================================
// 3. CIVIL ENGINEERING COMPANIES
// ============================================================================

// L&T CONSTRUCTION - CORE CIVIL (20 Qs)
const lntConstructionCoreQuestions = [
  {
    question: "What is the characteristic 28-day compressive cube strength of M25 grade concrete as per Indian Standards (IS 456)?",
    options: ["20 N/mm²", "25 N/mm²", "30 N/mm²", "35 N/mm²"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The characteristic compressive strength of concrete cubes after 28 days of curing for M25 grade is 25 N/mm²."
  },
  {
    question: "In Limit State Design of reinforced concrete structures, what are the partial safety factors for concrete and steel reinforcement respectively?",
    options: ["1.50 and 1.15", "1.15 and 1.50", "1.20 and 1.00", "1.35 and 1.25"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Under IS 456 limit state of collapse, the partial safety factor for concrete is γ_c = 1.50 (due to quality variations on site) and for steel is γ_s = 1.15."
  },
  {
    question: "What is the maximum bending moment for a simply supported beam of span L carrying a uniformly distributed load (UDL) of w per unit length?",
    options: ["wL² / 4", "wL² / 8", "wL² / 12", "wL / 2"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "For a simply supported beam with UDL over span L, maximum bending moment occurs at the mid-span and equals M_max = wL² / 8."
  },
  {
    question: "What is the maximum mid-span deflection of a simply supported beam of span L with flexural rigidity EI under a full UDL of w?",
    options: ["5wL⁴ / 384EI", "wL⁴ / 48EI", "wL³ / 24EI", "wL⁴ / 8EI"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Maximum deflection at mid-span under full UDL w is δ = 5wL⁴ / 384EI."
  },
  {
    question: "According to Euler's column formula, what is the critical buckling load P_cr for a column with both ends hinged (pinned)?",
    options: ["π²EI / L²", "4π²EI / L²", "π²EI / (2L²)", "π²EI / (4L²)"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "For a pinned-pinned column, effective length Le = L. Euler critical buckling load is P_cr = π²EI / L²."
  },
  {
    question: "What does the Slump Cone test measure for fresh concrete on a construction site?",
    options: ["Compressive strength", "Workability and consistency", "Tensile split strength", "Air entrainment"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The slump test measures the consistency and workability (flowability) of freshly mixed concrete before placement."
  },
  {
    question: "Why are beams deliberately designed as under-reinforced sections rather than over-reinforced sections in reinforced concrete?",
    options: ["To save concrete materials", "Steel yields first, giving ductile warning signs (deflections/cracks) before collapse", "Concrete fails smoothly", "Over-reinforced sections have higher shear capacity"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "In under-reinforced beams, tensile steel yields before concrete crushes, providing visible warning deflections and cracking, avoiding sudden brittle compression failure."
  },
  {
    question: "What is the nominal mix ratio by volume of cement, fine aggregate, and coarse aggregate for M20 concrete?",
    options: ["1 : 1.5 : 3", "1 : 2 : 4", "1 : 3 : 6", "1 : 1 : 2"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Nominal mix ratios: M15 is 1 : 2 : 4; M20 is 1 : 1.5 : 3; M25 is 1 : 1 : 2."
  },
  {
    question: "In structural soil mechanics, what does Terzaghi's bearing capacity formula compute for a shallow foundation?",
    options: ["Ultimate bearing capacity before shear failure", "Immediate elastic settlement", "Consolidation rate", "Pavement deflection"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Terzaghi's bearing capacity equation q_ult = c*Nc + q*Nq + 0.5*γ*B*Nγ calculates the ultimate gross bearing capacity of soil for shallow strip footings."
  },
  {
    question: "In the Standard Penetration Test (SPT), what is the corrected N-value measured by?",
    options: ["Number of hammer blows required to drive split spoon sampler 300 mm (last 30 cm)", "Drop height in meters", "Weight of hammer", "Diameter of drill hole"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The SPT N-value is the number of hammer blows (63.5 kg falling through 760 mm) required to drive the standard sampler the final 300 mm (12 inches)."
  },
  {
    question: "Which surveying instrument is used to measure both horizontal and vertical angles with high precision?",
    options: ["Dumpy Level", "Theodolite", "Prismatic Compass", "Plane Table"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "A Theodolite is a precision optical/digital instrument designed specifically for measuring angles in both horizontal and vertical planes."
  },
  {
    question: "What test is carried out on a dumpy level to verify whether the line of collimation is parallel to the bubble axis?",
    options: ["Two-Peg Test", "Slump Test", "Plate Load Test", "Proctor Test"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The Two-Peg Test is used in spirit leveling to check and adjust for collimation error in a level instrument."
  },
  {
    question: "In Critical Path Method (CPM) project scheduling, what is an activity on the critical path characterized by?",
    options: ["Maximum float", "Zero total float", "Earliest finish time is zero", "Shortest duration"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The critical path is the longest sequence of dependent activities in a project network; any delay on activities with Total Float = 0 delays the entire project completion."
  },
  {
    question: "What is the primary cause of bleeding in freshly placed concrete?",
    options: ["High cement content", "Water rising to the surface due to sedimentation of heavy aggregate particles", "Excessive air entrainment", "High ambient temperature"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Bleeding is a form of segregation where free water in the mix rises to the surface as heavy solid aggregate and cement particles settle under gravity."
  },
  {
    question: "What is the minimum curing period recommended for standard Portland cement concrete in normal weather conditions?",
    options: ["3 days", "7 days", "14 days", "28 days"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "IS 456 recommends a minimum curing duration of at least 7 days for concrete exposed to normal weather conditions (10 days in dry/hot weather)."
  },
  {
    question: "In a cantilever beam of length L subjected to a point load W at the free end, what is the maximum bending moment?",
    options: ["W * L at the fixed support", "W * L / 2", "W * L² / 2", "Zero at the support"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Maximum bending moment occurs at the fixed support and equals M_max = W * L (hogging moment)."
  },
  {
    question: "What apparatus is used to determine the initial and final setting times of cement paste?",
    options: ["Vicat apparatus", "Le Chatelier apparatus", "Los Angeles apparatus", "Core cutter"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "The Vicat apparatus with standard needles is used to determine the normal consistency and setting times of hydraulic cement."
  },
  {
    question: "What is the definition of 'Void Ratio' (e) in geotechnical soil mechanics?",
    options: ["Volume of voids to total soil volume", "Volume of voids to volume of solid soil particles (Vv / Vs)", "Mass of water to mass of solids", "Weight of soil to volume"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Void ratio e = V_v / V_s (ratio of volume of voids to volume of solid particles). Porosity n = V_v / V_total."
  },
  {
    question: "What is the primary structural purpose of providing shear stirrups in a reinforced concrete beam?",
    options: ["To resist longitudinal tensile bending", "To prevent diagonal tension shear cracks from propagating", "To increase cover thickness", "To bond concrete to aggregate"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Shear stirrups intercept and bridge diagonal tension cracks caused by excessive shear stress, preventing sudden diagonal shear failure."
  },
  {
    question: "In transportation engineering, what is the super-elevation (cant) provided on horizontal curves of highways to counter?",
    options: ["Gravitational force", "Centrifugal force pushing vehicles outward", "Wind resistance", "Frictional braking"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Super-elevation is the transverse banking of a road surface on a curve designed to counter the outward centrifugal force acting on moving vehicles."
  }
];

// L&T CONSTRUCTION - APTITUDE (20 Qs)
const lntConstructionAptitudeQuestions = [
  {
    question: "A reinforced concrete column footing has dimensions 2.5 m x 2.0 m x 0.6 m. What volume of concrete in cubic meters is required for 4 identical footings?",
    options: ["10.0 m³", "12.0 m³", "15.0 m³", "8.0 m³"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Volume of 1 footing = 2.5 * 2.0 * 0.6 = 3.0 m³. For 4 footings = 4 * 3.0 = 12.0 m³."
  },
  {
    question: "A construction project manager estimates that 15 masons can build a retaining wall in 12 days. How many days will 20 masons take at the same working rate?",
    options: ["8 days", "9 days", "10 days", "7.5 days"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total work = 15 * 12 = 180 mason-days. Time for 20 masons = 180 / 20 = 9 days."
  },
  {
    question: "Steel rebar price rises by 20% and then drops by 10%. What is the net percentage change in the price of rebar?",
    options: ["8% increase", "10% increase", "5% increase", "2% decrease"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Net change = 20 - 10 - (20 * 10 / 100) = 10 - 2 = +8% increase."
  },
  {
    question: "A surveying line measures 850 meters on the ground. On a site plan drawing with a scale of 1 : 5000, what is the length of this line in centimeters?",
    options: ["17 cm", "15 cm", "20 cm", "8.5 cm"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "850 m = 85,000 cm. On plan = 85,000 / 5000 = 17 cm."
  },
  {
    question: "A dump truck carries 16 tonnes of gravel per trip. If 400 tonnes of gravel must be transported to a bridge site, how many round trips are needed?",
    options: ["24", "25", "26", "28"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Trips = 400 / 16 = 25 trips."
  },
  {
    question: "A transit mixer drum has a capacity of 6 m³. If a slab requires 75 m³ of concrete, what is the minimum number of mixer loads required?",
    options: ["12", "13", "14", "11"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "75 / 6 = 12.5 loads. The minimum whole number of transit mixer trips is 13 loads."
  },
  {
    question: "In a concrete mix, cement, sand, and aggregate are mixed in the ratio 1 : 2 : 4 by weight. In a 700 kg batch, how many kilograms of sand are used?",
    options: ["100 kg", "200 kg", "400 kg", "150 kg"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Total parts = 1 + 2 + 4 = 7 parts. Sand weight = (2 / 7) * 700 = 200 kg."
  },
  {
    question: "A bridge girder expands linearly by 1.2 mm for every 5°C temperature rise. How much will it expand for a 35°C temperature rise?",
    options: ["7.2 mm", "8.4 mm", "9.6 mm", "6.0 mm"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Expansion rate = 1.2 / 5 = 0.24 mm/°C. For 35°C = 0.24 * 35 = 8.4 mm."
  },
  {
    question: "A road gradient is given as 1 in 20. What is this slope expressed as a percentage?",
    options: ["2%", "5%", "4%", "10%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Gradient = (1 / 20) * 100 = 5%."
  },
  {
    question: "Two pumps can dewater a flooded foundation excavation pit in 6 hours and 8 hours respectively. Working together, how many hours will they take?",
    options: ["3.43 hours", "3.00 hours", "4.00 hours", "3.75 hours"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Combined rate = 1/6 + 1/8 = 7/24. Time = 24 / 7 ≈ 3.43 hours."
  },
  {
    question: "A contractor bids $450,000 for a highway culvert contract with an expected profit of 15% on costs. What was the estimated cost of construction?",
    options: ["$382,500", "$391,304", "$400,000", "$380,000"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Bid = Cost * 1.15 => Cost = 450,000 / 1.15 ≈ $391,304.35."
  },
  {
    question: "A rectangular plot has a length of 60 m and a diagonal of 65 m. What is the width of the plot?",
    options: ["20 m", "25 m", "30 m", "35 m"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Width = sqrt(65² - 60²) = sqrt(4225 - 3600) = sqrt(625) = 25 m."
  },
  {
    question: "A circular water reservoir has a diameter of 14 meters. What is the surface area of the reservoir?",
    options: ["154 m²", "308 m²", "616 m²", "44 m²"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Radius r = 7 m. Area = π * r² = (22/7) * 7 * 7 = 154 m²."
  },
  {
    question: "A soil sample weighs 120 g when moist and 100 g after oven drying. What is the water (moisture) content percentage?",
    options: ["16.6%", "20.0%", "25.0%", "18.0%"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Water content w = (Mass of water / Mass of dry soil) * 100 = ((120 - 100) / 100) * 100 = 20.0%."
  },
  {
    question: "A 12-meter high crane casts an 8-meter shadow on ground. At the same time, a building casts a 24-meter shadow. What is the building's height?",
    options: ["32 m", "36 m", "40 m", "48 m"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Height-to-shadow ratio = 12 / 8 = 1.5. Building height = 24 * 1.5 = 36 meters."
  },
  {
    question: "A steel rod with cross-sectional area 400 mm² carries a tensile load of 80 kN. What is the tensile stress in the rod?",
    options: ["200 N/mm² (MPa)", "150 N/mm²", "250 N/mm²", "320 N/mm²"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Stress σ = Force / Area = (80 * 1000 N) / 400 mm² = 200 N/mm² = 200 MPa."
  },
  {
    question: "Find the missing number in the series: 3, 7, 15, 31, 63, ?",
    options: ["127", "125", "128", "129"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Each number is 2 * previous + 1: (63 * 2) + 1 = 127. Differences: +4, +8, +16, +32, +64."
  },
  {
    question: "A crane lifts an 8-tonne precast girder at a speed of 0.5 m/s. What mechanical power in kilowatts is exerted by the crane (take g = 9.81 m/s²)?",
    options: ["39.24 kW", "40.00 kW", "19.62 kW", "78.48 kW"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Weight W = 8000 kg * 9.81 = 78,480 N. Power = Force * Velocity = 78,480 * 0.5 = 39,240 W = 39.24 kW."
  },
  {
    question: "A site engineer walks 500 m East, turns left and walks 1200 m North. What is the straight-line distance from the base office?",
    options: ["1300 m", "1500 m", "1400 m", "1700 m"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Hypotenuse = sqrt(500² + 1200²) = sqrt(250000 + 1440000) = sqrt(1690000) = 1300 m."
  },
  {
    question: "What is the volume of paint required to cover both sides of a 2 m high, 100 m long boundary wall if 1 liter covers 10 m²?",
    options: ["20 liters", "40 liters", "30 liters", "50 liters"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Area of one side = 2 * 100 = 200 m². Both sides = 400 m². Paint required = 400 / 10 = 40 liters."
  }
];

// ============================================================================
// 4. MECHANICAL ENGINEERING COMPANIES
// ============================================================================

// TATA MOTORS - CORE MECHANICAL (20 Qs)
const tataMotorsCoreQuestions = [
  {
    question: "What is the air-standard thermal efficiency formula for an ideal Otto cycle in terms of compression ratio 'r' and adiabatic index 'γ'?",
    options: ["η = 1 - (1 / r^(γ - 1))", "η = 1 - r^(γ - 1)", "η = 1 - (1 / r^γ)", "η = r^(γ - 1) / γ"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "The thermal efficiency of an ideal Otto cycle is η = 1 - (1 / r^(γ - 1)), where r is compression ratio and γ = 1.4 for air."
  },
  {
    question: "For the same compression ratio and heat input, which heat engine cycle achieves higher thermal efficiency?",
    options: ["Otto cycle", "Diesel cycle", "Dual cycle", "Carnot cycle"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "For the SAME compression ratio and heat input, the Otto cycle is more efficient than the Diesel cycle because heat is added at constant volume at the maximum temperature."
  },
  {
    question: "What fuel parameter measures the auto-ignition delay and anti-knock quality of diesel fuel in compression ignition (CI) engines?",
    options: ["Octane number", "Cetane number", "Viscosity index", "Pour point"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Cetane number measures the ignition delay of diesel fuel; higher cetane numbers signify shorter ignition delay and smoother CI combustion."
  },
  {
    question: "What is the function of Selective Catalytic Reduction (SCR) with Diesel Exhaust Fluid (AdBlue) in modern BS-VI diesel vehicles?",
    options: ["To convert unburned hydrocarbons into CO", "To convert harmful Nitrogen Oxides (NOx) into harmless Nitrogen (N2) and Water (H2O)", "To filter soot particulates", "To increase fuel economy"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "SCR injects urea solution (AdBlue/DEF) into the exhaust stream, converting NOx emissions into harmless diatomic nitrogen and water vapor across a catalyst."
  },
  {
    question: "What test is used to measure the Indicated Power (IP) of each individual cylinder in a multi-cylinder petrol engine without an indicator diagram?",
    options: ["Morse Test", "Willans Line Test", "Motoring Test", "Heat Balance Test"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "The Morse test cuts off ignition to each cylinder sequentially while measuring the drop in brake power, allowing calculation of each cylinder's indicated power."
  },
  {
    question: "Why do involute gear teeth profiles dominate automotive transmission design over cycloidal profiles?",
    options: ["They are cheaper to cast", "The pressure angle remains constant throughout engagement, and slight center distance variations do not alter the velocity ratio", "They have zero friction", "They transmit 100% torque"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Involute gear teeth maintain a strictly constant pressure angle and their conjugate action velocity ratio is invariant to small errors in shaft center distance."
  },
  {
    question: "In an automobile taking a curve, which mechanism allows the outer drive wheel to rotate faster than the inner drive wheel?",
    options: ["Steering gearbox", "Differential mechanism", "Flywheel", "Torque converter"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The automotive differential uses sun and planet bevel gears to allow drive wheels on the same axle to rotate at different speeds while delivering balanced torque."
  },
  {
    question: "What is the primary objective of an Anti-lock Braking System (ABS) during emergency braking?",
    options: ["To reduce brake pad wear", "To prevent wheel lockup, maintaining tire traction and steering control", "To stop the engine immediately", "To boost hydraulic fluid pressure indefinitely"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "ABS modulates brake line pressure when wheel slip thresholds are exceeded, preventing locked wheels so the driver retains directional steering control while stopping."
  },
  {
    question: "What steering condition is satisfied by the Ackermann steering mechanism for perfect rolling without sideways tire scrub?",
    options: ["cot(θ) - cot(φ) = b / c", "cot(θ) - cot(φ) = c / b", "tan(θ) + tan(φ) = 1", "sin(θ) = cos(φ)"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "The fundamental equation of correct steering is cot(θ) - cot(φ) = c / b, where c is track width and b is wheel base."
  },
  {
    question: "What is the main function of an engine flywheel mounted on the crankshaft?",
    options: ["To balance primary reciprocating forces", "To absorb energy during the power stroke and release it during idle strokes, minimizing cyclic speed fluctuations", "To drive the water pump", "To start the vehicle without a battery"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "A flywheel stores rotational kinetic energy during the high-torque power stroke and releases it during suction, compression, and exhaust strokes, dampening cyclic speed fluctuations."
  },
  {
    question: "What type of follower motion produces zero acceleration jerk at the beginning and end of the stroke in high-speed cam mechanisms?",
    options: ["Uniform velocity motion", "Simple Harmonic Motion (SHM)", "Cycloidal motion", "Uniform acceleration and deceleration"],
    correct_index: 2,
    difficulty: "Hard",
    explanation: "Cycloidal motion has a continuous acceleration curve without abrupt step changes, resulting in finite, smooth jerk and minimizing dynamic vibrations."
  },
  {
    question: "In a single plate automotive clutch with friction radius R and clamping force W, what does the Uniform Wear theory assume?",
    options: ["Pressure is constant across friction lining", "Product of pressure and radius is constant (p * r = C)", "Friction coefficient varies linearly", "Wear occurs only at the outer rim"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Uniform wear theory assumes wear rate is proportional to PV (pressure * sliding velocity). Since velocity is proportional to radius r, p * r = constant."
  },
  {
    question: "What is the coefficient of restitution 'e' for a perfectly elastic collision?",
    options: ["e = 0", "e = 0.5", "e = 1", "e = infinity"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "For a perfectly elastic collision, no kinetic energy is lost and e = 1. For a completely plastic (inelastic) collision, e = 0."
  },
  {
    question: "Which component in an internal combustion engine converts reciprocating piston motion into continuous rotary motion?",
    options: ["Camshaft", "Connecting rod and Crankshaft", "Pushrod", "Rocker arm"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The slider-crank mechanism comprising the connecting rod and crankshaft converts the linear reciprocating motion of the piston into output shaft rotation."
  },
  {
    question: "What heat treatment process is applied to medium-carbon steel crankshafts to produce a hard, wear-resistant surface while maintaining a tough, ductile core?",
    options: ["Annealing", "Case hardening / Induction hardening", "Normalizing", "Spheroidizing"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Induction hardening heats the outer surface layer followed by rapid quenching, creating high-hardness martensite on the bearing journals while retaining core toughness."
  },
  {
    question: "What is the primary cause of engine 'knock' (detonation) in a spark-ignition (petrol) engine?",
    options: ["Premature ignition by spark plug", "Spontaneous auto-ignition of the unburned end-gas charge ahead of the advancing flame front", "Rich air-fuel mixture", "Low engine cooling water temperature"],
    correct_index: 1,
    difficulty: "Medium",
    explanation: "Knock occurs when the unburned end-gas is subjected to high pressure and temperature from the flame front, causing it to self-ignite spontaneously, creating sharp pressure waves."
  },
  {
    question: "What is the stoichiometric air-fuel ratio by mass for standard commercial gasoline (petrol)?",
    options: ["10 : 1", "14.7 : 1", "18.2 : 1", "12.5 : 1"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The theoretical stoichiometric air-fuel ratio for complete combustion of gasoline is approximately 14.7 : 1 by weight."
  },
  {
    question: "Which thermodynamic law states that it is impossible to construct a device operating in a cycle that produces no effect other than the transfer of heat from a cooler body to a hotter body?",
    options: ["Zeroth Law of Thermodynamics", "First Law of Thermodynamics", "Clausius statement of the Second Law", "Kelvin-Planck statement of the Second Law"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "The Clausius statement of the Second Law asserts that heat cannot spontaneously flow from a colder reservoir to a warmer reservoir without external mechanical work."
  },
  {
    question: "What suspension design is widely used in modern passenger vehicle front suspensions combining a shock absorber and coil spring in a single compact assembly?",
    options: ["Leaf spring suspension", "MacPherson Strut suspension", "Rigid dead axle", "Trailing arm suspension"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "The MacPherson strut integrates the damper, spring, and steering pivot into a single compact structural unit, saving under-hood packaging space."
  },
  {
    question: "What is the Hooke's Law relationship between stress σ and strain ε within the proportional limit?",
    options: ["σ = E * ε", "σ = G / ε", "σ = E * ε²", "σ = ν * ε"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Hooke's Law states that within the elastic proportional limit, stress is directly proportional to strain: σ = E * ε, where E is Young's Modulus of Elasticity."
  }
];

// TATA MOTORS - APTITUDE (20 Qs)
const tataMotorsAptitudeQuestions = [
  {
    question: "An engine produces 150 kW brake power at 3000 RPM. What is the engine torque output in Newton-meters (take π ≈ 3.1416)?",
    options: ["477.5 Nm", "500.0 Nm", "420.0 Nm", "380.0 Nm"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Power P = (2π * N * T) / 60 => T = (60 * 150000) / (2 * 3.1416 * 3000) = 9000000 / 18849.56 ≈ 477.5 Nm."
  },
  {
    question: "A vehicle travels a distance of 180 km in 2 hours and 30 minutes. What is the vehicle's average speed in km/h?",
    options: ["70 km/h", "72 km/h", "75 km/h", "80 km/h"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Time = 2.5 hours. Speed = Distance / Time = 180 / 2.5 = 72 km/h."
  },
  {
    question: "A car fuel tank has a capacity of 45 liters. If the car consumes 6 liters of petrol per 100 km, what is its driving range on a full tank?",
    options: ["650 km", "700 km", "750 km", "800 km"],
    correct_index: 2,
    difficulty: "Easy",
    explanation: "Range = (45 / 6) * 100 = 7.5 * 100 = 750 km."
  },
  {
    question: "A gear with 24 teeth rotates at 1200 RPM and drives a mating gear with 72 teeth. What is the rotational speed of the driven gear?",
    options: ["400 RPM", "3600 RPM", "600 RPM", "800 RPM"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Speed ratio N2 / N1 = T1 / T2 => N2 = 1200 * (24 / 72) = 1200 * (1/3) = 400 RPM."
  },
  {
    question: "An automobile assembly line produces 120 vehicles per 8-hour shift. What is the cycle time per vehicle in minutes?",
    options: ["4.0 minutes", "4.5 minutes", "5.0 minutes", "3.5 minutes"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Total time = 8 * 60 = 480 minutes. Cycle time = 480 / 120 = 4.0 minutes per vehicle."
  },
  {
    question: "A mechanical component has a nominal dimension of 50.00 mm with bilateral tolerances of +0.03 mm and -0.02 mm. What is the total tolerance zone?",
    options: ["0.01 mm", "0.05 mm", "0.03 mm", "0.06 mm"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Upper limit = 50.03 mm, Lower limit = 49.98 mm. Total tolerance = 50.03 - 49.98 = 0.05 mm."
  },
  {
    question: "A vehicle accelerates uniformly from rest to 100 km/h in 10 seconds. What is its acceleration in m/s² (approx)?",
    options: ["2.78 m/s²", "3.20 m/s²", "2.50 m/s²", "3.60 m/s²"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "100 km/h = 100 * (5/18) = 27.78 m/s. Acceleration a = (27.78 - 0) / 10 = 2.778 m/s² ≈ 2.78 m/s²."
  },
  {
    question: "The weight of an SUV is 1800 kg. What normal force does it exert on a flat road surface (take g = 9.8 m/s²)?",
    options: ["17,640 N", "18,000 N", "15,500 N", "19,200 N"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Normal force N = m * g = 1800 * 9.8 = 17,640 N."
  },
  {
    question: "A hydraulic vehicle lift has a master piston diameter of 5 cm and a slave lifting piston diameter of 20 cm. What force amplification ratio does the lift provide?",
    options: ["4x", "8x", "16x", "20x"],
    correct_index: 2,
    difficulty: "Medium",
    explanation: "Force ratio = Area ratio = (D_slave / D_master)² = (20 / 5)² = 4² = 16 times."
  },
  {
    question: "Two automobile parts supplier bids are $450 and $550 per unit. If a carmaker purchases 60% from the first supplier and 40% from the second, what is the weighted average price per unit?",
    options: ["$490", "$500", "$480", "$510"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Weighted average = (0.60 * 450) + (0.40 * 550) = 270 + 220 = $490."
  },
  {
    question: "A robotic welding cell has an availability of 95%, performance of 90%, and quality rate of 98%. What is its Overall Equipment Effectiveness (OEE)?",
    options: ["83.79%", "85.50%", "88.20%", "81.00%"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "OEE = Availability * Performance * Quality = 0.95 * 0.90 * 0.98 = 0.8379 = 83.79%."
  },
  {
    question: "A fly-wheel rotating at 600 RPM slows down uniformly to a complete stop in 30 seconds. How many revolutions does it make before stopping?",
    options: ["150 revolutions", "300 revolutions", "200 revolutions", "100 revolutions"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Average speed = (600 + 0) / 2 = 300 RPM. Time = 30 s = 0.5 minute. Revolutions = 300 * 0.5 = 150 revolutions."
  },
  {
    question: "What is the kinetic energy of a 1200 kg car traveling at a speed of 20 m/s (72 km/h)?",
    options: ["240 kJ", "480 kJ", "120 kJ", "360 kJ"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "KE = 0.5 * m * v² = 0.5 * 1200 * (20)² = 600 * 400 = 240,000 J = 240 kJ."
  },
  {
    question: "A CNC milling spindle tool costs $120 and can machine 80 engine blocks before re-grinding. What is the tooling cost per engine block?",
    options: ["$1.50", "$1.20", "$1.60", "$2.00"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Cost per block = 120 / 80 = $1.50."
  },
  {
    question: "A car battery of 12 V delivers a starter cranking current of 250 A for 4 seconds. How much energy in kilojoules is consumed?",
    options: ["120 kJ", "12 kJ", "30 kJ", "60 kJ"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "Energy E = V * I * t = 12 * 250 * 4 = 12,000 J = 12 kJ."
  },
  {
    question: "In how many ways can 6 distinct paint color options be arranged on a sample display board?",
    options: ["120", "720", "360", "240"],
    correct_index: 1,
    difficulty: "Easy",
    explanation: "6! = 6 * 5 * 4 * 3 * 2 * 1 = 720 ways."
  },
  {
    question: "A technician walks 4 km East, turns right and walks 3 km South. What is the shortest distance back to the vehicle?",
    options: ["5 km", "7 km", "6 km", "4.5 km"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "By Pythagoras theorem: sqrt(4² + 3²) = sqrt(16 + 9) = sqrt(25) = 5 km."
  },
  {
    question: "The price of petrol increases by 25%. By what percentage must a motorist reduce petrol consumption to keep total expenditure constant?",
    options: ["20%", "25%", "15%", "30%"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Reduction = (r / (100 + r)) * 100 = (25 / 125) * 100 = 20%."
  },
  {
    question: "Find the next term in the mechanical gear ratio series: 1, 4, 9, 16, 25, 36, ?",
    options: ["49", "48", "50", "64"],
    correct_index: 0,
    difficulty: "Easy",
    explanation: "Series of perfect squares: 1², 2², 3², 4², 5², 6², 7² = 49."
  },
  {
    question: "An automotive coolant mixture contains 40% ethylene glycol and 60% water. If 5 liters of pure water are added to 15 liters of mixture, what is the new glycol percentage?",
    options: ["30%", "25%", "35%", "28%"],
    correct_index: 0,
    difficulty: "Medium",
    explanation: "Initial glycol = 0.40 * 15 = 6 liters. New total volume = 15 + 5 = 20 liters. New percentage = (6 / 20) * 100 = 30%."
  }
];

// Combine all tests into an exportable list
const coreTestsList = [
  // 1. Electronics - Texas Instruments
  {
    title: 'Texas Instruments — Core Analog, Digital & Embedded Systems',
    company_slug: 'texas-instruments',
    role_slug: 'electronics-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tiCoreQuestions
  },
  {
    title: 'Texas Instruments — Quantitative & Technical Aptitude',
    company_slug: 'texas-instruments',
    role_slug: 'electronics-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tiAptitudeQuestions
  },

  // 2. Electronics - Qualcomm
  {
    title: 'Qualcomm — Core Digital Logic, VLSI & Architecture',
    company_slug: 'qualcomm',
    role_slug: 'electronics-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Hard',
    questionsList: qualcommCoreQuestions
  },
  {
    title: 'Qualcomm — Analytical & Engineering Aptitude',
    company_slug: 'qualcomm',
    role_slug: 'electronics-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: qualcommAptitudeQuestions
  },

  // 3. Electronics - Intel
  {
    title: 'Intel — Microprocessor Architecture & Digital Design',
    company_slug: 'intel',
    role_slug: 'electronics-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Hard',
    questionsList: qualcommCoreQuestions.slice(0, 10).concat(tiCoreQuestions.slice(5, 15))
  },
  {
    title: 'Intel — Analytical Reasoning & Technical Aptitude',
    company_slug: 'intel',
    role_slug: 'electronics-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: qualcommAptitudeQuestions.slice(0, 10).concat(tiAptitudeQuestions.slice(10, 20))
  },

  // 4. Electrical - Siemens
  {
    title: 'Siemens — Core Electrical Machines & Power Systems',
    company_slug: 'siemens',
    role_slug: 'electrical-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: siemensCoreQuestions
  },
  {
    title: 'Siemens — Quantitative & Electrical Aptitude',
    company_slug: 'siemens',
    role_slug: 'electrical-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: siemensAptitudeQuestions
  },

  // 5. Electrical - Schneider Electric
  {
    title: 'Schneider Electric — Switchgear, Protection & Distribution',
    company_slug: 'schneider-electric',
    role_slug: 'electrical-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: siemensCoreQuestions.slice(5, 20).concat(siemensCoreQuestions.slice(0, 5))
  },
  {
    title: 'Schneider Electric — Analytical & Engineering Aptitude',
    company_slug: 'schneider-electric',
    role_slug: 'electrical-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: siemensAptitudeQuestions.slice(5, 20).concat(siemensAptitudeQuestions.slice(0, 5))
  },

  // 6. Electrical - ABB
  {
    title: 'ABB — Drives, Power Grids & Industrial Control',
    company_slug: 'abb',
    role_slug: 'electrical-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Hard',
    questionsList: siemensCoreQuestions.slice(10, 20).concat(siemensCoreQuestions.slice(0, 10))
  },
  {
    title: 'ABB — Quantitative & Reasoning Aptitude',
    company_slug: 'abb',
    role_slug: 'electrical-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: siemensAptitudeQuestions.slice(10, 20).concat(siemensAptitudeQuestions.slice(0, 10))
  },

  // 7. Civil - L&T Construction
  {
    title: 'L&T Construction — Structural Engineering & Concrete Tech',
    company_slug: 'lnt-construction',
    role_slug: 'civil-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: lntConstructionCoreQuestions
  },
  {
    title: 'L&T Construction — Quantitative & Engineering Aptitude',
    company_slug: 'lnt-construction',
    role_slug: 'civil-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: lntConstructionAptitudeQuestions
  },

  // 8. Civil - Tata Projects
  {
    title: 'Tata Projects — Geotechnical, Fluid & Construction Engineering',
    company_slug: 'tata-projects',
    role_slug: 'civil-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: lntConstructionCoreQuestions.slice(8, 20).concat(lntConstructionCoreQuestions.slice(0, 8))
  },
  {
    title: 'Tata Projects — Analytical & Civil Aptitude',
    company_slug: 'tata-projects',
    role_slug: 'civil-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: lntConstructionAptitudeQuestions.slice(8, 20).concat(lntConstructionAptitudeQuestions.slice(0, 8))
  },

  // 9. Mechanical - Tata Motors
  {
    title: 'Tata Motors — Automotive Systems, IC Engines & Machine Design',
    company_slug: 'tata-motors',
    role_slug: 'mechanical-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tataMotorsCoreQuestions
  },
  {
    title: 'Tata Motors — Quantitative & Mechanical Aptitude',
    company_slug: 'tata-motors',
    role_slug: 'mechanical-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tataMotorsAptitudeQuestions
  },

  // 10. Mechanical - L&T Heavy Engineering
  {
    title: 'L&T Heavy Engineering — Thermodynamics, Manufacturing & Mechanics',
    company_slug: 'lnt-heavy',
    role_slug: 'mechanical-engineer',
    category_slug: 'core_concepts',
    duration: 30,
    difficulty: 'Hard',
    questionsList: tataMotorsCoreQuestions.slice(6, 20).concat(tataMotorsCoreQuestions.slice(0, 6))
  },
  {
    title: 'L&T Heavy Engineering — Quantitative & Analytical Aptitude',
    company_slug: 'lnt-heavy',
    role_slug: 'mechanical-engineer',
    category_slug: 'aptitude',
    duration: 30,
    difficulty: 'Medium',
    questionsList: tataMotorsAptitudeQuestions.slice(6, 20).concat(tataMotorsAptitudeQuestions.slice(0, 6))
  }
];

module.exports = {
  coreTestsList,
  tiCoreQuestions,
  tiAptitudeQuestions,
  qualcommCoreQuestions,
  qualcommAptitudeQuestions,
  siemensCoreQuestions,
  siemensAptitudeQuestions,
  lntConstructionCoreQuestions,
  lntConstructionAptitudeQuestions,
  tataMotorsCoreQuestions,
  tataMotorsAptitudeQuestions
};
