import { useState, useEffect, useCallback } from 'react';

const QUESTIONS_PER_PAGE = 10;

export default function useQuiz(lang) {
  const [status, setStatus] = useState('loading'); // loading | answering | submitting | done | error
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchQuestions = useCallback(() => {
    setStatus('loading');
    fetch(`/api/quiz/questions?lang=${lang}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions);
        setStatus('answering');
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('Could not load questions. Please refresh the page.');
      });
  }, [lang]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  function getPageQuestions(page) {
    const start = page * QUESTIONS_PER_PAGE;
    return questions.slice(start, start + QUESTIONS_PER_PAGE);
  }

  function isPageComplete(page) {
    return getPageQuestions(page).every((q) => answers[q.id] !== undefined);
  }

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function nextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function submitQuiz() {
    setStatus('submitting');
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed. Please try again.');
        return;
      }
      setResults(data);
      setStatus('done');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  return {
    status,
    questions,
    answers,
    currentPage,
    started,
    results,
    errorMsg,
    totalPages,
    progress,
    answeredCount,
    setStarted,
    setAnswer,
    nextPage,
    prevPage,
    submitQuiz,
    isPageComplete,
    getPageQuestions,
    QUESTIONS_PER_PAGE,
  };
}
