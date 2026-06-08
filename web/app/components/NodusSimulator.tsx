'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mood, MOODS } from '../lib/moods';
import NodusFace from './NodusFace';

export default function NodusSimulator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
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

  return (
    <div className="flex flex-col items-center gap-10">
      {/* Title */}
      <h1 className="text-xs font-semibold tracking-[0.24em] uppercase text-[var(--brand-700)]">
        Nodus
      </h1>

      {/* Face */}
      <NodusFace mood={mood} />

      {/* Mood label */}
      <span className="inline-flex items-center rounded-full border border-[rgba(189,241,70,0.35)] bg-[rgba(189,241,70,0.12)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)] uppercase tracking-[0.14em]">
        {mood}
      </span>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {MOODS.map((m, i) => (
          <button
            key={m.name}
            onClick={() => {
              setAutoMode(false);
              setMood(i);
            }}
            className={`inline-flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-600)] focus-visible:ring-offset-2 ${
              i === currentIndex
                ? 'border-[rgba(189,241,70,0.65)] bg-[linear-gradient(180deg,var(--brand-700),var(--brand-600))] text-[#111513]'
                : 'border-[var(--border)] bg-[rgba(17,21,19,0.72)] text-[var(--foreground)] hover:border-[rgba(189,241,70,0.52)] hover:bg-[rgba(23,28,25,0.9)]'
            }`}
          >
            {m.face} {m.name}
          </button>
        ))}
        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`inline-flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-600)] focus-visible:ring-offset-2 ${
            autoMode
              ? 'border-[rgba(189,241,70,0.65)] bg-[linear-gradient(180deg,var(--brand-700),var(--brand-600))] text-[#111513]'
              : 'border-[var(--border)] bg-[rgba(17,21,19,0.72)] text-[var(--foreground)] hover:border-[rgba(189,241,70,0.52)] hover:bg-[rgba(23,28,25,0.9)]'
          }`}
        >
          {autoMode ? '⏸ Auto' : '▶ Auto'}
        </button>
      </div>

      {/* Log */}
      <div
        ref={logRef}
        className="w-full max-w-sm h-28 rounded-2xl border border-[var(--border)] bg-[rgba(17,21,19,0.78)] backdrop-blur p-4 text-[0.65rem] font-mono text-[var(--muted)] overflow-y-auto"
      >
        {logs.map((l, i) => (
          <div key={i} className="opacity-70">
            <span className="text-[var(--brand-500)]">&gt;</span> {l}
          </div>
        ))}
      </div>
    </div>
  );
}
