"""Self-check for fixture replay path."""

from __future__ import annotations

import json
from pathlib import Path

from cs.cli import run_replay_fixtures


def test_replay_fixtures_writes_jsonl(tmp_path: Path) -> None:
    fixtures = Path(__file__).resolve().parent.parent / "fixtures"
    out = tmp_path / "session.jsonl"
    events = run_replay_fixtures(fixtures_dir=fixtures, out_path=out)
    assert len(events) == 3
    assert out.is_file()
    lines = out.read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) == 3
    row = json.loads(lines[0])
    assert row["hit"]["band"] == "LIGHT"
    assert row["session_badge"] == "FSR: replay | EEG: replay"
    assert row["eeg"] is not None
