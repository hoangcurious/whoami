const discQuestions = require('../../server/data/discQuestions');
const { scoreDisc, getDiscDescription } = require('../../server/lib/disc');

// Vercel serverless function — mirrors POST /api/disc/submit
// Body: { answers: { "1": "A", "2": "B", ... }, lang: "en"|"vi" }
// Returns: { disc: { primary, secondary, scores, pcts, title, tagline, text } }
module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  // Validate all 28 questions are answered with "A" or "B"
  const missing = [];
  const invalid = [];
  for (const q of discQuestions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) missing.push(q.id);
    else if (val !== 'A' && val !== 'B') invalid.push(q.id);
  }

  if (missing.length > 0) return res.status(400).json({ error: `Missing answers for question IDs: ${missing.join(', ')}` });
  if (invalid.length > 0) return res.status(400).json({ error: `Invalid values for IDs: ${invalid.join(', ')}. Must be "A" or "B".` });

  // Score and build result
  const result = scoreDisc(answers, discQuestions);
  const description = getDiscDescription(result.primary, lang);

  res.json({
    disc: {
      primary:   result.primary,
      secondary: result.secondary,
      scores:    result.scores,
      pcts:      result.pcts,
      title:     description.title,
      tagline:   description.tagline,
      text:      description.text,
    },
  });
};
