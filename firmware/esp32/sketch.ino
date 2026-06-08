#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "src/config.h"
#include "src/NodusState.h"
#include "src/NodusFace.h"
#include "src/NodusDisplay.h"
#include "src/NodusAnimator.h"

NodusState state;
NodusFace face;
NodusDisplay display;
NodusAnimator animator;
unsigned long lastChange = 0;
bool needsRedraw = true;

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  Serial.println("\nNodus starting...\n");
  display.begin();
}

void loop() {
  unsigned long now = millis();

  if (now - lastChange >= STATE_CHANGE_INTERVAL_MS) {
    lastChange = now;
    state.next();
    needsRedraw = true;
    Serial.print("Mood: ");
    Serial.println(state.name());
    Serial.println(face.render(state.current()));
    Serial.println();
  }

  bool wasBlink = animator.isBlinking();
  animator.update();
  if (animator.isBlinking() != wasBlink) needsRedraw = true;

  if (needsRedraw) {
    display.showFace(state.current(), animator.isBlinking());
    needsRedraw = false;
  }
}
