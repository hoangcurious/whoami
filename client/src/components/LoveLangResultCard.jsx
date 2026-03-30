import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import PersonalityHero from './PersonalityHero';
import { FAMOUS } from '../data/famousPersons';
import styles from './LoveLangResultCard.module.css';

const LANG_COLORS = {
  words:   '#a78bfa',
  service: '#34d399',
  gifts:   '#fb923c',
  time:    '#60a5fa',
  touch:   '#f472b6',
};

const RANK_LABELS = ['1st', '2nd', '3rd', '4th', '5th'];
const RANK_LABELS_VI = ['1.', '2.', '3.', '4.', '5.'];

export default function LoveLangResultCard({ results }) {
  const { lang } = useLang();
  const { loveLang } = results;
  const { ranked } = loveLang;
  const top = ranked[0];
  const maxPct = ranked[0]?.pct ?? 100;

  return (
    <div className={styles.card}>
      <PersonalityHero
        model="lovelang"
        typeLabel={t(`lovelang_short_${top.lang}`, lang)}
        title={top.title}
        tagline={top.tagline}
        color={LANG_COLORS[top.lang]}
        famous={FAMOUS.lovelang[top.lang] || null}
      />

      <p className={styles.typeText}>{top.text}</p>

      {/* All 5 ranked */}
      <div className={styles.scoresSection}>
        <div className={styles.scoresLabel}>{t('lovelang_ranking', lang)}</div>
        <div className={styles.bars}>
          {ranked.map((item, i) => {
            const color = LANG_COLORS[item.lang];
            const relPct = maxPct > 0 ? Math.round((item.pct / maxPct) * 100) : 0;
            return (
              <div key={item.lang} className={styles.barRow}>
                <span className={styles.rankLabel} style={{ color: i === 0 ? color : undefined }}>
                  {lang === 'vi' ? RANK_LABELS_VI[i] : RANK_LABELS[i]}
                </span>
                <span className={`${styles.barLabel} ${i === 0 ? styles.barLabelActive : ''}`}>
                  {item.title}
                </span>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${relPct}%`,
                      background: color,
                      opacity: i === 0 ? 0.9 : 0.4,
                    }}
                  />
                </div>
                <span className={styles.barScore}>{item.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
