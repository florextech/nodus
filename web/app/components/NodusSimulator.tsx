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
    <div className="relative flex flex-col items-center gap-8">
      {/* Header */}
      <div className="flex items-center gap-3 w-full">
        <div className="h-2 w-2 rounded-full bg-[var(--brand-600)] animate-pulse" />
        <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--foreground)]">
          Nodus
        </h1>
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[0.6rem] text-[var(--muted)] uppercase tracking-wider">v0.1.0</span>
      </div>

      {/* Face area */}
      <div className="relative w-full flex flex-col items-center py-6">
        <NodusFace mood={mood} />
        <div className="mt-5">
          <span className="inline-flex items-center rounded-full border border-[rgba(189,241,70,0.35)] bg-[rgba(189,241,70,0.08)] px-3 py-1 text-[0.65rem] font-semibold text-[var(--brand-700)] uppercase tracking-[0.18em]">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
            {mood}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border)]" />

      {/* Controls section */}
      <div className="w-full space-y-3">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Estados
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {MOODS.map((m, i) => (
            <button
              key={m.name}
              onClick={() => {
                setAutoMode(false);
                setMood(i);
              }}
              className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-600)] ${
                i === currentIndex
                  ? 'border-[rgba(189,241,70,0.65)] bg-[rgba(189,241,70,0.1)]'
                  : 'border-[var(--border)] bg-[var(--surface)] hover:border-[rgba(189,241,70,0.4)] hover:bg-[var(--surface-muted)]'
              }`}
            >
              <span className={`text-lg ${i === currentIndex ? 'text-[var(--brand-700)]' : 'text-[var(--foreground)]'}`}>
                {m.face}
              </span>
              <span className={`text-[0.55rem] uppercase tracking-wider font-medium ${i === currentIndex ? 'text-[var(--brand-600)]' : 'text-[var(--muted)]'}`}>
                {m.name}
              </span>
            </button>
          ))}
        </div>

        {/* Auto toggle */}
        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`w-full rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-600)] ${
            autoMode
              ? 'border-[rgba(189,241,70,0.65)] bg-[linear-gradient(180deg,var(--brand-700),var(--brand-600))] text-[#111513]'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[rgba(189,241,70,0.52)]'
          }`}
        >
          {autoMode ? '⏸ Pausar ciclo automático' : '▶ Iniciar ciclo automático'}
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border)]" />

      {/* Log */}
      <div className="w-full space-y-2">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Actividad
        </p>
        <div
          ref={logRef}
          className="w-full h-24 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[0.6rem] font-mono text-[var(--muted)] overflow-y-auto"
        >
          {logs.map((l, i) => (
            <div key={i} className="py-0.5">
              <span className="text-[var(--brand-500)]">›</span> {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
