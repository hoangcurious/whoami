import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './QuestionCard.module.css';

const LIKERT_KEYS = ['strongly_disagree', 'disagree', 'neutral', 'agree', 'strongly_agree'];

export default function QuestionCard({ question, index, value, onChange }) {
  const { lang } = useLang();
  const labels = LIKERT_KEYS.map((key) => t(key, lang));

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
            <span className={styles.label}>{labels[v - 1]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
