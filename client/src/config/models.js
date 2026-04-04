/**
 * Central model registry.
 * AB_MODELS: all forced-choice A/B models.
 * BF_MODEL: Big Five (Likert) — handled separately.
 *
 * Each model entry:
 *   id          – matches /api/{id}/questions and /api/{id}/submit
 *   storageKey  – localStorage key for persisted results
 *   perPage     – questions shown per quiz page (AB models only)
 *   questions   – total question count (display only)
 *   timeMin     – estimated minutes (display only)
 *   color       – accent color for the card icon
 *   icon        – short string or letter(s) shown in card icon
 *   category    – 'personality' | 'work' — used for HomeScreen grouping
 */

export const BF_MODEL = {
  id: 'bigfive',
  storageKey: 'whoami_bf_results',
  questions: 100,
  timeMin: 15,
  category: 'personality',
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
    category: 'personality',
  },
  {
    id: 'enneagram',
    storageKey: 'whoami_enneagram_results',
    perPage: 4,
    questions: 36,
    timeMin: 7,
    icon: '1–9',
    color: '#a78bfa',
    category: 'personality',
  },
  {
    id: 'disc',
    storageKey: 'whoami_disc_results',
    perPage: 4,
    questions: 28,
    timeMin: 5,
    icon: 'DISC',
    color: '#34d399',
    category: 'personality',
  },
  {
    id: 'attachment',
    storageKey: 'whoami_attachment_results',
    perPage: 4,
    questions: 24,
    timeMin: 5,
    icon: '❤',
    color: '#f472b6',
    category: 'personality',
  },
  {
    id: 'lovelang',
    storageKey: 'whoami_lovelang_results',
    perPage: 5,
    questions: 30,
    timeMin: 5,
    icon: '5♡',
    color: '#fb923c',
    category: 'personality',
  },
  // ── Work & Career ────────────────────────────────────────────────────────────
  {
    id: 'devtype',
    storageKey: 'whoami_devtype_results',
    perPage: 4,
    questions: 24,
    timeMin: 5,
    icon: '</>',
    color: '#38bdf8',
    category: 'work',
  },
];

export const ALL_MODELS = [BF_MODEL, ...AB_MODELS];
