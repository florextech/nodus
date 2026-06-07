#include "NodusAnimator.h"
#include "config.h"

NodusAnimator::NodusAnimator() : _blinking(false) {
  scheduleNextBlink();
}

void NodusAnimator::update() {
  unsigned long now = millis();
  if (_blinking) {
    if (now >= _blinkEnd) {
      _blinking = false;
      scheduleNextBlink();
    }
  } else if (now >= _nextBlink) {
    _blinking = true;
    _blinkEnd = now + BLINK_DURATION_MS;
  }
}

bool NodusAnimator::isBlinking() const { return _blinking; }

void NodusAnimator::scheduleNextBlink() {
  _nextBlink = millis() + random(BLINK_MIN_INTERVAL_MS, BLINK_MAX_INTERVAL_MS);
}
