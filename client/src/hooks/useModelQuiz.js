import { useState, useEffect, useCallback } from 'react';

/**
 * Generic A/B quiz hook for all non-Likert models.
 * Fetches questions from /api/{modelId}/questions?lang=
 * and posts answers to /api/{modelId}/submit.
 */
export default function useModelQuiz(modelId, lang, perPage = 4) {
  const [status, setStatus] = useState('loading'); // loading | answering | submitting | done | error
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchQuestions = useCallback(() => {
    setStatus('loading');
    setAnswers({});
    setCurrentPage(0);
    setResults(null);
    fetch(`/api/${modelId}/questions?lang=${lang}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions);
        setStatus('answering');
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('Could not load questions. Please refresh the page.');
      });
  }, [modelId, lang]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const totalPages = Math.ceil(questions.length / perPage);

  function getPageQuestions(page) {
    const start = page * perPage;
    return questions.slice(start, start + perPage);
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
      const res = await fetch(`/api/${modelId}/submit`, {
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

  return {
    status,
    questions,
    answers,
    currentPage,
    results,
    errorMsg,
    totalPages,
    answeredCount,
    perPage,
    setAnswer,
    nextPage,
    prevPage,
    submitQuiz,
    isPageComplete,
    getPageQuestions,
  };
}
