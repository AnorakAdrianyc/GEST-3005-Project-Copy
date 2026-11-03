# PC sync layer (`cs/`)

Honest bridge between **what ran in the demo** (FSR → Arduino Uno → LCD + buzzer) and the **documented dual-task architecture** (serial hits + Muse OSC on a shared timeline). This tree does **not** claim Muse 2 ran live during the presentation session.

## Maturity matrix

| Path | Status | Evidence |
|------|--------|----------|
| FSR → Uno → LCD/buzzer | **demo / LIVE** | [`dartboarddemo.ino`](../dartboarddemo.ino) + breadboard hardware |
| Serial → `HitEvent` | **bridge / LIVE** | Parses existing `band=… zone=… N=… raw=… 2nd=… pts=… total=…` lines at 9600 baud |
| Muse OSC → load proxy | **scaffold / PLANNED** | `EegSource` + `ReplaySource`; `LiveMuseOsc` behind `CS_LIVE_MUSE=1` or `--live-muse` (default **off**) |
| Dual-task join | **scaffold** | [`sync/join.py`](cs/sync/join.py) aligns when both streams exist; **FSR-only** rows (`eeg: null`) are valid |

## DEMO vs ARCHITECTURE vs FUTURE

| Label | Meaning in this repo |
|-------|-------------------------|
| **DEMO** | Shown live: FSR dartboard firmware only |
| **ARCHITECTURE** | Runnable Python fixtures + interfaces documenting how sync *would* work |
| **FUTURE** | Closed-loop dual-task, live Muse in-session, clinical claims |

## Quick start (no hardware)

From repository root:

```bash
cd cs
python3 -m venv .venv && source .venv/bin/activate
pip install -e .
python -m cs.cli --replay-fixtures
```

Exits 0 and writes [`out/session.jsonl`](out/session.jsonl) (gitignored) with joined rows.

## Modes

| Command | FSR | EEG |
|---------|-----|-----|
| `python -m cs.cli --replay-fixtures` (default) | replay fixture log | replay fixture JSONL |
| `python -m cs.cli --serial COM3` | live serial | replay EEG fixture unless live Muse enabled |
| `python -m cs.cli --live-muse` + `CS_LIVE_MUSE=1` | off unless `--serial` too | OSC UDP `:5000` skeleton |

Session badge stub: `FSR: live \| EEG: off/replay/live` — see [`cs/badge.py`](cs/badge.py).

## Package layout

| Module | Role |
|--------|------|
| [`cs/serial_ingest/`](cs/serial_ingest/) | `dartboarddemo.ino` serial → `HitEvent` |
| [`cs/muse_osc/`](cs/muse_osc/) | OSC listener STATUS + `ReplaySource` / flag-gated `LiveMuseOsc` |
| [`cs/sync/`](cs/sync/) | Timestamp join → `session.jsonl` |
| [`fixtures/`](fixtures/) | `synthetic` tagged sample data — not bench N claims |

## Dependencies

Python 3.11+, `pyserial`, `python-osc` (see [`pyproject.toml`](pyproject.toml)).

## Related docs

- [`docs/EVIDENCE_MATRIX.md`](../docs/EVIDENCE_MATRIX.md) — path → DEMO \| ARCHITECTURE \| FUTURE
- Root [`README.md`](../README.md) — hardware truth + PC sync pointer
- [`firmware/README.md`](../firmware/README.md) — canonical sketch pointer
