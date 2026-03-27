const discQuestions = require('../../server/data/discQuestions');

// Vercel serverless function — mirrors GET /api/disc/questions?lang=en|vi
module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = discQuestions.map(({ id, style, text, text_vi, option_a, option_a_vi, option_b, option_b_vi }) => ({
    id,
    style,
    text:     lang === 'vi' ? text_vi     : text,
    option_a: lang === 'vi' ? option_a_vi : option_a,
    option_b: lang === 'vi' ? option_b_vi : option_b,
  }));
  res.json({ questions: publicQuestions });
};
