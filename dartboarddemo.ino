#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int fsrPins[4] = {A0, A1, A2, A3};
const int buzzerPin = 8;

const char* zoneNames[4] = {"T1 TOP", "T3 LEFT", "T4 RIGHT", "T2 CENTER"};

const float MAX_NEWTONS    = 10.0f;
const float DETECT_NEWTONS = 0.1f;
const float MEDIUM_NEWTONS = 3.0f;
const float HARD_NEWTONS   = 7.0f;
// Sensing element is a variable resistor whose maximum is 10 kΩ,
// in series with the 10 kΩ divider resistor to GND.
const float SENSOR_MAX_OHMS = 10000.0f;
const float DIVIDER_OHMS    = 10000.0f;
const int   CROSSTALK_MARGIN = 40;
const int   AVG_N = 8;

const int lightScore[4]  = {10, 10, 10, 30};
const int mediumScore[4] = {20, 20, 20, 50};
const int hardScore[4]   = {30, 30, 30, 70};

int totalScore = 0;
unsigned long lastHitMs = 0;
bool armed = true;

int readAvg(int pin) {
  long sum = 0;
  for (int i = 0; i < AVG_N; i++) sum += analogRead(pin);
  return (int)(sum / AVG_N);
}

// 5V — variable resistor (0 to 10 kΩ) — analog pin — 10 kΩ — GND.
// 10 kΩ is no force. 0 Ω is a 10 N press.
float newtonsFromRaw(int raw) {
  if (raw < 1) return 0;
  float resistance = DIVIDER_OHMS * ((1023.0f / raw) - 1.0f);
  if (resistance >= SENSOR_MAX_OHMS) return 0;
  if (resistance <= 0.0f) return MAX_NEWTONS;
  float newtons = MAX_NEWTONS * (SENSOR_MAX_OHMS - resistance) / SENSOR_MAX_OHMS;
  if (newtons < 0.0f) return 0;
  if (newtons > MAX_NEWTONS) return MAX_NEWTONS;
  return newtons;
}

// Explicit if / else if / else chain — medium is now a first-class branch.
const char* bandFor(float newtons) {
  if (newtons >= HARD_NEWTONS) {
    return "HARD";
  } else if (newtons >= MEDIUM_NEWTONS) {
    return "MEDIUM";
  } else if (newtons >= DETECT_NEWTONS) {
    return "LIGHT";
  } else {
    return "NONE";
  }
}

int scoreFor(int zone, float newtons) {
  if (newtons >= HARD_NEWTONS) {
    return hardScore[zone];
  } else if (newtons >= MEDIUM_NEWTONS) {
    return mediumScore[zone];
  } else {
    return lightScore[zone];
  }
}

void buzz(float newtons) {
  if (newtons >= HARD_NEWTONS) {
    tone(buzzerPin, 1500, 180);
  } else if (newtons >= MEDIUM_NEWTONS) {
    tone(buzzerPin, 1100, 120);
  } else {
    tone(buzzerPin, 880, 80);
  }
}

void printLine(int row, const char* text) {
  char buf[17];
  int i = 0;
  for (; i < 16 && text[i]; i++) buf[i] = text[i];
  for (; i < 16; i++) buf[i] = ' ';
  buf[16] = 0;
  lcd.setCursor(0, row);
  lcd.print(buf);
}

void showBoard(const char* status) {
  char scoreLine[17];
  snprintf(scoreLine, sizeof(scoreLine), "Score: %d", totalScore);
  printLine(0, status);
  printLine(1, scoreLine);
}

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  pinMode(buzzerPin, OUTPUT);
  // Contrast pot is 250 kΩ. The LCD shows "error" if that knob is turned below 250 kΩ.
  showBoard("Dartboard ready");
}

void loop() {
  int values[4];
  int maxIdx = 0;

  for (int i = 0; i < 4; i++) {
    values[i] = readAvg(fsrPins[i]);
    if (values[i] > values[maxIdx]) maxIdx = i;
  }

  if (!armed) {
    if (newtonsFromRaw(values[maxIdx]) < DETECT_NEWTONS) armed = true;
    return;
  }

  int second = 0;
  for (int i = 0; i < 4; i++) {
    if (i != maxIdx && values[i] > second) second = values[i];
  }

  int raw = values[maxIdx];
  float newtons = newtonsFromRaw(raw);
  bool hit = newtons >= DETECT_NEWTONS &&
             (raw - second) >= CROSSTALK_MARGIN;

  if (hit && (lastHitMs == 0 || millis() - lastHitMs > 600)) {
    int points = scoreFor(maxIdx, newtons);
    const char* band = bandFor(newtons);

    totalScore += points;
    lastHitMs = millis();
    armed = false;

    // Debug: shows the band the code actually chose.
    Serial.print("band=");
    Serial.print(band);
    Serial.print(" zone=");
    Serial.print(zoneNames[maxIdx]);
    Serial.print(" N=");
    Serial.print(newtons, 2);
    Serial.print(" raw=");
    Serial.print(raw);
    Serial.print(" 2nd=");
    Serial.print(second);
    Serial.print(" pts=");
    Serial.print(points);
    Serial.print(" total=");
    Serial.println(totalScore);

    // ---- Display: use a two-line layout that never hits 16 chars on line 1 ----
    // Line 1: zone name              (max 9 chars, always fits)
    // Line 2: band + points + total  (e.g. "MEDIUM +50 T:50")
    printLine(0, zoneNames[maxIdx]);
    char line2[17];
    snprintf(line2, sizeof(line2), "%s +%d T:%d", band, points, totalScore);
    printLine(1, line2);

    buzz(newtons);
  }
}