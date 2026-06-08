'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mood, MOODS, FaceStyle } from '../lib/moods';
import NodusFace from './NodusFace';
import NodusFacePixel from './NodusFacePixel';
import NodusFaceKaomoji from './NodusFaceKaomoji';
import FaceStyleSwitcher from './FaceStyleSwitcher';
import styles from './NodusSimulator.module.css';

export default function NodusSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [faceStyle, setFaceStyle] = useState<FaceStyle>('ascii');
  const [logs, setLogs] = useState<string[]>(['Nodus starting...']);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const mood: Mood = MOODS[currentIndex].name;

  const log = useCallback((msg: string) => {
    setLogs((prev) => [...prev.slice(-50), msg]);
  }, []);

  const setMood = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      const m = MOODS[index];
      log(`Mood: ${m.name.toUpperCase()}  ${m.face}`);
    },
    [log]
  );

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const n = (prev + 1) % MOODS.length;
      log(`Mood: ${MOODS[n].name.toUpperCase()}  ${MOODS[n].face}`);
      return n;
    });
  }, [log]);

  useEffect(() => {
    if (autoMode) {
      timerRef.current = setInterval(next, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoMode, next]);

  useEffect(() => {
    if (logRef.current?.scrollTo) logRef.current.scrollTo(0, logRef.current.scrollHeight);
  }, [logs]);

  const renderFace = () => {
    switch (faceStyle) {
      case 'pixel': return <NodusFacePixel mood={mood} />;
      case 'kaomoji': return <NodusFaceKaomoji mood={mood} />;
      default: return <NodusFace mood={mood} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.dot} />
        <h1 className={styles.title}>Nodus</h1>
        <div className={styles.line} />
        <span className={styles.version}>v0.1.0</span>
      </div>

      {/* Style switcher */}
      <FaceStyleSwitcher current={faceStyle} onChange={setFaceStyle} />

      {/* Face area */}
      <div className={styles.faceArea}>
        {renderFace()}
        <div className={styles.pill}>
          <span className={styles.pillDot} />
          {mood}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Controls */}
      <div className={styles.controls}>
        <p className={styles.label}>Estados</p>
        <div className={styles.grid}>
          {MOODS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => {
                setAutoMode(false);
                setMood(i);
              }}
              className={`${styles.moodBtn} ${i === currentIndex ? styles.moodBtnActive : ''}`}
            >
              <span className={`${styles.moodFace} ${i === currentIndex ? styles.moodFaceActive : ''}`}>
                {m.face}
              </span>
              <span className={`${styles.moodName} ${i === currentIndex ? styles.moodNameActive : ''}`}>
                {m.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`${styles.autoBtn} ${autoMode ? styles.autoBtnActive : ''}`}
        >
          {autoMode ? '⏸ Pausar ciclo automático' : '▶ Iniciar ciclo automático'}
        </button>
      </div>

      <div className={styles.divider} />

      {/* Log */}
      <div className={styles.logSection}>
        <p className={styles.label}>Actividad</p>
        <div ref={logRef} className={styles.log}>
          {logs.map((l, i) => (
            <div key={i} className={styles.logLine}>
              <span className={styles.logPrompt}>›</span> {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
