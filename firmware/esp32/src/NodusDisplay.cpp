#include "NodusDisplay.h"
#include "config.h"
#include "faces_bmp.h"

void NodusDisplay::begin() {
  _oled = Adafruit_SSD1306(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
  _oled.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS);
  _oled.clearDisplay();
  _oled.display();
}

void NodusDisplay::showFace(Mood mood, bool blink) {
  _oled.clearDisplay();

  const unsigned char* bmp = blink ? FACE_BLINK : FACES_BMP[static_cast<int>(mood)];
  int x = (SCREEN_WIDTH - FACE_SIZE) / 2;
  int y = 0;
  _oled.drawBitmap(x, y, bmp, FACE_SIZE, FACE_SIZE, SSD1306_WHITE);

  _oled.display();
}

void NodusDisplay::showText(const char* text) {
  _oled.setTextSize(1);
  _oled.setTextColor(SSD1306_WHITE);
  _oled.setCursor(0, SCREEN_HEIGHT - 10);
  _oled.print(text);
  _oled.display();
}
