const express = require('express');
const cors = require('cors');
const quizRouter = require('./routes/quiz');
const mbtiRouter = require('./routes/mbti');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/quiz', quizRouter);
app.use('/api/mbti', mbtiRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
