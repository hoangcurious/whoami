import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import OceanRadarChart from './OceanRadarChart';
import DimensionCard from './DimensionCard';
import MBTICard from './MBTICard';
import { DIMENSION_ORDER } from '../data/descriptions';
import styles from './Results.module.css';

export default function Results({ results }) {
  const { lang } = useLang();
  const { dimensions, summary, mbti } = results;

  // Sort dimensions in OCEAN display order
  const ordered = DIMENSION_ORDER.map((key) =>
    dimensions.find((d) => d.key === key),
  ).filter(Boolean);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>{t('your_results', lang)}</div>
          <h1 className={styles.title}>{t('personality_report', lang)}</h1>
          <p className={styles.summary}>{summary}</p>
        </div>

        {/* ── MBTI ── */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('mbti_section', lang)}</h2>
          <span className={styles.sectionSub}>{t('mbti_derived', lang)}</span>
        </div>
        {mbti && <MBTICard mbti={mbti} />}

        {/* ── Big Five ── */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('ocean_profile', lang)}</h2>
        </div>
        <div className={styles.chartCard}>
          <OceanRadarChart dimensions={ordered} />
        </div>

        <h2 className={styles.sectionTitle}>{t('dimension_breakdown', lang)}</h2>
        <div className={styles.dimensions}>
          {ordered.map((dim) => (
            <DimensionCard key={dim.key} dim={dim} />
          ))}
        </div>

        <div className={styles.footer}>
          <p>{t('footer_note', lang)}</p>
          <button
            className="btn btn-ghost"
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
          >
            {t('take_again', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
