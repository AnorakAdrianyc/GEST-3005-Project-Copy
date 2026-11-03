# PC sync layer (`cs/`)

Honest bridge between **what ran in the demo** (FSR → Arduino Uno → LCD + buzzer) and the **documented dual-task architecture** (serial hits + Muse OSC on a shared timeline). This tree does **not** claim Muse 2 ran live during the presentation session.

## Maturity matrix

| Path | Status | Evidence |
|------|--------|----------|
| FSR → Uno → LCD/buzzer | DEMO | [`dartboarddemo.ino`](../dartboarddemo.ino) + breadboard hardware |
| Serial → `HitEvent` | DEMO | Host path when fed live Uno Serial from `dartboarddemo.ino` at 9600 baud. Fixture/replay inputs stay **ARCHITECTURE** and tagged `synthetic`. |
| Muse OSC → load proxy | ARCHITECTURE | `EegSource` + `ReplaySource`; `LiveMuseOsc` behind `CS_LIVE_MUSE=1` or `--live-muse` (default **off**) |
| Dual-task join | ARCHITECTURE | [`sync/join.py`](cs/sync/join.py) attaches EEG windows for logging when explicitly joined; **never** mutates FSR score fields |

## DEMO vs ARCHITECTURE vs FUTURE

| Label | Meaning in this repo |
|-------|-------------------------|
| **DEMO** | Shown live or cited as Results/CAD evidence: FSR dartboard firmware, Fusion/Tinkercad/bench figures (see [`docs/EVIDENCE_MATRIX.md`](../docs/EVIDENCE_MATRIX.md)) |
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

Exits 0 and writes [`out/session.jsonl`](out/session.jsonl) (gitignored). Fixture replay **joins** synthetic EEG for the architecture demo only; live `--serial` does **not** attach EEG unless you pass `--join-eeg` or opt-in `--live-muse`.

## Modes

| Command | FSR | EEG |
|---------|-----|-----|
| `python -m cs.cli --replay-fixtures` (default) | replay fixture log | replay fixture JSONL (joined for scaffold demo) |
| `python -m cs.cli --serial COM3` | live serial | **off** (FSR-only rows; score = firmware `pts`/`total` only) |
| `python -m cs.cli --serial COM3 --join-eeg` | live serial | replay fixture JSONL joined on timeline |
| `python -m cs.cli --live-muse` + `CS_LIVE_MUSE=1` | off unless `--serial` too | OSC UDP `:5000` skeleton |

Session badge stub: `FSR: live \| EEG: off/replay/live` — see [`cs/badge.py`](cs/badge.py).

## Package layout

| Module | Role |
|--------|------|
| [`cs/serial_ingest/`](cs/serial_ingest/) | `dartboarddemo.ino` serial → `HitEvent` |
| [`cs/muse_osc/`](cs/muse_osc/) | OSC listener STATUS + `ReplaySource` / flag-gated `LiveMuseOsc` |
| [`cs/sync/`](cs/sync/) | Timestamp join → `session.jsonl` (EEG sidecar only) |
| [`fixtures/`](fixtures/) | `synthetic` tagged sample data — not bench N claims |

## Dependencies

Python 3.11+, `pyserial`, `python-osc` (see [`pyproject.toml`](pyproject.toml)).

## Related docs

- [`docs/EVIDENCE_MATRIX.md`](../docs/EVIDENCE_MATRIX.md) — path → DEMO \| ARCHITECTURE \| FUTURE
- Root [`README.md`](../README.md) — hardware truth + PC sync pointer
- [`firmware/README.md`](../firmware/README.md) — canonical sketch pointer
