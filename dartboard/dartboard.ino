#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int fsrPins[4] = {A0, A1, A2, A3};
const int buzzerPin = 8;
// One FSR is seated under one 3D-printed tile: dart face, then EVA foam, then the sensor.
// Sensing-page FSR numbers are the array order. Fusion 360 piece numbers are the labels.
// A0 FSR1 under piece 1 (top). A1 FSR2 under piece 3 (lower left).
// A2 FSR3 under piece 4 (lower right). A3 FSR4 under piece 2 (red center).
const char* zoneNames[4] = {"T1 TOP", "T3 LEFT", "T4 RIGHT", "T2 CENTER"};
const int baseScore[4] = {20, 20, 20, 50};
const int hardBonus[4] = {10, 10, 10, 20};
const int HIT_THRESHOLD = 120;
const int RELEASE_THRESHOLD = 80;
const int HARD_THRESHOLD = 700;
const int CROSSTALK_MARGIN = 80;
const int AVG_N = 8;
int totalScore = 0;
unsigned long lastHitMs = 0;
bool armed = true;
int readAvg(int pin) {
  long sum = 0;
  for (int i = 0; i < AVG_N; i++) { sum += analogRead(pin); delay(2); }
  return (int)(sum / AVG_N);
}
void buzz(bool hard) { tone(buzzerPin, hard ? 1500 : 880, hard ? 180 : 80); }
void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  pinMode(buzzerPin, OUTPUT);
  lcd.print("Dartboard ready");
  lcd.setCursor(0, 1);
  lcd.print("Total: 0");
}
void loop() {
  int values[4];
  int maxIdx = 0;
  for (int i = 0; i < 4; i++) {
    values[i] = readAvg(fsrPins[i]);
    if (values[i] > values[maxIdx]) maxIdx = i;
  }
  // A dart that stays pressed must not score again until every sensor drops back below release.
  if (!armed) {
    if (values[maxIdx] < RELEASE_THRESHOLD) armed = true;
    return;
  }
  int second = 0;
  for (int i = 0; i < 4; i++) if (i != maxIdx && values[i] > second) second = values[i];
  bool hit = values[maxIdx] >= HIT_THRESHOLD && (values[maxIdx] - second) >= CROSSTALK_MARGIN;
  if (hit && millis() - lastHitMs > 600) {
    bool hard = values[maxIdx] >= HARD_THRESHOLD;
    int points = baseScore[maxIdx] + (hard ? hardBonus[maxIdx] : 0);
    totalScore += points;
    lastHitMs = millis();
    armed = false;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(zoneNames[maxIdx]);
    lcd.print(hard ? " HARD" : " HIT");
    lcd.setCursor(0, 1);
    lcd.print("+"); lcd.print(points); lcd.print(" Tot:"); lcd.print(totalScore);
    Serial.print(zoneNames[maxIdx]); Serial.print(" raw="); Serial.print(values[maxIdx]);
    Serial.print(" +"); Serial.print(points); Serial.print(" total="); Serial.println(totalScore);
    buzz(hard);
  }
}
