"""CLI entry: fixture replay (default), optional serial bridge, opt-in live Muse."""

from __future__ import annotations

import argparse
import logging
import sys
import time
from pathlib import Path

from cs.badge import format_session_badge
from cs.models import HitEvent
from cs.muse_osc.listener import MuseOscListenerStatus
from cs.muse_osc.sources import LiveMuseOsc, ReplaySource, live_muse_enabled_from_env
from cs.serial_ingest.parser import parse_hit_line, parse_serial_log
from cs.sync.join import join_session, write_session_jsonl

logger = logging.getLogger(__name__)

_PKG_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_FIXTURES = _PKG_ROOT / "fixtures"
_DEFAULT_OUT = _PKG_ROOT / "out" / "session.jsonl"


def _read_serial_port(port: str, *, max_lines: int = 50, timeout_s: float = 2.0) -> list[HitEvent]:
    import serial

    hits: list[HitEvent] = []
    with serial.Serial(port, baudrate=9600, timeout=timeout_s) as ser:
        deadline = time.time() + timeout_s
        while len(hits) < max_lines and time.time() < deadline:
            raw = ser.readline()
            if not raw:
                continue
            line = raw.decode("utf-8", errors="replace")
            event = parse_hit_line(line, ts=time.time(), source="serial")
            if event:
                hits.append(event)
    return hits


def run_replay_fixtures(
    *,
    fixtures_dir: Path,
    out_path: Path,
) -> list:
    serial_path = fixtures_dir / "serial_hits.log"
    eeg_path = fixtures_dir / "eeg_windows.jsonl"
    hits = parse_serial_log(serial_path, source="replay")
    eeg_source = ReplaySource(eeg_path)
    logger.info("%s", MuseOscListenerStatus().summary())
    logger.info("%s", eeg_source.status())
    events = join_session(
        hits,
        eeg_source.windows(),
        fsr_mode="replay",
        eeg_mode="replay",
    )
    write_session_jsonl(out_path, events)
    logger.info(
        "%s → %d rows → %s",
        format_session_badge(fsr="replay", eeg="replay"),
        len(events),
        out_path,
    )
    return events


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Dartboard CS layer: FSR serial bridge + Muse OSC scaffold (fixture-first).",
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--replay-fixtures",
        action="store_true",
        help="Default path: join fixture serial log + synthetic EEG windows.",
    )
    mode.add_argument(
        "--serial",
        metavar="PORT",
        help="Read live dartboarddemo.ino lines from PORT (e.g. COM3 or /dev/ttyUSB0).",
    )
    mode.add_argument(
        "--live-muse",
        action="store_true",
        help="Opt-in: enable Muse OSC listener (also requires CS_LIVE_MUSE=1).",
    )
    parser.add_argument(
        "--fixtures-dir",
        type=Path,
        default=_DEFAULT_FIXTURES,
        help="Directory containing serial_hits.log and eeg_windows.jsonl.",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=_DEFAULT_OUT,
        help="Output session.jsonl path.",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
    )
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    logging.basicConfig(
        level=logging.DEBUG if args.verbose else logging.INFO,
        format="%(levelname)s %(message)s",
    )

    use_fixtures = args.replay_fixtures or (not args.serial and not args.live_muse)
    if use_fixtures:
        events = run_replay_fixtures(fixtures_dir=args.fixtures_dir, out_path=args.out)
        if not events:
            logger.error("No dual-task rows produced")
            return 1
        return 0

    hits: list[HitEvent] = []
    eeg_windows = []
    fsr_mode = "off"
    eeg_mode = "off"

    if args.serial:
        fsr_mode = "live"
        hits = _read_serial_port(args.serial)
        if not hits:
            logger.warning("No hits parsed from serial within timeout")

    if args.live_muse:
        if not live_muse_enabled_from_env():
            logger.error(
                "Refusing live Muse without %s=1 (never default; not demo session hardware).",
                "CS_LIVE_MUSE",
            )
            return 2
        eeg_mode = "live"
        live = LiveMuseOsc(listen_seconds=0.0)
        live.collect()
        eeg_windows = live.windows()
        logger.info("%s", live.status())
    else:
        replay = ReplaySource(args.fixtures_dir / "eeg_windows.jsonl")
        eeg_mode = "replay"
        eeg_windows = replay.windows()

    events = join_session(hits, eeg_windows, fsr_mode=fsr_mode, eeg_mode=eeg_mode)
    write_session_jsonl(args.out, events)
    logger.info("%s", format_session_badge(fsr=fsr_mode, eeg=eeg_mode))
    return 0 if events or fsr_mode == "live" else 1


if __name__ == "__main__":
    sys.exit(main())
