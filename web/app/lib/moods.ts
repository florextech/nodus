export type Mood = 'happy' | 'sleepy' | 'thinking' | 'sad' | 'alert';

export const MOODS: { name: Mood; face: string }[] = [
  { name: 'happy', face: '(^^)' },
  { name: 'sleepy', face: '(--)' },
  { name: 'thinking', face: '(••?)' },
  { name: 'sad', face: '(T_T)' },
  { name: 'alert', face: '(><)' },
];
