import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import styles from './HomeScreen.module.css';

export default function HomeScreen({
  bfResults,
  mbtiResults,
  onStartBigFive,
  onStartMbti,
  onViewBfResults,
  onViewMbtiResults,
}) {
  const { lang } = useLang();

  const bfDone = !!bfResults;
  const mbtiDone = !!mbtiResults;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.badge}>{t('home_badge', lang)}</div>
        <h1 className={styles.title}>{t('title', lang)}</h1>
        <p className={styles.subtitle}>{t('home_subtitle', lang)}</p>

        <div className={styles.cards}>
          {/* Big Five card */}
          <div className={`${styles.quizCard} ${bfDone ? styles.done : ''}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardIcon}>
                {['O','C','E','A','N'].map((l) => (
                  <span key={l} className={styles.iconLetter} style={{ color: `var(--color-${l})` }}>{l}</span>
                ))}
              </div>
              {bfDone && <span className={styles.doneBadge}>{t('completed', lang)}</span>}
            </div>
            <h2 className={styles.cardTitle}>{t('welcome_bigfive_title', lang)}</h2>
            <p className={styles.cardDesc}>{t('home_bf_desc', lang)}</p>
            <div className={styles.cardMeta}>
              <span>{t('home_bf_questions', lang)}</span>
              <span>·</span>
              <span>{t('home_bf_time', lang)}</span>
            </div>

            {bfDone ? (
              <div className={styles.doneActions}>
                <button className="btn btn-ghost" onClick={onStartBigFive}>
                  {t('retake', lang)}
                </button>
                <button className="btn btn-primary" onClick={onViewBfResults}>
                  {t('view_results', lang)}
                </button>
              </div>
            ) : (
              <button className={`btn btn-primary ${styles.startBtn}`} onClick={onStartBigFive}>
                {t('start_bf', lang)}
              </button>
            )}
          </div>

          {/* MBTI card */}
          <div className={`${styles.quizCard} ${mbtiDone ? styles.done : ''}`}>
            <div className={styles.cardTop}>
              <div className={styles.cardIcon}>
                {mbtiDone
                  ? mbtiResults.mbti.type.split('').map((l, i) => (
                      <span key={i} className={styles.iconLetter} style={{ opacity: 0.55 + i * 0.15 }}>{l}</span>
                    ))
                  : ['?','?','?','?'].map((l, i) => (
                      <span key={i} className={styles.iconLetter} style={{ opacity: 0.3 + i * 0.15 }}>{l}</span>
                    ))
                }
              </div>
              {mbtiDone && <span className={styles.doneBadge}>{t('completed', lang)}</span>}
            </div>
            <h2 className={styles.cardTitle}>{t('welcome_mbti_title', lang)}</h2>
            <p className={styles.cardDesc}>{t('home_mbti_desc', lang)}</p>
            <div className={styles.cardMeta}>
              <span>{t('home_mbti_questions', lang)}</span>
              <span>·</span>
              <span>{t('home_mbti_time', lang)}</span>
            </div>

            {mbtiDone ? (
              <div className={styles.doneActions}>
                <button className="btn btn-ghost" onClick={onStartMbti}>
                  {t('retake', lang)}
                </button>
                <button className="btn btn-primary" onClick={onViewMbtiResults}>
                  {t('view_results', lang)}
                </button>
              </div>
            ) : (
              <button className={`btn btn-primary ${styles.startBtn}`} onClick={onStartMbti}>
                {t('start_mbti', lang)}
              </button>
            )}
          </div>
        </div>

        <div className={styles.meta}>
          <span>{t('meta_signup', lang)}</span>
          <span>·</span>
          <span>{t('home_independent', lang)}</span>
        </div>
      </div>
    </div>
  );
}
