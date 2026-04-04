import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import { AB_MODELS, BF_MODEL } from '../config/models';
import { generateSynthesis, SYNTHESIS_MIN_MODELS } from '../lib/synthesize';
import styles from './HomeScreen.module.css';

const ALL_MODELS = [BF_MODEL, ...AB_MODELS];

// Group models by category. Models without a category fall into 'personality'.
function groupByCategory(models) {
  const groups = {};
  for (const m of models) {
    const cat = m.category || 'personality';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(m);
  }
  return groups;
}

function ModelCard({ model, result, onStart, onViewResults, lang }) {
  const done = !!result;
  const id = model.id;

  // Derive icon display for each model
  function renderIcon() {
    if (id === 'bigfive') {
      return ['O', 'C', 'E', 'A', 'N'].map((l) => (
        <span key={l} className={styles.iconLetter} style={{ color: `var(--color-${l})` }}>{l}</span>
      ));
    }
    if (id === 'mbti' && done) {
      return result.mbti.type.split('').map((l, i) => (
        <span key={i} className={styles.iconLetter} style={{ color: model.color, opacity: 0.5 + i * 0.15 }}>{l}</span>
      ));
    }
    if (id === 'enneagram' && done) {
      return <span className={styles.iconLetterBig} style={{ color: model.color }}>{result.enneagram.type}</span>;
    }
    if (id === 'disc' && done) {
      return <span className={styles.iconLetterBig} style={{ color: model.color }}>{result.disc.primary}</span>;
    }
    if (id === 'attachment' && done) {
      const style = result.attachment.primary;
      return <span className={styles.iconLetterBig} style={{ color: model.color }}>{style[0].toUpperCase()}</span>;
    }
    if (id === 'lovelang' && done) {
      const topLang = result.loveLang.ranked[0];
      return (
        <span className={styles.iconLetterSm} style={{ color: model.color }}>
          {t(`lovelang_short_${topLang.lang}`, lang)}
        </span>
      );
    }
    if (id === 'devtype' && done) {
      return (
        <span className={styles.iconLetterSm} style={{ color: model.color }}>
          {result.devtype.primary}
        </span>
      );
    }
    // Default: show model icon text
    return (
      <span className={styles.iconText} style={{ color: model.color }}>
        {model.icon}
      </span>
    );
  }

  return (
    <div className={`${styles.quizCard} ${done ? styles.done : ''}`}>
      <div className={styles.cardTop}>
        <div className={styles.cardIcon}>{renderIcon()}</div>
        {done && <span className={styles.doneBadge}>{t('completed', lang)}</span>}
      </div>
      <h2 className={styles.cardTitle}>{t(`model_${id}_title`, lang)}</h2>
      <p className={styles.cardDesc}>{t(`model_${id}_desc`, lang)}</p>
      <div className={styles.cardMeta}>
        <span>{t(`model_${id}_questions`, lang)}</span>
        <span>·</span>
        <span>{t(`model_${id}_time`, lang)}</span>
      </div>

      {done ? (
        <div className={styles.doneActions}>
          <button className="btn btn-ghost" onClick={() => onStart(id)}>
            {t('retake', lang)}
          </button>
          <button className="btn btn-primary" onClick={() => onViewResults(id)}>
            {t('view_results', lang)}
          </button>
        </div>
      ) : (
        <button className={`btn btn-primary ${styles.startBtn}`} onClick={() => onStart(id)}>
          {t('start_quiz', lang)}
        </button>
      )}
    </div>
  );
}

function SynthesisCard({ storedResults, onStart, onViewResults, lang }) {
  const synthesis = generateSynthesis(storedResults, lang);
  const { completedModels, hasEnoughData, constellation } = synthesis;
  const remaining = SYNTHESIS_MIN_MODELS - completedModels.length;

  if (!hasEnoughData) {
    return (
      <div className={`${styles.synthesisCard} ${styles.locked}`}>
        <div className={styles.synthesisCardLeft}>
          <span className={styles.synthesisIcon}>🔒</span>
          <div>
            <p className={styles.synthesisCardTitle}>{t('synthesis_card_title', lang)}</p>
            <p className={styles.synthesisCardDesc}>{t('synthesis_card_desc', lang)}</p>
            <p className={styles.lockedMsg}>{t('synthesis_card_locked', lang, { n: remaining })}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.synthesisCard}>
      <div className={styles.synthesisCardLeft}>
        <span className={styles.synthesisIcon}>✦</span>
        <div>
          <p className={styles.synthesisCardTitle}>{t('synthesis_card_title', lang)}</p>
          <p className={styles.synthesisCardDesc}>{t('synthesis_card_desc', lang)}</p>
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
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => onViewResults('synthesis')}>
            {t('synthesis_card_view', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen({ storedResults, onStart, onViewResults }) {
  const { lang } = useLang();
  const grouped = groupByCategory(ALL_MODELS);
  const personalityModels = grouped.personality || [];
  const workModels = grouped.work || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.badge}>{t('home_badge', lang)}</div>
        <h1 className={styles.title}>{t('title', lang)}</h1>
        <p className={styles.subtitle}>{t('home_subtitle', lang)}</p>

        {/* Personality category */}
        <section className={styles.categorySection}>
          <h2 className={styles.categoryHeader}>{t('category_personality', lang)}</h2>
          <div className={styles.cards}>
            {personalityModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                result={storedResults[model.id]}
                onStart={onStart}
                onViewResults={onViewResults}
                lang={lang}
              />
            ))}
            <SynthesisCard
              storedResults={storedResults}
              onStart={onStart}
              onViewResults={onViewResults}
              lang={lang}
            />
          </div>
        </section>

        {/* Work & Career category */}
        {workModels.length > 0 && (
          <section className={styles.categorySection}>
            <h2 className={styles.categoryHeader}>{t('category_work', lang)}</h2>
            <div className={styles.cards}>
              {workModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  result={storedResults[model.id]}
                  onStart={onStart}
                  onViewResults={onViewResults}
                  lang={lang}
                />
              ))}
            </div>
          </section>
        )}

        <div className={styles.meta}>
          <span>{t('meta_signup', lang)}</span>
          <span>·</span>
          <span>{t('home_independent', lang)}</span>
        </div>
      </div>
    </div>
  );
}
