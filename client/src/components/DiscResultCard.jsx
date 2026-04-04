import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import { FAMOUS } from '../data/famousPersons';
import styles from './DiscResultCard.module.css';

const STYLE_COLORS = {
  D: '#FF3D3D',
  I: '#FFD600',
  S: '#00C896',
  C: '#2979FF',
};

const STYLE_ORDER = ['D', 'I', 'S', 'C'];

export default function DiscResultCard({ results }) {
  const { lang } = useLang();
  const { disc } = results;
  const { primary, secondary, pcts, title, tagline, text } = disc;

  return (
    <div className={styles.card}>
      <PersonalityHero
        model="disc"
        typeLabel={primary}
        title={title}
        tagline={tagline}
        color={STYLE_COLORS[primary]}
        famous={FAMOUS.disc[primary] || null}
      />

      <p className={styles.typeText}>{text}</p>

      <div className={styles.scoresSection}>
        <div className={styles.scoresLabel}>{t('disc_profile', lang)}</div>
        <div className={styles.bars}>
          {STYLE_ORDER.map((s) => {
            const pct = pcts[s] ?? 0;
            const isActive = s === primary || s === secondary;
            return (
              <div key={s} className={styles.barRow}>
                <span
                  className={`${styles.barLabel} ${isActive ? styles.barLabelActive : ''}`}
                  style={{ color: isActive ? STYLE_COLORS[s] : undefined }}
                >
                  {s}
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${pct}%`,
                      background: STYLE_COLORS[s],
                      opacity: isActive ? 0.9 : 0.35,
                    }}
                  />
                </div>
                <span className={styles.barPct}>{pct}%</span>
              </div>
            );
          })}
        </div>
        {secondary && (
          <div className={styles.secondaryNote}>
            {t('disc_secondary', lang)}: <strong style={{ color: STYLE_COLORS[secondary] }}>{secondary}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
