// Dynamic questions handler — replaces 6 separate questions.js files.
// Vercel route: /api/[model]/questions  (model param in req.query.model)

const DATA = {
  quiz:       () => require('../../server/data/questions'),
  mbti:       () => require('../../server/data/mbtiQuestions'),
  disc:       () => require('../../server/data/discQuestions'),
  attachment: () => require('../../server/data/attachmentQuestions'),
  lovelang:   () => require('../../server/data/loveLangQuestions'),
  enneagram:  () => require('../../server/data/enneagramQuestions'),
};

function mapQuestion(model, q, lang) {
  const vi = lang === 'vi';
  if (model === 'quiz') {
    return { id: q.id, text: vi ? q.text_vi : q.text, dimension: q.dimension };
  }
  const base = { id: q.id, text: vi ? q.text_vi : q.text,
    option_a: vi ? q.option_a_vi : q.option_a,
    option_b: vi ? q.option_b_vi : q.option_b };
  if (model === 'mbti')       return { ...base, dichotomy: q.dichotomy };
  if (model === 'disc')       return { ...base, style: q.style };
  if (model === 'attachment') return { ...base, style: q.style };
  if (model === 'lovelang')   return { ...base, lang_a: q.lang_a, lang_b: q.lang_b };
  if (model === 'enneagram')  return { ...base, type: q.type };
  return base;
}

module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const model = req.query.model;
  const loader = DATA[model];
  if (!loader) return res.status(404).json({ error: 'Unknown model' });

  const lang = req.query.lang === 'vi' ? 'vi' : 'en';
  const questions = loader().map(q => mapQuestion(model, q, lang));
  res.json({ questions });
};
