const mbtiQuestions = require('../../server/data/mbtiQuestions');
const { getMBTIDescription } = require('../../server/lib/mbti');

const DICHOTOMIES = ['EI', 'SN', 'TF', 'JP'];

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  const missing = [];
  const invalid = [];
  for (const q of mbtiQuestions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) missing.push(q.id);
    else if (val !== 'A' && val !== 'B') invalid.push(q.id);
  }

  if (missing.length > 0) return res.status(400).json({ error: `Missing answers: ${missing.join(', ')}` });
  if (invalid.length > 0) return res.status(400).json({ error: `Invalid values: ${invalid.join(', ')}` });

  const dichotomyScores = {};
  for (const dKey of DICHOTOMIES) {
    const dQuestions = mbtiQuestions.filter(q => q.dichotomy === dKey);
    const aCount = dQuestions.filter(q => answers[String(q.id)] === 'A').length;
    const total  = dQuestions.length;
    const aPole  = dQuestions[0].a_pole;
    const bPole  = dQuestions[0].b_pole;
    const chosen = aCount >= total / 2 ? aPole : bPole;
    dichotomyScores[dKey] = {
      left: aPole, right: bPole, aCount, bCount: total - aCount, chosen,
      pct: Math.round((Math.max(aCount, total - aCount) / total) * 100),
      confidence: Math.round((Math.abs(aCount - (total - aCount)) / total) * 100),
    };
  }

  const type = DICHOTOMIES.map(d => dichotomyScores[d].chosen).join('');
  const description = getMBTIDescription(type, lang);
  res.json({ mbti: { type, dichotomies: dichotomyScores, ...description } });
};
