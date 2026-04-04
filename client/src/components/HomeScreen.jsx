import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import { AB_MODELS, BF_MODEL } from '../config/models';
import { generateSynthesis, SYNTHESIS_MIN_MODELS } from '../lib/synthesize';
import styles from './HomeScreen.module.css';

const ALL_MODELS = [BF_MODEL, ...AB_MODELS];

// Metadata for each known category
const CATEGORY_CONFIG = {
  personality: { color: '#FFD600', icon: '◈' },
  work:        { color: '#38bdf8', icon: '</>' },
};

function groupByCategory(models) {
  const groups = {};
  for (const m of models) {
    const cat = m.category || 'personality';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(m);
  }
  return groups;
}

function CategoryCard({ categoryId, models, storedResults, onExplore, lang }) {
  const cfg = CATEGORY_CONFIG[categoryId] || { color: '#FFD600', icon: '◈' };
  const total = models.length;
  const completed = models.filter(m => !!storedResults[m.id]).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const allDone = completed === total;

  return (
    <div className={styles.catCard} onClick={onExplore} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onExplore()}>
      <div className={styles.catTop}>
        <span className={styles.catIcon} style={{ color: cfg.color }}>{cfg.icon}</span>
        <span className={styles.catCount}
          style={{ background: allDone ? cfg.color : 'var(--color-surface-2)', borderColor: allDone ? '#000' : '#000' }}>
          {allDone
            ? t('category_all_done', lang)
            : `${completed}/${total} ${t('category_done', lang)}`}
        </span>
      </div>

      <h2 className={styles.catTitle}>{t(`category_${categoryId}`, lang)}</h2>
      <p className={styles.catDesc}>{t(`category_${categoryId}_desc`, lang)}</p>

      <div className={styles.catProgress}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill}
            style={{ width: `${pct}%`, background: cfg.color }} />
        </div>
      </div>

      <div className={styles.catFooter}>
        <span className={styles.catTestCount}>{total} {t('category_tests', lang)}</span>
        <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onExplore(); }}>
          {t('category_explore', lang)} →
        </button>
      </div>
    </div>
  );
}

function SynthesisCard({ storedResults, onView, lang }) {
  const synthesis = generateSynthesis(storedResults, lang);
  const { completedModels, hasEnoughData, constellation } = synthesis;
  const remaining = SYNTHESIS_MIN_MODELS - completedModels.length;

  if (!hasEnoughData) {
    return (
      <div className={`${styles.synthesisCard} ${styles.locked}`}>
        <span className={styles.synthesisIcon}>🔒</span>
        <div className={styles.synthesisBody}>
          <p className={styles.synthesisTitle}>{t('synthesis_card_title', lang)}</p>
          <p className={styles.synthesisDesc}>{t('synthesis_card_desc', lang)}</p>
          <p className={styles.lockedMsg}>{t('synthesis_card_locked', lang, { n: remaining })}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.synthesisCard} onClick={onView} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView()}>
      <span className={styles.synthesisIcon}>✦</span>
      <div className={styles.synthesisBody}>
        <p className={styles.synthesisTitle}>{t('synthesis_card_title', lang)}</p>
        <p className={styles.synthesisDesc}>{t('synthesis_card_desc', lang)}</p>
        {constellation.length > 0 && (
          <div className={styles.synthesisChips}>
            {constellation.map(item => (
              <span key={item.id} className={styles.synthesisChip}
                style={{ color: item.color, borderColor: item.color }}>
                {item.label}
              </span>
            ))}
          </div>
        )}
      </div>
      <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onView(); }}>
        {t('synthesis_card_view', lang)}
      </button>
    </div>
  );
}

export default function HomeScreen({ storedResults, onCategoryClick, onSynthesisClick }) {
  const { lang } = useLang();
  const grouped = groupByCategory(ALL_MODELS);
  const categoryOrder = ['personality', 'work', ...Object.keys(grouped).filter(k => k !== 'personality' && k !== 'work')];
  const categories = categoryOrder.filter(k => grouped[k]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.badge}>{t('home_badge', lang)}</div>
        <h1 className={styles.title}>{t('title', lang)}</h1>
        <p className={styles.subtitle}>{t('home_subtitle', lang)}</p>

        <div className={styles.categoryGrid}>
          {categories.map(catId => (
            <CategoryCard
              key={catId}
              categoryId={catId}
              models={grouped[catId]}
              storedResults={storedResults}
              onExplore={() => onCategoryClick(catId)}
              lang={lang}
            />
          ))}
        </div>

        <SynthesisCard
          storedResults={storedResults}
          onView={onSynthesisClick}
          lang={lang}
        />

        <div className={styles.meta}>
          <span>{t('meta_signup', lang)}</span>
        </div>
      </div>
    </div>
  );
}
