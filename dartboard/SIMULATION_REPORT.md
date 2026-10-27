# GEST 3005 — Smart Triangular Dartboard circuit simulation

Design: [GEST3005 Prototype simulation 1](https://www.tinkercad.com/things/fSkU8ixGOXg/editel)

Each FSR is mounted under one of the four 3D-printed tiles from the project brief. A dart hits the printed face, the face compresses the EVA foam, and the foam presses that tile’s FSR. The two FSR leads then leave the tile and enter the breadboard divider. Tinkercad cannot place the printed tile, so the potentiometer named for that tile is the sensor.

The sensing page and the Fusion 360 page number the same four tiles differently. The sensor number follows the sensing page. The tile number follows the printed piece.

| Sensor under the tile | Printed piece | Face | Analog pin | Medium | Hard |
|---|---|---|---|---|---|
| FSR1 | Tile 1, top | gold outer | A0 | +20 | +30 |
| FSR2 | Tile 3, lower left | gold outer | A1 | +20 | +30 |
| FSR3 | Tile 4, lower right | gold outer | A2 | +20 | +30 |
| FSR4 | Tile 2, red center | center | A3 | +50 | +70 |

![Four printed tiles](images/brief_page_3.png)

![Force path: printed face, EVA foam, FSR](images/brief_page_6.png)

Tinkercad has no force-sensitive resistor, so each FSR is a 250 kΩ potentiometer wired as a rheostat. The pots are named `FSR1-T1top`, `FSR2-T3left`, `FSR3-T4right`, and `FSR4-T2center`. Turning a knob clockwise is a harder hit on that tile. The saved design has 16 parts and 63 wires, and the scoring sketch is stored on the Uno.

![Full circuit](images/circuit_full.png)

## What was simulated

A hit is accepted only when one sensor is clearly above the others (crosstalk margin of 80 ADC counts). Pressing two knobs equally scores nothing. A dart that stays pressed scores once and does not score again until every sensor falls back below the release threshold.

## Simulation results

With no force, the LCD stays on `Dartboard ready` / `Total: 0` and the buzzer is silent.

Holding the center knob fully clockwise produced one score and then stopped, which is the re-arm behavior:

- LCD: `CENTER HARD` / `+70 Tot:70`
- Serial: `CENTER raw=1023 +70 total=70`
- The same display was still showing at simulator time 00:00:04, so the held press did not keep adding points.

After the pots were renamed to the printed tiles, the same center press scored once as `T2 CENTER raw=1023 +70 total=70` at simulator time 00:00:02. That is FSR4 under printed tile 2. The earlier rows below used the old zone names; the pins and the scores are the same hits.

![Center hard hit](images/simulation_center_hit.png)

Separate runs, each starting from zero force:

| Test | Serial line | Result |
|---|---|---|
| FSR1 medium | `OUTER1 raw=292 +20 total=20` | pass |
| FSR2 medium | `OUTER2 raw=292 +20 total=20` | pass |
| FSR3 hard | `OUTER3 raw=1023 +30 total=30` | pass |
| FSR4 medium | `CENTER raw=292 +50 total=50` | pass |
| FSR1 and FSR2 both fully pressed | no new line | pass, rejected as crosstalk |
| FSR1 barely turned | no new line | pass, below the hit threshold |

## Wiring

Breadboard connectivity follows `BreadBoardschematic.jpg`: red and blue rails are horizontal buses, and each a–e or f–j column is its own vertical group of five holes. The top rail pair is jumpered to the bottom rail pair.

Each sensor column is the same pattern:

`5V rail — FSR rheostat — column a–e — 10 kΩ — column f–j — GND rail`

The analog wire leaves from hole `a` of that column. Columns are 5, 10, 15, and 20 for A0–A3.

| Function | Connection |
|---|---|
| LCD RS, E, D4–D7 | Uno D12, D11, D5, D4, D3, D2 |
| LCD R/W, VSS, backlight K | GND rail |
| LCD VDD | 5V rail |
| LCD backlight A | 5V through 220 Ω |
| LCD contrast (V0) | wiper of the fifth potentiometer, ends on 5V and GND |
| Piezo | Uno D8 and GND |
| 9V battery | negative to GND; positive through the slide switch to Uno VIN only |

The battery is not tied to the 5V rail. In Tinkercad the Uno is powered by the virtual USB port during simulation, so the slide switch does not actually turn the board off. The wiring is still the standalone circuit from the project brief.

## Sketch

`dartboard/dartboard.ino` is the same program stored on the Uno. The first version scored again every 600 ms while a knob stayed turned. The saved version arms only after all four readings fall below 80, so one press is one dart.

## What the earlier worker did not finish

[Read terminals, finish circuit](b5febc9c-dbee-4f25-bd01-700a278221cb) placed this circuit and proved the LCD could display a score, then died with `Connection failed repeatedly` before writing a report. Two problems showed up while checking its work:

1. Model edits made outside Tinkercad’s record/undo transaction do not persist. A reload had dropped the circuit back to the breadboard, the Uno, and two floating parts. Rebuilding inside `root.rec()` / `root.stopRec()` survived a reload: 16 parts and 63 wires came back.
2. Terminals 1 and 4 are R 4.6.1 sessions. The vscode-R session watcher cannot install `sess` because downloads of `processx`, `jsonlite`, and `rstudioapi` from cloud.r-project.org timed out at 60 seconds. Terminals 2 and 3 are idle shells. None of them is part of the circuit.

The Waveshare ESP32-C6 display from the power diagram is not in Tinkercad, so it is not in this simulation. The Uno scoring circuit is the part the project brief asked to simulate.
