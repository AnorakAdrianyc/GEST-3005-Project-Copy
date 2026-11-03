"""Golden-line tests against dartboarddemo.ino Serial.print format."""

from __future__ import annotations

from cs.serial_ingest.parser import parse_hit_line

# Mirrors setup in dartboarddemo.ino loop: band, zoneNames[], N, raw, 2nd, pts, total
_GOLDEN = (
    "band=MEDIUM zone=T2 CENTER N=4.50 raw=620 2nd=95 pts=50 total=60"
)


def test_parse_matches_firmware_debug_line() -> None:
    hit = parse_hit_line(_GOLDEN, ts=1700000000.0)
    assert hit is not None
    assert hit.band == "MEDIUM"
    assert hit.zone == "T2 CENTER"
    assert hit.n_est == 4.50
    assert hit.raw == 620
    assert hit.second == 95
    assert hit.pts == 50
    assert hit.total == 60


def test_all_zone_names_parse() -> None:
    zones = ("T1 TOP", "T3 LEFT", "T4 RIGHT", "T2 CENTER")
    for zone in zones:
        line = f"band=LIGHT zone={zone} N=1.00 raw=900 2nd=50 pts=10 total=10"
        hit = parse_hit_line(line, ts=0.0)
        assert hit is not None
        assert hit.zone == zone
