const express = require('express');
const router = express.Router();
const mbtiQuestions = require('../data/mbtiQuestions');
const { getMBTIDescription } = require('../lib/mbti');

const DICHOTOMIES = ['EI', 'SN', 'TF', 'JP'];

// GET /api/mbti/questions?lang=en|vi
router.get('/questions', (req, res) => {
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = mbtiQuestions.map(({ id, dichotomy, text, text_vi, option_a, option_a_vi, option_b, option_b_vi }) => ({
    id,
    dichotomy,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
});

// POST /api/mbti/submit
// Body: { answers: { "1": "A", "2": "B", ... }, lang: "en"|"vi" }
router.post('/submit', (req, res) => {
  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  // Validate all 32 questions answered with "A" or "B"
  const missing = [];
  const invalid = [];
  for (const q of mbtiQuestions) {
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

  // Score each dichotomy: count A's (maps to first pole)
  const dichotomyScores = {};
  for (const dKey of DICHOTOMIES) {
    const dQuestions = mbtiQuestions.filter(q => q.dichotomy === dKey);
    const aCount = dQuestions.filter(q => answers[String(q.id)] === 'A').length;
    const total  = dQuestions.length; // 8
    const aPole  = dQuestions[0].a_pole;
    const bPole  = dQuestions[0].b_pole;
    const chosen = aCount >= total / 2 ? aPole : bPole;
    // confidence: 0-100 scale (50 = split, 100 = all one side)
    const confidence = Math.round((Math.abs(aCount - (total - aCount)) / total) * 100);
    dichotomyScores[dKey] = {
      left: aPole,
      right: bPole,
      aCount,
      bCount: total - aCount,
      chosen,
      // percentage toward the chosen pole (50-100)
      pct: Math.round((Math.max(aCount, total - aCount) / total) * 100),
      confidence,
    };
  }

  const type = DICHOTOMIES.map(d => dichotomyScores[d].chosen).join('');
  const description = getMBTIDescription(type, lang);
  const mbti = { type, dichotomies: dichotomyScores, ...description };

  res.json({ mbti });
});

module.exports = router;
