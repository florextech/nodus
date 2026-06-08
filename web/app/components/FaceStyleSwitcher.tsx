'use client';

import { FaceStyle, FACE_STYLES } from '../lib/moods';
import styles from './FaceStyleSwitcher.module.css';

interface Props {
  current: FaceStyle;
  onChange: (style: FaceStyle) => void;
}

export default function FaceStyleSwitcher({ current, onChange }: Props) {
  return (
    <div className={styles.switcher}>
      {FACE_STYLES.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={`${styles.tab} ${current === s.id ? styles.tabActive : ''}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
