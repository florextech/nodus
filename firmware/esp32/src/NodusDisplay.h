#ifndef NODUS_DISPLAY_H
#define NODUS_DISPLAY_H

#include <Adafruit_SSD1306.h>
#include "NodusState.h"

class NodusDisplay {
public:
  void begin();
  void showFace(Mood mood, bool blink = false);
  void showText(const char* text);

private:
  Adafruit_SSD1306 _oled;
};

#endif
