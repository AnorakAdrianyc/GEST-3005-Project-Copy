Here is the complete English version of your presentation outline and speaker notes, fully tailored to the "Dual-Task Rehabilitation" concept using FSRs and EEG. You can copy and paste this directly into Canva or PowerPoint.

---

# 🎯 PPT Outline: Smart Dual-Task Dartboard System

## Slide 1: Title Slide
*   **Title**: Smart Dual-Task Dartboard System
*   **Subtitle**: An Interactive Rehabilitation Game Combining FSR Force Sensing and EEG Monitoring
*   **Presenters**: [Your Name (Isaac)] & [Adrian's Name]
*   **Date**: Nov 2, 2026
*   **Visual Suggestion**: A Superman geometric shape on one side, and a Muse 2 EEG headband icon on the other.

---

## Slide 2: The Problem & Our Solution
*   **Target Audience**: Patients with ADHD, dementia, or recovering from severe accidents.
*   **The Problem**: Traditional rehabilitation and cognitive therapies can be repetitive and boring, making it hard for patients to stay engaged.
*   **Our Solution**: Gamification. We are turning a simple pub game (darts) into a smart, data-driven therapy system. 
*   **The Core Concept**: Darts is a proven **"Dual-Task"** exercise—it forces the brain and body to multitask simultaneously.

> **🗣️ Speaker Notes (Adrian)**:
> "Hello everyone. Today we are presenting a system that is more than just a game; it has the potential to be a rehabilitation tool. For patients dealing with ADHD, dementia, or physical injuries, traditional therapy can be boring. We decided to turn darts into a medical tool. Why darts? Because throwing a dart is a perfect 'dual-task' exercise—it challenges both physical coordination and mental focus at the same time."

---

## Slide 3: The Dual-Task Concept
*   **Physical Side**: Stabilizing the core, shifting body weight, and maintaining balance while throwing.
*   **Mental Side**: Judging distance, spatial awareness, intense focus, and memory.
*   **System Goal**: Real-time tracking of both physical balance and brain activity.

> **🗣️ Speaker Notes (Isaac)**:
> "What is a 'dual-task'? It means your brain and body have to multitask. Physically, you must stand stable and shift your weight. Mentally, you need extreme focus to aim. Our system aims to monitor both the physical and cognitive states during this process."

---

## Slide 4: Hardware Integration
*   **Physical Tracking (FSR)**: We upgraded our previous FSR balance concept. We built a custom **Superman-shaped triangular dartboard** using 4 FSRs to detect where the dart hits and the force applied.
*   **Cognitive Tracking (EEG)**: We integrated a **Muse 2 EEG headband** to capture live brain signals.
*   **Data Flow**: Arduino reads the FSR data, sends it via Bluetooth to a PC, and Python combines it with the EEG data.
*   *[Insert Image: Your provided flowchart showing "Muse 2 + FSR -> Computer/Python -> Game Feedback"]*

> **🗣️ Speaker Notes (Adrian)**:
> "For the hardware, we combined two sets of sensors. First, our custom 3D-printed triangular dartboard with 4 FSRs to measure the physical throw. Second, the Muse 2 headband to measure brain activity. The data from both sensors is sent via Bluetooth to a Python program on a laptop."

---

## Slide 5: The Live Game Loop
*   **1. Sync**: Python aligns the EEG and FSR data streams.
*   **2. Baseline**: Measure the patient's resting cognitive state.
*   **3. Throw**: The patient throws the dart; the system reads the FSR force and EEG focus levels in real-time.
*   **4. Feedback**: The screen displays scores, prompts, and tracks progress. 
*   **Analysis**: Comparing brainwave changes between "distracted" and "focused" states.

> **🗣️ Speaker Notes (Isaac)**:
> "Here is how it works: The computer first measures the patient's baseline brainwaves at rest. Then, as they throw, the Python program combines the FSR force data with the EEG focus data. We can then analyze if higher focus correlates with better throws and scores."

---

## Slide 6: How We Built It
*   **Hardware & 3D Design**: Autodesk Fusion 360 (3D modeling) and Tinkercad (Circuit simulation).
*   **Software**: VS Code (Python for data processing, Arduino C++ for sensors).
*   **Optional AI Layer**: We explored using AI (like Ollama or GraphRAG) to organize medical literature, generate daily therapy reports, and even convert data into voice prompts for the patient.

> **🗣️ Speaker Notes (Adrian)**:
> "For the build, we used Fusion 360 to design the 3D dartboard and Tinkercad to simulate the circuits. The software is written in Python and Arduino. We also explored adding an AI layer to automatically generate progress reports for therapists or provide voice feedback to the patient."

---

## Slide 7: ⚠️ Limitations & Disclaimer (Crucial for Academia)
*   *[This slide is highly recommended to show academic integrity]*
*   **Experimental Prototype**: This is an exploratory prototype. It is **NOT** a proven medical treatment for ADHD or rehabilitation.
*   **EEG Limitations**: Brain signals from the Muse 2 do **NOT** directly measure "attention." They are proxies for cognitive load.
*   **Future Work**: Currently tested on a small scale. Real-world medical application requires clinical trials and professional medical supervision.

> **🗣️ Speaker Notes (Isaac)**:
> "We want to be very clear: this is an experimental prototype. We are not claiming it cures ADHD, because EEG signals do not directly equal attention. For this to be used in actual medical therapy, it would require extensive clinical testing and doctors' involvement."

---

## Slide 8: Live Demo (FSR Dartboard)
*   **Demo Focus**: Due to time and environmental constraints, we will demonstrate the **FSR Triangular Dartboard** live. 
*   **Process**: 
    1. Turn on power (LCD shows "Ready").
    2. Invite the professor/classmates to throw a dart.
    3. Show the real-time force detection and scoring on the LCD and buzzer.
*   *(Note: The EEG integration will be shown in the pre-recorded demo video)*

> **🗣️ Speaker Notes (Isaac & Adrian)**:
> "Due to the live environment, we will focus on demonstrating the physical FSR dartboard today. You can see how different throwing forces result in different scores on the LCD. The full EEG integration is shown in our demo video."

---

## Slide 9: Conclusion
*   Successfully upgraded a simple FSR project into a **"Dual-Task Rehabilitation Framework."**
*   Combined 3D printing, FSR sensors, EEG hardware, and Python data processing.
*   Demonstrated the potential of gamification in physical and cognitive therapy.

> **🗣️ Speaker Notes (Adrian)**:
> "To conclude, we believe darts can be more than just a game. With the right sensors, it can be a powerful rehabilitation tool. Thank you for listening!"

---

### 💡 Tips for the Q&A:
1.  **If the professor asks:** *"How do you prove the EEG actually measures focus?"*
    *   **Answer:** "We acknowledge that EEG does not perfectly equal focus. That's why we labeled this an 'exploratory prototype.' Our main achievement is creating the framework to sync physical force (FSR) with brainwave data (EEG) for future dual-task analysis."
2.  **If the professor asks:** *"Why not just use a commercial electronic dartboard?"*
    *   **Answer:** "Commercial boards only track scoring. By building our own 3D-printed board with FSRs, we can capture raw analog force data and synchronize it with EEG data at a much higher resolution for research purposes."