import { useLang } from '../i18n/LangContext';
import { t } from '../i18n/translations';
import MbtiQuestionCard from './MbtiQuestionCard';
import ProgressBar from './ProgressBar';
import styles from './MbtiQuizPage.module.css';

export default function MbtiQuizPage({
  questions,
  currentPage,
  totalPages,
  answers,
  answeredCount,
  isPageComplete,
  setAnswer,
  nextPage,
  prevPage,
  submitQuiz,
  isSubmitting,
  onBack,
  quizLabel,
}) {
  const { lang } = useLang();
  const QUESTIONS_PER_PAGE = questions.length > 0
    ? Math.ceil(questions.length / totalPages)
    : 4;
  const pageQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE + QUESTIONS_PER_PAGE,
  );
  const isLastPage = currentPage === totalPages - 1;
  const canAdvance = isPageComplete(currentPage);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.topBar}>
          <button className="btn btn-ghost" onClick={onBack} style={{ fontSize: '0.85rem' }}>
            ← {t('back_home', lang)}
          </button>
          <span className={styles.quizLabel}>{quizLabel ?? t('mbti_quiz_label', lang)}</span>
        </div>

        <ProgressBar
          current={currentPage}
          total={totalPages}
          answeredCount={answeredCount}
          totalQuestions={questions.length}
        />

        <p className={styles.instruction}>{t('mbti_instruction', lang)}</p>

        <div className={styles.questions}>
          {pageQuestions.map((q, i) => (
            <MbtiQuestionCard
              key={q.id}
              question={q}
              index={currentPage * QUESTIONS_PER_PAGE + i + 1}
              answer={answers[q.id]}
              onAnswer={setAnswer}
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
