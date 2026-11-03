# Smart Dual-Task Dartboard System

An interactive rehabilitation and gamified dual-task training prototype combining FSR force sensing and EEG brainwave monitoring.

---

## Overview

Standard cognitive and physical rehabilitation drills often suffer from patient fatigue and low adherence. This project introduces **gamification**—transforming a standard dart-throwing mechanics session into a scored, dual-task framework that captures physical strike force alongside cognitive signals.

* **The Physical Task:** Center-of-pressure shifting, balance, limb/trunk stabilization, and spatial perception through physical throws.


* **The Mental Task:** Rule-based memory, spatial perception, and motor learning governed by application prompts.



---

## System Architecture & Workflow

The platform bridges physical hardware telemetry and real-time streaming data into a synchronized Python pipeline:

1. **Hardware Integration:**
* **Muse 2 Headband:** Tracks brainwave frequency bands (Delta, Theta, Alpha, Beta, Gamma) and raw microvolts ($\mu\text{V}$) via 4 electrodes (`TP9`, `AF7`, `AF8`, `TP10`) at a $256\text{ Hz}$ sample rate. Connected via Bluetooth.


* **FSR Board:** A custom triangular face plate ($262\text{ mm}$ per side) containing 4 Force Sensitive Resistors (FSRs).


* **Microcontroller:** Arduino Uno reads analog voltage spikes (`A0-A3`) to evaluate hit zones and force bands (Light, Medium, Hard), outputting feedback via an LCD and piezo buzzer.




2. **Data Synchronization:**
* **Python Backend:** Acts as the central synchronization engine where the serial stream (Arduino hit data) and the wireless Bluetooth stream (Muse 2 EEG data) meet on a unified timeline.





---

## Live Game Loop & Session Structure

1. **Setup & Baseline:** Power on the system, establish baseline resting cognitive state before the initial throw.


2. **Rule Prompting:** The companion app displays a specific rule for the session (e.g., *Just throw*, *Remember then throw*, *Stop on red*).


3. **Execution:** The player throws a dart at the target. The FSR sensors log force and impact zone while the EEG stream records the concurrent cognitive window.


4. **Feedback & Review:** The screen displays score and prompt metrics, allowing post-session comparison between focused and distracted windows.



---

## Technical Stack & Design Files

* **CAD & Enclosure:** Designed in **Autodesk Fusion 360** (featuring four interlocking face tiles and snap-fit assemblies).


* **Electronics & Circuitry:** Prototyped via **Tinkercad Circuits** (Arduino Uno, FSR voltage dividers, $16\times2$ LCD, piezo buzzer, and 9V power supply).


* **Software & Processing:** **VS Code**, **Arduino C++** for sensor scoring, and **Python** for OSC/serial stream alignment.



---

## Project Disclaimers & Scope

* **Exploratory Prototype:** This is an experimental student system designed for exploring interactive dual-task training and accessibility. It is **not** a validated clinical treatment for ADHD, dementia, or medical rehabilitation.


* **EEG as a Proxy:** Signals collected via the Muse 2 serve as stand-ins for cognitive load and state tracking rather than direct measurements of attention.
