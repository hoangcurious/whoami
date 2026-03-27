const express = require('express');
const router = express.Router();
const loveLangQuestions = require('../data/loveLangQuestions');
const { scoreLoveLang } = require('../lib/loveLang');

// GET /api/lovelang/questions?lang=en|vi
router.get('/questions', (req, res) => {
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = loveLangQuestions.map(({ id, lang_a, lang_b, text, text_vi, option_a, option_a_vi, option_b, option_b_vi }) => ({
    id,
    lang_a,
    lang_b,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
});

// POST /api/lovelang/submit
// Body: { answers: { "1": "A", "2": "B", ... }, lang: "en"|"vi" }
router.post('/submit', (req, res) => {
  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  // Validate all 30 questions answered with "A" or "B"
  const missing = [];
  const invalid = [];
  for (const q of loveLangQuestions) {
    const val = answers[String(q.id)];
    if (val === undefined || val === null) {
      missing.push(q.id);
    } else if (val !== 'A' && val !== 'B') {
      invalid.push(q.id);
    }
  }

  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing answers for question IDs: ${missing.join(', ')}` });
  }
  if (invalid.length > 0) {
    return res.status(400).json({ error: `Invalid values for IDs: ${invalid.join(', ')}. Must be "A" or "B".` });
  }

  const loveLang = scoreLoveLang(answers, loveLangQuestions, lang);
  res.json({ loveLang });
});

module.exports = router;
