#include "NodusState.h"

static const char* MOOD_NAMES[] = {
  "HAPPY", "SLEEPY", "THINKING", "SAD", "ALERT"
};

NodusState::NodusState() : _mood(Mood::HAPPY) {}

void NodusState::next() {
  _mood = static_cast<Mood>((static_cast<int>(_mood) + 1) % static_cast<int>(Mood::COUNT));
}

Mood NodusState::current() const { return _mood; }

const char* NodusState::name() const {
  return MOOD_NAMES[static_cast<int>(_mood)];
}
