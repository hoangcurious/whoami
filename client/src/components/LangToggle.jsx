import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './LangToggle.module.css';

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button className={styles.toggle} onClick={toggleLang} title="Switch language">
      {t('lang_label', lang)}
    </button>
  );
}
