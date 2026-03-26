// Client-side dimension metadata (colors, full names, short labels)
// Description text comes from the server in the results payload.

export const DIMENSION_META = {
  O: { name: 'Openness', color: 'var(--color-O)', emoji: '✦' },
  C: { name: 'Conscientiousness', color: 'var(--color-C)', emoji: '✦' },
  E: { name: 'Extraversion', color: 'var(--color-E)', emoji: '✦' },
  A: { name: 'Agreeableness', color: 'var(--color-A)', emoji: '✦' },
  N: { name: 'Neuroticism', color: 'var(--color-N)', emoji: '✦' },
};

export const DIMENSION_ORDER = ['E', 'A', 'C', 'N', 'O'];
