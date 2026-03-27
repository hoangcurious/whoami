import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './MBTICard.module.css';

// For each dichotomy key, which OCEAN score drives it and what are the two poles
const DICHOTOMY_META = {
  EI: { leftLabel: 'E', rightLabel: 'I', colorVar: 'var(--color-E)' },
  SN: { leftLabel: 'N', rightLabel: 'S', colorVar: 'var(--color-O)' },
  TF: { leftLabel: 'F', rightLabel: 'T', colorVar: 'var(--color-A)' },
  JP: { leftLabel: 'J', rightLabel: 'P', colorVar: 'var(--color-C)' },
};

function DichotomyBar({ dichotomyKey, data }) {
  const meta = DICHOTOMY_META[dichotomyKey];
  const { lang } = useLang();

  // score is 0-100; left pole is "high", right pole is "low"
  const leftPct = data.score;
  const rightPct = 100 - data.score;
  const chosenLeft = data.chosen === meta.leftLabel;

  return (
    <div className={styles.dichotomy}>
      <div className={styles.dichotomyLabels}>
        <span className={`${styles.pole} ${chosenLeft ? styles.poleActive : ''}`}>
          {meta.leftLabel}
        </span>
        <span className={`${styles.pole} ${!chosenLeft ? styles.poleActive : ''}`}>
          {meta.rightLabel}
        </span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${leftPct}%`, background: meta.colorVar }}
        />
      </div>
      <div className={styles.dichotomyPcts}>
        <span>{leftPct}%</span>
        <span>{rightPct}%</span>
      </div>
    </div>
  );
}

export default function MBTICard({ mbti }) {
  const { lang } = useLang();
  const letters = mbti.type.split('');

  const LETTER_COLORS = {
    E: 'var(--color-E)', I: 'var(--color-E)',
    N: 'var(--color-O)', S: 'var(--color-O)',
    F: 'var(--color-A)', T: 'var(--color-A)',
    J: 'var(--color-C)', P: 'var(--color-C)',
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.typeBadge}>
          {letters.map((l, i) => (
            <span key={i} className={styles.typeLetter} style={{ color: LETTER_COLORS[l] }}>
              {l}
            </span>
          ))}
        </div>
        <div className={styles.typeInfo}>
          <div className={styles.typeTitle}>{mbti.title}</div>
          <div className={styles.typeTagline}>{mbti.tagline}</div>
        </div>
      </div>

      <p className={styles.typeText}>{mbti.text}</p>

      <div className={styles.dichotomies}>
        <div className={styles.dichotomiesLabel}>{t('mbti_dichotomies', lang)}</div>
        {Object.entries(mbti.dichotomies).map(([key, data]) => (
          <DichotomyBar key={key} dichotomyKey={key} data={data} />
        ))}
      </div>

      <p className={styles.disclaimer}>{t('mbti_disclaimer', lang)}</p>
    </div>
  );
}
