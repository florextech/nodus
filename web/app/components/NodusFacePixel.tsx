'use client';

import { useEffect, useRef, useState } from 'react';
import { Mood } from '../lib/moods';
import styles from './NodusFace.module.css';

const PIXEL_SIZE = 4;
const GRID = 24;

interface PixelRow {
  row: number;
  cols: number[];
}

const FACES: Record<Mood, PixelRow[]> = {
  happy: [
    { row: 7, cols: [7, 8, 15, 16] },
    { row: 8, cols: [6, 9, 14, 17] },
    { row: 15, cols: [8, 15] },
    { row: 16, cols: [9, 10, 11, 12, 13, 14] },
  ],
  sleepy: [
    { row: 9, cols: [6, 7, 8, 9, 14, 15, 16, 17] },
    { row: 16, cols: [10, 11, 12, 13] },
    { row: 5, cols: [18, 19, 20] },
    { row: 6, cols: [19] },
    { row: 7, cols: [18, 19, 20] },
  ],
  thinking: [
    { row: 7, cols: [7, 8, 16, 17] },
    { row: 8, cols: [7, 8, 16, 17] },
    { row: 15, cols: [10, 11, 14, 15] },
    { row: 16, cols: [12, 13] },
    { row: 3, cols: [18, 19, 20] },
    { row: 4, cols: [20] },
    { row: 5, cols: [19] },
  ],
  sad: [
    { row: 8, cols: [7, 8, 15, 16] },
    { row: 9, cols: [7, 8, 15, 16] },
    { row: 10, cols: [8, 16] },
    { row: 11, cols: [8, 16] },
    { row: 16, cols: [9, 10, 11, 12, 13, 14] },
    { row: 15, cols: [8, 15] },
  ],
  alert: [
    { row: 7, cols: [6, 9, 14, 17] },
    { row: 8, cols: [7, 8, 15, 16] },
    { row: 9, cols: [6, 9, 14, 17] },
    { row: 14, cols: [9, 10, 11, 12, 13, 14] },
    { row: 15, cols: [9, 14] },
    { row: 16, cols: [9, 10, 11, 12, 13, 14] },
    { row: 2, cols: [19] },
    { row: 3, cols: [19] },
    { row: 4, cols: [19] },
    { row: 6, cols: [19] },
  ],
};

const GLOW_MAP: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

export default function NodusFacePixel({ mood }: { mood: Mood }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blinking, setBlink] = useState(false);

  useEffect(() => {
    const blink = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    };
    const id = setInterval(blink, 3000 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = GRID * PIXEL_SIZE;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#d7ff6d';

    if (blinking) {
      for (let c = 6; c <= 9; c++) ctx.fillRect(c * PIXEL_SIZE, 9 * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      for (let c = 14; c <= 17; c++) ctx.fillRect(c * PIXEL_SIZE, 9 * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      return;
    }

    for (const { row, cols } of FACES[mood]) {
      for (const c of cols) {
        ctx.fillRect(c * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }, [mood, blinking]);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ring} ${GLOW_MAP[mood]}`}>
        <div className={styles.inner}>
          <div className={styles.innerGlow} />
          <canvas
            ref={canvasRef}
            style={{ imageRendering: 'pixelated' }}
            className={styles.pixelCanvas}
          />
        </div>
      </div>
      <div className={styles.reflection} />
    </div>
  );
}
