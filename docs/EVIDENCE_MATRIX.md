# Evidence matrix

One table mapping repository paths to **honesty labels**. Use this when writing IEEE-style Body/Results: **demo session results = FSR only**; OSC join + live Muse = **ARCHITECTURE** / **FUTURE**, not claims about what ran live. **EEG does not appear in the DEMO column.**

| Path | Status | Notes |
|------|--------|-------|
| [`dartboarddemo.ino`](../dartboarddemo.ino) | DEMO | Live demo sketch: FSR A0–A3, LCD 12/11/5/4/3/2, buzzer D8, DETECT 0.1 N / MEDIUM 3 N / HARD 7 N, crosstalk 40, 600 ms re-arm |
| [`README.md`](../README.md) | DEMO | Hardware scoring table, wiring, buzzer; states Muse/Python sync is concept only |
| [`firmware/README.md`](../firmware/README.md) | DEMO | Canonical sketch pointer + serial debug format |
| [`dartboard/SIMULATION_REPORT.md`](../dartboard/SIMULATION_REPORT.md) | DEMO | Tinkercad simulation + bench USB serial/LCD behavior (no in-session Muse) |
| [`Final Virtual Circuit.jpeg`](../Final%20Virtual%20Circuit.jpeg) | DEMO | Tinkercad / virtual bench photo used on demo materials |
| [`dartboard/images/hero_board.png`](../dartboard/images/hero_board.png), [`circuit_full.png`](../dartboard/images/circuit_full.png), [`simulation_center_hit.png`](../dartboard/images/simulation_center_hit.png) | DEMO | Report/deck circuit and hit screenshots |
| [`FSR_Product Main.f3z`](../FSR_Product%20Main.f3z) | DEMO | Native Fusion 360 board assembly (CAD source in repo) |
| `Documents/GEST3005/report_figures/` (local report bundle) | DEMO | Preferred offline Results/CAD exports when present (`fig_viewer_*`, Fusion preview captures, bench LCD photos). Not fully vendored in git; mirror in-repo images above where cited |
| Reconstruction iso/top meshes (e.g. `fig_viewer_*` mesh exports) | ARCHITECTURE | **Reconstruction** previews for report layout — not native Fusion CAD; label as reconstruction in captions |
| [`cs/`](../cs/) | ARCHITECTURE | Fixture-first serial + optional EEG join; default `--replay-fixtures` |
| [`cs/cs/serial_ingest/`](../cs/cs/serial_ingest/) | ARCHITECTURE | Parses `dartboarddemo.ino` `band=… zone=… N=… raw=… 2nd=… pts=… total=…` lines |
| [`cs/cs/muse_osc/`](../cs/cs/muse_osc/) | ARCHITECTURE | OSC :5000 skeleton; `LiveMuseOsc` opt-in only (`CS_LIVE_MUSE=1`) |
| [`cs/cs/sync/`](../cs/cs/sync/) | ARCHITECTURE | Timeline join for logging; **does not change** firmware `pts` / `total` |
| [`cs/fixtures/`](../cs/fixtures/) | ARCHITECTURE | `fixture_tag: synthetic` — not measured bench data |
| Presentation / infographic PDFs (`Smart Triangular Dartboard.pdf`, Muse flow PDFs) | FUTURE | Dual-task concept diagrams; not in-session EEG evidence |
| Closed-loop Muse + throw feedback | FUTURE | Not implemented; not demonstrated |

**Buzzers:** Documented in firmware (880 / 1100 / 1500 Hz on pin 8) — **DEMO**.

**Scoring:** Simulation table 10/20/30 outer, 30/50/70 center — **DEMO**. Face art 10/30/50 labels — **not** the score table.
