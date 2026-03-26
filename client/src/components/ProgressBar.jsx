import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total, answeredCount, totalQuestions }) {
  const { lang } = useLang();
  const answeredPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.labels}>
        <span>{t('page_of', lang, { current: current + 1, total })}</span>
        <span>{t('answered_of', lang, { answered: answeredCount, total: totalQuestions })}</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${answeredPercent}%` }} />
      </div>
    </div>
  );
}
