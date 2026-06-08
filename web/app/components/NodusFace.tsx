'use client';

import { useEffect, useState } from 'react';
import { Mood, MOODS, FaceShape } from '../lib/moods';
import styles from './NodusFace.module.css';

const GLOW: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

export default function NodusFace({ mood, shape = 'circle' }: { mood: Mood; shape?: FaceShape }) {
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

  const shapeClass = shape === 'square' ? styles.square : shape === 'rect' ? styles.rect : '';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} ${GLOW[mood]} ${shapeClass}`}>
        <span className={styles.faceText}>
          {blinking ? '(——)' : moodData.face}
        </span>
      </div>
    </div>
  );
}
