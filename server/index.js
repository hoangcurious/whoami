const express = require('express');
const cors = require('cors');
const quizRouter = require('./routes/quiz');
const mbtiRouter = require('./routes/mbti');
const discRouter = require('./routes/disc');
const attachmentRouter = require('./routes/attachment');
const loveLangRouter = require('./routes/loveLang');
const enneagramRouter = require('./routes/enneagram');
const shareOgHandler = require('./lib/shareOg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/quiz', quizRouter);
app.use('/api/mbti', mbtiRouter);
app.use('/api/disc', discRouter);
app.use('/api/attachment', attachmentRouter);
app.use('/api/lovelang', loveLangRouter);
app.use('/api/enneagram', enneagramRouter);
app.get('/api/share', shareOgHandler);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
