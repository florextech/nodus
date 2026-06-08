'use client';

import { useEffect, useState } from 'react';
import { Mood, MOODS, MOOD_GLOW } from '../lib/moods';

export default function NodusFace({ mood }: { mood: Mood }) {
  const [blinking, setBlinking] = useState(false);
  const moodData = MOODS.find((m) => m.name === mood)!;

  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    };
    const id = setInterval(blink, 3000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`relative w-56 h-56 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center transition-all duration-500 ${MOOD_GLOW[mood]}`}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(189,241,70,0.04),transparent_70%)]" />
      <span className="relative text-5xl font-mono text-[var(--brand-700)] select-none transition-opacity duration-100">
        {blinking ? '(——)' : moodData.face}
      </span>
    </div>
  );
}
