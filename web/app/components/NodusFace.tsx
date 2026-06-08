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
    <div className="relative">
      {/* Outer ring */}
      <div
        className={`w-32 h-32 sm:w-44 sm:h-44 rounded-full p-[2px] transition-all duration-700 ${MOOD_GLOW[mood]}`}
        style={{ background: 'linear-gradient(135deg, rgba(189,241,70,0.3), rgba(118,183,61,0.1), rgba(189,241,70,0.2))' }}
      >
        {/* Inner face */}
        <div className="w-full h-full rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(189,241,70,0.06),transparent_60%)]" />
          <span className="relative text-2xl sm:text-4xl font-mono text-[var(--brand-700)] select-none transition-all duration-150">
            {blinking ? '(——)' : moodData.face}
          </span>
        </div>
      </div>
      {/* Bottom reflection */}
      <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-2 sm:h-3 rounded-full bg-[radial-gradient(ellipse,rgba(189,241,70,0.15),transparent)] blur-sm" />
    </div>
  );
}
