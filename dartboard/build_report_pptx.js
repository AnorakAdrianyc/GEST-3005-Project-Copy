/**
 * GEST 3005 — Circuit Simulation Report deck
 * Visual language matches Smart Triangular Dartboard.pdf (black + gold).
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

const IMG = path.join(__dirname, "images");
const OUT = path.join(__dirname, "SIMULATION_REPORT.pptx");

const C = {
  bg: "0A0A0A",
  card: "141414",
  cardSoft: "1A1A1A",
  gold: "C9A227",
  goldSoft: "D4AF37",
  white: "FFFFFF",
  mute: "B8B8B8",
  red: "C41E3A",
  border: "C9A227",
};

function goldFrame(slide, pres) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.18,
    y: 0.15,
    w: 9.64,
    h: 5.32,
    fill: { type: "none" },
    line: { color: C.gold, width: 1.25 },
    rectRadius: 0.08,
  });
}

function sectionTitle(slide, en, zh) {
  slide.addText(en, {
    x: 0.45,
    y: 0.32,
    w: 9.1,
    h: 0.48,
    fontSize: 26,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  if (zh) {
    slide.addText(zh, {
      x: 0.45,
      y: 0.78,
      w: 9.1,
      h: 0.32,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: C.gold,
      margin: 0,
    });
  }
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Adrian / GEST 3005";
  pres.title = "Smart Triangular Dartboard — Circuit Simulation Report";
  pres.subject = "Tinkercad FSR scoring prototype";

  // ── 1. Title ──────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.18,
      y: 4.55,
      w: 4.2,
      h: 0.02,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });

    s.addText("CIRCUIT SIMULATION", {
      x: 0.55,
      y: 1.15,
      w: 5.2,
      h: 0.35,
      fontSize: 12,
      fontFace: "Arial",
      color: C.gold,
      charSpacing: 4,
      margin: 0,
    });
    s.addText("Smart Triangular\nDartboard", {
      x: 0.55,
      y: 1.55,
      w: 5.4,
      h: 1.35,
      fontSize: 36,
      fontFace: "Arial",
      color: C.white,
      bold: true,
      margin: 0,
    });
    s.addText("智能三角飛鏢靶 · 電路模擬報告", {
      x: 0.55,
      y: 3.05,
      w: 5.4,
      h: 0.4,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: C.gold,
      margin: 0,
    });
    s.addText("Tinkercad Arduino Uno · 4× FSR dividers · LCD · piezo", {
      x: 0.55,
      y: 3.55,
      w: 5.4,
      h: 0.35,
      fontSize: 12,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });
    s.addText("Issac  ·  Adrian\n2026-10-26", {
      x: 0.55,
      y: 4.65,
      w: 4,
      h: 0.55,
      fontSize: 12,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });

    s.addImage({
      path: path.join(IMG, "slide_crop_hero.png"),
      x: 5.55,
      y: 0.55,
      w: 3.95,
      h: 4.55,
      sizing: { type: "cover", w: 3.95, h: 4.55 },
    });
  }

  // ── 2. Overview ───────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "What we simulated", "模擬目標");

    const cards = [
      { t: "Hardware", d: "Uno R3, 4 Tinkercad Force Sensors, 10 kΩ dividers, 16×2 LCD, piezo, 9 V + switch on VIN" },
      { t: "Software", d: "0.1–10 N bands, crosstalk margin 80 ADC, one score per press, LCD Score line" },
      { t: "Link to product", d: "Each FSR maps to one 3D-printed face tile (T1–T4) from the project brief" },
      { t: "Design URL", d: "tinkercad.com/things/fSkU8ixGOXg" },
    ];
    cards.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.45 + col * 4.7;
      const y = 1.35 + row * 1.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 4.4,
        h: 1.65,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.08,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y,
        w: 0.08,
        h: 1.65,
        fill: { color: C.gold },
        line: { color: C.gold, width: 0 },
      });
      s.addText(c.t, {
        x: x + 0.28,
        y: y + 0.22,
        w: 3.9,
        h: 0.35,
        fontSize: 16,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(c.d, {
        x: x + 0.28,
        y: y + 0.6,
        w: 3.9,
        h: 0.85,
        fontSize: 13,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });
  }

  // ── 3. Tile ↔ FSR map ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Tile ↔ FSR mapping", "飛鏢面磚對應力度感應器");

    s.addText(
      [
        { text: "FSR1 → Tile 1 TOP", options: { breakLine: true, bold: true } },
        { text: "A0 · gold outer · med +20 / hard +30", options: { breakLine: true } },
        { text: "", options: { breakLine: true } },
        { text: "FSR2 → Tile 3 LEFT", options: { breakLine: true, bold: true } },
        { text: "A1 · gold outer · med +20 / hard +30", options: { breakLine: true } },
        { text: "", options: { breakLine: true } },
        { text: "FSR3 → Tile 4 RIGHT", options: { breakLine: true, bold: true } },
        { text: "A2 · gold outer · med +20 / hard +30", options: { breakLine: true } },
        { text: "", options: { breakLine: true } },
        { text: "FSR4 → Tile 2 CENTER", options: { breakLine: true, bold: true } },
        { text: "A3 · red center · med +50 / hard +70", options: { breakLine: false } },
      ],
      {
        x: 0.5,
        y: 1.3,
        w: 4.3,
        h: 3.5,
        fontSize: 14,
        fontFace: "Arial",
        color: C.white,
        paraSpacing: 4,
        margin: 0,
      }
    );

    s.addText("Sim scores (not face labels 10/30/50)", {
      x: 0.5,
      y: 4.9,
      w: 4.3,
      h: 0.3,
      fontSize: 11,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });

    s.addImage({
      path: path.join(IMG, "slide_crop_3.png"),
      x: 5.05,
      y: 1.15,
      w: 4.35,
      h: 3.95,
      sizing: { type: "cover", w: 4.35, h: 3.95 },
    });
  }

  // ── 4. Force path ─────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Force path through the stack", "力度傳導路徑");

    const steps = [
      { n: "01", t: "Face tile", d: "3D-printed scoring surface (T1–T4)" },
      { n: "02", t: "EVA foam", d: "Cushions impact, spreads load onto FSR" },
      { n: "03", t: "FSR", d: "Resistance drops → ADC rises on A0–A3" },
      { n: "04", t: "Firmware", d: "Threshold → zone name + score + beep" },
    ];
    steps.forEach((st, i) => {
      const y = 1.25 + i * 0.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.45,
        y,
        w: 4.55,
        h: 0.85,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.06,
      });
      s.addText(st.n, {
        x: 0.6,
        y: y + 0.2,
        w: 0.7,
        h: 0.45,
        fontSize: 18,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(st.t, {
        x: 1.4,
        y: y + 0.12,
        w: 3.3,
        h: 0.32,
        fontSize: 15,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(st.d, {
        x: 1.4,
        y: y + 0.44,
        w: 3.3,
        h: 0.3,
        fontSize: 12,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addImage({
      path: path.join(IMG, "slide_crop_6.png"),
      x: 5.2,
      y: 1.2,
      w: 4.2,
      h: 3.9,
      sizing: { type: "cover", w: 4.2, h: 3.9 },
    });
  }

  // ── 5. Tinkercad circuit ───────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Tinkercad circuit", "模擬電路全景");

    s.addImage({
      path: path.join(IMG, "circuit_full.png"),
      x: 0.45,
      y: 1.2,
      w: 6.35,
      h: 3.95,
      sizing: { type: "contain", w: 6.35, h: 3.95 },
    });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.95,
      y: 1.25,
      w: 2.55,
      h: 3.85,
      fill: { color: C.card },
      line: { color: "2A2A2A", width: 1 },
      rectRadius: 0.08,
    });
    s.addText("Pot stand-ins", {
      x: 7.15,
      y: 1.45,
      w: 2.2,
      h: 0.3,
      fontSize: 13,
      fontFace: "Arial",
      color: C.gold,
      bold: true,
      margin: 0,
    });
    s.addText(
      [
        { text: "Idle ≈ Position 1", options: { breakLine: true } },
        { text: "(high R → low ADC)", options: { breakLine: true } },
        { text: "", options: { breakLine: true } },
        { text: "Hard hit ≈ Position 0", options: { breakLine: true } },
        { text: "(low R → ADC≈1023)", options: { breakLine: true } },
        { text: "", options: { breakLine: true } },
        { text: "Named:", options: { breakLine: true } },
        { text: "FSR1-T1top …", options: { breakLine: true } },
        { text: "FSR4-T2center", options: { breakLine: false } },
      ],
      {
        x: 7.15,
        y: 1.9,
        w: 2.2,
        h: 2.9,
        fontSize: 12,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      }
    );
  }

  // ── 6. Pin / wiring ───────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Pin map & power", "接腳與供電");

    const rows = [
      ["Signal", "Pin", "Notes"],
      ["FSR1 / T1 TOP", "A0", "Divider mid → ADC"],
      ["FSR2 / T3 LEFT", "A1", "Divider mid → ADC"],
      ["FSR3 / T4 RIGHT", "A2", "Divider mid → ADC"],
      ["FSR4 / T2 CENTER", "A3", "Divider mid → ADC"],
      ["LCD RS / E / D4–D7", "D12 / D11 / D5–D2", "4-bit parallel"],
      ["Piezo", "D8", "Hit beep"],
      ["9 V battery", "VIN via switch", "Not tied to 5 V rail"],
    ];

    rows.forEach((r, i) => {
      const y = 1.25 + i * 0.48;
      const bg = i === 0 ? "1F1A0A" : i % 2 === 0 ? C.card : C.cardSoft;
      const tc = i === 0 ? C.gold : C.white;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.45,
        y,
        w: 9.1,
        h: 0.48,
        fill: { color: bg },
        line: { color: "222222", width: 0.5 },
      });
      s.addText(r[0], {
        x: 0.6,
        y,
        w: 3.4,
        h: 0.48,
        fontSize: 13,
        fontFace: "Arial",
        color: tc,
        bold: i === 0,
        valign: "middle",
        margin: 0,
      });
      s.addText(r[1], {
        x: 4.1,
        y,
        w: 2.2,
        h: 0.48,
        fontSize: 13,
        fontFace: "Arial",
        color: tc,
        bold: i === 0,
        valign: "middle",
        margin: 0,
      });
      s.addText(r[2], {
        x: 6.4,
        y,
        w: 3.0,
        h: 0.48,
        fontSize: 13,
        fontFace: "Arial",
        color: i === 0 ? C.gold : C.mute,
        bold: i === 0,
        valign: "middle",
        margin: 0,
      });
    });
  }

  // ── 7. Results ────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Simulation results", "模擬結果");

    s.addImage({
      path: path.join(IMG, "simulation_center_hit.png"),
      x: 0.45,
      y: 1.2,
      w: 5.5,
      h: 3.9,
      sizing: { type: "contain", w: 5.5, h: 3.9 },
    });

    const checks = [
      { ok: true, t: "T2 CENTER hard", d: "raw=1023  +70  once (held)" },
      { ok: true, t: "Outer med / hard", d: "+20 / +30 on A0–A2" },
      { ok: true, t: "Dual-knob press", d: "rejected (crosstalk)" },
      { ok: true, t: "Below threshold", d: "no score until clear hit" },
    ];
    checks.forEach((ck, i) => {
      const y = 1.25 + i * 0.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 6.15,
        y,
        w: 3.4,
        h: 0.85,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.06,
      });
      s.addText("PASS", {
        x: 6.3,
        y: y + 0.12,
        w: 0.7,
        h: 0.28,
        fontSize: 11,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(ck.t, {
        x: 6.3,
        y: y + 0.35,
        w: 3.05,
        h: 0.22,
        fontSize: 12,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(ck.d, {
        x: 6.3,
        y: y + 0.55,
        w: 3.05,
        h: 0.22,
        fontSize: 11,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });
  }

  // ── 8. Firmware logic ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Scoring firmware (sketch)", "計分韌體邏輯");

    const boxes = [
      { t: "Read", d: "analogRead A0–A3 each loop" },
      { t: "Arm", d: "armed only after all channels below threshold" },
      { t: "Hit", d: "any channel ≥ threshold while armed" },
      { t: "Pick", d: "argmax raw → zoneNames[] + points" },
      { t: "Feedback", d: "LCD print + tone(piezo) + Serial" },
      { t: "Hold", d: "stay disarmed until RELEASE" },
    ];
    boxes.forEach((b, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.45 + col * 3.1;
      const y = 1.35 + row * 1.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x,
        y,
        w: 2.95,
        h: 1.6,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.08,
      });
      s.addText(String(i + 1).padStart(2, "0"), {
        x: x + 0.2,
        y: y + 0.25,
        w: 2.5,
        h: 0.35,
        fontSize: 20,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(b.t, {
        x: x + 0.2,
        y: y + 0.7,
        w: 2.5,
        h: 0.3,
        fontSize: 16,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(b.d, {
        x: x + 0.2,
        y: y + 1.05,
        w: 2.5,
        h: 0.35,
        fontSize: 12,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });
  }

  // ── 9. Limits & next ──────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Limits & next steps", "限制與下一步");

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.45,
      y: 1.3,
      w: 4.4,
      h: 3.7,
      fill: { color: C.card },
      line: { color: "2A2A2A", width: 1 },
      rectRadius: 0.08,
    });
    s.addText("Out of Tinkercad scope", {
      x: 0.7,
      y: 1.55,
      w: 3.9,
      h: 0.35,
      fontSize: 15,
      fontFace: "Arial",
      color: C.gold,
      bold: true,
      margin: 0,
    });
    s.addText(
      [
        { text: "Real FSR hysteresis / creep", options: { bullet: true, breakLine: true } },
        { text: "ESP32 / Wi-Fi scoring UI", options: { bullet: true, breakLine: true } },
        { text: "Waveshare display stack", options: { bullet: true, breakLine: true } },
        { text: "Mechanical crosstalk of EVA stack", options: { bullet: true, breakLine: false } },
      ],
      {
        x: 0.7,
        y: 2.1,
        w: 3.9,
        h: 2.5,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      }
    );

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 5.15,
      y: 1.3,
      w: 4.4,
      h: 3.7,
      fill: { color: C.card },
      line: { color: "2A2A2A", width: 1 },
      rectRadius: 0.08,
    });
    s.addText("Hardware build path", {
      x: 5.4,
      y: 1.55,
      w: 3.9,
      h: 0.35,
      fontSize: 15,
      fontFace: "Arial",
      color: C.gold,
      bold: true,
      margin: 0,
    });
    s.addText(
      [
        { text: "Print T1–T4 faces; bond EVA + FSR", options: { bullet: true, breakLine: true } },
        { text: "Calibrate HIT_THRESHOLD on real ADC", options: { bullet: true, breakLine: true } },
        { text: "Port zoneNames / points to product MCU", options: { bullet: true, breakLine: true } },
        { text: "Keep divider topology from this sim", options: { bullet: true, breakLine: false } },
      ],
      {
        x: 5.4,
        y: 2.1,
        w: 3.9,
        h: 2.5,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      }
    );
  }

  // ── 10. Proof of concept ──────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Proof of concept", "實機模擬已跑通");

    const proof = [
      { n: "01", t: "Four real Force Sensors", d: "Slider on each tile, 0 N to 10 N. Not a potentiometer stand-in." },
      { n: "02", t: "Detection floor", d: "Under 0.1 N the part is open. The sketch ignores it." },
      { n: "03", t: "Force becomes a score", d: "Light, medium, and hard map to different points on the LCD." },
      { n: "04", t: "Seen on the display", d: "Idle screen: Dartboard ready / Score: 0." },
    ];
    proof.forEach((st, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.45 + col * 4.7;
      const y = 1.3 + row * 1.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 4.45, h: 1.7,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.08,
      });
      s.addText(st.n, {
        x: x + 0.22, y: y + 0.2, w: 0.7, h: 0.35,
        fontSize: 16, fontFace: "Arial", color: C.gold, bold: true, margin: 0,
      });
      s.addText(st.t, {
        x: x + 1.0, y: y + 0.22, w: 3.2, h: 0.35,
        fontSize: 15, fontFace: "Arial", color: C.white, bold: true, margin: 0,
      });
      s.addText(st.d, {
        x: x + 0.22, y: y + 0.75, w: 4.0, h: 0.7,
        fontSize: 13, fontFace: "Arial", color: C.mute, margin: 0,
      });
    });
  }

  // ── 11. Our idea ──────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Our idea", "三角靶：落點同力度一齊計");

    s.addText("A triangular board, four independent faces, and a score that depends on where the dart lands and how hard it hits.", {
      x: 0.5, y: 1.25, w: 9.0, h: 0.55,
      fontSize: 15, fontFace: "Arial", color: C.white, margin: 0,
    });

    const idea = [
      { t: "Geometry", d: "One large triangle, split into a red center and three gold outer faces. About 262 mm on a side." },
      { t: "Sense force", d: "Face, then EVA foam, then one FSR. The foam catches the dart and passes the load into the sensor." },
      { t: "Score", d: "Center starts at 50, each outer face at 20. A harder hit adds the bonus. A miss under the floor scores 0." },
      { t: "Standalone", d: "9 V battery and a rocker switch. LCD shows the total. The piezo marks a light, medium, or hard hit." },
    ];
    idea.forEach((item, i) => {
      const y = 1.95 + i * 0.8;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 0.45, y, w: 9.1, h: 0.72,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.06,
      });
      s.addText(item.t, {
        x: 0.65, y: y + 0.16, w: 1.7, h: 0.4,
        fontSize: 14, fontFace: "Arial", color: C.gold, bold: true, margin: 0, valign: "middle",
      });
      s.addText(item.d, {
        x: 2.45, y: y + 0.12, w: 6.9, h: 0.48,
        fontSize: 13, fontFace: "Arial", color: C.mute, margin: 0, valign: "middle",
      });
    });
  }

  // ── 12. Further plans ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrame(s, pres);
    sectionTitle(s, "Further plans", "Canva 規劃板上的下一步");

    const plans = [
      { t: "Print the board", d: "Fusion 360 faces, snap-fits, keyhole wall mount, and a bay for the Uno, switch, and 9 V cell. PLA or PETG, EVA on the face." },
      { t: "Calibrate real FSRs", d: "Move the same divider off the breadboard. Set the 0.1 N floor and the 3 N / 7 N bands from live throws, not from the slider." },
      { t: "Second brain", d: "Waveshare ESP32-C6 touch LCD on its own USB cable. UART through a resistor divider and a shared ground. Do not tie the 5 V and 3.3 V rails together." },
      { t: "Log the game", d: "Python on the laptop reads the serial line, so each hit keeps its zone, newtons, and score." },
    ];
    plans.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.45 + col * 4.7;
      const y = 1.3 + row * 1.85;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: 4.45, h: 1.7,
        fill: { color: C.card },
        line: { color: "2A2A2A", width: 1 },
        rectRadius: 0.08,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.08, h: 1.7,
        fill: { color: C.gold },
        line: { color: C.gold, width: 0 },
      });
      s.addText(item.t, {
        x: x + 0.28, y: y + 0.22, w: 3.95, h: 0.35,
        fontSize: 16, fontFace: "Arial", color: C.gold, bold: true, margin: 0,
      });
      s.addText(item.d, {
        x: x + 0.28, y: y + 0.65, w: 3.95, h: 0.85,
        fontSize: 13, fontFace: "Arial", color: C.mute, margin: 0,
      });
    });
  }

  await pres.writeFile({ fileName: OUT });
  console.log("Wrote", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
