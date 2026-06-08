'use client';

import { useEffect, useState } from 'react';
import { Mood, MOODS } from '../lib/moods';
import styles from './NodusFace.module.css';

const GLOW_MAP: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

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
    <div className={styles.wrapper}>
      <div className={`${styles.ring} ${GLOW_MAP[mood]}`}>
        <div className={styles.inner}>
          <div className={styles.innerGlow} />
          <span className={styles.face}>
            {blinking ? '(——)' : moodData.face}
          </span>
        </div>
      </div>
      <div className={styles.reflection} />
    </div>
  );
}
