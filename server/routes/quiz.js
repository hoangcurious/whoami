const express = require('express');
const router = express.Router();
const questions = require('../data/questions');
const { scoreAll, DIMENSION_NAMES } = require('../lib/scoring');
const { getDimensionDescription, buildSummary } = require('../lib/summaryText');

// GET /api/quiz/questions
// Returns question text + id + dimension (no keyed field — keep scoring logic server-side)
router.get('/questions', (req, res) => {
  const publicQuestions = questions.map(({ id, text, dimension }) => ({ id, text, dimension }));
  res.json({ questions: publicQuestions });
});

// POST /api/quiz/submit
// Body: { answers: { "1": 3, "2": 5, ... } }  (all 100 question IDs required, values 1-5)
router.post('/submit', (req, res) => {
  const { answers } = req.body;

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
  const summary = buildSummary(scores);

  const dimensions = Object.entries(scores).map(([dim, score]) => ({
    key: dim,
    name: DIMENSION_NAMES[dim],
    score,
    ...getDimensionDescription(dim, score),
  }));

  res.json({ scores, dimensions, summary });
});

module.exports = router;
