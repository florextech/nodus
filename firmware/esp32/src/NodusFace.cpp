#include "NodusFace.h"

static const char* FACES[] = {
  "(^^)",    // HAPPY
  "(--)",    // SLEEPY
  "(••?)",  // THINKING
  "(T_T)",   // SAD
  "(><)"     // ALERT
};

const char* NodusFace::render(Mood mood) const {
  return FACES[static_cast<int>(mood)];
}
