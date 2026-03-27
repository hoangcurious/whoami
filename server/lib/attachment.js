// Attachment Style scoring and description library.
//
// Styles: secure, anxious, avoidant, fearful
// Scoring: count A-answers per style (max 6), normalize to percentage.
// Primary = style with highest A-count (ties broken by style order).

const STYLES = ['secure', 'anxious', 'avoidant', 'fearful'];

const DESCRIPTIONS = {
  en: {
    secure: {
      title:   'Secure',
      tagline: 'Grounded in love, free to be yourself.',
      text:    'You approach relationships from a place of genuine security. You trust your partner without needing constant reassurance, and you communicate your needs openly rather than suppressing or amplifying them. Conflict doesn\'t rattle you — you see it as something to work through together, not a sign that the relationship is falling apart. Your sense of self-worth doesn\'t depend on your partner\'s mood, which makes you a steady and reliable presence in the people you love.',
    },
    anxious: {
      title:   'Anxious',
      tagline: 'Deeply loving, but haunted by the fear of losing it.',
      text:    'You experience love intensely and crave deep emotional connection, but that same sensitivity makes you hypervigilant to any sign that things might be slipping away. A late reply, a change in tone, or a cancelled plan can send your mind into overdrive. You often seek reassurance not because you\'re weak, but because uncertainty is genuinely painful for you. With a partner who communicates clearly and consistently, you can feel far more at ease than your anxious patterns might suggest.',
    },
    avoidant: {
      title:   'Avoidant',
      tagline: 'Self-reliant to a fault — comfort lives at arm\'s length.',
      text:    'You have learned to rely on yourself, and that independence is a real strength. But it comes with a cost: when relationships start getting emotionally close, something in you pulls back. Vulnerability feels risky, and deep intimacy can trigger discomfort you\'d rather not examine. You may not consciously want to be distant, but the instinct to create space is strong. Understanding this pattern is the first step toward building the closeness you likely want on some level, even if it doesn\'t feel that way right now.',
    },
    fearful: {
      title:   'Fearful-Avoidant',
      tagline: 'Pulled toward love, pushed away by the fear of it.',
      text:    'You sit with one of the most difficult emotional tensions in relationships: you genuinely want closeness and love, but intimacy also triggers deep fear. Past experiences — often involving inconsistent or hurtful caregiving — have left you expecting pain even from people who seem safe. This can produce a push-pull pattern: drawing someone close and then retreating when they actually get there. You are not broken — you are someone whose nervous system learned to treat connection as both a need and a threat. With the right support, that can change.',
    },
  },
  vi: {
    secure: {
      title:   'An toàn',
      tagline: 'Vững vàng trong tình yêu, tự do là chính mình.',
      text:    'Bạn bước vào các mối quan hệ với một nền tảng nội tâm vững chắc. Bạn tin tưởng người yêu mà không cần được trấn an liên tục, và bạn biết cách nói lên nhu cầu của mình một cách thành thật thay vì kìm nén hay thổi phồng chúng. Xung đột không làm bạn lung lay — bạn xem đó là điều cần cùng nhau giải quyết, không phải dấu hiệu của sự tan vỡ. Giá trị bản thân của bạn không phụ thuộc vào tâm trạng của đối phương, điều đó khiến bạn trở thành một điểm tựa ổn định cho những người bạn yêu thương.',
    },
    anxious: {
      title:   'Lo âu',
      tagline: 'Yêu sâu sắc, nhưng luôn bị nỗi sợ mất mát ám ảnh.',
      text:    'Bạn yêu thật lòng và khao khát sự gắn kết cảm xúc sâu sắc, nhưng chính sự nhạy cảm đó khiến bạn luôn cảnh giác với bất kỳ dấu hiệu nào cho thấy mọi thứ đang trượt khỏi tầm tay. Một tin nhắn trả lời muộn, giọng nói thay đổi, hay một buổi hẹn bị hủy đều có thể khiến tâm trí bạn quay cuồng. Bạn thường tìm kiếm sự trấn an không phải vì yếu đuối, mà vì sự không chắc chắn thực sự rất đau với bạn. Với một người yêu giao tiếp rõ ràng và nhất quán, bạn có thể cảm thấy an tâm hơn rất nhiều so với những gì các thói quen lo âu của bạn thường cho thấy.',
    },
    avoidant: {
      title:   'Né tránh',
      tagline: 'Tự lập đến mức xa cách — sự thoải mái chỉ tồn tại ở khoảng cách an toàn.',
      text:    'Bạn đã học cách tự dựa vào chính mình, và sự độc lập đó là một điểm mạnh thực sự. Nhưng nó đi kèm với một cái giá: khi mối quan hệ bắt đầu trở nên gần gũi về mặt cảm xúc, bản năng trong bạn tìm cách rút lui. Sự dễ bị tổn thương cảm thấy nguy hiểm, và sự thân mật sâu sắc có thể kích hoạt sự khó chịu mà bạn không muốn đối mặt. Có thể bạn không cố tình muốn xa cách, nhưng bản năng tạo ra khoảng cách trong bạn rất mạnh. Hiểu được mô hình này là bước đầu tiên để xây dựng sự gần gũi mà bạn có thể thực sự mong muốn ở tầng sâu hơn, dù hiện tại chưa cảm thấy vậy.',
    },
    fearful: {
      title:   'Sợ gắn bó',
      tagline: 'Bị kéo về phía tình yêu, bị đẩy lùi bởi nỗi sợ chính nó.',
      text:    'Bạn đang sống với một trong những mâu thuẫn cảm xúc khó chịu đựng nhất trong tình yêu: bạn thực sự muốn sự gần gũi và yêu thương, nhưng sự thân mật cũng kích hoạt nỗi sợ hãi sâu thẳm. Những trải nghiệm trong quá khứ — thường liên quan đến sự chăm sóc không nhất quán hoặc gây tổn thương — đã khiến bạn luôn chờ đợi nỗi đau ngay cả từ những người có vẻ an toàn. Điều này tạo ra mô hình kéo-đẩy: kéo ai đó lại gần rồi rút lui ngay khi họ thực sự đến. Bạn không hề bị "hỏng" — bạn là người mà hệ thần kinh đã học cách xem sự kết nối vừa là nhu cầu, vừa là mối đe dọa. Với sự hỗ trợ phù hợp, điều đó có thể thay đổi.',
    },
  },
};

/**
 * Score an attachment quiz.
 *
 * @param {Object} answers   – { "1": "A", "2": "B", ... }  (string keys)
 * @param {Array}  questions – the attachmentQuestions array
 * @param {string} lang      – 'en' | 'vi'
 * @returns {Object} { primary, scores, pcts, title, tagline, text }
 */
function scoreAttachment(answers, questions, lang = 'en') {
  const counts = { secure: 0, anxious: 0, avoidant: 0, fearful: 0 };

  for (const q of questions) {
    if (answers[String(q.id)] === 'A') {
      counts[q.style] = (counts[q.style] || 0) + 1;
    }
  }

  const pcts = {};
  for (const style of STYLES) {
    pcts[style] = Math.round((counts[style] / 6) * 100);
  }

  // Primary: style with highest count; ties broken by STYLES order
  let primary = STYLES[0];
  for (const style of STYLES) {
    if (counts[style] > counts[primary]) {
      primary = style;
    }
  }

  const description = getAttachmentDescription(primary, lang);

  return {
    primary,
    scores: { ...counts },
    pcts,
    ...description,
  };
}

/**
 * Return display strings for a given attachment style.
 *
 * @param {string} style – 'secure' | 'anxious' | 'avoidant' | 'fearful'
 * @param {string} lang  – 'en' | 'vi'
 * @returns {{ title: string, tagline: string, text: string }}
 */
function getAttachmentDescription(style, lang = 'en') {
  const safeLang = lang === 'vi' ? 'vi' : 'en';
  const safeStyle = STYLES.includes(style) ? style : 'secure';
  return DESCRIPTIONS[safeLang][safeStyle];
}

module.exports = { scoreAttachment, getAttachmentDescription, STYLES };
