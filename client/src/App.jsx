import { useState, useEffect } from 'react';
import { useLang } from './i18n/LangContext';
import { t } from './i18n/translations';
import useQuiz from './hooks/useQuiz';
import useMbtiQuiz from './hooks/useMbtiQuiz';
import LangToggle from './components/LangToggle';
import HomeScreen from './components/HomeScreen';
import QuizPage from './components/QuizPage';
import MbtiQuizPage from './components/MbtiQuizPage';
import Results from './components/Results';
import MbtiResults from './components/MbtiResults';

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadStored(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// ── Big Five flow ─────────────────────────────────────────────────────────────

function BigFiveFlow({ lang, onDone, onBack }) {
  const quiz = useQuiz(lang);

  useEffect(() => {
    if (quiz.status === 'done' && quiz.results) {
      onDone(quiz.results);
    }
  }, [quiz.status, quiz.results, onDone]);

  if (quiz.status === 'loading' || (quiz.status === 'done' && quiz.results)) {
    return (
      <div className="fullscreen-center">
        <div className="spinner" />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {t('loading', lang)}
        </p>
      </div>
    );
  }

  if (quiz.status === 'error') {
    return (
      <div className="fullscreen-center">
        <p style={{ color: '#f87171' }}>{quiz.errorMsg}</p>
        <button className="btn btn-ghost" style={{ marginTop: '1.5rem' }} onClick={onBack}>
          {t('back_home', lang)}
        </button>
      </div>
    );
  }

  return (
    <QuizPage
      questions={quiz.questions}
      currentPage={quiz.currentPage}
      totalPages={quiz.totalPages}
      answers={quiz.answers}
      answeredCount={quiz.answeredCount}
      totalQuestions={quiz.questions.length}
      isPageComplete={quiz.isPageComplete}
      setAnswer={quiz.setAnswer}
      nextPage={quiz.nextPage}
      prevPage={quiz.prevPage}
      submitQuiz={quiz.submitQuiz}
      isSubmitting={quiz.status === 'submitting'}
      onBack={onBack}
    />
  );
}

// ── MBTI flow ─────────────────────────────────────────────────────────────────

function MbtiFlow({ lang, onDone, onBack }) {
  const quiz = useMbtiQuiz(lang);

  useEffect(() => {
    if (quiz.status === 'done' && quiz.results) {
      onDone(quiz.results);
    }
  }, [quiz.status, quiz.results, onDone]);

  if (quiz.status === 'loading' || (quiz.status === 'done' && quiz.results)) {
    return (
      <div className="fullscreen-center">
        <div className="spinner" />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          {t('loading', lang)}
        </p>
      </div>
    );
  }

  if (quiz.status === 'error') {
    return (
      <div className="fullscreen-center">
        <p style={{ color: '#f87171' }}>{quiz.errorMsg}</p>
        <button className="btn btn-ghost" style={{ marginTop: '1.5rem' }} onClick={onBack}>
          {t('back_home', lang)}
        </button>
      </div>
    );
  }

  return (
    <MbtiQuizPage
      questions={quiz.questions}
      currentPage={quiz.currentPage}
      totalPages={quiz.totalPages}
      answers={quiz.answers}
      answeredCount={quiz.answeredCount}
      isPageComplete={quiz.isPageComplete}
      setAnswer={quiz.setAnswer}
      nextPage={quiz.nextPage}
      prevPage={quiz.prevPage}
      submitQuiz={quiz.submitQuiz}
      isSubmitting={quiz.status === 'submitting'}
      onBack={onBack}
    />
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const { lang } = useLang();

  const [screen, setScreen] = useState('home');
  const [bfResults, setBfResults] = useState(() => loadStored('whoami_bf_results'));
  const [mbtiResults, setMbtiResults] = useState(() => loadStored('whoami_mbti_results'));

  function handleBfDone(results) {
    saveStored('whoami_bf_results', results);
    setBfResults(results);
    setScreen('bf_results');
  }

  function handleMbtiDone(results) {
    saveStored('whoami_mbti_results', results);
    setMbtiResults(results);
    setScreen('mbti_results');
  }

  return (
    <>
      <LangToggle />

      {screen === 'home' && (
        <HomeScreen
          bfResults={bfResults}
          mbtiResults={mbtiResults}
          onStartBigFive={() => setScreen('bigfive')}
          onStartMbti={() => setScreen('mbti')}
          onViewBfResults={() => setScreen('bf_results')}
          onViewMbtiResults={() => setScreen('mbti_results')}
        />
      )}

      {screen === 'bigfive' && (
        <BigFiveFlow
          lang={lang}
          onDone={handleBfDone}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'bf_results' && bfResults && (
        <Results
          results={bfResults}
          onBack={() => setScreen('home')}
          onRetake={() => setScreen('bigfive')}
        />
      )}

      {screen === 'mbti' && (
        <MbtiFlow
          lang={lang}
          onDone={handleMbtiDone}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'mbti_results' && mbtiResults && (
        <MbtiResults
          results={mbtiResults}
          onBack={() => setScreen('home')}
          onRetake={() => setScreen('mbti')}
        />
      )}
    </>
  );
}
