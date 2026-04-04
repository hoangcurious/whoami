const express = require('express');
const router = express.Router();
const devtypeQuestions = require('../data/devtypeQuestions');
const { scoreDevtype } = require('../lib/devtype');

// GET /api/devtype/questions?lang=en|vi
router.get('/questions', (req, res) => {
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = devtypeQuestions.map(({
    id, dimension, a_pole, b_pole,
    text, text_vi, option_a, option_a_vi, option_b, option_b_vi,
  }) => ({
    id,
    dimension,
    a_pole,
    b_pole,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
});

// POST /api/devtype/submit
// Body: { answers: { "1": "A"|"B", ... }, lang: "en"|"vi" }
router.post('/submit', (req, res) => {
  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  const missing = [];
  const invalid = [];
  for (const q of devtypeQuestions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) missing.push(q.id);
    else if (val !== 'A' && val !== 'B') invalid.push(q.id);
  }
  if (missing.length > 0) return res.status(400).json({ error: `Missing answers: ${missing.join(', ')}` });
  if (invalid.length > 0) return res.status(400).json({ error: `Invalid values: ${invalid.join(', ')}` });

  const result = scoreDevtype(answers, devtypeQuestions, lang);
  res.json({ devtype: result });
});

module.exports = router;
