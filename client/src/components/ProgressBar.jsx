import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total, answeredCount, totalQuestions }) {
  const pagePercent = Math.round(((current + 1) / total) * 100);
  const answeredPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <span>Page {current + 1} of {total}</span>
        <span>{answeredCount} / {totalQuestions} answered</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${answeredPercent}%` }} />
      </div>
    </div>
  );
}
