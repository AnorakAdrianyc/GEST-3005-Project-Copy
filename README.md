# GEST 3005 — Smart Dual-Task Dartboard

Course project by Isaac and Adrian. A triangular dartboard with four force-sensing channels, scored on an Arduino Uno, framed as a dual-task rehabilitation prototype that could later pair throw force with a Muse 2 EEG stream.

This repository is an exploratory prototype. It is not a medical device, and it does not treat ADHD, dementia, or injury. The Kawabata et al. (2024) darts pilot motivates the dual-task framing. It does not validate this board. Consumer EEG is a cognitive-load proxy, not a measurement of attention.

## What scores

Each of the four printed tiles sits on EVA foam over one FSR. A hit is accepted only when one channel is clearly above the others and the estimated force is at least 0.1 N. A held press scores once. The next dart is accepted only after every channel falls back below 0.1 N.

Force is capped at 10 N. Bands are LIGHT (0.1–3 N), MEDIUM (3–7 N), and HARD (7–10 N).

| Sensor | Printed tile | Face | Pin | Light | Medium | Hard |
|---|---|---|---|---|---|---|
| FSR1 | Tile 1, top | gold outer | A0 | 10 | 20 | 30 |
| FSR2 | Tile 3, lower left | gold outer | A1 | 10 | 20 | 30 |
| FSR3 | Tile 4, lower right | gold outer | A2 | 10 | 20 | 30 |
| FSR4 | Tile 2, red center | center | A3 | 30 | 50 | 70 |

The LCD and the serial monitor (9600 baud) both show the zone, the band, and the running score. The piezo on D8 beeps at 880 Hz, 1100 Hz, or 1500 Hz for light, medium, and hard.

Face art on the render is labeled 10 / 30 / 50. Those labels are not the simulation point table above.

## Circuit

Tinkercad design: [GEST3005 Prototype simulation 1](https://www.tinkercad.com/things/fSkU8ixGOXg/editel)

Tinkercad has no printed tile, so each FSR is a variable resistor whose maximum is 10 kΩ:

`5V — variable resistor (0–10 kΩ) — analog pin — 10 kΩ — GND`

10 kΩ is 0 N. 0 Ω is 10 N. `dartboarddemo.ino` maps that linearly.

The 250 kΩ potentiometer is LCD contrast on V0 only. Leave it at Tinkercad Position 1 (wiper at the GND end). Turning it down raises V0 and the LCD shows `error`.

Power for the wall-mounted board is a 9 V battery through a slide switch into Uno VIN. The onboard regulator makes the 5 V rail. Do not put 9 V on the 5 V pin. In the simulator the Uno is still powered by virtual USB, so the switch does not turn the on-screen board off.

LCD pins are RS, E, D4, D5, D6, D7 on Uno D12, D11, D5, D4, D3, D2.

Wiring detail, divider columns, and the earlier 250 kΩ potentiometer runs are in [`dartboard/SIMULATION_REPORT.md`](dartboard/SIMULATION_REPORT.md).

## Which sketch to flash

| File | Use it when |
|---|---|
| [`dartboarddemo.ino`](dartboarddemo.ino) | The breadboard sensors are 10 kΩ variable resistors. This is the demo sketch. |
| [`dartboard/dartboard.ino`](dartboard/dartboard.ino) | The Tinkercad part is the Force Sensor slider (`sensorForce`), not a 10 kΩ rheostat. |
| [`dartboard2.ino`](dartboard2.ino) | Older non-linear resistance curve, plus the contrast-pot warning in the sketch. |
| [`gest3005_prototype_simulation_11.ino`](gest3005_prototype_simulation_11.ino) | Earlier threshold sketch (`OUTER1`…`CENTER`, hard bonus). Not the current score table. |

Open the `.ino` in the Arduino IDE, select Arduino Uno, and upload. The 16×2 LCD should read `Dartboard ready` / `Score: 0` before the first throw.

## Build the slides

From `dartboard/`, with Node.js:

```bash
npm install
node build_presentation_pptx.js
node build_report_pptx.js
```

- `build_presentation_pptx.js` writes [`Smart Dual-Task Dartboard.pptx`](Smart%20Dual-Task%20Dartboard.pptx) in this folder. Nine slides, English with Chinese subtitles, speaker notes for Isaac and Adrian.
- `build_report_pptx.js` writes `dartboard/SIMULATION_REPORT.pptx` from the simulation report.

The outline those slides follow is [`Powerpoint Skeleton details.md`](Powerpoint%20Skeleton%20details.md).

## Repository map

| Path | What it is |
|---|---|
| `dartboarddemo.ino` | Current scoring sketch for the 10 kΩ dividers |
| `dartboard/` | Simulation report, report deck script, presentation script, Tinkercad rebuild script, circuit screenshots |
| `dartboard/tinkercad_build.js` | Browser-console rebuild of the circuit. Run it inside the open Tinkercad editor, inside `root.rec()` / `root.stopRec()`, or the wires do not persist |
| `FSR_Product Main.f3z` | Fusion 360 model of the printed board |
| `Final Virtual Circuit.jpeg` | Tinkercad screenshot used on the demo slide |
| `BreadBoardschematic.jpg` | Breadboard rail and column reference |
| `Smart Triangular Dartboard.pdf` | Earlier bilingual board deck (geometry, snap-fits, scoring notes) |
| `Simplified Infographic for powerpoint.pdf` | Muse 2 + FSR → computer → game feedback |
| `Infographic for Powerpoint.pdf` | Longer version of that flow |

The Muse 2 and Python sync described in the presentation are the dual-task concept. They are not in the Arduino sketches. The live demo is the FSR board.

## Reference

N. Kawabata, T. Iida, M. Kunishige, H. Fukuda, H. Miyaguchi, and T. Harada, “Evaluating the impact of a darts game intervention on cognitive function in older adults with and without mild cognitive impairment: a pilot study,” *Frontiers in Rehabilitation Sciences*, vol. 5, p. 1327494, 2024. doi: [10.3389/fresc.2024.1327494](https://doi.org/10.3389/fresc.2024.1327494).
