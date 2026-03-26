import OceanRadarChart from './OceanRadarChart';
import DimensionCard from './DimensionCard';
import { DIMENSION_ORDER } from '../data/descriptions';
import styles from './Results.module.css';

export default function Results({ results }) {
  const { dimensions, summary } = results;

  // Sort dimensions in OCEAN display order
  const ordered = DIMENSION_ORDER.map((key) =>
    dimensions.find((d) => d.key === key),
  ).filter(Boolean);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>Your Results</div>
          <h1 className={styles.title}>Personality Report</h1>
          <p className={styles.summary}>{summary}</p>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.sectionTitle}>OCEAN Profile</h2>
          <OceanRadarChart dimensions={ordered} />
        </div>

        <h2 className={styles.sectionTitle}>Dimension Breakdown</h2>
        <div className={styles.dimensions}>
          {ordered.map((dim) => (
            <DimensionCard key={dim.key} dim={dim} />
          ))}
        </div>

        <div className={styles.footer}>
          <p>
            Results are based on your self-reported behaviors. The Big Five model is widely used
            in personality psychology research. Scores reflect tendencies, not fixed traits.
          </p>
          <button
            className="btn btn-ghost"
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem' }}
          >
            Take the Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}
