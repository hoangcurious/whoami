const questions = require('../../server/data/questions');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const publicQuestions = questions.map(({ id, text, text_vi, dimension }) => ({
    id,
    text: lang === 'vi' ? text_vi : text,
    dimension,
  }));

  res.json({ questions: publicQuestions });
};
