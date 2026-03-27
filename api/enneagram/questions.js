const enneagramQuestions = require('../../server/data/enneagramQuestions');

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = enneagramQuestions.map(({ id, type, text, text_vi, option_a, option_a_vi, option_b, option_b_vi }) => ({
    id,
    type,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
};
