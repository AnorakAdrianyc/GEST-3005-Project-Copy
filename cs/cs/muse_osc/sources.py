"""EEG ingest: replay fixtures by default; live Muse OSC is opt-in only."""

from __future__ import annotations

import json
import logging
import os
from abc import ABC, abstractmethod
from pathlib import Path

from cs.models import EegWindow, FixtureTag, SourceKind

logger = logging.getLogger(__name__)

LIVE_MUSE_ENV = "CS_LIVE_MUSE"


def live_muse_enabled_from_env() -> bool:
    """True when CS_LIVE_MUSE is 1, true, or yes (case-insensitive)."""
    value = os.environ.get(LIVE_MUSE_ENV, "").strip().lower()
    return value in {"1", "true", "yes", "on"}


class EegSource(ABC):
    """Abstract EEG load proxy."""

    @abstractmethod
    def status(self) -> str:
        """Human-readable STATUS for logs and session badge."""

    @abstractmethod
    def windows(self) -> list[EegWindow]:
        """All EEG windows available from this source."""


class ReplaySource(EegSource):
    """Read synthetic or recorded fixture JSONL (one EegWindow per line)."""

    def __init__(self, path: Path) -> None:
        self._path = path
        self._windows = self._load(path)

    @staticmethod
    def _load(path: Path) -> list[EegWindow]:
        rows: list[EegWindow] = []
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            data = json.loads(line)
            tag: FixtureTag = data.get("fixture_tag", "synthetic")
            rows.append(
                EegWindow(
                    ts=float(data["ts"]),
                    alpha=data.get("alpha"),
                    beta=data.get("beta"),
                    theta=data.get("theta"),
                    delta=data.get("delta"),
                    gamma=data.get("gamma"),
                    muse_status=data.get("muse_status", "replay"),
                    source="replay",
                    fixture_tag=tag,
                )
            )
        return rows

    def status(self) -> str:
        tag = self._windows[0].fixture_tag if self._windows else "synthetic"
        return f"EEG: replay ({tag}, n={len(self._windows)})"

    def windows(self) -> list[EegWindow]:
        return list(self._windows)


class LiveMuseOsc(EegSource):
    """
    UDP OSC listener skeleton (python-osc style, port 5000).

    Not started unless explicitly constructed after env/CLI opt-in.
    Collects packets for a bounded window then returns EegWindow list.
    """

    def __init__(
        self,
        host: str = "0.0.0.0",
        port: int = 5000,
        listen_seconds: float = 0.0,
    ) -> None:
        self._host = host
        self._port = port
        self._listen_seconds = listen_seconds
        self._windows: list[EegWindow] = []
        self._status = "EEG: live (not started)"

    def status(self) -> str:
        return self._status

    def windows(self) -> list[EegWindow]:
        return list(self._windows)

    def collect(self) -> None:
        """Bind UDP :5000 and map /muse/eeg / bandpower-style addresses (skeleton)."""
        from pythonosc.dispatcher import Dispatcher
        from pythonosc.osc_server import BlockingOSCUDPServer

        self._windows = []
        dispatcher = Dispatcher()

        def on_bandpower(address: str, *args: float) -> None:
            import time

            logger.info("OSC %s %s", address, args)
            self._windows.append(
                EegWindow(
                    ts=time.time(),
                    alpha=args[0] if len(args) > 0 else None,
                    beta=args[1] if len(args) > 1 else None,
                    theta=args[2] if len(args) > 2 else None,
                    muse_status="live",
                    source="live_muse",
                    fixture_tag="recorded",
                )
            )

        dispatcher.map("/muse/elements/alpha_absolute", on_bandpower)
        dispatcher.map("/muse/elements/beta_absolute", on_bandpower)

        server = BlockingOSCUDPServer((self._host, self._port), dispatcher)
        self._status = f"EEG: live (listening {self._host}:{self._port})"
        logger.info("%s", self._status)
        if self._listen_seconds <= 0:
            self._status = "EEG: live (ready; no packets in CLI fixture path)"
            return
        server.handle_request()  # one-shot; extend for long-running sessions
