import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import styles from './DevtypeResultCard.module.css';

const TYPE_COLORS = {
  ARCH:  '#38bdf8',
  CRAFT: '#34d399',
  HACK:  '#f87171',
  EXPL:  '#a78bfa',
  PRAG:  '#fb923c',
  MENT:  '#f472b6',
};

const TYPE_ORDER = ['ARCH', 'CRAFT', 'HACK', 'EXPL', 'PRAG', 'MENT'];

export default function DevtypeResultCard({ results }) {
  const { lang } = useLang();
  const { devtype } = results;
  const { primary, secondary, pcts, title, tagline, text } = devtype;

  return (
    <div className={styles.card}>
      <PersonalityHero
        model="devtype"
        typeLabel={t(`devtype_abbr_${primary}`, lang)}
        title={title}
        tagline={tagline}
        color={TYPE_COLORS[primary]}
        famous={null}
      />

      <p className={styles.typeText}>{text}</p>

      <div className={styles.scoresSection}>
        <div className={styles.scoresLabel}>{t('devtype_profile', lang)}</div>
        <div className={styles.bars}>
          {TYPE_ORDER.map((type) => {
            const pct = pcts[type] ?? 0;
            const isActive = type === primary || type === secondary;
            return (
              <div key={type} className={styles.barRow}>
                <span
                  className={`${styles.barLabel} ${isActive ? styles.barLabelActive : ''}`}
                  style={{ color: isActive ? TYPE_COLORS[type] : undefined }}
                >
                  {t(`devtype_abbr_${type}`, lang)}
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${pct}%`,
                      background: TYPE_COLORS[type],
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
            {t('devtype_secondary', lang)}:{' '}
            <strong style={{ color: TYPE_COLORS[secondary] }}>
              {t(`devtype_short_${secondary}`, lang)}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}
