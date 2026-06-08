'use client';

import { useEffect, useState } from 'react';
import { Mood, MOODS, MOOD_GLOW } from '../lib/moods';

export default function NodusFace({ mood }: Readonly<{ mood: Mood }>) {
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
      className={`w-60 h-60 rounded-full bg-[#0f0f23] flex items-center justify-center transition-shadow duration-500 ${MOOD_GLOW[mood]}`}
    >
      <span className="text-5xl font-mono text-white select-none transition-opacity duration-100">
        {blinking ? '(——)' : moodData.face}
      </span>
    </div>
  );
}
