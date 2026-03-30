import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import { generateSynthesis } from '../lib/synthesize';
import styles from './SynthesisReport.module.css';

// ── Pentagon chart ────────────────────────────────────────────────────────────
// 5 axes at fixed angles (regular pentagon, top vertex = energy at −90°)
const AXES = [
  { id: 'energy',        angleDeg: -90  },
  { id: 'mind',          angleDeg: -18  },
  { id: 'relationships', angleDeg:  54  },
  { id: 'drive',         angleDeg: 126  },
  { id: 'resilience',    angleDeg: 198  },
];

const DEG = Math.PI / 180;
const CX = 160;
const CY = 160;
const R  = 110;
const LABEL_R = R + 22;

function ptAt(r, angleDeg) {
  const a = angleDeg * DEG;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function toPolygon(pts) {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
}

function textAnchor(angleDeg) {
  const norm = ((angleDeg % 360) + 360) % 360;
  if (norm < 20 || norm > 340) return 'middle';
  if (norm < 160) return 'start';
  if (norm < 200) return 'middle';
  return 'end';
}

function PentagonChart({ dimensions }) {
  const guideVerts = AXES.map(a => ptAt(R, a.angleDeg));
  const balanceVerts = AXES.map(a => ptAt(R * 0.5, a.angleDeg));

  // Build user polygon — match dimensions array order to AXES order
  const dimMap = Object.fromEntries((dimensions || []).map(d => [d.id, d]));
  const userVerts = AXES.map(a => {
    const dim = dimMap[a.id];
    const score = dim?.score ?? 50; // default to centre if no data
    return ptAt((score / 100) * R, a.angleDeg);
  });

  // Accent colour blend — use first available colour or fallback
  const firstColor = (dimensions || []).find(d => d.accentColor)?.accentColor || '#60a5fa';

  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pgFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={firstColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={firstColor} stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {/* Axis lines */}
      {AXES.map((a) => {
        const [x, y] = ptAt(R, a.angleDeg);
        return (
          <line key={a.id} x1={CX} y1={CY} x2={x} y2={y}
            stroke="var(--color-border, #334155)" strokeWidth="1" />
        );
      })}

      {/* Guide pentagon */}
      <polygon points={toPolygon(guideVerts)}
        fill="none" stroke="var(--color-border, #334155)" strokeWidth="1.5" />

      {/* Balance ring (50%) */}
      <polygon points={toPolygon(balanceVerts)}
        fill="none" stroke="var(--color-border, #334155)"
        strokeWidth="1" strokeDasharray="4 3" />

      {/* User polygon */}
      <polygon points={toPolygon(userVerts)}
        fill="url(#pgFill)" stroke={firstColor} strokeWidth="2" />

      {/* Labels */}
      {AXES.map((a) => {
        const [lx, ly] = ptAt(LABEL_R, a.angleDeg);
        const anchor = textAnchor(a.angleDeg);
        return (
          <text key={a.id} x={lx.toFixed(2)} y={ly.toFixed(2)}
            textAnchor={anchor} dominantBaseline="middle"
            fontSize="11" fill="var(--color-text-muted, #94a3b8)" fontFamily="inherit">
            {a.id}
          </text>
        );
      })}
    </svg>
  );
}

// ── Source badge display names ────────────────────────────────────────────────

const SOURCE_NAMES = {
  bigfive:    'Big Five',
  mbti:       'MBTI',
  enneagram:  'Enneagram',
  disc:       'DISC',
  attachment: 'Attachment',
  lovelang:   'Love Lang',
};

// ── Main component ────────────────────────────────────────────────────────────

export default function SynthesisReport({ storedResults, onBack }) {
  const { lang } = useLang();
  const synthesis = generateSynthesis(storedResults, lang);
  const { completedModels, constellation, dimensions } = synthesis;
  const totalModels = 6;

  return (
    <div className={styles.page}>
      {/* Back */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn btn-ghost" onClick={onBack}>
          {t('back_home', lang)}
        </button>
      </div>

      {/* Header */}
      <div className={styles.badge}>{t('synthesis_badge', lang)}</div>
      <h1 className={styles.title}>{t('synthesis_title', lang)}</h1>
      <p className={styles.subtitle}>
        {t('synthesis_subtitle', lang, { count: completedModels.length })}
      </p>

      {/* Constellation chips */}
      {constellation.length > 0 && (
        <div className={styles.constellation}>
          {constellation.map(item => (
            <span key={item.id} className={styles.chip}
              style={{ color: item.color, borderColor: item.color }}>
              {item.label}
            </span>
          ))}
        </div>
      )}

      {/* Pentagon chart */}
      <div className={styles.chartWrap}>
        <PentagonChart dimensions={dimensions} />
      </div>

      {/* Insight cards */}
      <div className={styles.cards}>
        {dimensions.map(dim => (
          <div key={dim.id} className={styles.card}>
            <div className={styles.cardAccent} style={{ background: dim.accentColor }} />
            <div className={styles.cardBody}>
              <p className={styles.cardDimLabel}>
                {t(`synthesis_section_${dim.id}`, lang)}
              </p>
              {dim.archetype ? (
                <>
                  <p className={styles.cardArchetypeLabel}>{dim.archetype.label}</p>
                  <p className={styles.cardTagline}>{dim.archetype.tagline}</p>
                  <p className={styles.cardText}>{dim.archetype.text}</p>
                </>
              ) : (
                <p className={styles.cardText} style={{ color: 'var(--color-text-muted)' }}>
                  {t('synthesis_complete_more', lang)}
                </p>
              )}
              {dim.sources.length > 0 && (
                <div className={styles.sourceBadges}>
                  <span className={styles.sourceLabel}>{t('synthesis_sources', lang)}</span>
                  {dim.sources.map(s => (
                    <span key={s} className={styles.sourceBadge}>
                      {SOURCE_NAMES[s] || s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p>{t('synthesis_footer', lang, { completed: completedModels.length, total: totalModels })}</p>
        {completedModels.length < totalModels && (
          <p>{t('synthesis_complete_more', lang)}</p>
        )}
      </div>
    </div>
  );
}
