import { useState, useEffect } from 'react';
import { useLang } from './i18n/LangContext';
import { t } from './i18n/translations';
import { useRouter, parseRoute } from './hooks/useRouter';
import useQuiz from './hooks/useQuiz';
import useModelQuiz from './hooks/useModelQuiz';
import LangToggle from './components/LangToggle';
import HomeScreen from './components/HomeScreen';
import CategoryScreen from './components/CategoryScreen';
import QuizPage from './components/QuizPage';
import MbtiQuizPage from './components/MbtiQuizPage';
import Results from './components/Results';
import ModelResults from './components/ModelResults';
import SynthesisReport from './components/SynthesisReport';
import { parseShareParams, decodeShare } from './lib/shareUrl';
import MbtiResultCard from './components/MbtiResultCard';
import EnneagramResultCard from './components/EnneagramResultCard';
import DiscResultCard from './components/DiscResultCard';
import AttachmentResultCard from './components/AttachmentResultCard';
import LoveLangResultCard from './components/LoveLangResultCard';
import DevtypeResultCard from './components/DevtypeResultCard';
import { AB_MODELS, BF_MODEL, ALL_MODELS } from './config/models';

// ── Result card registry ──────────────────────────────────────────────────────

const RESULT_CARDS = {
  mbti:       MbtiResultCard,
  enneagram:  EnneagramResultCard,
  disc:       DiscResultCard,
  attachment: AttachmentResultCard,
  lovelang:   LoveLangResultCard,
  devtype:    DevtypeResultCard,
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

function categoryOf(model) {
  return model.category || 'personality';
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
  const { path, navigate } = useRouter();

  // Shared read-only result (inbound share link)
  const [sharedResult, setSharedResult] = useState(null); // { modelId, data }

  // All persisted results, keyed by model id
  const [storedResults, setStoredResults] = useState(() => {
    const r = {};
    r[BF_MODEL.id] = loadStored(BF_MODEL.storageKey);
    for (const m of AB_MODELS) {
      r[m.id] = loadStored(m.storageKey);
    }
    return r;
  });

  // Parse share URL on mount — share params are query-string based so they
  // don't conflict with path routing.
  useEffect(() => {
    const params = parseShareParams();
    if (!params) return;
    decodeShare(params.encoded)
      .then(data => {
        setSharedResult({ modelId: params.modelId, data });
        navigate(`/share/${params.modelId}`);
      })
      .catch(() => {/* malformed — stay on home */});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleDone(model, results) {
    saveStored(model.storageKey, results);
    setStoredResults((prev) => ({ ...prev, [model.id]: results }));
    navigate(`/test/${model.id}/results`);
  }

  const route = parseRoute(path);

  // ── Home ──────────────────────────────────────────────────────────────────
  if (route.page === 'home') {
    return (
      <>
        <LangToggle />
        <HomeScreen
          storedResults={storedResults}
          onCategoryClick={(catId) => navigate(`/category/${catId}`)}
          onSynthesisClick={() => navigate('/synthesis')}
        />
      </>
    );
  }

  // ── Category ──────────────────────────────────────────────────────────────
  if (route.page === 'category') {
    return (
      <>
        <LangToggle />
        <CategoryScreen
          categoryId={route.categoryId}
          storedResults={storedResults}
          onStart={(modelId) => navigate(`/test/${modelId}`)}
          onViewResults={(modelId) => {
            if (modelId === 'synthesis') {
              navigate('/synthesis');
            } else {
              navigate(`/test/${modelId}/results`);
            }
          }}
          onBack={() => navigate('/')}
        />
      </>
    );
  }

  // ── Synthesis ─────────────────────────────────────────────────────────────
  if (route.page === 'synthesis') {
    return (
      <>
        <LangToggle />
        <SynthesisReport
          storedResults={storedResults}
          onBack={() => navigate('/')}
        />
      </>
    );
  }

  // ── Quiz flow ─────────────────────────────────────────────────────────────
  if (route.page === 'test') {
    const model = ALL_MODELS.find(m => m.id === route.modelId);
    if (!model) { navigate('/'); return null; }

    const backTo = `/category/${categoryOf(model)}`;

    if (model.id === BF_MODEL.id) {
      return (
        <>
          <LangToggle />
          <BigFiveFlow
            lang={lang}
            onDone={(r) => handleDone(model, r)}
            onBack={() => navigate(backTo)}
          />
        </>
      );
    }
    return (
      <>
        <LangToggle />
        <GenericABFlow
          modelId={model.id}
          perPage={model.perPage}
          lang={lang}
          onDone={(r) => handleDone(model, r)}
          onBack={() => navigate(backTo)}
        />
      </>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────
  if (route.page === 'results') {
    const model = ALL_MODELS.find(m => m.id === route.modelId);
    const results = storedResults[route.modelId];

    // If no results yet, redirect to the quiz
    if (!model || !results) {
      navigate(model ? `/test/${model.id}` : '/');
      return null;
    }

    const backTo = `/category/${categoryOf(model)}`;

    if (model.id === BF_MODEL.id) {
      return (
        <>
          <LangToggle />
          <Results
            results={results}
            onBack={() => navigate(backTo)}
            onRetake={() => navigate(`/test/${model.id}`)}
          />
        </>
      );
    }

    const ResultCard = RESULT_CARDS[model.id];
    return (
      <>
        <LangToggle />
        <ModelResults
          model={model}
          ResultCard={ResultCard}
          results={results}
          onBack={() => navigate(backTo)}
          onRetake={() => navigate(`/test/${model.id}`)}
        />
      </>
    );
  }

  // ── Share (read-only) ─────────────────────────────────────────────────────
  if (route.page === 'share' && sharedResult?.data) {
    const modelId = route.modelId;
    const model = ALL_MODELS.find(m => m.id === modelId);

    if (modelId === 'bigfive') {
      return (
        <>
          <LangToggle />
          <Results results={sharedResult.data} onBack={() => navigate('/')} readOnly />
        </>
      );
    }
    if (modelId === 'synthesis') {
      return (
        <>
          <LangToggle />
          <SynthesisReport storedResults={sharedResult.data} onBack={() => navigate('/')} readOnly />
        </>
      );
    }
    if (model && RESULT_CARDS[modelId]) {
      return (
        <>
          <LangToggle />
          <ModelResults
            model={model}
            ResultCard={RESULT_CARDS[modelId]}
            results={sharedResult.data}
            onBack={() => navigate('/')}
            onRetake={() => navigate('/')}
            readOnly
          />
        </>
      );
    }
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  navigate('/');
  return null;
}
