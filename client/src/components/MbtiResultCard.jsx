import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import { FAMOUS } from '../data/famousPersons';
import styles from './MbtiResultCard.module.css';

const DICHOTOMY_ORDER = ['EI', 'SN', 'TF', 'JP'];

const LETTER_COLORS = {
  E: 'var(--color-E)', I: 'var(--color-E)',
  S: 'var(--color-O)', N: 'var(--color-O)',
  T: 'var(--color-A)', F: 'var(--color-A)',
  J: 'var(--color-C)', P: 'var(--color-C)',
};

const DICHOTOMY_COLORS = {
  EI: 'var(--color-E)',
  SN: 'var(--color-O)',
  TF: 'var(--color-A)',
  JP: 'var(--color-C)',
};

function DichotomyBar({ dichotomyKey, data }) {
  const chosenIsLeft = data.chosen === data.left;
  const leftPct = chosenIsLeft ? data.pct : 100 - data.pct;
  const rightPct = chosenIsLeft ? 100 - data.pct : data.pct;
  const color = DICHOTOMY_COLORS[dichotomyKey];

  return (
    <div className={styles.dichotomy}>
      <div className={styles.dichotomyLabels}>
        <span className={`${styles.pole} ${chosenIsLeft ? styles.poleChosen : ''}`}>
          {data.left}
        </span>
        <span className={`${styles.pole} ${!chosenIsLeft ? styles.poleChosen : ''}`}>
          {data.right}
        </span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${leftPct}%`, background: color }}
        />
      </div>
      <div className={styles.dichotomyPcts}>
        <span>{leftPct}%</span>
        <span>{rightPct}%</span>
      </div>
    </div>
  );
}

export default function MbtiResultCard({ mbti }) {
  const { lang } = useLang();
  const letters = mbti.type.split('');

  const accentColor = LETTER_COLORS[letters[0]] || 'var(--color-accent)';

  return (
    <div className={styles.card}>
      <PersonalityHero
        model="mbti"
        typeLabel={mbti.type}
        title={mbti.title}
        tagline={mbti.tagline}
        color={accentColor}
        famous={FAMOUS.mbti[mbti.type] || null}
      />

      <p className={styles.typeText}>{mbti.text}</p>

      <div className={styles.dichotomies}>
        <div className={styles.dichotomiesLabel}>{t('mbti_dichotomies', lang)}</div>
        {DICHOTOMY_ORDER.map((key) => (
          <DichotomyBar key={key} dichotomyKey={key} data={mbti.dichotomies[key]} />
        ))}
      </div>
    </div>
  );
}
