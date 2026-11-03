# Evidence matrix

One table mapping repository paths to **honesty labels**. Use this when writing IEEE-style Body/Results: **demo session results = FSR only**; OSC join + live Muse = **ARCHITECTURE** / **FUTURE**, not claims about what ran live. **EEG does not appear in the DEMO column.**

| Path | Status | Notes |
|------|--------|-------|
| [`dartboarddemo.ino`](../dartboarddemo.ino) | DEMO | Live demo sketch: FSR A0–A3, LCD 12/11/5/4/3/2, buzzer D8, DETECT 0.1 N / MEDIUM 3 N / HARD 7 N, crosstalk 40, 600 ms re-arm |
| Local `Documents/GEST3005/report_figures/fig_viewer_{iso,top,detail}.png` (Autodesk Viewer stills of `FSR_Product Main.f3d`) | DEMO | Native CAD evidence for Methods; Viewer upload was `.f3d` (`.f3z` unsupported). Prefer these + Fusion preview when citing the real model. |
| Local `report_figures/fig_photo_fusion_preview.png` / `fig_photo_fusion_viewport.png` (from Fusion package `Previews/big.png` + viewport) | DEMO | Native Fusion package stills of `FSR_Product Main`. |
| Local `report_figures/fig_photo_prototype_lcd.png` + `fig_photo_circuit_tinkercad.png` | DEMO | Bench LCD zone-ID readout + Tinkercad circuit stills for Results (qualitative demo). |
| Local `report_figures/fig_board_iso.png` / `fig_board_top.png` / `fig_board_exploded.png` | ARCHITECTURE | Labeled **reconstruction** for Methods geometry — not a native STEP/STL export (`.f3d` had no importable mesh). Captions must disclose reconstruction. |
| Repo [`FSR_Product Main.f3z`](../FSR_Product%20Main.f3z) | DEMO | Fusion design package for the printed board (CAD source in git). |
| [`README.md`](../README.md) | DEMO | Hardware scoring table, wiring, buzzer; states Muse/Python sync is concept only |
| [`firmware/README.md`](../firmware/README.md) | DEMO | Canonical sketch pointer + serial debug format |
| [`dartboard/SIMULATION_REPORT.md`](../dartboard/SIMULATION_REPORT.md) | DEMO | Tinkercad simulation + bench USB serial/LCD behavior (no in-session Muse) |
| [`Final Virtual Circuit.jpeg`](../Final%20Virtual%20Circuit.jpeg) | DEMO | Tinkercad / virtual bench photo used on demo materials |
| [`dartboard/images/hero_board.png`](../dartboard/images/hero_board.png), [`circuit_full.png`](../dartboard/images/circuit_full.png), [`simulation_center_hit.png`](../dartboard/images/simulation_center_hit.png) | DEMO | Report/deck circuit and hit screenshots (in-repo mirrors where cited) |
| [`cs/`](../cs/) | ARCHITECTURE | Fixture-first serial + optional EEG join; default `--replay-fixtures` |
| [`cs/cs/serial_ingest/`](../cs/cs/serial_ingest/) | ARCHITECTURE | Parses `dartboarddemo.ino` `band=… zone=… N=… raw=… 2nd=… pts=… total=…` lines |
| [`cs/cs/muse_osc/`](../cs/cs/muse_osc/) | ARCHITECTURE | OSC :5000 skeleton; `LiveMuseOsc` opt-in only (`CS_LIVE_MUSE=1`) |
| [`cs/cs/sync/`](../cs/cs/sync/) | ARCHITECTURE | Timeline join for logging; **does not change** firmware `pts` / `total` |
| [`cs/fixtures/`](../cs/fixtures/) | ARCHITECTURE | `fixture_tag: synthetic` — not measured bench data |
| Presentation / infographic PDFs (`Smart Triangular Dartboard.pdf`, Muse flow PDFs) | FUTURE | Dual-task concept diagrams; not in-session EEG evidence |
| Closed-loop Muse + throw feedback | FUTURE | Not implemented; not demonstrated |

Report figure pack (3D / Results visuals): on Adrian’s PC at `Documents/GEST3005/report_figures/` (and box `/workspace/gest3005-project-renders/figures/`); optional later commit under `docs/report_figures/` if those PNGs should live in-repo.

**Buzzers:** Documented in firmware (880 / 1100 / 1500 Hz on pin 8) — **DEMO**.

**Scoring:** Simulation table 10/20/30 outer, 30/50/70 center — **DEMO**. Face art 10/30/50 labels — **not** the score table.
