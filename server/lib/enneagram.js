// Enneagram type descriptions and scoring.

const TYPE_DATA = {
  en: {
    1: {
      title: 'The Reformer',
      tagline: 'Principled, purposeful, and driven to improve everything they touch.',
      text: 'You have a strong internal compass and a persistent sense of what is right. Standards matter deeply to you — not because you are rigid, but because you genuinely believe things can and should be better. That same critical eye you apply to the world you also apply to yourself, which can make you hard on yourself when you fall short. At your best, you inspire others with your integrity and your will to make real improvements.',
    },
    2: {
      title: 'The Helper',
      tagline: 'Warm, generous, and attuned to the needs of those around them.',
      text: 'Your instinct is to give. You notice when people need something and naturally move toward them, often before they even ask. Relationships are the center of your world and being genuinely useful to others brings you deep satisfaction. The challenge you face is that your own needs can get buried under all that giving — and you may find it hard to ask for support in return. At your best, you love freely and with remarkable attentiveness.',
    },
    3: {
      title: 'The Achiever',
      tagline: 'Driven, adaptable, and magnetic — they make things happen.',
      text: 'You move toward goals with real energy and focus. Success is not just something you want — it is how you have learned to feel okay about yourself. You read rooms quickly, adapt your presentation to what the situation calls for, and tend to deliver results. The risk is confusing your achievements with your identity, or losing track of who you are beneath the role you are playing. At your best, you are an inspiring example of what focused effort can accomplish.',
    },
    4: {
      title: 'The Individualist',
      tagline: 'Sensitive, expressive, and searching for their own authentic place in the world.',
      text: 'You experience life with unusual depth and intensity. You have a strong need to be authentic and a persistent feeling that something essential is missing — not just in your life, but in you. That longing fuels your creativity and your sensitivity to beauty, emotion, and meaning. You can feel most yourself in solitude or through creative expression, and least yourself when you feel like just another face in the crowd. At your best, you bring rare depth and originality to everything you create.',
    },
    5: {
      title: 'The Investigator',
      tagline: 'Perceptive, analytical, and relentlessly curious about how things work.',
      text: 'Your mind is your home. You seek to understand everything you engage with — turning ideas over, finding patterns, going deep rather than wide. You are highly self-sufficient by instinct, and you tend to guard your time, energy, and privacy carefully. Large emotional demands from others can feel intrusive, and you often prefer to process things internally before engaging. At your best, you are the person who sees what no one else noticed and explains it with rare clarity.',
    },
    6: {
      title: 'The Loyalist',
      tagline: 'Committed, reliable, and alert to what could go wrong.',
      text: 'You are deeply loyal and take your commitments seriously. You also carry a persistent low-level vigilance — scanning for risks, questioning things that feel uncertain, and seeking reassurance before trusting fully. Authority figures can both attract and unsettle you. Your anxiety is not weakness; it is a form of deep caring about what matters. At your best, you are one of the most dependable, courageous, and trustworthy people in anyone\'s life.',
    },
    7: {
      title: 'The Enthusiast',
      tagline: 'Spontaneous, versatile, and endlessly optimistic about what is possible.',
      text: 'You are drawn to everything life has to offer — new ideas, new places, new experiences. Your energy is high, your mind moves fast, and you have a gift for finding the silver lining in almost anything. The challenge for you is staying present with difficulty or tedium instead of mentally escaping toward something more stimulating. Commitment can feel like a ceiling on your freedom. At your best, you bring infectious joy and genuine vision to every room you enter.',
    },
    8: {
      title: 'The Challenger',
      tagline: 'Decisive, powerful, and protective of those they consider their own.',
      text: 'You move through the world with force and confidence. You are direct, decisive, and not afraid of conflict — in fact, you often feel more comfortable with honest confrontation than polite ambiguity. Underneath that intensity is a deep loyalty: the people you care about have a fierce protector in you. Vulnerability is hard for you to show, and you can come across as more intimidating than you intend. At your best, you use your strength to champion others and create real change.',
    },
    9: {
      title: 'The Peacemaker',
      tagline: 'Accepting, steady, and gifted at seeing all sides of any situation.',
      text: 'You have a natural ability to understand many perspectives and to make people feel heard. Harmony is genuinely important to you — not just as a preference, but as a deep need. The trouble is that in your effort to keep the peace, your own desires and agenda can get lost. You may agree outwardly while quietly resisting, or let inertia take over when action is needed. At your best, you are a calming, unifying force with a remarkable capacity for patience and perspective.',
    },
  },
  vi: {
    1: {
      title: 'Người cải cách',
      tagline: 'Có nguyên tắc, có mục đích và luôn cố gắng cải thiện mọi thứ họ chạm vào.',
      text: 'Bạn có kim chỉ nam nội tâm mạnh mẽ và nhận thức rõ ràng về điều đúng đắn. Tiêu chuẩn rất quan trọng với bạn — không phải vì bạn cứng nhắc, mà vì bạn thực sự tin rằng mọi thứ có thể và nên tốt hơn. Con mắt phê phán đó bạn áp dụng cho thế giới cũng được áp dụng cho chính mình, khiến bạn tự trách khi không đạt chuẩn. Khi ở trạng thái tốt nhất, bạn truyền cảm hứng cho người khác bằng sự chính trực và ý chí cải thiện thực sự.',
    },
    2: {
      title: 'Người trợ giúp',
      tagline: 'Ấm áp, hào phóng và nhạy bén với nhu cầu của những người xung quanh.',
      text: 'Bản năng của bạn là cho đi. Bạn nhận ra khi người khác cần gì đó và tự nhiên hướng về phía họ, thường trước khi họ hỏi. Các mối quan hệ là trung tâm cuộc sống của bạn và việc giúp đỡ người khác mang lại sự thỏa mãn sâu sắc. Thách thức bạn đối mặt là nhu cầu của chính mình bị chôn vùi dưới tất cả sự cho đi đó — và bạn có thể thấy khó yêu cầu hỗ trợ. Khi ở trạng thái tốt nhất, bạn yêu thương tự do và với sự chú ý đáng kể.',
    },
    3: {
      title: 'Người thành đạt',
      tagline: 'Quyết đoán, linh hoạt và có sức hút — họ làm cho mọi thứ xảy ra.',
      text: 'Bạn tiến đến mục tiêu với năng lượng và sự tập trung thực sự. Thành công không chỉ là điều bạn muốn — đó là cách bạn học được để cảm thấy ổn về bản thân. Bạn đọc phòng nhanh chóng, điều chỉnh cách thể hiện theo tình huống và có xu hướng đạt kết quả. Rủi ro là nhầm lẫn thành tích với bản sắc. Khi ở trạng thái tốt nhất, bạn là hình mẫu truyền cảm hứng về những gì nỗ lực tập trung có thể đạt được.',
    },
    4: {
      title: 'Người cá tính',
      tagline: 'Nhạy cảm, biểu cảm và luôn tìm kiếm vị trí chân thực của mình trong thế giới.',
      text: 'Bạn trải nghiệm cuộc sống với chiều sâu và cường độ bất thường. Bạn có nhu cầu mạnh mẽ về sự chân thực và cảm giác dai dẳng rằng có điều gì đó thiết yếu đang thiếu. Nỗi khao khát đó thúc đẩy sự sáng tạo và độ nhạy cảm với vẻ đẹp, cảm xúc và ý nghĩa. Khi ở trạng thái tốt nhất, bạn mang đến chiều sâu và tính độc đáo hiếm có cho mọi thứ bạn tạo ra.',
    },
    5: {
      title: 'Người điều tra',
      tagline: 'Nhạy bén, phân tích và không ngừng tò mò về cách mọi thứ vận hành.',
      text: 'Tâm trí của bạn là ngôi nhà. Bạn tìm cách hiểu mọi thứ bạn tiếp xúc — lật ngược ý tưởng, tìm mẫu, đi sâu thay vì rộng. Bạn rất tự lập theo bản năng và có xu hướng bảo vệ thời gian, năng lượng và sự riêng tư của mình. Khi ở trạng thái tốt nhất, bạn là người nhìn thấy những gì người khác không chú ý và giải thích với sự rõ ràng hiếm có.',
    },
    6: {
      title: 'Người trung thành',
      tagline: 'Cam kết, đáng tin cậy và luôn cảnh giác với những gì có thể xảy ra.',
      text: 'Bạn trung thành sâu sắc và coi trọng cam kết của mình. Bạn cũng mang một sự cảnh giác liên tục ở mức độ thấp — quét tìm rủi ro, đặt câu hỏi về những điều không chắc chắn và tìm kiếm sự trấn an. Khi ở trạng thái tốt nhất, bạn là một trong những người đáng tin cậy, dũng cảm và đáng trông cậy nhất trong cuộc sống của bất kỳ ai.',
    },
    7: {
      title: 'Người nhiệt huyết',
      tagline: 'Tự nhiên, linh hoạt và không ngừng lạc quan về những gì có thể xảy ra.',
      text: 'Bạn bị thu hút bởi mọi thứ cuộc sống có thể mang lại — ý tưởng mới, nơi chốn mới, trải nghiệm mới. Năng lượng của bạn cao, tâm trí chuyển động nhanh và bạn có tài tìm thấy điểm tích cực trong hầu hết mọi thứ. Thách thức là hiện diện với sự khó khăn thay vì thoát ra tinh thần. Khi ở trạng thái tốt nhất, bạn mang niềm vui lây lan và tầm nhìn thực sự vào mọi nơi bạn bước vào.',
    },
    8: {
      title: 'Người thách thức',
      tagline: 'Quyết đoán, mạnh mẽ và bảo vệ những người họ coi là của mình.',
      text: 'Bạn di chuyển qua thế giới với sức mạnh và sự tự tin. Bạn thẳng thắn, quyết đoán và không ngại xung đột. Dưới cường độ đó là một lòng trung thành sâu sắc: những người bạn quan tâm có một người bảo vệ mạnh mẽ trong bạn. Khi ở trạng thái tốt nhất, bạn dùng sức mạnh để ủng hộ người khác và tạo ra sự thay đổi thực sự.',
    },
    9: {
      title: 'Người hòa giải',
      tagline: 'Chấp nhận, kiên định và có tài nhìn thấy tất cả các khía cạnh của bất kỳ tình huống nào.',
      text: 'Bạn có khả năng tự nhiên để hiểu nhiều quan điểm và khiến người khác cảm thấy được lắng nghe. Sự hài hòa thực sự quan trọng với bạn — không chỉ là sở thích, mà là nhu cầu sâu sắc. Khi ở trạng thái tốt nhất, bạn là một lực lượng bình yên, thống nhất với khả năng kiên nhẫn và nhìn nhận đáng kinh ngạc.',
    },
  },
};

function getEnneagramDescription(type, lang = 'en') {
  const langData = TYPE_DATA[lang] || TYPE_DATA.en;
  return langData[type] || langData[1];
}

function scoreEnneagram(answers, questions, lang = 'en') {
  // Count A-answers per type (1–9)
  const scores = {};
  for (let i = 1; i <= 9; i++) scores[i] = 0;

  for (const q of questions) {
    if (answers[String(q.id)] === 'A') {
      scores[q.type] = (scores[q.type] || 0) + 1;
    }
  }

  // Primary type = highest score (lower number wins ties)
  const sorted = Object.entries(scores)
    .map(([t, s]) => ({ type: Number(t), score: s }))
    .sort((a, b) => b.score - a.score || a.type - b.type);

  const primary = sorted[0].type;

  // Wing = adjacent type (on the Enneagram circle 1-2-3-4-5-6-7-8-9-1)
  // with the higher score of the two adjacent types
  const adj1 = primary === 1 ? 9 : primary - 1;
  const adj2 = primary === 9 ? 1 : primary + 1;
  const wing = scores[adj1] >= scores[adj2] ? adj1 : adj2;

  const description = getEnneagramDescription(primary, lang);

  return {
    type: primary,
    wing,
    scores,
    ...description,
  };
}

module.exports = { scoreEnneagram, getEnneagramDescription };
