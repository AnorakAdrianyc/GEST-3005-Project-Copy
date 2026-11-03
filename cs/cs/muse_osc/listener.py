"""Muse OSC listener STATUS helpers (port 5000 convention)."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class MuseOscListenerStatus:
    """Documented defaults for Muse → OSC bridges (not used in live demo session)."""

    host: str = "127.0.0.1"
    port: int = 5000
    protocol: str = "UDP OSC (python-osc)"
    default_mode: str = "off — use ReplaySource fixtures unless CS_LIVE_MUSE=1"

    def summary(self) -> str:
        return (
            f"MuseOscListener STATUS: {self.protocol} {self.host}:{self.port}; "
            f"default={self.default_mode}"
        )
