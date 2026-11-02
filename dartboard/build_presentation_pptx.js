/**
 * GEST 3005 — Smart Dual-Task Dartboard System
 * Visual language matches the circuit-simulation deck (black + gold).
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMG = path.join(__dirname, "images");
const OUT = path.join(ROOT, "Smart Dual-Task Dartboard.pptx");

const C = {
  bg: "0A0A0A",
  card: "141414",
  cardSoft: "1A1A1A",
  gold: "C9A227",
  white: "FFFFFF",
  mute: "B8B8B8",
  red: "C41E3A",
  line: "2A2A2A",
};

function goldFrame(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.22,
    y: 0.16,
    w: 9.56,
    h: 5.3,
    fill: { type: "none" },
    line: { color: C.gold, width: 1.15 },
  });
}

function sectionTitle(slide, en, zh) {
  slide.addText(en, {
    x: 0.48,
    y: 0.32,
    w: 7.4,
    h: 0.42,
    fontSize: 26,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  slide.addText(zh, {
    x: 0.48,
    y: 0.74,
    w: 7.4,
    h: 0.28,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: C.gold,
    margin: 0,
  });
}

function card(slide, pres, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: C.card },
    line: { color: C.line, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w: 0.07,
    h,
    fill: { color: C.gold },
    line: { color: C.gold, width: 0 },
  });
}

async function main() {
  const pres = new pptxgen();
  pres.defineLayout({ name: "WIDE_16x9", width: 13.333, height: 7.5 });
  pres.layout = "WIDE_16x9";
  pres.author = "Isaac / Adrian";
  pres.title = "Smart Dual-Task Dartboard System";
  pres.subject = "GEST 3005 — FSR force sensing and EEG monitoring";

  // Layout is 13.333 x 7.5 so the deck matches a classroom widescreen.
  // Content sits inside a 0.5" margin.

  // ── 1. Title ──────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);

    s.addText("GEST 3005  ·  DUAL-TASK PROTOTYPE", {
      x: 0.7,
      y: 1.55,
      w: 6.6,
      h: 0.32,
      fontSize: 13,
      fontFace: "Arial",
      color: C.gold,
      charSpacing: 1.6,
      margin: 0,
    });
    s.addText("Smart Dual-Task\nDartboard System", {
      x: 0.7,
      y: 2.0,
      w: 6.8,
      h: 1.7,
      fontSize: 40,
      fontFace: "Arial",
      color: C.white,
      bold: true,
      margin: 0,
    });
    s.addText("An interactive rehabilitation game combining\nFSR force sensing and EEG monitoring", {
      x: 0.7,
      y: 3.85,
      w: 6.6,
      h: 0.7,
      fontSize: 16,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });
    s.addText("智能雙任務飛鏢靶", {
      x: 0.7,
      y: 4.65,
      w: 6.6,
      h: 0.36,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: C.gold,
      margin: 0,
    });
    s.addText("Isaac  ·  Adrian\n2 November 2026", {
      x: 0.7,
      y: 5.7,
      w: 4.5,
      h: 0.7,
      fontSize: 14,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });

    s.addImage({
      path: path.join(IMG, "hero_board.png"),
      x: 8.05,
      y: 0.85,
      w: 4.55,
      h: 5.8,
      sizing: { type: "cover", w: 4.55, h: 5.8 },
    });

    s.addNotes(
      "Adrian opens. This is a prototype of a rehabilitation game, not a medical device. The live demo today is the FSR dartboard. EEG is in the recorded video."
    );
  }

  // ── 2. Problem & solution ─────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "The problem and our solution", "問題與解法");

    const cards = [
      {
        t: "Who it is for",
        d: "People with ADHD, dementia, or recovering after a serious accident. Therapy has to hold their attention.",
      },
      {
        t: "The problem",
        d: "Standard cognitive and physical rehab repeats the same drills. Patients get bored and stop showing up.",
      },
      {
        t: "Our solution",
        d: "Gamification. A pub game becomes a scored session that records the throw and the player's state.",
      },
      {
        t: "Why darts  [1]",
        d: "A 2024 pilot used a darts game with older adults, with and without mild cognitive impairment.",
      },
    ];
    cards.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.7 + col * 6.05;
      const y = 1.7 + row * 2.35;
      cardWide(s, pres, x, y, 5.8, 2.15);
      s.addText(c.t, {
        x: x + 0.32,
        y: y + 0.28,
        w: 5.2,
        h: 0.4,
        fontSize: 20,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(c.d, {
        x: x + 0.32,
        y: y + 0.82,
        w: 5.2,
        h: 1.05,
        fontSize: 16,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addNotes(
      "Adrian: Hello everyone. Today we are presenting a system that is more than just a game; it has the potential to be a rehabilitation tool. For patients dealing with ADHD, dementia, or physical injuries, traditional therapy can be boring. We decided to turn darts into a medical tool. Why darts? Because throwing a dart is a dual-task exercise — it challenges physical coordination and mental focus at the same time. A 2024 pilot study by Kawabata and colleagues used a darts intervention with older adults with and without mild cognitive impairment. We cite that as motivation, not as proof that our board treats anyone."
    );
  }

  // ── 3. Dual-task concept ──────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "The dual-task concept", "雙任務概念");

    const cols = [
      {
        t: "Physical",
        lines: [
          "Center-of-pressure shifting",
          "Limb and trunk stabilization",
          "Balance held through the throw",
        ],
      },
      {
        t: "Mental",
        lines: [
          "Spatial perception",
          "Motor learning",
          "Distance, aim, and memory",
        ],
      },
    ];
    cols.forEach((col, i) => {
      const x = 0.7 + i * 6.05;
      cardWide(s, pres, x, 1.7, 5.8, 3.85);
      s.addText(col.t, {
        x: x + 0.35,
        y: 1.95,
        w: 5.1,
        h: 0.45,
        fontSize: 22,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      col.lines.forEach((line, n) => {
        const y = 2.75 + n * 0.95;
        s.addText(String(n + 1).padStart(2, "0"), {
          x: x + 0.35,
          y,
          w: 0.6,
          h: 0.4,
          fontSize: 16,
          fontFace: "Arial",
          color: C.gold,
          bold: true,
          margin: 0,
        });
        s.addText(line, {
          x: x + 1.1,
          y,
          w: 4.2,
          h: 0.4,
          fontSize: 18,
          fontFace: "Arial",
          color: C.white,
          margin: 0,
        });
      });
    });

    s.addText(
      "[1] Kawabata et al., Front. Rehabil. Sci. 5:1327494, 2024. A pilot study. It motivates the framing. It does not validate this board as therapy.",
      {
        x: 0.7,
        y: 5.8,
        w: 11.9,
        h: 0.4,
        fontSize: 12,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      }
    );

    s.addNotes(
      "Isaac: What is a dual-task? It means the brain and the body have to work in the same action. Physically, a throw shifts the center of pressure and asks the trunk and the throwing arm to stay stable. Mentally, the player judges distance and learns the motion. Kawabata et al. (2024) tested a darts-game intervention in older adults with and without mild cognitive impairment. That paper is a pilot. Our system aims to monitor both the physical throw and the cognitive state during it. We are not claiming a treatment effect."
    );
  }

  // ── 4. Hardware + data flow ───────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "Hardware integration", "硬件整合");

    const sources = [
      { t: "Muse 2", d: "EEG headband\nBrain-signal stream" },
      { t: "FSR board", d: "4 sensors, triangular face\nHit zone and force" },
    ];
    sources.forEach((src, i) => {
      const y = 1.75 + i * 2.15;
      cardWide(s, pres, 0.7, y, 2.7, 1.95);
      s.addText(src.t, {
        x: 0.98,
        y: y + 0.28,
        w: 2.2,
        h: 0.4,
        fontSize: 18,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(src.d, {
        x: 0.98,
        y: y + 0.78,
        w: 2.2,
        h: 0.85,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    const stages = [
      { t: "Arduino", d: "Reads A0–A3\nSends the hit" },
      { t: "Python", d: "Aligns EEG\nwith force" },
      { t: "Feedback", d: "Score, prompt,\nprogress" },
    ];
    stages.forEach((st, i) => {
      const x = 4.15 + i * 2.95;
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y: 2.55,
        w: 2.35,
        h: 2.15,
        fill: { color: C.card },
        line: { color: C.line, width: 1 },
      });
      s.addText(String(i + 1).padStart(2, "0"), {
        x: x + 0.18,
        y: 2.72,
        w: 2.0,
        h: 0.32,
        fontSize: 13,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(st.t, {
        x: x + 0.18,
        y: 3.1,
        w: 2.0,
        h: 0.4,
        fontSize: 18,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(st.d, {
        x: x + 0.18,
        y: 3.58,
        w: 2.0,
        h: 0.8,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    // Connectors: sources merge, then a left-to-right chain.
    s.addShape(pres.shapes.RIGHT_ARROW, {
      x: 3.5,
      y: 3.35,
      w: 0.5,
      h: 0.28,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });
    s.addShape(pres.shapes.RIGHT_ARROW, {
      x: 6.6,
      y: 3.35,
      w: 0.4,
      h: 0.28,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });
    s.addShape(pres.shapes.RIGHT_ARROW, {
      x: 9.55,
      y: 3.35,
      w: 0.4,
      h: 0.28,
      fill: { color: C.gold },
      line: { color: C.gold, width: 0 },
    });

    s.addText("Muse 2 over Bluetooth. FSR board over serial. Python is where the two clocks meet.", {
      x: 0.7,
      y: 6.15,
      w: 11.9,
      h: 0.35,
      fontSize: 14,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });

    s.addNotes(
      "Adrian: For the hardware, we combined two sets of sensors. First, our custom 3D-printed triangular dartboard with 4 FSRs to measure the physical throw. Second, the Muse 2 headband to measure brain activity. The Arduino reads the FSR dividers and sends the hit onward. Python on the laptop combines that stream with the EEG data. The screen then shows the score and the prompt."
    );
  }

  // ── 5. Game loop ──────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "The live game loop", "遊戲循環");

    const steps = [
      { n: "01", t: "Sync", d: "Python lines up the EEG stream and the FSR stream on one clock." },
      { n: "02", t: "Baseline", d: "Record the resting cognitive state before the first throw." },
      { n: "03", t: "Throw", d: "The hit reports zone and force. EEG is captured in the same window." },
      { n: "04", t: "Feedback", d: "The screen shows the score, a prompt, and the running session." },
    ];
    steps.forEach((st, i) => {
      const x = 0.7 + i * 3.1;
      s.addShape(pres.shapes.RECTANGLE, {
        x,
        y: 1.7,
        w: 2.9,
        h: 3.6,
        fill: { color: C.card },
        line: { color: C.line, width: 1 },
      });
      s.addText(st.n, {
        x: x + 0.22,
        y: 2.0,
        w: 2.45,
        h: 0.45,
        fontSize: 22,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(st.t, {
        x: x + 0.22,
        y: 2.55,
        w: 2.45,
        h: 0.45,
        fontSize: 20,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(st.d, {
        x: x + 0.22,
        y: 3.2,
        w: 2.45,
        h: 1.5,
        fontSize: 15,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addText("Later analysis compares brain signals in distracted windows with signals in focused windows.", {
      x: 0.7,
      y: 5.6,
      w: 11.9,
      h: 0.4,
      fontSize: 15,
      fontFace: "Arial",
      color: C.white,
      margin: 0,
    });

    s.addNotes(
      "Isaac: Here is how it works. The computer first measures the patient's baseline brainwaves at rest. Then, as they throw, the Python program combines the FSR force data with the EEG data. We can then look at whether a more focused window lines up with a better throw. We compare distracted and focused states. We do not treat that comparison as a diagnosis."
    );
  }

  // ── 6. How we built it ────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "How we built it", "建造方法");

    const tools = [
      { t: "Fusion 360", d: "Four face tiles, snap-fits, and the triangular envelope. About 262 mm on a side." },
      { t: "Tinkercad", d: "Uno, four FSR dividers, 16×2 LCD, piezo, and a 9 V battery through VIN." },
      { t: "VS Code", d: "Arduino C++ scores the hit. Python aligns that serial line with the EEG stream." },
      { t: "Optional AI layer", d: "Explored for therapy notes, literature lookup, and spoken prompts. Not in the live demo." },
    ];
    tools.forEach((item, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.7 + col * 6.05;
      const y = 1.7 + row * 2.35;
      cardWide(s, pres, x, y, 5.8, 2.15);
      s.addText(item.t, {
        x: x + 0.32,
        y: y + 0.28,
        w: 5.2,
        h: 0.4,
        fontSize: 20,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(item.d, {
        x: x + 0.32,
        y: y + 0.82,
        w: 5.2,
        h: 1.05,
        fontSize: 16,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addNotes(
      "Adrian: For the build, we used Fusion 360 to design the 3D dartboard and Tinkercad to simulate the circuits. The software is written in Python and Arduino. We also explored adding an AI layer to draft progress notes for a therapist or to speak a prompt to the player. That layer is exploratory. Today's demo is the sensor board."
    );
  }

  // ── 7. Limitations ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "Limitations and disclaimer", "限制與聲明");

    const limits = [
      {
        n: "01",
        t: "Exploratory prototype",
        d: "This is not a proven treatment for ADHD, dementia, or rehabilitation. It is a student system that records a throw.",
      },
      {
        n: "02",
        t: "EEG is a proxy",
        d: "Signals from the Muse 2 do not measure attention directly. They are a stand-in for cognitive load.",
      },
      {
        n: "03",
        t: "The paper is a pilot",
        d: "Kawabata et al. studied older adults with and without MCI. It motivates darts as a dual-task. It does not validate this board.",
      },
    ];
    limits.forEach((item, i) => {
      const y = 1.65 + i * 1.55;
      cardWide(s, pres, 0.7, y, 11.9, 1.4);
      s.addText(item.n, {
        x: 1.05,
        y: y + 0.42,
        w: 0.7,
        h: 0.5,
        fontSize: 20,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(item.t, {
        x: 1.9,
        y: y + 0.18,
        w: 10.2,
        h: 0.4,
        fontSize: 18,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(item.d, {
        x: 1.9,
        y: y + 0.64,
        w: 10.2,
        h: 0.55,
        fontSize: 15,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addNotes(
      "Isaac: We want to be very clear. This is an experimental prototype. We are not claiming it treats ADHD, because EEG signals do not directly equal attention. Kawabata et al. 2024 is a pilot in older adults with and without mild cognitive impairment. It is why we frame darts as a dual-task. It is not evidence that our hardware works as therapy. Real medical use would need clinical trials and a clinician in the loop."
    );
  }

  // ── 8. Live demo ──────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "Live demo — FSR dartboard", "現場示範");

    const demo = [
      { n: "01", t: "Power on", d: "LCD reads Dartboard ready / Score: 0." },
      { n: "02", t: "One throw", d: "A classmate or the professor throws, or presses one sensor." },
      { n: "03", t: "Read the hit", d: "LCD shows the zone and LIGHT, MEDIUM, or HARD. The piezo marks the band." },
    ];
    demo.forEach((item, i) => {
      const y = 1.65 + i * 1.4;
      cardWide(s, pres, 0.7, y, 6.15, 1.25);
      s.addText(item.n, {
        x: 0.98,
        y: y + 0.38,
        w: 0.6,
        h: 0.45,
        fontSize: 16,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(item.t, {
        x: 1.7,
        y: y + 0.16,
        w: 4.8,
        h: 0.36,
        fontSize: 16,
        fontFace: "Arial",
        color: C.white,
        bold: true,
        margin: 0,
      });
      s.addText(item.d, {
        x: 1.7,
        y: y + 0.56,
        w: 4.8,
        h: 0.5,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addText("EEG sync is in the recorded video, not in this room.", {
      x: 0.7,
      y: 5.95,
      w: 6.15,
      h: 0.7,
      fontSize: 14,
      fontFace: "Arial",
      color: C.gold,
      margin: 0,
    });

    s.addImage({
      path: path.join(ROOT, "Final Virtual Circuit.jpeg"),
      x: 7.15,
      y: 1.65,
      w: 5.45,
      h: 4.85,
      sizing: { type: "contain", w: 5.45, h: 4.85 },
    });

    s.addNotes(
      "Isaac and Adrian: Due to the live environment, we will focus on demonstrating the physical FSR dartboard today. Power on, the LCD says ready. One throw, and the display shows the zone, the force band, and the score. The buzzer pitch follows light, medium, or hard. The full EEG integration is in the demo video."
    );
  }

  // ── 9. Conclusion + Q&A ───────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.bg };
    goldFrameWide(s, pres);
    sectionTitleWide(s, "Conclusion", "總結");

    const points = [
      { t: "Framework", d: "A simple FSR scorer is now a dual-task session: force and brain signals on one timeline." },
      { t: "What we combined", d: "3D-printed faces, four FSRs, a Muse 2, Arduino scoring, and a Python aligner." },
      { t: "What we claim", d: "Gamification can hold attention. We do not claim a clinical effect." },
    ];
    points.forEach((item, i) => {
      const y = 1.65 + i * 1.45;
      cardWide(s, pres, 0.7, y, 7.15, 1.3);
      s.addText(item.t, {
        x: 1.02,
        y: y + 0.16,
        w: 6.5,
        h: 0.34,
        fontSize: 16,
        fontFace: "Arial",
        color: C.gold,
        bold: true,
        margin: 0,
      });
      s.addText(item.d, {
        x: 1.02,
        y: y + 0.54,
        w: 6.5,
        h: 0.58,
        fontSize: 14,
        fontFace: "Arial",
        color: C.mute,
        margin: 0,
      });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 8.15,
      y: 1.65,
      w: 4.45,
      h: 4.35,
      fill: { color: C.card },
      line: { color: C.line, width: 1 },
    });
    s.addText("If asked", {
      x: 8.4,
      y: 1.85,
      w: 4.0,
      h: 0.35,
      fontSize: 16,
      fontFace: "Arial",
      color: C.gold,
      bold: true,
      margin: 0,
    });
    s.addText("Does EEG measure focus?\nNo. The result is a synced framework for later analysis.", {
      x: 8.4,
      y: 2.35,
      w: 4.0,
      h: 0.95,
      fontSize: 13,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });
    s.addText("Why not a shop dartboard?\nThose boards only keep score. Ours keeps raw force for research.", {
      x: 8.4,
      y: 3.4,
      w: 4.0,
      h: 0.95,
      fontSize: 13,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });
    s.addText("Why darts?\nCOP shift, trunk stability, spatial perception, motor learning. [1]", {
      x: 8.4,
      y: 4.45,
      w: 4.0,
      h: 0.95,
      fontSize: 13,
      fontFace: "Arial",
      color: C.mute,
      margin: 0,
    });

    s.addNotes(
      "Adrian: To conclude, we believe darts can be more than a pub game. With force sensors and a synced EEG stream, it can be a rehabilitation framework. Thank you.\n\nQ&A — If asked how EEG proves focus: EEG does not equal focus. The achievement is the framework that syncs physical force with brainwave data for future dual-task analysis.\nIf asked why not a commercial electronic dartboard: commercial boards only track scoring. Our board captures raw analog force and can synchronize it with EEG.\nIf asked why darts rather than another game: one throw demands a center-of-pressure shift, trunk stability, spatial perception, and motor learning. Kawabata et al., 2024, is the pilot we point to. doi: 10.3389/fresc.2024.1327494."
    );
  }

  await pres.writeFile({ fileName: OUT });
  console.log("Wrote", OUT);
}

function goldFrameWide(slide, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.32,
    y: 0.22,
    w: 12.7,
    h: 7.06,
    fill: { type: "none" },
    line: { color: C.gold, width: 1.25 },
  });
}

function sectionTitleWide(slide, en, zh) {
  slide.addText(en, {
    x: 0.7,
    y: 0.45,
    w: 10.5,
    h: 0.48,
    fontSize: 28,
    fontFace: "Arial",
    color: C.white,
    bold: true,
    margin: 0,
  });
  slide.addText(zh, {
    x: 0.7,
    y: 0.98,
    w: 10.5,
    h: 0.32,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: C.gold,
    margin: 0,
  });
}

function cardWide(slide, pres, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: C.card },
    line: { color: C.line, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x,
    y,
    w: 0.08,
    h,
    fill: { color: C.gold },
    line: { color: C.gold, width: 0 },
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
