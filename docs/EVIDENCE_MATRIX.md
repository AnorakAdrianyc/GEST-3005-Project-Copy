# Evidence matrix

One table mapping repository paths to **honesty labels**. Use this when writing IEEE-style Body/Results: **demo session results = FSR only**; OSC join + live Muse = **Future Work / ARCHITECTURE**, not claims about what ran live.

| Path | Status | Notes |
|------|--------|-------|
| [`dartboarddemo.ino`](../dartboarddemo.ino) | **DEMO** | Live demo sketch: FSR A0–A3, LCD 12/11/5/4/3/2, buzzer D8, DETECT 0.1 N / MEDIUM 3 N / HARD 7 N, crosstalk 40, 600 ms re-arm |
| [`README.md`](../README.md) | **DEMO + docs** | States Muse/Python sync is concept; live demo is FSR board |
| [`dartboard/SIMULATION_REPORT.md`](../dartboard/SIMULATION_REPORT.md) | **DEMO (sim)** | Tinkercad / serial format reference |
| [`cs/`](../cs/) | **ARCHITECTURE** | Fixture-first serial + EEG join; default `--replay-fixtures` |
| [`cs/cs/serial_ingest/`](../cs/cs/serial_ingest/) | **ARCHITECTURE (bridge)** | Parses real firmware serial lines |
| [`cs/cs/muse_osc/`](../cs/cs/muse_osc/) | **ARCHITECTURE (scaffold)** | OSC :5000 skeleton; `LiveMuseOsc` opt-in only |
| [`cs/cs/sync/`](../cs/cs/sync/) | **ARCHITECTURE (scaffold)** | Join when both streams present; FSR-only valid |
| [`cs/fixtures/`](../cs/fixtures/) | **ARCHITECTURE** | `fixture_tag: synthetic` — not measured bench data |
| Presentation / infographic PDFs | **FUTURE / concept** | Dual-task flow diagrams; not in-session EEG evidence |
| Closed-loop Muse + throw feedback | **FUTURE** | Not implemented; not demonstrated |

**Buzzers:** Documented in firmware (880 / 1100 / 1500 Hz on pin 8) — **DEMO**.

**Scoring:** Simulation table 10/20/30 outer, 30/50/70 center — **DEMO**. Face art 10/30/50 labels — **not** the score table.
