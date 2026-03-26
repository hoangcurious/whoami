import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = {
  O: '#a78bfa',
  C: '#34d399',
  E: '#fb923c',
  A: '#f472b6',
  N: '#60a5fa',
};

export default function OceanRadarChart({ dimensions }) {
  const data = dimensions.map((d) => ({
    subject: d.name,
    score: d.score,
    key: d.key,
    fullMark: 100,
  }));

  return (
    <div style={{ width: '100%', height: 340 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#8b90b0', fontSize: 13, fontFamily: 'Inter, sans-serif' }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#7c83f7"
            fill="#7c83f7"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: '#1a1d27',
              border: '1px solid #2e3450',
              borderRadius: '8px',
              color: '#e8eaf6',
              fontSize: '0.875rem',
            }}
            formatter={(value) => [`${value}%`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
