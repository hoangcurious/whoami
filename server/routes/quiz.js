const express = require('express');
const router = express.Router();
const questions = require('../data/questions');
const { scoreAll, DIMENSION_NAMES } = require('../lib/scoring');
const { getDimensionDescription, buildSummary } = require('../lib/summaryText');
const { deriveMBTI, getMBTIDescription } = require('../lib/mbti');

const DIMENSION_NAMES_VI = {
  O: 'Sự cởi mở',
  C: 'Sự tận tâm',
  E: 'Hướng ngoại',
  A: 'Sự hòa hợp',
  N: 'Sự nhạy cảm',
};

// GET /api/quiz/questions?lang=en|vi
// Returns question text + id + dimension (no keyed field — keep scoring logic server-side)
router.get('/questions', (req, res) => {
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = questions.map(({ id, text, text_vi, dimension }) => ({
    id,
    text: lang === 'vi' ? text_vi : text,
    dimension,
  }));
  res.json({ questions: publicQuestions });
});

// POST /api/quiz/submit
// Body: { answers: { "1": 3, "2": 5, ... }, lang: "en"|"vi" }
router.post('/submit', (req, res) => {
  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  // Validate all 100 questions are answered with values 1-5
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
});

module.exports = router;
