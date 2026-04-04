// Dynamic submit handler — replaces 6 separate submit.js files.
// Vercel route: /api/[model]/submit  (model param in req.query.model)

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const model = req.query.model;
  const { answers, lang: reqLang } = req.body;
  const lang = reqLang === 'vi' ? 'vi' : 'en';

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Missing answers object.' });
  }

  // ── Big Five (quiz) ────────────────────────────────────────────────────────
  if (model === 'quiz') {
    const questions = require('../../server/data/questions');
    const { scoreAll, DIMENSION_NAMES } = require('../../server/lib/scoring');
    const { getDimensionDescription, buildSummary } = require('../../server/lib/summaryText');
    const { deriveMBTI, getMBTIDescription } = require('../../server/lib/mbti');

    const DIMENSION_NAMES_VI = { O: 'Sự cởi mở', C: 'Sự tận tâm', E: 'Hướng ngoại', A: 'Sự hòa hợp', N: 'Sự nhạy cảm' };

    const missing = [], invalid = [];
    for (const q of questions) {
      const val = answers[String(q.id)];
      if (val == null) { missing.push(q.id); continue; }
      const num = Number(val);
      if (!Number.isInteger(num) || num < 1 || num > 5) invalid.push(q.id);
    }
    if (missing.length) return res.status(400).json({ error: `Missing answers for IDs: ${missing.join(', ')}` });
    if (invalid.length) return res.status(400).json({ error: `Invalid values for IDs: ${invalid.join(', ')}. Must be 1–5.` });

    const scores = scoreAll(answers);
    const summary = buildSummary(scores, lang);
    const dimNames = lang === 'vi' ? DIMENSION_NAMES_VI : DIMENSION_NAMES;
    const dimensions = Object.entries(scores).map(([dim, score]) => ({
      key: dim, name: dimNames[dim], score, ...getDimensionDescription(dim, score, lang),
    }));
    const { type: mbtiType, dichotomies } = deriveMBTI(scores);
    const mbti = { type: mbtiType, dichotomies, ...getMBTIDescription(mbtiType, lang) };
    return res.json({ scores, dimensions, summary, mbti });
  }

  // ── A/B models — shared validation ────────────────────────────────────────
  const AB_DATA = {
    mbti:       () => require('../../server/data/mbtiQuestions'),
    disc:       () => require('../../server/data/discQuestions'),
    attachment: () => require('../../server/data/attachmentQuestions'),
    lovelang:   () => require('../../server/data/loveLangQuestions'),
    enneagram:  () => require('../../server/data/enneagramQuestions'),
    devtype:    () => require('../../server/data/devtypeQuestions'),
  };

  const loader = AB_DATA[model];
  if (!loader) return res.status(404).json({ error: 'Unknown model' });

  const questions = loader();
  const missing = [], invalid = [];
  for (const q of questions) {
    const val = answers[String(q.id)];
    if (val == null) missing.push(q.id);
    else if (val !== 'A' && val !== 'B') invalid.push(q.id);
  }
  if (missing.length) return res.status(400).json({ error: `Missing answers: ${missing.join(', ')}` });
  if (invalid.length) return res.status(400).json({ error: `Invalid values: ${invalid.join(', ')}` });

  // ── Model-specific scoring ─────────────────────────────────────────────────
  if (model === 'mbti') {
    const { getMBTIDescription } = require('../../server/lib/mbti');
    const DICHOTOMIES = ['EI', 'SN', 'TF', 'JP'];
    const dichotomyScores = {};
    for (const dKey of DICHOTOMIES) {
      const dQs = questions.filter(q => q.dichotomy === dKey);
      const aCount = dQs.filter(q => answers[String(q.id)] === 'A').length;
      const total = dQs.length;
      const aPole = dQs[0].a_pole, bPole = dQs[0].b_pole;
      const chosen = aCount >= total / 2 ? aPole : bPole;
      dichotomyScores[dKey] = {
        left: aPole, right: bPole, aCount, bCount: total - aCount, chosen,
        pct: Math.round((Math.max(aCount, total - aCount) / total) * 100),
        confidence: Math.round((Math.abs(aCount - (total - aCount)) / total) * 100),
      };
    }
    const type = DICHOTOMIES.map(d => dichotomyScores[d].chosen).join('');
    return res.json({ mbti: { type, dichotomies: dichotomyScores, ...getMBTIDescription(type, lang) } });
  }
  if (model === 'disc') {
    const { scoreDisc, getDiscDescription } = require('../../server/lib/disc');
    const result = scoreDisc(answers, questions);
    const desc = getDiscDescription(result.primary, lang);
    return res.json({ disc: { ...result, ...desc } });
  }
  if (model === 'attachment') {
    const { scoreAttachment } = require('../../server/lib/attachment');
    return res.json({ attachment: scoreAttachment(answers, questions, lang) });
  }
  if (model === 'lovelang') {
    const { scoreLoveLang } = require('../../server/lib/loveLang');
    return res.json({ loveLang: scoreLoveLang(answers, questions, lang) });
  }
  if (model === 'enneagram') {
    const { scoreEnneagram } = require('../../server/lib/enneagram');
    return res.json({ enneagram: scoreEnneagram(answers, questions, lang) });
  }
  if (model === 'devtype') {
    const { scoreDevtype } = require('../../server/lib/devtype');
    return res.json({ devtype: scoreDevtype(answers, questions, lang) });
  }

  return res.status(404).json({ error: 'Unknown model' });
};
