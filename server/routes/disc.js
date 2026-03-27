const express = require('express');
const router = express.Router();
const discQuestions = require('../data/discQuestions');
const { scoreDisc, getDiscDescription } = require('../lib/disc');

// GET /api/disc/questions?lang=en|vi
// Returns the 28 questions with text resolved to the requested language.
router.get('/questions', (req, res) => {
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = discQuestions.map(({ id, style, text, text_vi, option_a, option_a_vi, option_b, option_b_vi }) => ({
    id,
    style,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
});

// POST /api/disc/submit
// Body: { answers: { "1": "A", "2": "B", ... }, lang: "en"|"vi" }
// Returns: { disc: { primary, secondary, scores, pcts, title, tagline, text } }
router.post('/submit', (req, res) => {
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

  // Score and build result
  const result = scoreDisc(answers, discQuestions);
  const description = getDiscDescription(result.primary, lang);

  const disc = {
    primary:   result.primary,
    secondary: result.secondary,
    scores:    result.scores,
    pcts:      result.pcts,
    title:     description.title,
    tagline:   description.tagline,
    text:      description.text,
  };

  res.json({ disc });
});

module.exports = router;
