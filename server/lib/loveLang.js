// Love Languages scoring and description library.
//
// 5 languages: words, service, gifts, time, touch
// Each language appears in 4 pairs × 3 questions = 12 questions total.
// Max score per language = 12.  Sum of all 5 scores = 30.

const DESCRIPTIONS = {
  en: {
    words: {
      title: 'Words of Affirmation',
      tagline: 'Verbal expressions of love, encouragement, and appreciation mean everything to you.',
      text: 'You feel most loved when the people closest to you say it out loud — through genuine compliments, heartfelt thank-yous, and regular reminders of how much you mean to them. Criticism lands hard on you, and silence from someone you love can feel like distance. You believe that love unexpressed is only half felt, and a well-chosen word at the right moment can carry more weight for you than almost any gesture.',
    },
    service: {
      title: 'Acts of Service',
      tagline: 'Actions speak louder than words — what your partner does for you is love made visible.',
      text: 'For you, love is demonstrated through effort. When someone goes out of their way to lighten your load — cooking a meal, handling a task you dread, or anticipating a need before you even voice it — you feel genuinely cared for. You notice and deeply appreciate the thoughtful, practical things people do, and you tend to express your own love the same way: by showing up and doing.',
    },
    gifts: {
      title: 'Receiving Gifts',
      tagline: 'Thoughtful tokens and surprises tell you that you were on someone\'s mind.',
      text: 'Your love language is not about materialism — it is about what a gift represents. When someone takes the time to select something meaningful for you, it signals that they were thinking of you when you were not around. You cherish the symbolism of a well-chosen present far more than its price tag, and you tend to keep and remember gifts as tangible proof of love and connection.',
    },
    time: {
      title: 'Quality Time',
      tagline: 'Undivided attention and shared presence is the most precious gift you can receive.',
      text: 'You feel deeply loved when someone gives you their full, unhurried attention. It is not simply about being in the same room — it is about eye contact, engaged conversation, and the feeling that you are the priority in that moment. Canceled plans or distracted presence can hurt you more than most people realize, because for you, time freely given is the clearest measure of how much someone loves you.',
    },
    touch: {
      title: 'Physical Touch',
      tagline: 'Physical closeness and warmth communicate safety, love, and belonging.',
      text: 'For you, physical connection is a fundamental channel of love. A lingering hug, a hand on your shoulder, or simply sitting close to someone you love communicates more than words often can. Touch grounds you and makes abstract feelings feel real and present. Its absence — especially from someone you are close to — can leave you feeling isolated, while even small gestures of warmth can immediately restore your sense of connection.',
    },
  },
  vi: {
    words: {
      title: 'Lời khen ngợi',
      tagline: 'Những lời bày tỏ tình yêu, khích lệ và trân trọng có ý nghĩa rất lớn với bạn.',
      text: 'Bạn cảm thấy được yêu thương nhất khi những người thân thiết nói điều đó ra — qua lời khen chân thành, lời cảm ơn từ trái tim, và những lời nhắc nhở thường xuyên về ý nghĩa của bạn với họ. Những lời chỉ trích tác động mạnh đến bạn, và sự im lặng từ người bạn yêu có thể cảm thấy như khoảng cách. Bạn tin rằng tình yêu không được bày tỏ chỉ được cảm nhận một nửa, và một lời nói được chọn lựa kỹ lưỡng đúng lúc có thể có sức nặng hơn hầu hết mọi cử chỉ với bạn.',
    },
    service: {
      title: 'Hành động quan tâm',
      tagline: 'Hành động nói lên nhiều hơn lời nói — những gì người yêu làm cho bạn chính là tình yêu được thể hiện.',
      text: 'Với bạn, tình yêu được thể hiện qua sự nỗ lực. Khi ai đó cố gắng hết sức để giảm nhẹ gánh nặng cho bạn — nấu ăn, giải quyết công việc bạn ngại, hoặc nhận ra nhu cầu của bạn trước khi bạn nói ra — bạn cảm thấy thực sự được quan tâm. Bạn nhận thấy và trân trọng sâu sắc những việc làm thiết thực và chu đáo mà mọi người làm, và bạn cũng có xu hướng bày tỏ tình yêu của mình theo cách tương tự: bằng cách hiện diện và hành động.',
    },
    gifts: {
      title: 'Quà tặng',
      tagline: 'Những món quà và bất ngờ chu đáo cho bạn biết rằng bạn đang ở trong tâm trí của ai đó.',
      text: 'Ngôn ngữ tình yêu của bạn không phải về vật chất — mà là về ý nghĩa của món quà. Khi ai đó dành thời gian để chọn thứ gì đó có ý nghĩa với bạn, điều đó báo hiệu rằng họ đã nghĩ đến bạn khi bạn không ở bên. Bạn trân trọng biểu tượng của một món quà được chọn lựa kỹ lưỡng hơn nhiều so với giá trị của nó, và bạn có xu hướng giữ và nhớ những món quà như bằng chứng hữu hình của tình yêu và sự kết nối.',
    },
    time: {
      title: 'Thời gian chất lượng',
      tagline: 'Sự chú ý trọn vẹn và hiện diện bên nhau là món quà quý giá nhất bạn có thể nhận được.',
      text: 'Bạn cảm thấy được yêu thương sâu sắc khi ai đó dành cho bạn sự chú ý đầy đủ, không vội vã. Không chỉ đơn giản là ở cùng phòng — mà là ánh mắt giao nhau, cuộc trò chuyện sâu sắc, và cảm giác rằng bạn là ưu tiên trong khoảnh khắc đó. Kế hoạch bị hủy hoặc sự hiện diện xao lãng có thể làm tổn thương bạn hơn nhiều người nhận ra, bởi vì với bạn, thời gian được dành ra tự nguyện là thước đo rõ ràng nhất về mức độ yêu thương của ai đó.',
    },
    touch: {
      title: 'Tiếp xúc thể chất',
      tagline: 'Sự gần gũi và ấm áp thể xác truyền đạt sự an toàn, tình yêu và cảm giác thuộc về.',
      text: 'Với bạn, kết nối thể xác là kênh tình yêu cơ bản. Một cái ôm kéo dài, bàn tay đặt lên vai, hay chỉ ngồi gần người bạn yêu truyền đạt nhiều hơn những gì lời nói thường có thể. Sự tiếp xúc giúp bạn bám víu vào thực tại và làm cho những cảm xúc trừu tượng trở nên thật và hiện diện. Sự vắng mặt của nó — đặc biệt từ người thân thiết — có thể khiến bạn cảm thấy cô lập, trong khi ngay cả những cử chỉ ấm áp nhỏ cũng có thể lập tức khôi phục cảm giác kết nối của bạn.',
    },
  },
};

/**
 * Get the title, tagline, and description text for a love language in the given language.
 *
 * @param {string} lang   - One of: words, service, gifts, time, touch
 * @param {string} langCode - 'en' or 'vi'
 * @returns {{ title, tagline, text }}
 */
function getLoveLangDescription(lang, langCode = 'en') {
  const locale = langCode === 'vi' ? 'vi' : 'en';
  return DESCRIPTIONS[locale][lang] || DESCRIPTIONS.en[lang];
}

/**
 * Score a completed Love Languages quiz.
 *
 * @param {Object} answers   - Map of question id (string) → 'A' | 'B'
 * @param {Array}  questions - The full loveLangQuestions array
 * @param {string} langCode  - 'en' or 'vi' (for descriptions)
 * @returns {{ ranked: Array<{ lang, score, pct, title, tagline, text }> }}
 */
function scoreLoveLang(answers, questions, langCode = 'en') {
  const scores = {
    words:   0,
    service: 0,
    gifts:   0,
    time:    0,
    touch:   0,
  };

  for (const q of questions) {
    const answer = answers[String(q.id)];
    if (answer === 'A') {
      scores[q.lang_a] += 1;
    } else if (answer === 'B') {
      scores[q.lang_b] += 1;
    }
  }

  // Each language appears in exactly 12 questions → max score = 12
  const MAX_SCORE = 12;

  const ranked = Object.entries(scores)
    .map(([lang, score]) => {
      const desc = getLoveLangDescription(lang, langCode);
      return {
        lang,
        score,
        pct: Math.round((score / MAX_SCORE) * 100),
        ...desc,
      };
    })
    .sort((a, b) => b.score - a.score);

  return { ranked };
}

module.exports = { scoreLoveLang, getLoveLangDescription };
