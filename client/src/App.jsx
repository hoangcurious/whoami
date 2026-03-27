import { useState, useEffect, Fragment } from 'react';
import { useLang } from './i18n/LangContext';
import { t } from './i18n/translations';
import useQuiz from './hooks/useQuiz';
import useModelQuiz from './hooks/useModelQuiz';
import LangToggle from './components/LangToggle';
import HomeScreen from './components/HomeScreen';
import QuizPage from './components/QuizPage';
import MbtiQuizPage from './components/MbtiQuizPage';
import Results from './components/Results';
import ModelResults from './components/ModelResults';
import MbtiResultCard from './components/MbtiResultCard';
import EnneagramResultCard from './components/EnneagramResultCard';
import DiscResultCard from './components/DiscResultCard';
import AttachmentResultCard from './components/AttachmentResultCard';
import LoveLangResultCard from './components/LoveLangResultCard';
import { AB_MODELS, BF_MODEL } from './config/models';

// ── Result card registry ──────────────────────────────────────────────────────

const RESULT_CARDS = {
  mbti:       MbtiResultCard,
  enneagram:  EnneagramResultCard,
  disc:       DiscResultCard,
  attachment: AttachmentResultCard,
  lovelang:   LoveLangResultCard,
};

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

// ── Generic A/B model flow ────────────────────────────────────────────────────

function GenericABFlow({ modelId, perPage, lang, onDone, onBack }) {
  const quiz = useModelQuiz(modelId, lang, perPage);

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

  // All results in one object keyed by model id
  const [storedResults, setStoredResults] = useState(() => {
    const r = {};
    r[BF_MODEL.id] = loadStored(BF_MODEL.storageKey);
    for (const m of AB_MODELS) {
      r[m.id] = loadStored(m.storageKey);
    }
    return r;
  });

  function handleDone(model, results) {
    saveStored(model.storageKey, results);
    setStoredResults((prev) => ({ ...prev, [model.id]: results }));
    setScreen(`${model.id}_results`);
  }

  return (
    <>
      <LangToggle />

      {screen === 'home' && (
        <HomeScreen
          storedResults={storedResults}
          onStart={(modelId) => setScreen(modelId)}
          onViewResults={(modelId) => setScreen(`${modelId}_results`)}
        />
      )}

      {/* Big Five */}
      {screen === BF_MODEL.id && (
        <BigFiveFlow
          lang={lang}
          onDone={(r) => handleDone(BF_MODEL, r)}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === `${BF_MODEL.id}_results` && storedResults[BF_MODEL.id] && (
        <Results
          results={storedResults[BF_MODEL.id]}
          onBack={() => setScreen('home')}
          onRetake={() => setScreen(BF_MODEL.id)}
        />
      )}

      {/* All A/B models */}
      {AB_MODELS.map((model) => (
        <Fragment key={model.id}>
          {screen === model.id && (
            <GenericABFlow
              modelId={model.id}
              perPage={model.perPage}
              lang={lang}
              onDone={(r) => handleDone(model, r)}
              onBack={() => setScreen('home')}
            />
          )}
          {screen === `${model.id}_results` && storedResults[model.id] && (
            <ModelResults
              model={model}
              ResultCard={RESULT_CARDS[model.id]}
              results={storedResults[model.id]}
              onBack={() => setScreen('home')}
              onRetake={() => setScreen(model.id)}
            />
          )}
        </Fragment>
      ))}
    </>
  );
}
