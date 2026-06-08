#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C
#define STATE_INTERVAL 3000

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

enum Mood { HAPPY, SLEEPY, THINKING, SAD, ALERT, MOOD_COUNT };

const char* moodNames[] = { "HAPPY", "SLEEPY", "THINKING", "SAD", "ALERT" };
const char* moodFaces[] = { "(^^)", "(--)", "(..?)", "(T_T)", "(><)" };

Mood currentMood = HAPPY;
unsigned long lastChange = 0;

void drawFace() {
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);

  // Face centered
  display.setTextSize(2);
  const char* face = moodFaces[currentMood];
  int16_t x = (SCREEN_WIDTH - strlen(face) * 12) / 2;
  display.setCursor(x, 20);
  display.print(face);

  // Mood name at bottom
  display.setTextSize(1);
  const char* name = moodNames[currentMood];
  int16_t nx = (SCREEN_WIDTH - strlen(name) * 6) / 2;
  display.setCursor(nx, 54);
  display.print(name);

  display.display();
}

void setup() {
  Serial.begin(115200);
  Serial.println("\nNodus starting...\n");

  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("SSD1306 failed!");
    while (true);
  }

  drawFace();
}

void loop() {
  unsigned long now = millis();
  if (now - lastChange >= STATE_INTERVAL) {
    lastChange = now;
    currentMood = (Mood)((currentMood + 1) % MOOD_COUNT);

    Serial.print("Mood: ");
    Serial.println(moodNames[currentMood]);
    Serial.println(moodFaces[currentMood]);
    Serial.println();

    drawFace();
  }
}
