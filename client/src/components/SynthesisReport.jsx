import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import { generateSynthesis } from '../lib/synthesize';
import { getSynthesisFamous } from '../data/famousPersons';
import ShareButton from './ShareButton';
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

function PentagonChart({ dimensions, labels }) {
  const guideVerts = AXES.map(a => ptAt(R, a.angleDeg));
  const balanceVerts = AXES.map(a => ptAt(R * 0.5, a.angleDeg));

  const dimMap = Object.fromEntries((dimensions || []).map(d => [d.id, d]));
  const userVerts = AXES.map(a => {
    const dim = dimMap[a.id];
    const score = dim?.score ?? 50;
    return ptAt((score / 100) * R, a.angleDeg);
  });

  const firstColor = (dimensions || []).find(d => d.accentColor)?.accentColor || '#60a5fa';

  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="pgFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={firstColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={firstColor} stopOpacity="0.1" />
        </radialGradient>
      </defs>
      {AXES.map((a) => {
        const [x, y] = ptAt(R, a.angleDeg);
        return <line key={a.id} x1={CX} y1={CY} x2={x} y2={y}
          stroke="var(--color-border, #334155)" strokeWidth="1" />;
      })}
      <polygon points={toPolygon(guideVerts)}
        fill="none" stroke="var(--color-border, #334155)" strokeWidth="1.5" />
      <polygon points={toPolygon(balanceVerts)}
        fill="none" stroke="var(--color-border, #334155)"
        strokeWidth="1" strokeDasharray="4 3" />
      <polygon points={toPolygon(userVerts)}
        fill="url(#pgFill)" stroke={firstColor} strokeWidth="2" />
      {AXES.map((a, i) => {
        const [lx, ly] = ptAt(LABEL_R, a.angleDeg);
        return (
          <text key={a.id} x={lx.toFixed(2)} y={ly.toFixed(2)}
            textAnchor={textAnchor(a.angleDeg)} dominantBaseline="middle"
            fontSize="11" fill="var(--color-text-muted, #94a3b8)" fontFamily="inherit">
            {labels?.[i] ?? a.id}
          </text>
        );
      })}
    </svg>
  );
}

// ── Dimension SVG icons ───────────────────────────────────────────────────────

const DIM_ICONS = {
  energy: ({ color }) => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="6" fill={color} opacity="0.9"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const a = deg * Math.PI / 180;
        const x1 = 18 + 9  * Math.cos(a); const y1 = 18 + 9  * Math.sin(a);
        const x2 = 18 + 14 * Math.cos(a); const y2 = 18 + 14 * Math.sin(a);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round"/>;
      })}
    </svg>
  ),
  mind: ({ color }) => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[4,11,18,25].map((y, i) => (
        <rect key={i} x={i % 2 === 0 ? 6 : 10} y={y} width={i % 2 === 0 ? 24 : 16} height="4" rx="2" fill={color} opacity={0.4 + i * 0.18}/>
      ))}
    </svg>
  ),
  relationships: ({ color }) => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="18" r="9" fill={color} opacity="0.35" stroke={color} strokeWidth="1.5"/>
      <circle cx="23" cy="18" r="9" fill={color} opacity="0.35" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  drive: ({ color }) => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28 L18 8 L28 28" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M12 22 L18 8 L24 22" fill={color} opacity="0.35"/>
      <circle cx="18" cy="8" r="3" fill={color}/>
    </svg>
  ),
  resilience: ({ color }) => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4 L32 10 V18 C32 25 25 30 18 32 C11 30 4 25 4 18 V10 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 18 L16 22 L24 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

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

export default function SynthesisReport({ storedResults, onBack, readOnly }) {
  const { lang } = useLang();
  const synthesis = generateSynthesis(storedResults, lang);
  const { completedModels, constellation, dimensions } = synthesis;
  const famous = getSynthesisFamous(dimensions);
  const initials = famous.name.split(' ').map(w => w[0]).slice(0, 2).join('');
  const pentagonLabels = AXES.map(a => t(`synthesis_section_${a.id}`, lang));
  const totalModels = 6;

  return (
    <div className={styles.page}>
      {/* Back / CTA */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
        {readOnly ? (
          <button className="btn btn-primary" onClick={onBack}>
            {t('share_readonly_cta', lang)}
          </button>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onBack}>
              {t('back_home', lang)}
            </button>
            <ShareButton modelId="synthesis" data={storedResults} />
          </>
        )}
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

      {/* Famous person banner */}
      <div className={styles.famousBanner}>
        <div className={styles.famousAvatar}>{initials}</div>
        <div className={styles.famousBody}>
          <p className={styles.famousEyebrow}>{t('synthesis_echoes', lang)}</p>
          <p className={styles.famousName}>{famous.name}</p>
          <p className={styles.famousRole}>{famous.role}</p>
          {famous.quote && <p className={styles.famousQuote}>"{famous.quote}"</p>}
        </div>
      </div>

      {/* Pentagon chart */}
      <div className={styles.chartWrap}>
        <PentagonChart dimensions={dimensions} labels={pentagonLabels} />
      </div>

      {/* Insight cards */}
      <div className={styles.cards}>
        {dimensions.map(dim => (
          <div key={dim.id} className={styles.card}>
            <div className={styles.cardAccent} style={{ background: dim.accentColor }} />
            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <p className={styles.cardDimLabel}>
                  {t(`synthesis_section_${dim.id}`, lang)}
                </p>
                {DIM_ICONS[dim.id] && (
                  <div className={styles.cardIcon}>
                    {DIM_ICONS[dim.id]({ color: dim.accentColor })}
                  </div>
                )}
              </div>
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
