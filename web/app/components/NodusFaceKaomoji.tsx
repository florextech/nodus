'use client';

import { useEffect, useState } from 'react';
import { Mood, KAOMOJI_FACES, FaceShape } from '../lib/moods';
import styles from './NodusFace.module.css';

const GLOW_MAP: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

export default function NodusFaceKaomoji({ mood, shape = 'circle' }: { mood: Mood; shape?: FaceShape }) {
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
          <span className={styles.faceKaomoji}>
            {blinking ? '(≡ω≡)' : KAOMOJI_FACES[mood]}
          </span>
        </div>
      </div>
    </div>
  );
}
