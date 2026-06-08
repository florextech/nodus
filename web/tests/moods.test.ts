import { describe, it, expect } from 'vitest';
import { MOODS } from '../app/lib/moods';

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

  it('contains expected mood names', () => {
    const names = MOODS.map((m) => m.name);
    expect(names).toContain('happy');
    expect(names).toContain('sleepy');
    expect(names).toContain('thinking');
    expect(names).toContain('sad');
    expect(names).toContain('alert');
  });
});
