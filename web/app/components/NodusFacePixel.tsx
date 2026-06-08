'use client';

import { useEffect, useState } from 'react';
import { Mood, FaceShape } from '../lib/moods';
import styles from './NodusFace.module.css';

const GLOW_MAP: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

function Eyes({ mood, blinking }: { mood: Mood; blinking: boolean }) {
  if (blinking) {
    return (
      <>
        <rect x="24" y="38" width="16" height="3" rx="1.5" fill="currentColor" />
        <rect x="60" y="38" width="16" height="3" rx="1.5" fill="currentColor" />
      </>
    );
  }

  switch (mood) {
    case 'happy':
      return (
        <>
          <path d="M24 40 Q32 30 40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M60 40 Q68 30 76 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      );
    case 'sleepy':
      return (
        <>
          <rect x="24" y="38" width="16" height="3" rx="1.5" fill="currentColor" />
          <rect x="60" y="38" width="16" height="3" rx="1.5" fill="currentColor" />
        </>
      );
    case 'thinking':
      return (
        <>
          <circle cx="32" cy="36" r="6" fill="currentColor" />
          <circle cx="68" cy="36" r="6" fill="currentColor" />
          <circle cx="34" cy="34" r="2" fill="var(--surface)" />
          <circle cx="70" cy="34" r="2" fill="var(--surface)" />
        </>
      );
    case 'sad':
      return (
        <>
          <circle cx="32" cy="36" r="6" fill="currentColor" />
          <circle cx="68" cy="36" r="6" fill="currentColor" />
          <circle cx="32" cy="35" r="2.5" fill="var(--surface)" />
          <circle cx="68" cy="35" r="2.5" fill="var(--surface)" />
          <path d="M36 44 L36 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M64 44 L64 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </>
      );
    case 'alert':
      return (
        <>
          <circle cx="32" cy="36" r="8" fill="currentColor" />
          <circle cx="68" cy="36" r="8" fill="currentColor" />
          <circle cx="32" cy="36" r="4" fill="var(--surface)" />
          <circle cx="68" cy="36" r="4" fill="var(--surface)" />
        </>
      );
  }
}

function Mouth({ mood }: { mood: Mood }) {
  switch (mood) {
    case 'happy':
      return <path d="M36 62 Q50 74 64 62" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />;
    case 'sleepy':
      return <ellipse cx="50" cy="65" rx="4" ry="3" fill="currentColor" opacity="0.6" />;
    case 'thinking':
      return <path d="M40 65 Q45 62 50 65 Q55 68 60 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />;
    case 'sad':
      return <path d="M36 68 Q50 58 64 68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />;
    case 'alert':
      return (
        <ellipse cx="50" cy="66" rx="7" ry="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
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

  const shapeClass = shape === 'square' ? styles.shapeSquare : shape === 'rect' ? styles.shapeRect : '';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ring} ${GLOW_MAP[mood]} ${shapeClass}`}>
        <div className={`${styles.inner} ${shapeClass}`}>
          <div className={`${styles.innerGlow} ${shapeClass}`} />
          <svg
            viewBox="0 0 100 100"
            className={styles.svgFace}
            style={{ color: 'var(--brand-700)' }}
          >
            <Eyes mood={mood} blinking={blinking} />
            {!blinking && <Mouth mood={mood} />}
          </svg>
        </div>
      </div>
    </div>
  );
}
