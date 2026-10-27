// Rebuilds the GEST 3005 dartboard circuit inside the open Tinkercad editor.
// Run from the browser console on https://www.tinkercad.com/things/fSkU8ixGOXg/editel
// with the starting design: small breadboard (Device_1), Uno (Device_2), one resistor (Device_3),
// one potentiometer (Device_4). Everything is wrapped in root.rec()/stopRec() because Tinkercad
// only persists model changes made inside a recorded transaction.
(function buildDartboard() {
  const root = window.circuit_editor.root;
  const circuit = root.circuit;
  const model = window.circuit_editor.circuitEditor.breadboardEditor.editorModel;
  const lib = root.deviceLib;
  const devs = {};
  circuit.devices.forEach((d) => { devs[d.local_id] = d; });
  const bb = devs.Device_1;
  const uno = devs.Device_2;
  const origin = bb.breadboard().pos();
  const errors = [];
  let made = 0;

  const pinsOf = (dev) => {
    const m = {};
    dev.terminals.forEach((k, t) => {
      const d = t.getBreadboardDescription();
      if (d && d.name) m[d.name] = t;
    });
    return m;
  };
  const holes = pinsOf(bb);
  const unoPins = pinsOf(uno);
  const world = (col, dy) => ({ x: origin.x - 145 + (col - 1) * 10, y: origin.y + dy });
  const add = (did) => circuit.addDevice(lib.getPackagedDeviceDescription(did));
  const place = (dev, pt) => {
    const el = dev.breadboard();
    if (!Number.isFinite(el.angle())) el.angle(0);
    el.pos(pt);
  };
  const wire = (a, b, opts) => {
    if (!a || !b) { errors.push(`missing terminal for ${opts.tag}`); return; }
    try {
      if (model.makeConnection(a, b, opts)) made += 1;
      else errors.push(`no wire for ${opts.tag}`);
    } catch (e) {
      errors.push(`${opts.tag}: ${e.message}`);
    }
  };
  const rename = (dev, n) => {
    try { dev.setName(n); } catch (e) { errors.push(`name ${n}: ${e.message}`); }
  };

  root.rec();
  try {
    // FSR stand-ins: 5V rail -> pot (rheostat) -> analog column -> 10k -> GND rail.
    const zones = [
      { col: 5, analog: 'A0', res: devs.Device_3, pot: devs.Device_4, color: 'orange' },
      { col: 10, analog: 'A1', res: add(53184), pot: add(45547), color: 'yellow' },
      { col: 15, analog: 'A2', res: add(53184), pot: add(45547), color: 'green' },
      { col: 20, analog: 'A3', res: add(53184), pot: add(45547), color: 'blue' },
    ];
    zones.forEach((z, i) => {
      place(z.res, world(z.col, -5));
      place(z.pot, world(z.col, 45));
      z.res.setProperty('resistance', null, 10, 'k');
      z.pot.setProperty('Position', null, 1, '');
      rename(z.res, `10k${i + 1}`);
      // Pot stands in for the FSR under that printed tile (face -> EVA -> FSR).
      // Fusion piece numbers: 1 top, 2 center, 3 lower-left, 4 lower-right.
      rename(z.pot, ['FSR1-T1top', 'FSR2-T3left', 'FSR3-T4right', 'FSR4-T2center'][i]);
      const rp = pinsOf(z.res);
      const pp = pinsOf(z.pot);
      wire(rp['Terminal 1'], holes[`e${z.col}`], { insert: true, tag: `res-e${z.col}` });
      wire(rp['Terminal 2'], holes[`g${z.col}`], { insert: true, tag: `res-g${z.col}` });
      wire(pp.Wiper, holes[`b${z.col}`], { insert: true, tag: `pot-wiper${z.col}` });
      wire(pp['Terminal 1'], holes[`b${z.col - 1}`], { insert: true, tag: `pot-t1-${z.col}` });
      wire(pp['Terminal 2'], holes[`b${z.col + 1}`], { insert: true, tag: `pot-t2-${z.col}` });
      wire(holes[`c${z.col + 1}`], holes[`c${z.col}`], { color: 'green', tag: `rheostat${z.col}` });
      wire(holes[`a${z.col - 1}`], holes[`w${z.col - 1}`], { color: 'red', tag: `5v${z.col}` });
      wire(holes[`j${z.col}`], holes[`z${z.col}`], { color: 'black', tag: `gnd${z.col}` });
      wire(holes[`a${z.col}`], unoPins[z.analog], { color: z.color, tag: `sig-${z.analog}` });
    });

    // LCD contrast pot across 5V/GND, wiper column 27 feeds V0.
    const contrast = add(45547);
    place(contrast, world(27, 45));
    contrast.setProperty('Position', null, 1, '');
    rename(contrast, 'CONTRAST');
    const cp = pinsOf(contrast);
    wire(cp['Terminal 1'], holes.b26, { insert: true, tag: 'contrast-t1' });
    wire(cp.Wiper, holes.b27, { insert: true, tag: 'contrast-wiper' });
    wire(cp['Terminal 2'], holes.b28, { insert: true, tag: 'contrast-t2' });
    wire(holes.a26, holes.w26, { color: 'red', tag: 'contrast-5v' });
    wire(holes.a28, holes.x28, { color: 'black', tag: 'contrast-gnd' });

    // 16x2 LCD in 4-bit mode.
    const lcd = add(113878);
    place(lcd, { x: origin.x + 360, y: origin.y + 20 });
    rename(lcd, 'LCD');
    const lp = pinsOf(lcd);
    const backlight = add(53184);
    place(backlight, { x: origin.x + 400, y: origin.y + 100 });
    backlight.setProperty('resistance', null, 220, '');
    rename(backlight, '220R');
    const blp = pinsOf(backlight);
    [
      ['Ground', holes.x24, 'black'],
      ['Power', holes.w24, 'red'],
      ['Read/Write', holes.x23, 'black'],
      ['LED Cathode', holes.x22, 'black'],
      ['LED Anode', blp['Terminal 2'], 'red'],
      ['Register Select', unoPins.D12, 'white'],
      ['Enable', unoPins.D11, 'purple'],
      ['DB4', unoPins.D5, 'orange'],
      ['DB5', unoPins.D4, 'yellow'],
      ['DB6', unoPins.D3, 'green'],
      ['DB7', unoPins.D2, 'blue'],
      ['Contrast', holes.a27, 'brown'],
    ].forEach(([pin, dest, color]) => wire(lp[pin], dest, { color, tag: `lcd-${pin}` }));
    wire(blp['Terminal 1'], holes.w23, { color: 'red', tag: 'backlight-5v' });

    // Piezo on D8.
    const piezo = add(114067);
    place(piezo, { x: origin.x + 250, y: origin.y + 220 });
    rename(piezo, 'BUZZER');
    const zp = pinsOf(piezo);
    wire(zp.Positive, unoPins.D8, { color: 'orange', tag: 'piezo+' });
    wire(zp.Negative, holes.x25, { color: 'black', tag: 'piezo-' });

    // 9V battery -> slide switch -> VIN. Battery negative to the GND rail. Never to 5V.
    const battery = add(116841);
    const sw = add(58458);
    place(battery, { x: -160, y: 250 });
    place(sw, { x: 120, y: 340 });
    rename(battery, 'BATTERY');
    rename(sw, 'POWER');
    const bp = pinsOf(battery);
    const sp = pinsOf(sw);
    wire(bp.Negative, holes.x3, { color: 'black', tag: 'battery-' });
    wire(bp.Positive, sp.Common, { color: 'red', tag: 'battery+' });
    wire(sp['Terminal 1'], unoPins.Vin, { color: 'red', tag: 'vin' });
  } finally {
    root.stopRec();
  }

  let devices = 0;
  let wires = 0;
  circuit.devices.forEach(() => { devices += 1; });
  circuit.wires.forEach(() => { wires += 1; });
  return { errors, made, devices, wires };
})();
