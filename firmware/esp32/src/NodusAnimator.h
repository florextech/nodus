#ifndef NODUS_ANIMATOR_H
#define NODUS_ANIMATOR_H

#include <Arduino.h>

class NodusAnimator {
public:
  NodusAnimator();
  void update();
  bool isBlinking() const;

private:
  unsigned long _nextBlink;
  unsigned long _blinkEnd;
  bool _blinking;
  void scheduleNextBlink();
};

#endif
