import styles from './MbtiQuestionCard.module.css';

export default function MbtiQuestionCard({ question, index, answer, onAnswer }) {
  const labelId = `mbti-q-label-${question.id}`;
  return (
    <div className={styles.card} role="group" aria-labelledby={labelId}>
      <p id={labelId} className={styles.question}>
        <span className={styles.index}>{index}.</span> {question.text}
      </p>
      <div className={styles.options}>
        {['A', 'B'].map((opt) => {
          const label = opt === 'A' ? question.option_a : question.option_b;
          const selected = answer === opt;
          return (
            <label
              key={opt}
              className={`${styles.option} ${selected ? styles.selected : ''}`}
            >
              <input
                type="radio"
                name={`mbti-q-${question.id}`}
                value={opt}
                checked={selected}
                onChange={() => onAnswer(question.id, opt)}
                className={styles.radio}
              />
              <span className={styles.optBadge}>{opt}</span>
              <span className={styles.optLabel}>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
