# Firmware

Canonical **live demo** sketch: [`../dartboarddemo.ino`](../dartboarddemo.ino)

- Four FSR channels on **A0–A3**
- **16×2 LCD** on Uno pins **12, 11, 5, 4, 3, 2**
- **Piezo buzzer** on **D8** (880 Hz light, 1100 Hz medium, 1500 Hz hard)
- Serial debug at **9600 baud**: `band=… zone=… N=… raw=… 2nd=… pts=… total=…`

Do not flash other `.ino` files for the breadboard 10 kΩ divider demo unless you intentionally match that hardware — see root [`README.md`](../README.md) sketch table.

PC-side parsing of those serial lines lives in [`../cs/`](../cs/).
