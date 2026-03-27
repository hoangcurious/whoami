import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './AttachmentResultCard.module.css';

const STYLE_COLORS = {
  secure:   '#34d399',
  anxious:  '#fbbf24',
  avoidant: '#60a5fa',
  fearful:  '#f472b6',
};

const STYLE_ORDER = ['secure', 'anxious', 'avoidant', 'fearful'];

export default function AttachmentResultCard({ results }) {
  const { lang } = useLang();
  const { attachment } = results;
  const { primary, pcts, title, tagline, text } = attachment;
  const color = STYLE_COLORS[primary];

  return (
    <div className={styles.card} style={{ '--accent': color }}>
      <div className={styles.header}>
        <div className={styles.typeDot} style={{ background: color }} />
        <div className={styles.typeInfo}>
          <div className={styles.typeTitle} style={{ color }}>{title}</div>
          <div className={styles.typeTagline}>{tagline}</div>
        </div>
      </div>

      <p className={styles.typeText}>{text}</p>

      <div className={styles.scoresSection}>
        <div className={styles.scoresLabel}>{t('attachment_profile', lang)}</div>
        <div className={styles.bars}>
          {STYLE_ORDER.map((s) => {
            const pct = pcts[s] ?? 0;
            const isActive = s === primary;
            return (
              <div key={s} className={styles.barRow}>
                <span className={`${styles.barLabel} ${isActive ? styles.barLabelActive : ''}`}>
                  {t(`attachment_style_${s}`, lang)}
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${pct}%`,
                      background: STYLE_COLORS[s],
                      opacity: isActive ? 0.9 : 0.4,
                    }}
                  />
                </div>
                <span className={styles.barPct}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
