export type Mood = 'happy' | 'sleepy' | 'thinking' | 'sad' | 'alert';

export const MOODS: { name: Mood; face: string }[] = [
  { name: 'happy', face: '(^^)' },
  { name: 'sleepy', face: '(--)' },
  { name: 'thinking', face: '(••?)' },
  { name: 'sad', face: '(T_T)' },
  { name: 'alert', face: '(><)' },
];

export const MOOD_GLOW: Record<Mood, string> = {
  happy: 'shadow-[0_0_50px_rgba(189,241,70,0.35)]',
  sleepy: 'shadow-[0_0_40px_rgba(118,183,61,0.2)]',
  thinking: 'shadow-[0_0_45px_rgba(215,255,109,0.28)]',
  sad: 'shadow-[0_0_40px_rgba(118,183,61,0.15)]',
  alert: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
};
