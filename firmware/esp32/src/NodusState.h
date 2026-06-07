#ifndef NODUS_STATE_H
#define NODUS_STATE_H

enum class Mood {
  HAPPY,
  SLEEPY,
  THINKING,
  SAD,
  ALERT,
  COUNT
};

class NodusState {
public:
  NodusState();
  void next();
  Mood current() const;
  const char* name() const;

private:
  Mood _mood;
};

#endif
