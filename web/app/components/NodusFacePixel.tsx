'use client';

import { useEffect, useRef, useState } from 'react';
import { Mood } from '../lib/moods';
import styles from './NodusFace.module.css';

const PIXEL = 5;
const GRID = 16;

interface PixelRow {
  row: number;
  cols: number[];
}

const FACES: Record<Mood, PixelRow[]> = {
  happy: [
    // Eyes - happy arcs
    { row: 4, cols: [3, 4, 11, 12] },
    { row: 5, cols: [2, 5, 10, 13] },
    { row: 6, cols: [3, 4, 11, 12] },
    // Blush
    { row: 8, cols: [2, 3, 12, 13] },
    // Mouth - big smile
    { row: 10, cols: [4, 11] },
    { row: 11, cols: [5, 6, 7, 8, 9, 10] },
  ],
  sleepy: [
    // Eyes - closed
    { row: 6, cols: [2, 3, 4, 5, 10, 11, 12, 13] },
    // Mouth - small o
    { row: 10, cols: [7, 8] },
    { row: 11, cols: [7, 8] },
    // Zzz
    { row: 2, cols: [12, 13, 14] },
    { row: 3, cols: [14] },
    { row: 4, cols: [12, 13, 14] },
  ],
  thinking: [
    // Eyes - looking up right
    { row: 4, cols: [3, 4, 12, 13] },
    { row: 5, cols: [2, 3, 4, 5, 11, 12, 13, 14] },
    { row: 6, cols: [2, 3, 4, 5, 11, 12, 13, 14] },
    { row: 7, cols: [3, 4, 12, 13] },
    // Pupil up-right
    { row: 4, cols: [4, 5, 13, 14] },
    // Mouth - wavy
    { row: 11, cols: [5, 6] },
    { row: 12, cols: [7, 8] },
    { row: 11, cols: [9, 10] },
    // Dots
    { row: 1, cols: [14] },
    { row: 2, cols: [13, 14] },
    { row: 3, cols: [14] },
  ],
  sad: [
    // Eyes with tears
    { row: 5, cols: [3, 4, 11, 12] },
    { row: 6, cols: [2, 3, 4, 5, 10, 11, 12, 13] },
    { row: 7, cols: [3, 4, 11, 12] },
    // Tears
    { row: 8, cols: [4, 12] },
    { row: 9, cols: [4, 12] },
    { row: 10, cols: [4, 12] },
    // Mouth - frown
    { row: 12, cols: [6, 7, 8, 9] },
    { row: 11, cols: [5, 10] },
  ],
  alert: [
    // Eyes - wide open X
    { row: 4, cols: [2, 5, 10, 13] },
    { row: 5, cols: [3, 4, 11, 12] },
    { row: 6, cols: [3, 4, 11, 12] },
    { row: 7, cols: [2, 5, 10, 13] },
    // Mouth - open O
    { row: 10, cols: [6, 7, 8, 9] },
    { row: 11, cols: [5, 10] },
    { row: 12, cols: [5, 10] },
    { row: 13, cols: [6, 7, 8, 9] },
    // ! marks
    { row: 1, cols: [1, 14] },
    { row: 2, cols: [1, 14] },
    { row: 3, cols: [1, 14] },
  ],
};

const BLINK: PixelRow[] = [
  { row: 6, cols: [2, 3, 4, 5, 10, 11, 12, 13] },
];

const GLOW_MAP: Record<Mood, string> = {
  happy: styles.glowHappy,
  sleepy: styles.glowSleepy,
  thinking: styles.glowThinking,
  sad: styles.glowSad,
  alert: styles.glowAlert,
};

function draw(ctx: CanvasRenderingContext2D, rows: PixelRow[], color: string) {
  const size = GRID * PIXEL;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = color;
  for (const { row, cols } of rows) {
    for (const c of cols) {
      ctx.fillRect(c * PIXEL, row * PIXEL, PIXEL, PIXEL);
    }
  }
}

export default function NodusFacePixel({ mood, shape }: { mood: Mood; shape: string }) {
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
    const size = GRID * PIXEL;
    canvas.width = size;
    canvas.height = size;
    draw(ctx, blinking ? BLINK : FACES[mood], '#d7ff6d');
  }, [mood, blinking]);

  const shapeClass = shape === 'square' ? styles.shapeSquare : shape === 'rect' ? styles.shapeRect : '';

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.ring} ${GLOW_MAP[mood]} ${shapeClass}`}>
        <div className={`${styles.inner} ${shapeClass}`}>
          <div className={`${styles.innerGlow} ${shapeClass}`} />
          <canvas
            ref={canvasRef}
            style={{ imageRendering: 'pixelated' }}
            className={styles.pixelCanvas}
          />
        </div>
      </div>
    </div>
  );
}
