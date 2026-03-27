const enneagramQuestions = require('../../server/data/enneagramQuestions');
const { scoreEnneagram } = require('../../server/lib/enneagram');

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  const missing = [];
  const invalid = [];
  for (const q of enneagramQuestions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) missing.push(q.id);
    else if (val !== 'A' && val !== 'B') invalid.push(q.id);
  }
  if (missing.length > 0) return res.status(400).json({ error: `Missing answers: ${missing.join(', ')}` });
  if (invalid.length > 0) return res.status(400).json({ error: `Invalid values: ${invalid.join(', ')}` });

  const result = scoreEnneagram(answers, enneagramQuestions, lang);
  res.json({ enneagram: result });
};
