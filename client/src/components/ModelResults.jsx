import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './ModelResults.module.css';

/**
 * Generic results page wrapper for all A/B personality models.
 * Renders a header + the model-specific ResultCard + footer.
 *
 * Props:
 *   model      – model config entry from models.js (id, etc.)
 *   ResultCard – the model-specific card component
 *   results    – raw API response object
 *   onBack     – () => void
 *   onRetake   – () => void
 */
export default function ModelResults({ model, ResultCard, results, onBack, onRetake }) {
  const { lang } = useLang();
  const id = model.id;

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>{t(`model_${id}_badge`, lang)}</div>
          <h1 className={styles.title}>{t(`model_${id}_results_title`, lang)}</h1>
          <p className={styles.subtitle}>{t(`model_${id}_results_subtitle`, lang)}</p>
        </div>

        <ResultCard results={results} />

        <div className={styles.footer}>
          <p className={styles.footerNote}>{t(`model_${id}_footer_note`, lang)}</p>
          <div className={styles.footerActions}>
            <button className="btn btn-ghost" onClick={onRetake}>
              {t('retake', lang)}
            </button>
            <button className="btn btn-primary" onClick={onBack}>
              {t('back_home', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
