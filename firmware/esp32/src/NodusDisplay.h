#ifndef NODUS_DISPLAY_H
#define NODUS_DISPLAY_H

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "NodusState.h"
#include "config.h"

class NodusDisplay {
public:
  NodusDisplay();
  void begin();
  void showFace(Mood mood, bool blink = false);

private:
  Adafruit_SSD1306 _oled;
};

#endif
