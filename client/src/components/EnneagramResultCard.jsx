import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import { FAMOUS } from '../data/famousPersons';
import styles from './EnneagramResultCard.module.css';

const TYPE_COLORS = {
  1: '#FF3D3D', 2: '#FF6B00', 3: '#FFD600',
  4: '#B413EC', 5: '#2979FF', 6: '#00C896',
  7: '#00E676', 8: '#F50057', 9: '#546E7A',
};

export default function EnneagramResultCard({ results }) {
  const { lang } = useLang();
  const { enneagram } = results;
  const { type, wing, scores, title, tagline, text } = enneagram;
  const color = TYPE_COLORS[type];
  const maxScore = 4; // 4 questions per type

  return (
    <div className={styles.card}>
      <PersonalityHero
        model="enneagram"
        typeLabel={wing ? `${type}w${wing}` : `${type}`}
        title={title}
        tagline={tagline}
        color={color}
        famous={FAMOUS.enneagram[type] || null}
      />

      <p className={styles.typeText}>{text}</p>

      <div className={styles.scoresSection}>
        <div className={styles.scoresLabel}>{t('enneagram_all_types', lang)}</div>
        <div className={styles.bars}>
          {Object.entries(scores)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([num, score]) => {
              const pct = Math.round((score / maxScore) * 100);
              const isActive = Number(num) === type;
              return (
                <div key={num} className={styles.barRow}>
                  <span className={`${styles.barLabel} ${isActive ? styles.barLabelActive : ''}`}>
                    {num}
                  </span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${pct}%`,
                        background: isActive ? TYPE_COLORS[Number(num)] : 'var(--color-surface-2)',
                        opacity: isActive ? 1 : 0.6,
                      }}
                    />
                  </div>
                  <span className={styles.barPct}>{score}/{maxScore}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
