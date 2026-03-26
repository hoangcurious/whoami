import { useLang } from './i18n/LangContext';
import { t } from './i18n/translations';
import useQuiz from './hooks/useQuiz';
import LangToggle from './components/LangToggle';
import Welcome from './components/Welcome';
import QuizPage from './components/QuizPage';
import Results from './components/Results';

export default function App() {
  const { lang } = useLang();
  const quiz = useQuiz(lang);

  // Loading
  if (quiz.status === 'loading') {
    return (
      <>
        <LangToggle />
        <div className="fullscreen-center">
          <div className="spinner" />
          <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {t('loading', lang)}
          </p>
        </div>
      </>
    );
  }

  // Error
  if (quiz.status === 'error') {
    return (
      <>
        <LangToggle />
        <div className="fullscreen-center">
          <p style={{ color: '#f87171', fontSize: '1rem' }}>{quiz.errorMsg}</p>
          <button
            className="btn btn-ghost"
            style={{ marginTop: '1.5rem' }}
            onClick={() => window.location.reload()}
          >
            {t('error_retry', lang)}
          </button>
        </div>
      </>
    );
  }

  // Results
  if (quiz.status === 'done' && quiz.results) {
    return (
      <>
        <LangToggle />
        <Results results={quiz.results} />
      </>
    );
  }

  // Welcome
  if (!quiz.started) {
    return (
      <>
        <LangToggle />
        <Welcome onStart={() => quiz.setStarted(true)} />
      </>
    );
  }

  // Quiz
  return (
    <>
      <LangToggle />
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
      />
    </>
  );
}
