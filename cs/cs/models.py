"""Shared event schemas for FSR hits, EEG windows, and joined dual-task records."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from typing import Any, Literal

SourceKind = Literal["serial", "replay", "live_muse", "synthetic"]
FixtureTag = Literal["synthetic", "recorded"]


@dataclass(frozen=True)
class HitEvent:
    """One scored hit from dartboarddemo.ino serial debug output."""

    band: str
    zone: str
    n_est: float
    raw: int
    second: int
    pts: int
    total: int
    ts: float
    source: SourceKind = "serial"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class EegWindow:
    """Load proxy around a timestamp (Muse OSC path — replay or live)."""

    ts: float
    alpha: float | None = None
    beta: float | None = None
    theta: float | None = None
    delta: float | None = None
    gamma: float | None = None
    muse_status: str = "off"
    source: SourceKind = "replay"
    fixture_tag: FixtureTag = "synthetic"

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class DualTaskEvent:
    """Joined session row; EEG may be null for FSR-only sessions."""

    hit: HitEvent
    eeg: EegWindow | None = None
    join_delta_ms: float | None = None
    session_badge: str = field(default="FSR: off | EEG: off")

    def to_dict(self) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "hit": self.hit.to_dict(),
            "eeg": self.eeg.to_dict() if self.eeg else None,
            "join_delta_ms": self.join_delta_ms,
            "session_badge": self.session_badge,
        }
        return payload

    def to_jsonl_line(self) -> str:
        return json.dumps(self.to_dict(), sort_keys=True)
