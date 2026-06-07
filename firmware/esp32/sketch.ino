#include "src/config.h"
#include "src/NodusState.h"
#include "src/NodusFace.h"

NodusState state;
NodusFace face;
unsigned long lastChange = 0;

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  Serial.println("\nNodus starting...\n");
  printState();
}

void loop() {
  unsigned long now = millis();
  if (now - lastChange >= STATE_CHANGE_INTERVAL_MS) {
    lastChange = now;
    state.next();
    printState();
  }
}

void printState() {
  Serial.print("Mood: ");
  Serial.println(state.name());
  Serial.println(face.render(state.current()));
  Serial.println();
}
