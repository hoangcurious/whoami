import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import MbtiResultCard from './MbtiResultCard';
import styles from './MbtiResults.module.css';

export default function MbtiResults({ results, onBack, onRetake }) {
  const { lang } = useLang();
  const { mbti } = results;

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>{t('mbti_results_badge', lang)}</div>
          <h1 className={styles.title}>{t('mbti_results_title', lang)}</h1>
          <p className={styles.subtitle}>{t('mbti_results_subtitle', lang)}</p>
        </div>

        <MbtiResultCard mbti={mbti} />

        <div className={styles.footer}>
          <p className={styles.footerNote}>{t('mbti_footer_note', lang)}</p>
          <div className={styles.footerActions}>
            <button className="btn btn-ghost" onClick={onRetake}>
              {t('mbti_retake', lang)}
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
