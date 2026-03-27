// DISC personality model scoring and descriptions.
//
// Scoring:
//   - 28 forced-choice A/B questions, 7 per style (D, I, S, C).
//   - Each question's `style` field indicates which style option A maps to.
//   - Count A-answers per style, normalize to percentage (out of 7).
//   - Primary = highest count; Secondary = second highest.

const STYLES = ['D', 'I', 'S', 'C'];

const DESCRIPTIONS = {
  en: {
    D: {
      title: 'Dominant',
      tagline: 'Driven, direct, and decisive — built to lead and deliver results.',
      text: 'You are results-oriented and thrive when you have the authority to make things happen. Challenges energize rather than intimidate you, and you are not afraid to make tough calls under pressure. You prefer directness over diplomacy and can grow impatient with slow processes or indecisiveness. At your best, you drive teams forward and turn ambitious goals into concrete outcomes.',
    },
    I: {
      title: 'Influential',
      tagline: 'Energetic, persuasive, and socially magnetic — you move people.',
      text: 'You have a natural ability to inspire enthusiasm and bring people together around a shared idea or goal. Relationships are central to how you work — you build them quickly and use them to create momentum. You communicate with warmth and expressiveness, and your optimism is genuinely contagious. At your best, you are a catalyst who turns skeptics into allies and transforms group energy into collective action.',
    },
    S: {
      title: 'Steady',
      tagline: 'Reliable, calm, and deeply supportive — the backbone of any team.',
      text: 'You bring consistency and stability to everything you do, making you the person others instinctively turn to in uncertain times. You listen carefully, follow through on commitments, and genuinely care about the well-being of those around you. Sudden change can be unsettling for you — you work best in environments where expectations are clear and trust has been built over time. At your best, you are the quiet force that holds a team together through both routine and hardship.',
    },
    C: {
      title: 'Conscientious',
      tagline: 'Systematic, precise, and quality-driven — accuracy is your standard.',
      text: 'You approach your work with rigor and attention to detail that others often overlook. Before acting, you gather information, weigh risks, and ensure your reasoning is sound. High standards are non-negotiable for you — you would rather take more time and get it right than rush and produce something flawed. At your best, you bring intellectual depth and disciplined thinking that elevate the quality of everything your team produces.',
    },
  },
  vi: {
    D: {
      title: 'Thống trị',
      tagline: 'Quyết đoán, trực tiếp và hướng đến kết quả — sinh ra để dẫn dắt.',
      text: 'Bạn là người định hướng kết quả và phát huy tốt nhất khi có quyền chủ động hành động. Thử thách khơi dậy năng lượng trong bạn thay vì gây sợ hãi, và bạn không ngại đưa ra những quyết định khó khăn dưới áp lực. Bạn thích sự thẳng thắn hơn ngoại giao và dễ mất kiên nhẫn với các quy trình chậm chạp hay sự thiếu quyết đoán. Khi ở phong độ tốt nhất, bạn thúc đẩy nhóm tiến về phía trước và biến những mục tiêu đầy tham vọng thành kết quả cụ thể.',
    },
    I: {
      title: 'Ảnh hưởng',
      tagline: 'Năng động, thuyết phục và cuốn hút — bạn có khả năng truyền cảm hứng.',
      text: 'Bạn có khả năng tự nhiên trong việc khơi dậy nhiệt huyết và gắn kết mọi người xung quanh một ý tưởng hay mục tiêu chung. Các mối quan hệ là trung tâm trong cách bạn làm việc — bạn xây dựng chúng nhanh chóng và sử dụng chúng để tạo ra động lực. Bạn giao tiếp với sự ấm áp và biểu cảm, và sự lạc quan của bạn thực sự lan tỏa sang người khác. Khi ở phong độ tốt nhất, bạn là chất xúc tác biến những người hoài nghi thành đồng minh và chuyển hóa năng lượng nhóm thành hành động tập thể.',
    },
    S: {
      title: 'Ổn định',
      tagline: 'Đáng tin cậy, điềm tĩnh và hỗ trợ sâu sắc — trụ cột của mọi nhóm.',
      text: 'Bạn mang lại sự nhất quán và ổn định trong mọi việc mình làm, khiến bạn trở thành người mà những người khác tự nhiên tìm đến trong những thời điểm bất ổn. Bạn lắng nghe cẩn thận, thực hiện đúng các cam kết và thực sự quan tâm đến sự an lành của những người xung quanh. Thay đổi đột ngột có thể khiến bạn bất ổn — bạn làm việc hiệu quả nhất trong môi trường có kỳ vọng rõ ràng và lòng tin được xây dựng theo thời gian. Khi ở phong độ tốt nhất, bạn là sức mạnh thầm lặng giữ vững một nhóm qua cả những lúc bình thường lẫn khó khăn.',
    },
    C: {
      title: 'Tận tâm',
      tagline: 'Có hệ thống, chính xác và đề cao chất lượng — độ chính xác là tiêu chuẩn của bạn.',
      text: 'Bạn tiếp cận công việc với sự nghiêm túc và chú ý đến chi tiết mà người khác thường bỏ qua. Trước khi hành động, bạn thu thập thông tin, cân nhắc rủi ro và đảm bảo lý luận của mình vững chắc. Tiêu chuẩn cao là điều không thể thương lượng với bạn — bạn thà mất thêm thời gian để làm đúng còn hơn vội vàng và tạo ra sản phẩm có sai sót. Khi ở phong độ tốt nhất, bạn mang đến chiều sâu trí tuệ và tư duy có kỷ luật giúp nâng cao chất lượng của mọi thứ mà nhóm bạn tạo ra.',
    },
  },
};

/**
 * Returns the description object for a given style and language.
 * @param {'D'|'I'|'S'|'C'} style
 * @param {'en'|'vi'} lang
 * @returns {{ title: string, tagline: string, text: string }}
 */
function getDiscDescription(style, lang) {
  const safeLang = lang === 'vi' ? 'vi' : 'en';
  return DESCRIPTIONS[safeLang][style] || DESCRIPTIONS.en[style];
}

/**
 * Scores a set of DISC answers against the question list.
 * @param {{ [questionId: string]: 'A'|'B' }} answers  - keyed by question id (string or number)
 * @param {Array} questions - the full discQuestions array
 * @returns {{ primary: string, secondary: string, scores: object, pcts: object,
 *             title: string, tagline: string, text: string }}
 */
function scoreDisc(answers, questions) {
  // Count A-answers per style
  const counts = { D: 0, I: 0, S: 0, C: 0 };
  for (const q of questions) {
    if (answers[String(q.id)] === 'A') {
      counts[q.style] = (counts[q.style] || 0) + 1;
    }
  }

  // Normalize to percentage (max 7 per style)
  const pcts = {};
  for (const s of STYLES) {
    pcts[s] = Math.round((counts[s] / 7) * 100);
  }

  // Sort styles by count descending to find primary and secondary
  const sorted = [...STYLES].sort((a, b) => counts[b] - counts[a]);
  const primary = sorted[0];
  const secondary = sorted[1];

  const description = getDiscDescription(primary, 'en'); // default lang; caller can override

  return {
    primary,
    secondary,
    scores: { ...counts },
    pcts: { ...pcts },
    title: description.title,
    tagline: description.tagline,
    text: description.text,
  };
}

module.exports = { scoreDisc, getDiscDescription, STYLES };
