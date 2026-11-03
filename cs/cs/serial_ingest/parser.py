"""Parse dartboarddemo.ino Serial debug lines into HitEvent records."""

from __future__ import annotations

import re
from pathlib import Path

from cs.models import HitEvent, SourceKind

# band=LIGHT zone=T2 CENTER N=4.20 raw=512 2nd=100 pts=50 total=50
_HIT_RE = re.compile(
    r"^band=(?P<band>\S+)\s+"
    r"zone=(?P<zone>.+?)\s+"
    r"N=(?P<n>[\d.]+)\s+"
    r"raw=(?P<raw>\d+)\s+"
    r"2nd=(?P<second>\d+)\s+"
    r"pts=(?P<pts>\d+)\s+"
    r"total=(?P<total>\d+)\s*$"
)


def parse_hit_line(
    line: str,
    *,
    ts: float,
    source: SourceKind = "serial",
) -> HitEvent | None:
    """Return HitEvent if line matches firmware debug format."""
    text = line.strip()
    if not text or text.startswith("#"):
        return None
    match = _HIT_RE.match(text)
    if not match:
        return None
    return HitEvent(
        band=match.group("band"),
        zone=match.group("zone"),
        n_est=float(match.group("n")),
        raw=int(match.group("raw")),
        second=int(match.group("second")),
        pts=int(match.group("pts")),
        total=int(match.group("total")),
        ts=ts,
        source=source,
    )


def parse_serial_log(
    path: Path,
    *,
    source: SourceKind = "replay",
    base_ts: float = 1_700_000_000.0,
    step_s: float = 0.65,
) -> list[HitEvent]:
    """Parse a fixture log; assign monotonic timestamps when none are embedded."""
    hits: list[HitEvent] = []
    ts = base_ts
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        event = parse_hit_line(raw_line, ts=ts, source=source)
        if event:
            hits.append(event)
            ts += step_s
    return hits
