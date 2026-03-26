import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import styles from './QuizPage.module.css';

export default function QuizPage({
  questions,
  currentPage,
  totalPages,
  answers,
  answeredCount,
  totalQuestions,
  isPageComplete,
  setAnswer,
  nextPage,
  prevPage,
  submitQuiz,
  isSubmitting,
}) {
  const { lang } = useLang();
  const pageQuestions = questions.slice(
    currentPage * 10,
    currentPage * 10 + 10,
  );
  const isLastPage = currentPage === totalPages - 1;
  const canAdvance = isPageComplete(currentPage);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <ProgressBar
          current={currentPage}
          total={totalPages}
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
        />

        <div className={styles.questions}>
          {pageQuestions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={currentPage * 10 + i + 1}
              value={answers[q.id]}
              onChange={setAnswer}
            />
          ))}
        </div>

        {!canAdvance && (
          <p className={styles.hint}>{t('hint', lang)}</p>
        )}

        <div className={styles.nav}>
          <button
            className="btn btn-ghost"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            {t('back', lang)}
          </button>

          {isLastPage ? (
            <button
              className="btn btn-primary"
              onClick={submitQuiz}
              disabled={!canAdvance || isSubmitting}
            >
              {isSubmitting ? t('scoring', lang) : t('submit', lang)}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={nextPage}
              disabled={!canAdvance}
            >
              {t('next', lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
