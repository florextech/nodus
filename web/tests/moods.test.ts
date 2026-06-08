import { describe, it, expect } from 'vitest';
import { MOODS, MOOD_GLOW } from '../app/lib/moods';

describe('moods', () => {
  it('has 5 moods defined', () => {
    expect(MOODS).toHaveLength(5);
  });

  it('each mood has a name and face', () => {
    for (const mood of MOODS) {
      expect(mood.name).toBeTruthy();
      expect(mood.face).toBeTruthy();
    }
  });

  it('each mood has a glow class', () => {
    for (const mood of MOODS) {
      expect(MOOD_GLOW[mood.name]).toContain('shadow-');
    }
  });
});
