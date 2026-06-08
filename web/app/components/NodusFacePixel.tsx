'use client';

import { useEffect, useState } from 'react';
import { Mood, FaceShape } from '../lib/moods';
import styles from './NodusFace.module.css';

const GLOW: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

function Face({ mood, blinking }: { mood: Mood; blinking: boolean }) {
  const c = '#d7ff6d';

  if (blinking) {
    return (
      <g>
        <line x1="25" y1="40" x2="38" y2="40" stroke={c} strokeWidth="3" strokeLinecap="round" />
        <line x1="62" y1="40" x2="75" y2="40" stroke={c} strokeWidth="3" strokeLinecap="round" />
      </g>
    );
  }

  switch (mood) {
    case 'happy':
      return (
        <g>
          <path d="M25 38 Q31.5 28 38 38" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M62 38 Q68.5 28 75 38" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M35 60 Q50 72 65 60" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'sleepy':
      return (
        <g>
          <line x1="25" y1="40" x2="38" y2="40" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="40" x2="75" y2="40" stroke={c} strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="62" r="3" fill={c} opacity="0.6" />
          <text x="72" y="25" fontSize="12" fill={c} opacity="0.5" fontFamily="monospace">z</text>
          <text x="80" y="18" fontSize="9" fill={c} opacity="0.35" fontFamily="monospace">z</text>
        </g>
      );
    case 'thinking':
      return (
        <g>
          <circle cx="31" cy="38" r="5" fill={c} />
          <circle cx="69" cy="38" r="5" fill={c} />
          <circle cx="33" cy="36" r="2" fill="var(--surface)" />
          <circle cx="71" cy="36" r="2" fill="var(--surface)" />
          <path d="M42 62 Q50 58 58 62" stroke={c} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <text x="74" y="22" fontSize="14" fill={c} opacity="0.5" fontFamily="monospace">?</text>
        </g>
      );
    case 'sad':
      return (
        <g>
          <circle cx="31" cy="38" r="5" fill={c} />
          <circle cx="69" cy="38" r="5" fill={c} />
          <line x1="33" y1="46" x2="33" y2="52" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <line x1="67" y1="46" x2="67" y2="52" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <path d="M38 65 Q50 57 62 65" stroke={c} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'alert':
      return (
        <g>
          <circle cx="31" cy="38" r="7" stroke={c} strokeWidth="2.5" fill="none" />
          <circle cx="69" cy="38" r="7" stroke={c} strokeWidth="2.5" fill="none" />
          <circle cx="31" cy="38" r="2.5" fill={c} />
          <circle cx="69" cy="38" r="2.5" fill={c} />
          <ellipse cx="50" cy="64" rx="6" ry="5" stroke={c} strokeWidth="2.5" fill="none" />
          <text x="80" y="22" fontSize="12" fill={c} opacity="0.6" fontFamily="monospace">!</text>
        </g>
      );
  }
}

export default function NodusFacePixel({ mood, shape = 'circle' }: { mood: Mood; shape?: FaceShape }) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    };
    const id = setInterval(blink, 3000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  const shapeClass = shape === 'square' ? styles.square : shape === 'rect' ? styles.rect : '';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${GLOW[mood]} ${shapeClass}`}>
        <svg viewBox="0 0 100 100" className={styles.svgFace}>
          <Face mood={mood} blinking={blinking} />
        </svg>
      </div>
    </div>
  );
}
