import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './Welcome.module.css';

export default function Welcome({ onStart }) {
  const { lang } = useLang();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.badge}>{t('badge', lang)}</div>
        <h1 className={styles.title}>{t('title', lang)}</h1>
        <p className={styles.subtitle}>
          {t('subtitle_1', lang)}{' '}
          <strong>{t('subtitle_model', lang)}</strong>{' '}
          {t('subtitle_2', lang)}{' '}
          <strong>{t('subtitle_3', lang)}</strong>{' '}
          {t('subtitle_4', lang)}
        </p>

        {/* What you'll receive */}
        <div className={styles.reportsRow}>
          <div className={styles.reportCard}>
            <div className={styles.reportIcon}>
              {['O','C','E','A','N'].map((l, i) => (
                <span key={i} className={styles.reportIconLetter} style={{ color: `var(--color-${l})` }}>{l}</span>
              ))}
            </div>
            <div className={styles.reportName}>{t('welcome_bigfive_title', lang)}</div>
            <div className={styles.reportDesc}>{t('welcome_bigfive_desc', lang)}</div>
          </div>

          <div className={styles.reportPlus}>+</div>

          <div className={styles.reportCard}>
            <div className={styles.reportIcon}>
              {['I','N','T','J'].map((l, i) => (
                <span key={i} className={styles.reportIconLetter} style={{ opacity: 0.55 + i * 0.15 }}>{l}</span>
              ))}
            </div>
            <div className={styles.reportName}>{t('welcome_mbti_title', lang)}</div>
            <div className={styles.reportDesc}>{t('welcome_mbti_desc', lang)}</div>
          </div>
        </div>

        {/* OCEAN dimension list */}
        <div className={styles.dimensions}>
          {[
            { key: 'O', labelKey: 'dim_O', descKey: 'dim_O_desc' },
            { key: 'C', labelKey: 'dim_C', descKey: 'dim_C_desc' },
            { key: 'E', labelKey: 'dim_E', descKey: 'dim_E_desc' },
            { key: 'A', labelKey: 'dim_A', descKey: 'dim_A_desc' },
            { key: 'N', labelKey: 'dim_N', descKey: 'dim_N_desc' },
          ].map(({ key, labelKey, descKey }) => (
            <div key={key} className={`${styles.dimChip} ${styles[`dim${key}`]}`}>
              <span className={styles.dimKey}>{key}</span>
              <div>
                <div className={styles.dimLabel}>{t(labelKey, lang)}</div>
                <div className={styles.dimDesc}>{t(descKey, lang)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.meta}>
          <span>{t('meta_time', lang)}</span>
          <span>·</span>
          <span>{t('meta_questions', lang)}</span>
          <span>·</span>
          <span>{t('meta_signup', lang)}</span>
        </div>

        <button className={`btn btn-primary ${styles.startBtn}`} onClick={onStart}>
          {t('startQuiz', lang)}
        </button>
      </div>
    </div>
  );
}
