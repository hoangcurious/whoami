import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import { FAMOUS } from '../data/famousPersons';
import styles from './AttachmentResultCard.module.css';

const STYLE_COLORS = {
  secure:   '#00C896',
  anxious:  '#FFD600',
  avoidant: '#2979FF',
  fearful:  '#FF6B6B',
};

const STYLE_ORDER = ['secure', 'anxious', 'avoidant', 'fearful'];

export default function AttachmentResultCard({ results }) {
  const { lang } = useLang();
  const { attachment } = results;
  const { primary, pcts, title, tagline, text } = attachment;
  const color = STYLE_COLORS[primary];

  return (
    <div className={styles.card} style={{ '--accent': color }}>
      <PersonalityHero
        model="attachment"
        typeLabel={title}
        tagline={tagline}
        color={color}
        famous={FAMOUS.attachment[primary] || null}
      />

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
