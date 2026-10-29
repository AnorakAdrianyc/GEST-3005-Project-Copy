#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int fsrPins[4] = {A0, A1, A2, A3};
const int buzzerPin = 8;

// One Force Sensor under each printed tile: face, EVA foam, then the sensor.
// Sensing-page order. Fusion 360 piece numbers are the labels.
// A0 FSR1 under piece 1 (top). A1 FSR2 under piece 3 (lower left).
// A2 FSR3 under piece 4 (lower right). A3 FSR4 under piece 2 (red center).
const char* zoneNames[4] = {"T1 TOP", "T3 LEFT", "T4 RIGHT", "T2 CENTER"};

// 5V - Force Sensor - analog pin - 10k - GND.
// Each Tinkercad Force Sensor slider runs from 0 N to 10 N.
// Below 0.1 N the part is an open circuit, so the analog pin stays at rest
// and the hit is ignored. A 10 N press reads about 910, not 1023.
const float MAX_NEWTONS = 10.0f;
const float DETECT_NEWTONS = 0.1f;
const float MEDIUM_NEWTONS = 3.0f;
const float HARD_NEWTONS = 7.0f;
const int CROSSTALK_MARGIN = 80;
const int AVG_N = 8;

const int lightScore[4] = {10, 10, 10, 30};
const int mediumScore[4] = {20, 20, 20, 50};
const int hardScore[4] = {30, 30, 30, 70};

int totalScore = 0;
unsigned long lastHitMs = 0;
bool armed = true;

int readAvg(int pin) {
  long sum = 0;
  for (int i = 0; i < AVG_N; i++) sum += analogRead(pin);
  return (int)(sum / AVG_N);
}

// Invert the Tinkercad Force Sensor curve. Result is clamped to 0-10 N.
float newtonsFromRaw(int raw) {
  if (raw < 20) return 0;
  float resistance = 10000.0f * ((1023.0f / raw) - 1.0f);
  if (resistance <= 1.0f) return MAX_NEWTONS;
  float newtons;
  if (resistance > 9747.0f) {
    newtons = pow(4245.0f / resistance, 1.0f / 1.2f);
  } else {
    newtons = pow(6000.0f / resistance, 1.0f / 0.7f);
  }
  if (newtons > MAX_NEWTONS) return MAX_NEWTONS;
  if (newtons < 0) return 0;
  return newtons;
}

int scoreFor(int zone, float newtons) {
  if (newtons >= HARD_NEWTONS) return hardScore[zone];
  if (newtons >= MEDIUM_NEWTONS) return mediumScore[zone];
  return lightScore[zone];
}

const char* bandFor(float newtons) {
  if (newtons >= HARD_NEWTONS) return "HARD";
  if (newtons >= MEDIUM_NEWTONS) return "MEDIUM";
  return "LIGHT";
}

void buzz(float newtons) {
  int freq = 880;
  int duration = 80;
  if (newtons >= HARD_NEWTONS) {
    freq = 1500;
    duration = 180;
  } else if (newtons >= MEDIUM_NEWTONS) {
    freq = 1100;
  }
  tone(buzzerPin, freq, duration);
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

void reportHit(const char* zone, const char* band, float newtons, int points) {
  char line1[17];
  // Longest line is "T2 CENTER MEDIUM" (16 characters), so the range stays visible.
  snprintf(line1, sizeof(line1), "%s %s", zone, band);
  showBoard(line1);

  Serial.print(zone);
  Serial.print(" ");
  Serial.print(band);
  Serial.print(" Score: ");
  Serial.print(totalScore);
  Serial.print(" ");
  Serial.print(newtons, 1);
  Serial.print("N +");
  Serial.println(points);
}

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  pinMode(buzzerPin, OUTPUT);
  // Contrast pot is 250 kΩ. The LCD shows "error" if that knob is turned below 250 kΩ.
  showBoard("Dartboard ready");
  Serial.println("Dartboard ready");
  Serial.print("Score: ");
  Serial.println(totalScore);
}

void loop() {
  int values[4];
  int maxIdx = 0;
  for (int i = 0; i < 4; i++) {
    values[i] = readAvg(fsrPins[i]);
    if (values[i] > values[maxIdx]) maxIdx = i;
  }

  // A dart that stays pressed scores once, then waits until every sensor
  // falls back below the 0.1 N detection floor.
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
  bool hit = newtons >= DETECT_NEWTONS && (raw - second) >= CROSSTALK_MARGIN;
  if (hit && (lastHitMs == 0 || millis() - lastHitMs > 600)) {
    int points = scoreFor(maxIdx, newtons);
    const char* band = bandFor(newtons);
    totalScore += points;
    lastHitMs = millis();
    armed = false;

    reportHit(zoneNames[maxIdx], band, newtons, points);
    buzz(newtons);
  }
}
