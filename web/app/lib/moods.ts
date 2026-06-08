export type Mood = 'happy' | 'sleepy' | 'thinking' | 'sad' | 'alert';

export const MOODS: { name: Mood; face: string }[] = [
  { name: 'happy', face: '(^^)' },
  { name: 'sleepy', face: '(--)' },
  { name: 'thinking', face: '(••?)' },
  { name: 'sad', face: '(T_T)' },
  { name: 'alert', face: '(><)' },
];

export const MOOD_GLOW: Record<Mood, string> = {
  happy: 'shadow-[0_0_40px_rgba(100,255,150,0.3)]',
  sleepy: 'shadow-[0_0_40px_rgba(150,150,255,0.2)]',
  thinking: 'shadow-[0_0_40px_rgba(255,200,100,0.25)]',
  sad: 'shadow-[0_0_40px_rgba(100,100,255,0.3)]',
  alert: 'shadow-[0_0_40px_rgba(255,100,100,0.35)]',
};
