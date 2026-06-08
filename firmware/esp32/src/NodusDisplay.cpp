#include "NodusDisplay.h"
#include "faces_bmp.h"

NodusDisplay::NodusDisplay()
  : _oled(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1) {}

void NodusDisplay::begin() {
  Wire.begin();
  _oled.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS);
  _oled.clearDisplay();
  _oled.display();
}

void NodusDisplay::showFace(Mood mood, bool blink) {
  _oled.clearDisplay();

  const unsigned char* bmp = blink ? FACE_BLINK : FACES_BMP[static_cast<int>(mood)];
  int x = (SCREEN_WIDTH - FACE_SIZE) / 2;
  int y = (SCREEN_HEIGHT - FACE_SIZE) / 2;
  _oled.drawBitmap(x, y, bmp, FACE_SIZE, FACE_SIZE, SSD1306_WHITE);

  _oled.setTextSize(1);
  _oled.setTextColor(SSD1306_WHITE);
  _oled.setCursor(0, SCREEN_HEIGHT - 10);
  _oled.print("Mood: ");

  // Get mood name inline
  static const char* names[] = {"HAPPY","SLEEPY","THINKING","SAD","ALERT"};
  _oled.print(names[static_cast<int>(mood)]);

  _oled.display();
}
