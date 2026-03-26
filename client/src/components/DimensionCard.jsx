import { DIMENSION_META } from '../data/descriptions';
import styles from './DimensionCard.module.css';

export default function DimensionCard({ dim }) {
  const meta = DIMENSION_META[dim.key];
  const color = meta?.color ?? 'var(--color-accent)';

  return (
    <div className={styles.card} style={{ '--dim-color': color }}>
      <div className={styles.header}>
        <div className={styles.nameGroup}>
          <span className={styles.key} style={{ color }}>{dim.key}</span>
          <div>
            <div className={styles.name}>{dim.name}</div>
            <div className={styles.title}>{dim.title}</div>
          </div>
        </div>
        <div className={styles.scoreBox}>
          <span className={styles.score}>{dim.score}</span>
          <span className={styles.pct}>%</span>
        </div>
      </div>

      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${dim.score}%`, background: color }}
        />
      </div>

      <p className={styles.text}>{dim.text}</p>
    </div>
  );
}
