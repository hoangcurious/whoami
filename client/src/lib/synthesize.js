// synthesize.js — Core synthesis engine
// Reads all stored test results and produces a consolidated personality report.

export const SYNTHESIS_MIN_MODELS = 3;

// ─── Dimension config ─────────────────────────────────────────────────────────

const DIMENSION_CONFIG = [
  {
    id: 'energy',
    poles: ['Introverted', 'Extraverted'],
    accentColor: '#FF9500',
    sources: ['mbti', 'bigfive', 'disc'],
  },
  {
    id: 'mind',
    poles: ['Concrete', 'Abstract'],
    accentColor: '#E040FB',
    sources: ['mbti', 'bigfive', 'enneagram'],
  },
  {
    id: 'relationships',
    poles: ['Independent', 'Connected'],
    accentColor: '#FF6B6B',
    sources: ['attachment', 'bigfive', 'lovelang'],
  },
  {
    id: 'drive',
    poles: ['Harmony', 'Achievement'],
    accentColor: '#00C896',
    sources: ['disc', 'mbti', 'bigfive', 'enneagram'],
  },
  {
    id: 'resilience',
    poles: ['Sensitive', 'Stable'],
    accentColor: '#2979FF',
    sources: ['bigfive', 'attachment'],
  },
];

// ─── Archetype text (EN) ──────────────────────────────────────────────────────
// 3 archetypes per dimension: index 0 = low, 1 = balanced, 2 = high

const ARCHETYPES_EN = {
  energy: [
    {
      id: 'reflective',
      label: 'The Reflective',
      tagline: 'You process the world from the inside out.',
      text: 'Your energy comes from within. You do your best thinking in quiet, need time alone to recharge, and bring a depth of focus that more scattered minds rarely achieve. Social situations cost you energy rather than replenish it, and you often prefer a few meaningful conversations to many surface-level ones. Your inner world is rich and worth spending time in — the challenge is making sure others get to see it.',
    },
    {
      id: 'adaptive',
      label: 'The Adaptive',
      tagline: 'Comfortable in solitude and in company.',
      text: 'You move fluidly between inner reflection and outward engagement depending on what the situation calls for. You are not strictly introverted or extraverted — you adapt. Solitude restores you sometimes; connection energises you other times. This flexibility makes you unusually versatile socially, though you may occasionally feel unsure where you belong. Your ability to meet people where they are is a genuine gift.',
    },
    {
      id: 'dynamic',
      label: 'The Dynamic',
      tagline: 'You come alive in the presence of others.',
      text: 'Other people are your fuel. You think by talking, energise through interaction, and feel dulled or restless when too much time passes without connection. You bring warmth and momentum to groups and tend to make things happen simply by showing up. The risk is underestimating the value of stillness — the insights that only come when the room goes quiet. Your energy is contagious and genuinely valuable.',
    },
  ],
  mind: [
    {
      id: 'grounded',
      label: 'The Grounded',
      tagline: 'You trust what is real, proven, and present.',
      text: 'You are at your best when working with concrete facts, practical tools, and real-world problems. Abstract theories that float free of application hold limited appeal — you want to know how it works and what to do with it. You have strong situational awareness and excellent instincts built from direct experience. Your reliability and pragmatism are genuine strengths worth honouring.',
    },
    {
      id: 'integrative',
      label: 'The Integrative',
      tagline: 'You weave the concrete and the conceptual together.',
      text: 'You can hold both a detailed fact and a big-picture idea at the same time, which makes you effective across a wide range of problems. You are not purely theoretical and not purely practical — you translate between the two, finding where an abstraction becomes useful and where it needs grounding in reality. This versatility makes you a valuable collaborator and a natural bridge between specialists.',
    },
    {
      id: 'visionary',
      label: 'The Visionary',
      tagline: 'You see what is not yet there.',
      text: 'Your mind gravitates naturally toward patterns, possibilities, and ideas that do not yet exist in full form. Abstract concepts energise rather than frustrate you, and you often find yourself ahead of the conversation — seeing connections others have not spotted. The challenge is translating your vision into terms others can act on. Your greatest strength is not just imagining what could be, but convincing others it is worth pursuing.',
    },
  ],
  relationships: [
    {
      id: 'autonomous',
      label: 'The Autonomous',
      tagline: 'You move through life on your own terms.',
      text: 'Your sense of self does not depend heavily on others. You are comfortable alone, guard your emotional space carefully, and value relationships without needing them to define you. This self-sufficiency is a genuine strength — you do not ask for more than you are ready to give, and you rarely become enmeshed in others\' drama. The opportunity ahead is learning to be vulnerable enough to let people in without losing the independence you have worked hard to maintain.',
    },
    {
      id: 'selective',
      label: 'The Selective',
      tagline: 'You connect deeply with the few who matter most.',
      text: 'You are not closed off and not dependent — you are discerning. You invest deeply in relationships that have earned your trust, and keep a careful boundary around the wider world. Your closest connections benefit enormously from this: they have all of you, not just a part. The cost is that you may miss out on more spontaneous connections that can unexpectedly enrich a life. Your loyalty, once given, is one of your most valuable qualities.',
    },
    {
      id: 'relational',
      label: 'The Relational',
      tagline: 'Connection is at the centre of how you live.',
      text: 'Relationships are not a feature of your life — they are the foundation of it. You derive energy, meaning, and identity from your connections with others. You tend toward empathy and attunement, often knowing how someone feels before they say it. The risk is that your own needs can get lost in the giving, or that your sense of self becomes too dependent on how others respond to you. At your best, you make people feel genuinely seen.',
    },
  ],
  drive: [
    {
      id: 'harmoniser',
      label: 'The Harmoniser',
      tagline: 'You lead with empathy and build through connection.',
      text: 'What motivates you is not personal achievement but collective wellbeing. You want things to go well for everyone, not just yourself, and you are often the person quietly holding a group together when tensions rise. You have a natural gift for mediation, for softening edges, and for finding approaches that most people can live with. The challenge is that harmony-seeking can sometimes become conflict-avoidance, preventing you from taking stands that matter.',
    },
    {
      id: 'pragmatist',
      label: 'The Pragmatist',
      tagline: 'You know when to push and when to let go.',
      text: 'You are neither a pure achiever nor a pure harmony-seeker — you calibrate. You push when the goal is worth it and let go when the cost is too high. This balance makes you effective across many kinds of situations and avoids the blind spots of both extremes. You tend not to be driven by ego or approval, which gives you a steadiness that others notice and appreciate. You act when it counts and step back when it does not.',
    },
    {
      id: 'achiever',
      label: 'The Achiever',
      tagline: 'You are driven to make a mark.',
      text: 'You operate with a persistent orientation toward accomplishment. Goals do not just sit on a list for you — they create internal pressure that keeps you moving. You are comfortable with competition, undaunted by challenge, and tend to judge success by measurable outcomes. The risk is losing sight of relationships and process in the push for results, or setting a pace others cannot match. Your drive, properly channelled, is one of the most powerful forces in any room.',
    },
  ],
  resilience: [
    {
      id: 'sensitive',
      label: 'The Sensitive',
      tagline: 'You feel everything — and that is a kind of power.',
      text: 'Your emotional system is finely tuned. You pick up on subtle shifts in mood, atmosphere, and tone that others miss entirely. This sensitivity makes you deeply empathetic and often creatively or interpersonally gifted — but it also means that stress, criticism, and uncertainty land harder on you than they do on most. The key is not to become less sensitive, but to build structures that protect your nervous system so your gifts can come through more consistently.',
    },
    {
      id: 'adaptive',
      label: 'The Adaptive',
      tagline: 'You bend without breaking.',
      text: 'You experience emotional ups and downs but generally find your way back to equilibrium. Stress does not destabilise you permanently, and while challenges take a toll, they also teach you something. You are neither numb nor overwhelmed — you process, recover, and re-engage. This balanced emotional responsiveness is a genuine asset. You can sit with difficulty without collapsing under it, and move on without pretending it never happened.',
    },
    {
      id: 'resilient',
      label: 'The Resilient',
      tagline: 'Pressure clarifies rather than collapses you.',
      text: 'You have an unusual capacity to absorb difficulty without being destabilised. Stress, setbacks, and conflict do not send you into a spiral — you process them relatively quickly and return to functioning. This stability makes you reliable in a crisis and a calming influence on those around you. The thing to watch is that emotional stability can sometimes tip into emotional distance — missing signals that would be useful, or appearing unavailable to others who are struggling.',
    },
  ],
};

// ─── Archetype text (VI) ──────────────────────────────────────────────────────

const ARCHETYPES_VI = {
  energy: [
    {
      id: 'reflective',
      label: 'Người nội tâm',
      tagline: 'Bạn nhìn nhận thế giới từ bên trong ra ngoài.',
      text: 'Năng lượng của bạn đến từ nội tâm. Bạn suy nghĩ tốt nhất trong yên tĩnh, cần thời gian một mình để nạp lại và mang đến chiều sâu tập trung hiếm thấy. Các tình huống xã hội tiêu tốn năng lượng hơn là bổ sung, và bạn thường thích vài cuộc trò chuyện ý nghĩa hơn nhiều cuộc nói chuyện qua loa. Thế giới nội tâm của bạn phong phú — thách thức là giúp người khác nhìn thấy điều đó.',
    },
    {
      id: 'adaptive',
      label: 'Người linh hoạt',
      tagline: 'Thoải mái khi ở một mình và khi ở cùng người khác.',
      text: 'Bạn dễ dàng chuyển đổi giữa suy nghĩ nội tâm và giao tiếp bên ngoài tùy theo tình huống. Bạn không hoàn toàn hướng nội hay hướng ngoại — bạn thích nghi. Đôi khi sự cô đơn phục hồi bạn; đôi khi kết nối tiếp thêm năng lượng. Sự linh hoạt này làm bạn rất đa năng về mặt xã hội, dù đôi khi bạn cảm thấy không chắc mình thuộc về đâu. Khả năng gặp gỡ người khác ở nơi họ đang là một món quà thực sự.',
    },
    {
      id: 'dynamic',
      label: 'Người năng động',
      tagline: 'Bạn sống động hơn khi có người khác xung quanh.',
      text: 'Người khác là nguồn năng lượng của bạn. Bạn suy nghĩ bằng cách nói chuyện, được tiếp thêm sinh lực qua giao tiếp và cảm thấy buồn chán khi quá nhiều thời gian trôi qua mà không có kết nối. Bạn mang lại sự ấm áp và động lực cho nhóm. Rủi ro là đánh giá thấp giá trị của sự tĩnh lặng — những hiểu biết chỉ đến khi căn phòng trở nên yên tĩnh. Năng lượng của bạn có sức lan tỏa và thực sự quý giá.',
    },
  ],
  mind: [
    {
      id: 'grounded',
      label: 'Người thực tế',
      tagline: 'Bạn tin tưởng vào những gì thực tế, đã được chứng minh và hiện tại.',
      text: 'Bạn hoạt động tốt nhất khi làm việc với sự kiện cụ thể, công cụ thực tế và vấn đề thực tế. Các lý thuyết trừu tượng không có ứng dụng thực tế ít thu hút bạn — bạn muốn biết nó hoạt động như thế nào và làm gì với nó. Bạn có nhận thức tình huống mạnh mẽ và bản năng xuất sắc được xây dựng từ kinh nghiệm trực tiếp. Sự đáng tin cậy và tính thực dụng của bạn là điểm mạnh đáng trân trọng.',
    },
    {
      id: 'integrative',
      label: 'Người tích hợp',
      tagline: 'Bạn kết nối cụ thể và khái niệm lại với nhau.',
      text: 'Bạn có thể giữ cả một sự kiện chi tiết và một ý tưởng toàn cảnh cùng lúc, giúp bạn hiệu quả trên nhiều vấn đề. Bạn không thuần lý thuyết và không thuần thực tế — bạn dịch thuật giữa hai, tìm ra nơi sự trừu tượng trở nên hữu ích và cần được gắn với thực tế. Sự linh hoạt này làm bạn trở thành cộng tác viên có giá trị và cầu nối tự nhiên giữa các chuyên gia.',
    },
    {
      id: 'visionary',
      label: 'Người có tầm nhìn',
      tagline: 'Bạn nhìn thấy những gì chưa tồn tại.',
      text: 'Tâm trí bạn tự nhiên hướng đến các mẫu, khả năng và ý tưởng chưa tồn tại đầy đủ. Các khái niệm trừu tượng tiếp thêm năng lượng cho bạn, và bạn thường đi trước cuộc trò chuyện — nhìn thấy những kết nối mà người khác chưa phát hiện. Thách thức là chuyển dịch tầm nhìn của bạn thành thuật ngữ người khác có thể hành động. Điểm mạnh lớn nhất của bạn là thuyết phục người khác rằng nó đáng theo đuổi.',
    },
  ],
  relationships: [
    {
      id: 'autonomous',
      label: 'Người tự chủ',
      tagline: 'Bạn sống theo cách của riêng mình.',
      text: 'Bản sắc của bạn không phụ thuộc nhiều vào người khác. Bạn thoải mái khi ở một mình, bảo vệ không gian cảm xúc cẩn thận và coi trọng các mối quan hệ mà không cần chúng định nghĩa bản thân. Sự tự lập này là điểm mạnh thực sự. Cơ hội phía trước là học cách dễ bị tổn thương đủ để cho người khác bước vào mà không mất đi sự độc lập bạn đã gầy dựng.',
    },
    {
      id: 'selective',
      label: 'Người chọn lọc',
      tagline: 'Bạn kết nối sâu sắc với những người quan trọng nhất.',
      text: 'Bạn không đóng cửa và không phụ thuộc — bạn có sự chọn lựa. Bạn đầu tư sâu vào những mối quan hệ đã được tin tưởng. Những kết nối gần nhất của bạn được hưởng lợi rất nhiều: họ có toàn bộ bạn, không chỉ một phần. Chi phí là bạn có thể bỏ lỡ những kết nối tự phát có thể làm phong phú cuộc sống. Lòng trung thành của bạn, khi đã trao, là một trong những phẩm chất quý giá nhất.',
    },
    {
      id: 'relational',
      label: 'Người hướng kết nối',
      tagline: 'Kết nối là trung tâm của cách bạn sống.',
      text: 'Các mối quan hệ không chỉ là một phần của cuộc sống — chúng là nền tảng. Bạn lấy năng lượng, ý nghĩa và bản sắc từ các kết nối với người khác. Bạn thường hướng đến sự đồng cảm, thường biết cảm giác của ai đó trước khi họ nói. Rủi ro là nhu cầu của chính bạn có thể bị mất đi trong việc cho đi. Khi ở trạng thái tốt nhất, bạn tạo ra sự hiện diện khiến mọi người cảm thấy được nhìn nhận thực sự.',
    },
  ],
  drive: [
    {
      id: 'harmoniser',
      label: 'Người hòa giải',
      tagline: 'Bạn dẫn dắt bằng sự đồng cảm và xây dựng qua kết nối.',
      text: 'Điều thúc đẩy bạn không phải là thành tích cá nhân mà là sự an lành chung. Bạn muốn mọi việc diễn ra tốt đẹp cho tất cả mọi người. Bạn có tài năng tự nhiên trong hòa giải, làm dịu căng thẳng và tìm cách tiếp cận mà hầu hết mọi người đều chấp nhận. Thách thức là việc tìm kiếm sự hòa hợp đôi khi có thể trở thành tránh né xung đột, ngăn bạn đưa ra lập trường quan trọng.',
    },
    {
      id: 'pragmatist',
      label: 'Người thực dụng',
      tagline: 'Bạn biết khi nào cần đẩy tiến và khi nào cần buông tay.',
      text: 'Bạn không phải người thuần thành tích hay thuần hòa hợp — bạn điều chỉnh. Bạn thúc đẩy khi mục tiêu xứng đáng, và buông bỏ khi chi phí quá cao. Sự cân bằng thực dụng này giúp bạn hiệu quả trong nhiều tình huống. Bạn thường không bị thúc đẩy bởi cái tôi hay sự chấp thuận, mang lại sự vững chắc mà người khác chú ý. Bạn hành động khi cần thiết và lùi bước khi không cần.',
    },
    {
      id: 'achiever',
      label: 'Người thành đạt',
      tagline: 'Bạn thôi thúc để tạo ra dấu ấn.',
      text: 'Bạn vận hành với định hướng kiên định hướng đến thành tích. Các mục tiêu tạo ra áp lực nội tâm giữ bạn luôn tiến lên. Bạn thoải mái với cạnh tranh, không nản lòng trước thử thách và đánh giá thành công bằng kết quả đo lường được. Rủi ro là đánh mất các mối quan hệ trong việc đuổi theo kết quả. Động lực của bạn, được định hướng đúng đắn, là một trong những sức mạnh mạnh mẽ nhất.',
    },
  ],
  resilience: [
    {
      id: 'sensitive',
      label: 'Người nhạy cảm',
      tagline: 'Bạn cảm nhận mọi thứ — và đó là một loại sức mạnh.',
      text: 'Hệ thống cảm xúc của bạn được tinh chỉnh tinh tế. Bạn nhận ra những thay đổi tinh tế trong tâm trạng và bầu không khí mà người khác hoàn toàn bỏ lỡ. Sự nhạy cảm này làm bạn rất đồng cảm — nhưng cũng có nghĩa là căng thẳng và phê bình tác động mạnh hơn. Chìa khóa không phải là trở nên ít nhạy cảm hơn, mà là xây dựng các cấu trúc bảo vệ hệ thần kinh của bạn để tài năng biểu hiện nhất quán hơn.',
    },
    {
      id: 'adaptive',
      label: 'Người thích nghi',
      tagline: 'Bạn uốn mình mà không gãy.',
      text: 'Bạn trải qua những thăng trầm cảm xúc nhưng thường tìm lại được sự cân bằng. Căng thẳng không làm bạn mất ổn định vĩnh viễn, và thử thách cũng dạy cho bạn điều gì đó. Bạn không tê liệt cũng không bị áp đảo — bạn xử lý, phục hồi và tái tham gia. Sự phản ứng cảm xúc cân bằng này là tài sản thực sự. Bạn có thể ngồi với khó khăn mà không sụp đổ dưới nó.',
    },
    {
      id: 'resilient',
      label: 'Người kiên cường',
      tagline: 'Áp lực làm rõ hơn là làm sụp đổ bạn.',
      text: 'Bạn có khả năng bất thường để hấp thụ khó khăn mà không bị mất ổn định. Căng thẳng, thất bại và xung đột không đẩy bạn vào vòng xoáy — bạn xử lý chúng tương đối nhanh và trở lại hoạt động. Sự ổn định này làm bạn đáng tin cậy trong khủng hoảng. Điều cần chú ý là sự ổn định cảm xúc đôi khi có thể trở thành khoảng cách cảm xúc — bỏ lỡ các tín hiệu hữu ích hoặc có vẻ không tiếp cận được với người đang gặp khó khăn.',
    },
  ],
};

// ─── Signal extraction ────────────────────────────────────────────────────────
// Each function returns an array of { source, score } where score is 0–100.
// Low end = left pole (e.g. Introverted), high end = right pole (e.g. Extraverted).

// MBTI dichotomy helper: converts chosen pole + pct (50–100) to a 0–100 score.
function mbtiScore(dichotomies, key, highPole) {
  const d = dichotomies?.[key];
  if (!d) return null;
  return d.chosen === highPole ? d.pct : 100 - d.pct;
}

// DISC pcts are independent 0–100 per style; average two related styles.
function discAvg(pcts, ...styles) {
  if (!pcts) return null;
  return styles.reduce((sum, s) => sum + (pcts[s] || 0), 0) / styles.length;
}

function energySignals(r) {
  const signals = [];
  const m = mbtiScore(r.mbti?.mbti?.dichotomies, 'EI', 'E');
  if (m != null) signals.push({ source: 'mbti', score: m });
  if (r.bigfive?.scores?.E != null) signals.push({ source: 'bigfive', score: r.bigfive.scores.E });
  const d = discAvg(r.disc?.disc?.pcts, 'D', 'I');
  if (d != null) signals.push({ source: 'disc', score: d });
  return signals;
}

function mindSignals(r) {
  const signals = [];
  const m = mbtiScore(r.mbti?.mbti?.dichotomies, 'SN', 'N');
  if (m != null) signals.push({ source: 'mbti', score: m });
  if (r.bigfive?.scores?.O != null) signals.push({ source: 'bigfive', score: r.bigfive.scores.O });
  const type = r.enneagram?.enneagram?.type;
  if (type != null) {
    const score = [5, 6, 7].includes(type) ? 75 : [1, 8, 9].includes(type) ? 25 : 50;
    signals.push({ source: 'enneagram', score });
  }
  return signals;
}

function relationshipsSignals(r) {
  const signals = [];
  const attachMap = { secure: 70, anxious: 85, avoidant: 25, fearful: 40 };
  const primary = r.attachment?.attachment?.primary;
  if (primary && attachMap[primary] != null) signals.push({ source: 'attachment', score: attachMap[primary] });
  if (r.bigfive?.scores?.A != null) signals.push({ source: 'bigfive', score: r.bigfive.scores.A });
  const top = r.lovelang?.loveLang?.ranked?.[0];
  if (top?.pct != null) signals.push({ source: 'lovelang', score: top.pct });
  return signals;
}

function driveSignals(r) {
  const signals = [];
  const d = discAvg(r.disc?.disc?.pcts, 'D', 'C');
  if (d != null) signals.push({ source: 'disc', score: d });
  const m = mbtiScore(r.mbti?.mbti?.dichotomies, 'TF', 'T');
  if (m != null) signals.push({ source: 'mbti', score: m });
  if (r.bigfive?.scores?.C != null) signals.push({ source: 'bigfive', score: r.bigfive.scores.C });
  const type = r.enneagram?.enneagram?.type;
  if (type != null) {
    const score = [3, 8, 1].includes(type) ? 75 : [2, 9, 6].includes(type) ? 25 : 50;
    signals.push({ source: 'enneagram', score });
  }
  return signals;
}

function resilienceSignals(r) {
  const signals = [];
  if (r.bigfive?.scores?.N != null) signals.push({ source: 'bigfive', score: 100 - r.bigfive.scores.N });
  const stabilityMap = { secure: 85, anxious: 25, avoidant: 55, fearful: 30 };
  const primary = r.attachment?.attachment?.primary;
  if (primary && stabilityMap[primary] != null) signals.push({ source: 'attachment', score: stabilityMap[primary] });
  return signals;
}

const SIGNAL_FNS = {
  energy: energySignals,
  mind: mindSignals,
  relationships: relationshipsSignals,
  drive: driveSignals,
  resilience: resilienceSignals,
};

// ─── Constellation ────────────────────────────────────────────────────────────

const CONSTELLATION_COLORS = {
  bigfive: '#2979FF',
  mbti: 'var(--color-accent)',
  enneagram: '#E040FB',
  disc: '#00C896',
  attachment: '#FF6B6B',
  lovelang: '#FF9500',
};

const LOVELANG_SHORT = { words: 'Words', service: 'Service', gifts: 'Gifts', time: 'Time', touch: 'Touch' };

function buildConstellation(r, completedModels) {
  const items = [];
  if (completedModels.includes('bigfive') && r.bigfive?.mbti?.type)
    items.push({ id: 'bigfive', label: r.bigfive.mbti.type, color: CONSTELLATION_COLORS.bigfive });
  if (completedModels.includes('mbti') && r.mbti?.mbti?.type)
    items.push({ id: 'mbti', label: r.mbti.mbti.type, color: CONSTELLATION_COLORS.mbti });
  if (completedModels.includes('enneagram') && r.enneagram?.enneagram?.type != null) {
    const { type, wing } = r.enneagram.enneagram;
    items.push({ id: 'enneagram', label: wing ? `${type}w${wing}` : `${type}`, color: CONSTELLATION_COLORS.enneagram });
  }
  if (completedModels.includes('disc') && r.disc?.disc?.primary)
    items.push({ id: 'disc', label: r.disc.disc.primary, color: CONSTELLATION_COLORS.disc });
  if (completedModels.includes('attachment') && r.attachment?.attachment?.primary) {
    const p = r.attachment.attachment.primary;
    items.push({ id: 'attachment', label: p.charAt(0).toUpperCase() + p.slice(1), color: CONSTELLATION_COLORS.attachment });
  }
  if (completedModels.includes('lovelang') && r.lovelang?.loveLang?.ranked?.length) {
    const lang = r.lovelang.loveLang.ranked[0].lang;
    items.push({ id: 'lovelang', label: LOVELANG_SHORT[lang] || lang, color: CONSTELLATION_COLORS.lovelang });
  }
  return items;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateSynthesis(storedResults, lang = 'en') {
  const safeLang = lang === 'vi' ? 'vi' : 'en';
  const archetypes = safeLang === 'vi' ? ARCHETYPES_VI : ARCHETYPES_EN;

  const MODEL_IDS = ['bigfive', 'mbti', 'enneagram', 'disc', 'attachment', 'lovelang'];
  const completedModels = MODEL_IDS.filter(id => {
    const r = storedResults[id];
    if (!r) return false;
    if (id === 'bigfive')    return r.scores != null;
    if (id === 'mbti')       return r.mbti != null;
    if (id === 'enneagram')  return r.enneagram != null;
    if (id === 'disc')       return r.disc != null;
    if (id === 'attachment') return r.attachment != null;
    if (id === 'lovelang')   return r.loveLang != null;
    return false;
  });

  const hasEnoughData = completedModels.length >= SYNTHESIS_MIN_MODELS;
  const constellation = buildConstellation(storedResults, completedModels);

  const dimensions = DIMENSION_CONFIG.map(dim => {
    const signals = SIGNAL_FNS[dim.id](storedResults);

    if (signals.length === 0) {
      return { id: dim.id, poles: dim.poles, accentColor: dim.accentColor, bucket: null, score: null, archetype: null, sources: [] };
    }

    const avg = signals.reduce((sum, s) => sum + s.score, 0) / signals.length;
    const clamped = Math.max(0, Math.min(100, avg));
    const bucket = clamped < 34 ? 0 : clamped < 67 ? 1 : 2;
    const score = bucket === 0 ? 25 : bucket === 1 ? 50 : 75;

    return {
      id: dim.id,
      poles: dim.poles,
      accentColor: dim.accentColor,
      bucket,
      score,
      archetype: archetypes[dim.id][bucket],
      sources: signals.map(s => s.source),
    };
  });

  return { completedModels, hasEnoughData, constellation, dimensions };
}
