"""Session UI badge stub (FSR / EEG mode lines for companion apps)."""


def format_session_badge(*, fsr: str, eeg: str) -> str:
    """
    fsr/eeg: live | replay | off
    Example: FSR: live | EEG: replay
    """
    return f"FSR: {fsr} | EEG: {eeg}"
