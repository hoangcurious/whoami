// Per-dimension descriptive text keyed by level: "high" | "moderate" | "low"

const descriptions = {
  O: {
    high: {
      title: 'Highly Open to Experience',
      text: 'You actively seek out new ideas, experiences, and perspectives. Curiosity drives you — you find yourself exploring unfamiliar topics, experimenting with creative approaches, and questioning how things work at a deeper level. You are drawn to abstract thinking and enjoy conversations that go beyond the surface.',
    },
    moderate: {
      title: 'Moderately Open to Experience',
      text: 'You balance curiosity with practicality. You enjoy exploring new ideas when they feel relevant, but you also appreciate proven methods and clear, concrete explanations. You can engage with abstract thinking without being exclusively drawn to it.',
    },
    low: {
      title: 'Practically Grounded',
      text: 'You prefer what is concrete, tried, and useful. You are efficient and reliable because you stick with approaches that work rather than experimenting unnecessarily. Hypothetical discussions interest you less than real, applicable problems. You find comfort in familiar routines and clear instructions.',
    },
  },
  C: {
    high: {
      title: 'Highly Conscientious',
      text: 'You plan ahead, follow through, and hold yourself to your commitments even when motivation fades. Your environment is organized, your deadlines are met, and the people around you can rely on you. You rarely cut corners and tend to check your work before considering it done.',
    },
    moderate: {
      title: 'Moderately Conscientious',
      text: 'You are generally reliable and organized, though not rigidly so. You meet most commitments and keep reasonable order in your work and life, but you can be flexible when things don\'t go to plan. You find a workable balance between structure and spontaneity.',
    },
    low: {
      title: 'Flexible and Spontaneous',
      text: 'You tend to improvise rather than plan, and you adapt quickly when circumstances change. Structure and rigid schedules can feel limiting to you. You may sometimes leave things to the last minute or let organization slide — but you often find creative ways to pull things together.',
    },
  },
  E: {
    high: {
      title: 'Highly Extraverted',
      text: 'Social interaction energizes you. You initiate conversations, enjoy large groups, and tend to fill the room with your presence. You are comfortable meeting strangers, speaking up in groups, and taking the lead in social settings. Time alone feels less restorative than time with others.',
    },
    moderate: {
      title: 'Moderately Extraverted (Ambivert)',
      text: 'You move comfortably between social and solitary settings. You can be sociable and engaging in the right environment, but also value time alone to recharge. You don\'t need to be the center of attention, but you\'re not uncomfortable being there.',
    },
    low: {
      title: 'Introverted',
      text: 'You tend to recharge in solitude rather than in social settings. You prefer deeper conversations with a few people over large group interactions, and you often listen more than you speak. Social events can be enjoyable, but draining — you frequently feel the pull to leave early.',
    },
  },
  A: {
    high: {
      title: 'Highly Agreeable',
      text: 'You are cooperative, patient, and quick to set aside your own position to avoid friction. You help others without being asked, give people the benefit of the doubt, and find it hard to hold on to anger. Your relationships tend to be warm and harmonious, partly because you invest actively in maintaining them.',
    },
    moderate: {
      title: 'Moderately Agreeable',
      text: 'You are generally easy to work and live with, but you won\'t compromise indefinitely. You can be warm and cooperative while still standing your ground when something important is at stake. You are neither a pushover nor someone who creates unnecessary conflict.',
    },
    low: {
      title: 'Assertive and Direct',
      text: 'You are straightforward and unapologetic about your own interests. You state your opinion clearly, hold your ground in disagreements, and are unlikely to over-accommodate others at your own expense. You notice when things are unfair and say so — which others may find refreshing or challenging, depending on the context.',
    },
  },
  N: {
    high: {
      title: 'Emotionally Reactive',
      text: 'You experience emotions intensely and are sensitive to changes in your environment. Stress, uncertainty, and setbacks tend to linger — you replay difficult events, worry about what might go wrong, and find it hard to be fully present when something is unresolved. This depth of feeling often makes you perceptive and empathetic.',
    },
    moderate: {
      title: 'Emotionally Balanced',
      text: 'You experience normal emotional variation — you can feel stressed or anxious when the situation calls for it, but you generally recover without too much difficulty. You are neither oblivious to problems nor overwhelmed by them.',
    },
    low: {
      title: 'Emotionally Stable',
      text: 'You tend to stay calm under pressure and recover quickly from setbacks. Criticism rolls off you relatively easily, and you rarely ruminate. In uncertain or stressful situations, you focus on what\'s next rather than dwelling on what went wrong. Others often see you as steady and unflappable.',
    },
  },
};

function getLevel(score) {
  if (score >= 65) return 'high';
  if (score >= 35) return 'moderate';
  return 'low';
}

function getDimensionDescription(dim, score) {
  const level = getLevel(score);
  return descriptions[dim][level];
}

function buildSummary(scores) {
  const DIMENSION_ORDER = ['E', 'A', 'C', 'N', 'O'];
  const sentences = DIMENSION_ORDER.map((dim) => {
    const level = getLevel(scores[dim]);
    const { title } = descriptions[dim][level];
    return title;
  });

  const high = DIMENSION_ORDER.filter((d) => getLevel(scores[d]) === 'high').map(
    (d) => descriptions[d].high.title,
  );
  const low = DIMENSION_ORDER.filter((d) => getLevel(scores[d]) === 'low').map(
    (d) => descriptions[d].low.title,
  );

  let summary = 'Based on your responses, ';
  if (high.length > 0) {
    summary += `your strongest traits are: ${high.join(', ')}. `;
  }
  if (low.length > 0) {
    summary += `You score lower on: ${low.join(', ')}. `;
  }
  if (high.length === 0 && low.length === 0) {
    summary +=
      'you show a well-balanced profile across all five dimensions, without strong peaks or troughs. ';
  }
  summary +=
    'Scroll down to read the detailed breakdown for each dimension.';

  return summary;
}

module.exports = { getDimensionDescription, buildSummary, getLevel };
