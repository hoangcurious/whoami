const questions = require('../data/questions');

const DIMENSIONS = ['O', 'C', 'E', 'A', 'N'];

const DIMENSION_NAMES = {
  O: 'Openness',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism',
};

// Each dimension has 20 questions (10 positive, 10 negative keyed).
// Raw sum range: [20, 100]. Normalised to [0, 100].
function scoreDimension(answers, dimensionQuestions) {
  let sum = 0;
  for (const q of dimensionQuestions) {
    const raw = answers[String(q.id)];
    const adjusted = q.keyed === 'negative' ? 6 - raw : raw;
    sum += adjusted;
  }
  return Math.round(((sum - 20) / 80) * 100);
}

function scoreAll(answers) {
  const scores = {};
  for (const dim of DIMENSIONS) {
    const dimQuestions = questions.filter((q) => q.dimension === dim);
    scores[dim] = scoreDimension(answers, dimQuestions);
  }
  return scores;
}

module.exports = { scoreAll, DIMENSION_NAMES, DIMENSIONS };
