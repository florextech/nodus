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
      const next = (prev + 1) % MOODS.length;
      log(`Mood: ${MOODS[next].name.toUpperCase()}  ${MOODS[next].face}`);
      return next;
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
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-sm tracking-[0.3em] text-white/50 uppercase">Nodus</h1>

      <NodusFace mood={mood} />

      <p className="text-sm tracking-[0.2em] text-white/60 uppercase">{mood}</p>

      <div className="flex flex-wrap gap-2 justify-center">
        {MOODS.map((m, i) => (
          <button
            key={m.name}
            onClick={() => {
              setAutoMode(false);
              setMood(i);
            }}
            className={`px-3 py-2 rounded text-xs font-mono border cursor-pointer transition-colors ${
              i === currentIndex
                ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10'
                : 'border-white/20 text-white/70 bg-[#16213e] hover:bg-[#1a3a5c]'
            }`}
          >
            {m.face} {m.name}
          </button>
        ))}
        <button
          onClick={() => setAutoMode(!autoMode)}
          className={`px-3 py-2 rounded text-xs font-mono border cursor-pointer transition-colors ${
            autoMode
              ? 'border-green-400 text-green-400 bg-green-400/10'
              : 'border-white/20 text-white/70 bg-[#16213e] hover:bg-[#1a3a5c]'
          }`}
        >
          {autoMode ? '⏸ Auto' : '▶ Auto'}
        </button>
      </div>

      <div
        ref={logRef}
        className="w-80 h-28 bg-[#0f0f23] border border-white/20 rounded p-3 text-[0.65rem] font-mono text-white/50 overflow-y-auto"
      >
        {logs.map((l, i) => (
          <div key={i}>&gt; {l}</div>
        ))}
      </div>
    </div>
  );
}
