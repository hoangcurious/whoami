/**
 * Central model registry.
 * AB_MODELS: all forced-choice A/B models (MBTI + 4 new ones).
 * BF_MODEL: Big Five (Likert) — handled separately.
 *
 * Each AB model entry:
 *   id          – matches /api/{id}/questions and /api/{id}/submit
 *   storageKey  – localStorage key for persisted results
 *   perPage     – questions shown per quiz page
 *   questions   – total question count (display only)
 *   timeMin     – estimated minutes (display only)
 *   color       – accent color for the card icon
 *   icon        – short string or letter(s) shown in card icon
 */

export const BF_MODEL = {
  id: 'bigfive',
  storageKey: 'whoami_bf_results',
  questions: 100,
  timeMin: 15,
};

export const AB_MODELS = [
  {
    id: 'mbti',
    storageKey: 'whoami_mbti_results',
    perPage: 4,
    questions: 32,
    timeMin: 5,
    icon: 'MBTI',
    color: 'var(--color-accent)',
  },
  {
    id: 'enneagram',
    storageKey: 'whoami_enneagram_results',
    perPage: 4,
    questions: 36,
    timeMin: 7,
    icon: '1–9',
    color: '#a78bfa',
  },
  {
    id: 'disc',
    storageKey: 'whoami_disc_results',
    perPage: 4,
    questions: 28,
    timeMin: 5,
    icon: 'DISC',
    color: '#34d399',
  },
  {
    id: 'attachment',
    storageKey: 'whoami_attachment_results',
    perPage: 4,
    questions: 24,
    timeMin: 5,
    icon: '❤',
    color: '#f472b6',
  },
  {
    id: 'lovelang',
    storageKey: 'whoami_lovelang_results',
    perPage: 5,
    questions: 30,
    timeMin: 5,
    icon: '5♡',
    color: '#fb923c',
  },
];

export const ALL_MODELS = [BF_MODEL, ...AB_MODELS];
