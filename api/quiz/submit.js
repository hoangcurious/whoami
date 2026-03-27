const questions = require('../../server/data/questions');
const { scoreAll, DIMENSION_NAMES } = require('../../server/lib/scoring');
const { getDimensionDescription, buildSummary } = require('../../server/lib/summaryText');
const { deriveMBTI, getMBTIDescription } = require('../../server/lib/mbti');

const DIMENSION_NAMES_VI = {
  O: 'Sự cởi mở',
  C: 'Sự tận tâm',
  E: 'Hướng ngoại',
  A: 'Sự hòa hợp',
  N: 'Sự nhạy cảm',
};

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  const missing = [];
  const invalid = [];
  for (const q of questions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) {
      missing.push(q.id);
    } else {
      const num = Number(val);
      if (!Number.isInteger(num) || num < 1 || num > 5) {
        invalid.push(q.id);
      }
    }
  }

  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing answers for question IDs: ${missing.join(', ')}` });
  }
  if (invalid.length > 0) {
    return res.status(400).json({ error: `Invalid values for question IDs: ${invalid.join(', ')}. Values must be 1–5.` });
  }

  const scores = scoreAll(answers);
  const summary = buildSummary(scores, lang);
  const dimNames = lang === 'vi' ? DIMENSION_NAMES_VI : DIMENSION_NAMES;

  const dimensions = Object.entries(scores).map(([dim, score]) => ({
    key: dim,
    name: dimNames[dim],
    score,
    ...getDimensionDescription(dim, score, lang),
  }));

  const { type: mbtiType, dichotomies } = deriveMBTI(scores);
  const mbtiDescription = getMBTIDescription(mbtiType, lang);
  const mbti = { type: mbtiType, dichotomies, ...mbtiDescription };

  res.json({ scores, dimensions, summary, mbti });
};
