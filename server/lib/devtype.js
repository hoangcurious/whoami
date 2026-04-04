// Developer Type scoring and archetype descriptions.
//
// Six archetypes: ARCH, CRAFT, HACK, EXPL, PRAG, MENT
// Scoring: 24 questions, 4 per dimension.
//   - Count A-answers per dimension (option A = that dimension's type)
//   - pct = Math.round((count / 4) * 100)  →  0 / 25 / 50 / 75 / 100
//   - primary   = highest count (TYPES order as stable tiebreaker)
//   - secondary = second highest

const TYPES = ['ARCH', 'CRAFT', 'HACK', 'EXPL', 'PRAG', 'MENT'];

const DESCRIPTIONS = {
  en: {
    ARCH: {
      title: 'The Architect',
      tagline: 'You think in systems, abstractions, and patterns — and you always think long-term.',
      text: 'Before you write a line of code, you have already mentally modelled the system it will live in. You care about how components fit together, how decisions will age, and whether the structure you build today will support what the product needs next year. You can frustrate teammates who want to move fast, but the systems you design tend to be the ones that survive. You are at your best when given the latitude to shape technical direction.',
    },
    CRAFT: {
      title: 'The Craftsman',
      tagline: 'Code quality is not a preference for you — it is a standard.',
      text: 'You believe that software written with care runs better, lasts longer, and is less painful to work with. You notice bad naming, fragile tests, and missing edge cases the way a carpenter notices a crooked joint — it bothers you even when it does not strictly need fixing. You invest in the craft not for its own sake but because you have learned that quality compounds over time. The codebases you tend to become places people genuinely want to work in.',
    },
    HACK: {
      title: 'The Hacker',
      tagline: 'Where others see obstacles, you see a puzzle that needs cracking.',
      text: 'You are wired for problem-solving. Give you a hard constraint — a tight deadline, an undocumented API, a production fire — and you come alive. You are resourceful, unconventional, and not particularly precious about elegance if it gets in the way of working. Your commit messages might be chaotic but your ability to unblock a team under pressure is invaluable. The best environments for you reward results over process.',
    },
    EXPL: {
      title: 'The Explorer',
      tagline: 'The frontier is where you feel most alive.',
      text: 'You are driven by curiosity and a genuine hunger to learn. New languages, frameworks, paradigms, and tools are not distractions — they are the point. You read release notes for fun, have opinions about things not yet widely used, and tend to be the person who brings new ideas into a team before the rest of the world catches up. The challenge for you is depth: the urge to explore the next thing can pull you away before you have fully mastered the current one.',
    },
    PRAG: {
      title: 'The Pragmatist',
      tagline: 'You do what works. Shipping is not a compromise — it is the goal.',
      text: 'You cut through noise and get things done. Where others get bogged down in debates about the right approach, you have already started building the good-enough one. You have strong instincts about what actually matters in a given situation and a low tolerance for engineering theatre. You are not against quality or good design — you just demand that they earn their cost in time and complexity. Teams with you in them tend to actually ship.',
    },
    MENT: {
      title: 'The Mentor',
      tagline: 'Your output is measured not just in code, but in people.',
      text: 'You understand that the best way to scale yourself is to level up the people around you. You invest in others not as an obligation but because seeing someone grow genuinely satisfies you. You write documentation that people actually read, run code reviews that teach rather than just approve, and have the patience to explain the same concept multiple different ways until it lands. The teams you have been part of tend to be unusually good at knowledge-sharing and unusually low on hero dependencies.',
    },
  },
  vi: {
    ARCH: {
      title: 'Kiến trúc sư',
      tagline: 'Bạn tư duy bằng hệ thống, trừu tượng và mẫu thiết kế — và luôn nghĩ dài hạn.',
      text: 'Trước khi viết một dòng code, bạn đã hình dung trong đầu hệ thống mà nó sẽ tồn tại. Bạn quan tâm đến cách các thành phần kết hợp, các quyết định sẽ trưởng thành như thế nào, và liệu cấu trúc bạn xây hôm nay có hỗ trợ những gì sản phẩm cần trong năm tới. Bạn có thể làm đồng đội muốn tiến nhanh thất vọng, nhưng các hệ thống bạn thiết kế thường là những hệ thống bền vững nhất. Bạn tốt nhất khi được trao quyền định hướng kỹ thuật.',
    },
    CRAFT: {
      title: 'Người thợ thủ công',
      tagline: 'Chất lượng code không phải là sở thích của bạn — đó là tiêu chuẩn.',
      text: 'Bạn tin rằng phần mềm được viết cẩn thận sẽ chạy tốt hơn, tồn tại lâu hơn và ít gây đau đầu hơn. Bạn nhận ra tên biến tệ, test mong manh và edge case bị bỏ sót giống như thợ mộc nhận ra mối nối cong — nó làm bạn khó chịu dù không thực sự cần thiết. Bạn đầu tư vào nghề thủ công vì bạn đã học được rằng chất lượng tích lũy theo thời gian. Những codebase bạn chăm sóc trở thành nơi mọi người muốn làm việc.',
    },
    HACK: {
      title: 'Hacker',
      tagline: 'Nơi người khác thấy trở ngại, bạn thấy một câu đố cần được giải.',
      text: 'Bạn được sinh ra để giải quyết vấn đề. Đưa cho bạn một ràng buộc khắt khe — deadline gấp, một API không có tài liệu, một sự cố trên production — và bạn bừng sống. Bạn có tài ứng biến, sáng tạo và không quá câu nệ về sự tinh tế nếu nó cản trở kết quả. Commit history của bạn có thể hỗn loạn nhưng khả năng gỡ rối cho nhóm trong khủng hoảng là vô giá. Môi trường tốt nhất cho bạn là nơi tưởng thưởng kết quả hơn quy trình.',
    },
    EXPL: {
      title: 'Nhà khám phá',
      tagline: 'Biên giới là nơi bạn cảm thấy sống động nhất.',
      text: 'Bạn được thúc đẩy bởi sự tò mò và khao khát học hỏi thực sự. Ngôn ngữ mới, framework, paradigm và công cụ không phải là thứ làm bạn mất tập trung — chúng chính là mục đích. Bạn đọc release notes để vui, có quan điểm về những thứ chưa được dùng rộng rãi, và thường là người đưa ý tưởng mới vào nhóm trước khi thế giới kịp bắt kịp. Thách thức với bạn là chiều sâu: sự thôi thúc khám phá điều tiếp theo có thể kéo bạn đi trước khi thực sự thành thạo điều hiện tại.',
    },
    PRAG: {
      title: 'Người thực dụng',
      tagline: 'Bạn làm những gì hiệu quả. Ship không phải là thỏa hiệp — đó là mục tiêu.',
      text: 'Bạn cắt bỏ ồn ào và hoàn thành công việc. Trong khi người khác sa lầy vào tranh luận về cách tiếp cận đúng, bạn đã bắt đầu xây dựng cái đủ tốt. Bạn có bản năng mạnh về điều gì thực sự quan trọng và không chịu được "kỹ thuật biểu diễn". Bạn không chống lại chất lượng hay thiết kế tốt — bạn chỉ yêu cầu chúng phải xứng đáng với chi phí thời gian và độ phức tạp. Các nhóm có bạn thường thực sự ship được.',
    },
    MENT: {
      title: 'Người hướng dẫn',
      tagline: 'Đóng góp của bạn không chỉ là code — mà còn là con người.',
      text: 'Bạn hiểu rằng cách tốt nhất để nhân rộng bản thân là nâng cao những người xung quanh. Bạn đầu tư vào người khác không phải vì nghĩa vụ mà vì thấy ai đó trưởng thành thực sự làm bạn thỏa mãn. Bạn viết tài liệu mà người ta thực sự đọc, thực hiện code review dạy học chứ không chỉ phê duyệt, và kiên nhẫn giải thích cùng một khái niệm theo nhiều cách khác nhau cho đến khi thấm. Các nhóm bạn từng tham gia thường chia sẻ kiến thức rất tốt và ít phụ thuộc vào "anh hùng" cá nhân.',
    },
  },
};

function getDevtypeDescription(type, lang) {
  const safeLang = lang === 'vi' ? 'vi' : 'en';
  return (DESCRIPTIONS[safeLang] && DESCRIPTIONS[safeLang][type])
    || DESCRIPTIONS.en[type]
    || DESCRIPTIONS.en.PRAG;
}

/**
 * Score a completed set of devtype answers.
 *
 * @param {Object} answers   - { "1": "A"|"B", ... }
 * @param {Array}  questions - devtypeQuestions array
 * @param {string} lang      - 'en' | 'vi'
 * @returns {{ primary, secondary, scores, pcts, title, tagline, text }}
 */
function scoreDevtype(answers, questions, lang) {
  const counts = { ARCH: 0, CRAFT: 0, HACK: 0, EXPL: 0, PRAG: 0, MENT: 0 };

  for (const q of questions) {
    if (answers[String(q.id)] === 'A') {
      counts[q.dimension] = (counts[q.dimension] || 0) + 1;
    }
  }

  // Normalize to percentage out of 4 questions per type
  const pcts = {};
  for (const type of TYPES) {
    pcts[type] = Math.round(((counts[type] || 0) / 4) * 100);
  }

  // Sort by count descending; TYPES order is the stable tiebreaker
  const sorted = [...TYPES].sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  const primary = sorted[0];
  const secondary = sorted[1];

  const desc = getDevtypeDescription(primary, lang);

  return {
    primary,
    secondary,
    scores: { ...counts },
    pcts:   { ...pcts },
    title:   desc.title,
    tagline: desc.tagline,
    text:    desc.text,
  };
}

module.exports = { scoreDevtype, getDevtypeDescription, TYPES };
