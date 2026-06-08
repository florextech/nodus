import NodusSimulator from './components/NodusSimulator';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.panel}>
        <div className={styles.glow} />
        <NodusSimulator />
      </div>
    </main>
  );
}
