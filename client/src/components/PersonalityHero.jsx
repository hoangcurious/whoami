import styles from './PersonalityHero.module.css';

// ─── Abstract SVG illustrations (one per model) ───────────────────────────────

function MbtiSvg({ color }) {
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="4"  width="29" height="29" rx="6" fill={color} opacity="0.85"/>
      <rect x="39" y="4"  width="29" height="29" rx="6" fill={color} opacity="0.4"/>
      <rect x="4"  y="39" width="29" height="29" rx="6" fill={color} opacity="0.4"/>
      <rect x="39" y="39" width="29" height="29" rx="6" fill={color} opacity="0.65"/>
    </svg>
  );
}

function EnneagramSvg({ color }) {
  // 9 dots in a circle
  const dots = Array.from({ length: 9 }, (_, i) => {
    const angle = (i * 40 - 90) * (Math.PI / 180);
    return [36 + 27 * Math.cos(angle), 36 + 27 * Math.sin(angle)];
  });
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="32" stroke={color} strokeWidth="1.5" opacity="0.25"/>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 5 : 3.5}
          fill={color} opacity={i === 0 ? 1 : 0.45} />
      ))}
    </svg>
  );
}

function DiscSvg({ color }) {
  // 4 bars representing D, I, S, C
  const heights = [52, 38, 28, 44];
  const w = 12; const gap = 4; const x0 = 6;
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {heights.map((h, i) => (
        <rect key={i}
          x={x0 + i * (w + gap)} y={72 - 8 - h}
          width={w} height={h} rx="3"
          fill={color} opacity={i === 0 ? 0.9 : 0.35 + i * 0.1} />
      ))}
    </svg>
  );
}

function AttachmentSvg({ color }) {
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="28" stroke={color} strokeWidth="1.5" opacity="0.2"/>
      <circle cx="36" cy="36" r="19" stroke={color} strokeWidth="1.5" opacity="0.4"/>
      <circle cx="36" cy="36" r="10" fill={color} opacity="0.75"/>
      <circle cx="36" cy="36" r="4"  fill={color} opacity="1"/>
    </svg>
  );
}

function LoveLangSvg({ color }) {
  // 5 overlapping hearts arranged in a small cluster
  const positions = [[36,28],[22,38],[50,38],[28,50],[44,50]];
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {positions.map(([cx, cy], i) => (
        <path key={i}
          d={`M${cx} ${cy+5} C${cx} ${cy+5} ${cx-8} ${cy-2} ${cx-8} ${cy-5} A5 5 0 0 1 ${cx} ${cy+1} A5 5 0 0 1 ${cx+8} ${cy-5} C${cx+8} ${cy-2} ${cx} ${cy+5} ${cx} ${cy+5}Z`}
          fill={color} opacity={0.3 + i * 0.14} />
      ))}
    </svg>
  );
}

function DevtypeSvg({ color }) {
  // Circuit board pattern: 6 nodes connected by lines (one per archetype)
  const nodes = [
    [20, 14], [52, 14],
    [8,  38], [36, 38], [64, 38],
    [36, 62],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 4],
    [2, 3], [3, 4], [3, 5],
  ];
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={color} strokeWidth="1.5" opacity="0.3" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <rect key={i}
          x={cx - 7} y={cy - 7} width="14" height="14" rx="3"
          fill={color} opacity={i === 0 ? 0.9 : 0.2 + i * 0.1} />
      ))}
    </svg>
  );
}

function BigFiveSvg({ color }) {
  // Simple pentagon
  const pts = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180);
    return [36 + 28 * Math.cos(a), 36 + 28 * Math.sin(a)];
  });
  const polygon = pts.map(([x, y]) => `${x},${y}`).join(' ');
  return (
    <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points={polygon} fill={color} opacity="0.18" stroke={color} strokeWidth="1.5"/>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={color} opacity="0.8"/>
      ))}
    </svg>
  );
}

const ILLUSTRATIONS = {
  mbti:       MbtiSvg,
  enneagram:  EnneagramSvg,
  disc:       DiscSvg,
  attachment: AttachmentSvg,
  lovelang:   LoveLangSvg,
  bigfive:    BigFiveSvg,
  devtype:    DevtypeSvg,
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Props:
 *   model      – 'mbti' | 'enneagram' | 'disc' | 'attachment' | 'lovelang' | 'bigfive'
 *   typeLabel  – bold label shown large (e.g. "INTJ", "5w4", "D")
 *   title      – e.g. "The Architect"
 *   tagline    – one-liner description string
 *   color      – accent hex/css color for illustration + type label
 *   famous     – { name, role } object or null
 */
export default function PersonalityHero({ model, typeLabel, title, tagline, color, famous }) {
  const Svg = ILLUSTRATIONS[model] || MbtiSvg;
  const initials = famous ? famous.name.split(' ').map(w => w[0]).slice(0, 2).join('') : '';

  return (
    <div className={styles.hero} style={{ '--hero-color': color, '--hero-color-alpha': `${color}22` }}>
      <div className={styles.top}>
        <div>
          <div className={styles.typeLabel}>{typeLabel}</div>
          {title && <p className={styles.title}>{title}</p>}
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>
        <div className={styles.illustration}>
          <Svg color={color} />
        </div>
      </div>

      {famous && (
        <div className={styles.famous}>
          <div className={styles.famousAvatar}>{initials}</div>
          <span className={styles.famousText}>
            Also: <span className={styles.famousName}>{famous.name}</span>
            {' · '}{famous.role}
          </span>
        </div>
      )}
    </div>
  );
}
