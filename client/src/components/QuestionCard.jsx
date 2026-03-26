import styles from './QuestionCard.module.css';

const LABELS = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

export default function QuestionCard({ question, index, value, onChange }) {
  return (
    <fieldset className={styles.card}>
      <legend className={styles.questionText}>
        <span className={styles.index}>{index}.</span> {question.text}
      </legend>
      <div className={styles.options}>
        {[1, 2, 3, 4, 5].map((v) => (
          <label
            key={v}
            className={`${styles.option} ${value === v ? styles.selected : ''}`}
          >
            <input
              type="radio"
              name={`q-${question.id}`}
              value={v}
              checked={value === v}
              onChange={() => onChange(question.id, v)}
              className={styles.radio}
            />
            <span className={styles.circle} />
            <span className={styles.label}>{LABELS[v - 1]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
