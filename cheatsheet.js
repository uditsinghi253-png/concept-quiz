const CHEAT_SHEET_DATA = {
  "acronyms": [
    {
      "abbr": "DOF",
      "mean": "Degrees of freedom"
    },
    {
      "abbr": "TCP",
      "mean": "Tool Center Point (robot arms)"
    },
    {
      "abbr": "SCARA",
      "mean": "Selective Compliance Assembly Robot Arm"
    },
    {
      "abbr": "AGV / AMR",
      "mean": "Automated Guided Vehicle / Autonomous Mobile Robot"
    },
    {
      "abbr": "ROV / AUV",
      "mean": "Remotely Operated Vehicle / Autonomous Underwater Vehicle"
    },
    {
      "abbr": "UAV / VTOL / FPV",
      "mean": "Unmanned Aerial Vehicle / Vertical Take-Off and Landing / First Person View"
    },
    {
      "abbr": "IMU",
      "mean": "Inertial Measurement Unit (accelerometer + gyro, often + magnetometer)"
    },
    {
      "abbr": "LiDAR",
      "mean": "Light Detection and Ranging"
    },
    {
      "abbr": "GNSS / RTK",
      "mean": "Global Navigation Satellite System / Real-Time Kinematic (cm-level GPS)"
    },
    {
      "abbr": "NavIC",
      "mean": "Navigation with Indian Constellation (ISRO)"
    },
    {
      "abbr": "ToF",
      "mean": "Time of Flight"
    },
    {
      "abbr": "PID",
      "mean": "Proportional, Integral, Derivative"
    },
    {
      "abbr": "LQR / MPC",
      "mean": "Linear Quadratic Regulator / Model Predictive Control"
    },
    {
      "abbr": "EKF",
      "mean": "Extended Kalman Filter"
    },
    {
      "abbr": "PWM",
      "mean": "Pulse Width Modulation"
    },
    {
      "abbr": "ESC",
      "mean": "Electronic Speed Controller"
    },
    {
      "abbr": "BLDC / FOC",
      "mean": "Brushless DC motor / Field Oriented Control"
    },
    {
      "abbr": "SEA",
      "mean": "Series Elastic Actuator"
    },
    {
      "abbr": "SLAM",
      "mean": "Simultaneous Localization and Mapping"
    },
    {
      "abbr": "AMCL / MCL",
      "mean": "(Adaptive) Monte Carlo Localization"
    },
    {
      "abbr": "RRT / PRM",
      "mean": "Rapidly-exploring Random Tree / Probabilistic Roadmap"
    },
    {
      "abbr": "ICP",
      "mean": "Iterative Closest Point"
    },
    {
      "abbr": "ZMP",
      "mean": "Zero Moment Point"
    },
    {
      "abbr": "DH",
      "mean": "Denavit-Hartenberg"
    },
    {
      "abbr": "FK / IK",
      "mean": "Forward / Inverse Kinematics"
    },
    {
      "abbr": "URDF / SDF",
      "mean": "Unified Robot Description Format / Simulation Description Format"
    },
    {
      "abbr": "DDS / QoS",
      "mean": "Data Distribution Service / Quality of Service (ROS 2)"
    },
    {
      "abbr": "CAN",
      "mean": "Controller Area Network"
    },
    {
      "abbr": "MQTT",
      "mean": "Message Queuing Telemetry Transport"
    },
    {
      "abbr": "LoRa",
      "mean": "Long Range radio"
    },
    {
      "abbr": "PLC",
      "mean": "Programmable Logic Controller"
    },
    {
      "abbr": "CNC",
      "mean": "Computer Numerical Control"
    },
    {
      "abbr": "FDM / SLA",
      "mean": "Fused Deposition Modeling / Stereolithography"
    },
    {
      "abbr": "YOLO",
      "mean": "You Only Look Once"
    },
    {
      "abbr": "CNN / RL",
      "mean": "Convolutional Neural Network / Reinforcement Learning"
    },
    {
      "abbr": "VLA",
      "mean": "Vision-Language-Action model"
    },
    {
      "abbr": "IFR",
      "mean": "International Federation of Robotics"
    }
  ],
  "numbers": [
    {
      "item": "DOF for a free rigid body in 3D",
      "val": "6 (3 translations + 3 rotations)"
    },
    {
      "item": "Arduino Uno chip, clock, logic",
      "val": "ATmega328P, 16 MHz, 5 V"
    },
    {
      "item": "Uno flash, SRAM, EEPROM",
      "val": "32 KB, 2 KB, 1 KB"
    },
    {
      "item": "Uno ADC",
      "val": "10-bit, 0 to 1023, about 4.88 mV per step at 5 V"
    },
    {
      "item": "Uno PWM pins",
      "val": "3, 5, 6, 9, 10, 11 (analogWrite 0 to 255)"
    },
    {
      "item": "Uno I2C pins",
      "val": "A4 (SDA), A5 (SCL)"
    },
    {
      "item": "Uno SPI pins",
      "val": "10 SS, 11 MOSI, 12 MISO, 13 SCK"
    },
    {
      "item": "Uno external interrupt pins",
      "val": "2 and 3"
    },
    {
      "item": "ESP32",
      "val": "Dual-core, up to 240 MHz, 3.3 V, Wi-Fi plus Bluetooth"
    },
    {
      "item": "Raspberry Pi GPIO",
      "val": "3.3 V, 40-pin header, no ADC"
    },
    {
      "item": "Hobby servo signal",
      "val": "50 Hz, 1 to 2 ms pulse (1.5 ms is centre)"
    },
    {
      "item": "Stepper step angle",
      "val": "1.8\u00b0 = 200 steps/rev; 0.9\u00b0 = 400 steps/rev"
    },
    {
      "item": "NEMA 17",
      "val": "About 42 mm square faceplate"
    },
    {
      "item": "LiPo cell",
      "val": "3.7 V nominal, 4.2 V full, do not go below 3.0-3.3 V, store at 3.8 V"
    },
    {
      "item": "3S / 4S pack",
      "val": "11.1 V (12.6 V full) / 14.8 V (16.8 V full)"
    },
    {
      "item": "NiMH / LiFePO4 cell",
      "val": "1.2 V / 3.2 V"
    },
    {
      "item": "I2C speeds",
      "val": "100 kHz standard, 400 kHz fast"
    },
    {
      "item": "HC-SR04 range & formula",
      "val": "2 to 400 cm, distance = time \u00d7 343 / 2"
    },
    {
      "item": "Speed of sound",
      "val": "About 343 m/s at 20 \u00b0C"
    },
    {
      "item": "GPS satellites for 3D fix",
      "val": "4 (3 position + 1 clock error)"
    },
    {
      "item": "MQTT port",
      "val": "1883 (8883 with TLS)"
    },
    {
      "item": "HTTP / HTTPS ports",
      "val": "80 / 443"
    },
    {
      "item": "India LoRa band",
      "val": "865 to 867 MHz"
    },
    {
      "item": "IR remote carrier",
      "val": "38 kHz"
    },
    {
      "item": "FPV analog video band",
      "val": "5.8 GHz"
    },
    {
      "item": "Drone thrust-to-weight",
      "val": "At least 2:1"
    },
    {
      "item": "India drone weight classes",
      "val": "Nano up to 250 g; micro to 2 kg; small to 25 kg; medium 25-150 kg; large >150 kg"
    },
    {
      "item": "Legal drone ceiling (green zone India)",
      "val": "120 m (400 ft)"
    },
    {
      "item": "Time constant, first-order step",
      "val": "63.2% at one time constant"
    },
    {
      "item": "Millis rollover",
      "val": "About 49.7 days"
    }
  ],
  "whoIsWho": [
    {
      "name": "Karel \u010capek",
      "known": "R.U.R. (1920), word robot (credited to brother Josef)"
    },
    {
      "name": "Isaac Asimov",
      "known": "Three Laws of Robotics, the word robotics"
    },
    {
      "name": "Joseph Engelberger & George Devol",
      "known": "Unimate, first industrial robot (1961)"
    },
    {
      "name": "Victor Scheinman",
      "known": "Stanford Arm and PUMA"
    },
    {
      "name": "Reymond Clavel",
      "known": "Delta robot"
    },
    {
      "name": "Hiroshi Makino",
      "known": "SCARA"
    },
    {
      "name": "Masahiro Mori",
      "known": "Uncanny valley (1970)"
    },
    {
      "name": "Rodney Brooks",
      "known": "Subsumption architecture, iRobot, Rethink Robotics"
    },
    {
      "name": "Marc Raibert",
      "known": "Boston Dynamics"
    },
    {
      "name": "Sebastian Thrun",
      "known": "Stanley, Stanford DARPA winner (2005)"
    },
    {
      "name": "Oussama Khatib",
      "known": "Potential fields, operational space control"
    },
    {
      "name": "Steven LaValle",
      "known": "RRT (Rapidly-exploring Random Tree)"
    },
    {
      "name": "Rudolf Kalman",
      "known": "Kalman filter"
    },
    {
      "name": "Walter Evans",
      "known": "Root locus (1948)"
    },
    {
      "name": "Ziegler and Nichols",
      "known": "PID tuning rules (1942)"
    },
    {
      "name": "Lotfi Zadeh",
      "known": "Fuzzy logic (1965)"
    },
    {
      "name": "David Lowe",
      "known": "SIFT"
    },
    {
      "name": "Viola and Jones",
      "known": "Face detection (Haar cascades, 2001)"
    },
    {
      "name": "Joseph Redmon",
      "known": "YOLO (You Only Look Once)"
    },
    {
      "name": "Yann LeCun",
      "known": "LeNet (1998)"
    },
    {
      "name": "Fei-Fei Li",
      "known": "ImageNet"
    },
    {
      "name": "John McCarthy",
      "known": "Coined \"Artificial Intelligence\" (1956 Dartmouth)"
    },
    {
      "name": "Bengt Ilon",
      "known": "Mecanum wheel (1972)"
    },
    {
      "name": "Al-Jazari",
      "known": "Early programmable automata (1206)"
    }
  ],
  "formulas": [
    {
      "name": "Ohm's Law",
      "formula": "V = I \u00d7 R"
    },
    {
      "name": "Electric Power",
      "formula": "P = V \u00d7 I = I\u00b2R"
    },
    {
      "name": "Static Torque",
      "formula": "\u03c4 = F \u00d7 r"
    },
    {
      "name": "Wheel Linear Speed",
      "formula": "v = \u03c9 \u00d7 r"
    },
    {
      "name": "Mechanical Power",
      "formula": "P_mech = \u03c4 \u00d7 \u03c9"
    },
    {
      "name": "Ultrasonic Distance",
      "formula": "d = (t \u00d7 343) / 2"
    },
    {
      "name": "Stereo Depth",
      "formula": "Z = (f \u00d7 B) / d   (d = disparity)"
    },
    {
      "name": "Voltage Divider",
      "formula": "V_out = V_in \u00d7 R2 / (R1 + R2)"
    },
    {
      "name": "Diff-Drive Forward Speed",
      "formula": "v = (v_r + v_l) / 2"
    },
    {
      "name": "Diff-Drive Angular Velocity",
      "formula": "\u03c9 = (v_r - v_l) / L"
    },
    {
      "name": "A* Evaluation Function",
      "formula": "f(n) = g(n) + h(n)"
    },
    {
      "name": "Gruebler Mobility (planar)",
      "formula": "DOF = 3(n - 1) - 2j"
    }
  ]
};
