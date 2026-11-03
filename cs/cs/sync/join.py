"""Align HitEvent timeline with EEG windows; FSR-only sessions remain valid."""

from __future__ import annotations

import json
from pathlib import Path

from cs.models import DualTaskEvent, EegWindow, HitEvent


def _nearest_eeg(
    hit: HitEvent,
    windows: list[EegWindow],
    max_delta_ms: float,
) -> tuple[EegWindow | None, float | None]:
    if not windows:
        return None, None
    best: EegWindow | None = None
    best_delta_ms: float | None = None
    for window in windows:
        delta_ms = abs(window.ts - hit.ts) * 1000.0
        if delta_ms <= max_delta_ms and (
            best_delta_ms is None or delta_ms < best_delta_ms
        ):
            best = window
            best_delta_ms = delta_ms
    return best, best_delta_ms


def join_session(
    hits: list[HitEvent],
    eeg_windows: list[EegWindow] | None,
    *,
    max_delta_ms: float = 750.0,
    fsr_mode: str = "replay",
    eeg_mode: str = "off",
) -> list[DualTaskEvent]:
    """
    Build dual-task rows. When eeg_windows is empty/None, emit hit-only rows (EEG null).

    FSR scoring (`hit.pts`, `hit.total`) is always taken from firmware serial as-is;
    EEG is never merged into session score fields.
    """
    windows = eeg_windows or []
    badge = f"FSR: {fsr_mode} | EEG: {eeg_mode}"
    events: list[DualTaskEvent] = []
    for hit in hits:
        eeg, delta = _nearest_eeg(hit, windows, max_delta_ms)
        events.append(
            DualTaskEvent(
                hit=hit,
                eeg=eeg,
                join_delta_ms=delta,
                session_badge=badge,
            )
        )
    return events


def write_session_jsonl(path: Path, events: list[DualTaskEvent]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for event in events:
            handle.write(event.to_jsonl_line())
            handle.write("\n")
