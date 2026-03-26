import styles from './Welcome.module.css';

export default function Welcome({ onStart }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.badge}>Big Five Personality Assessment</div>
        <h1 className={styles.title}>Who Am I?</h1>
        <p className={styles.subtitle}>
          Answer 100 questions about your everyday behavior — not your values or intentions,
          but what you actually do — and get a detailed personality report based on the
          scientifically validated <strong>Big Five (OCEAN)</strong> model.
        </p>

        <div className={styles.dimensions}>
          {[
            { key: 'O', label: 'Openness', desc: 'Curiosity & creativity' },
            { key: 'C', label: 'Conscientiousness', desc: 'Planning & reliability' },
            { key: 'E', label: 'Extraversion', desc: 'Social energy' },
            { key: 'A', label: 'Agreeableness', desc: 'Cooperation & warmth' },
            { key: 'N', label: 'Neuroticism', desc: 'Emotional reactivity' },
          ].map(({ key, label, desc }) => (
            <div key={key} className={`${styles.dimChip} ${styles[`dim${key}`]}`}>
              <span className={styles.dimKey}>{key}</span>
              <div>
                <div className={styles.dimLabel}>{label}</div>
                <div className={styles.dimDesc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.meta}>
          <span>~15 min</span>
          <span>·</span>
          <span>100 questions</span>
          <span>·</span>
          <span>No sign-up required</span>
        </div>

        <button className={`btn btn-primary ${styles.startBtn}`} onClick={onStart}>
          Start Quiz →
        </button>
      </div>
    </div>
  );
}
