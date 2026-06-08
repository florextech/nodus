export type Mood = 'happy' | 'sleepy' | 'thinking' | 'sad' | 'alert';
export type FaceStyle = 'ascii' | 'pixel' | 'kaomoji';

export const FACE_STYLES: { id: FaceStyle; label: string }[] = [
  { id: 'ascii', label: 'ASCII' },
  { id: 'pixel', label: 'Pixel' },
  { id: 'kaomoji', label: 'Kaomoji' },
];

export const MOODS: { name: Mood; face: string }[] = [
  { name: 'happy', face: '(^^)' },
  { name: 'sleepy', face: '(--)' },
  { name: 'thinking', face: '(••?)' },
  { name: 'sad', face: '(T_T)' },
  { name: 'alert', face: '(><)' },
];

export const KAOMOJI_FACES: Record<Mood, string> = {
  happy: '(◕‿◕)',
  sleepy: '(︶.︶)zzZ',
  thinking: '(°ー°〃)',
  sad: '(╥﹏╥)',
  alert: '(⊙_⊙)!',
};
