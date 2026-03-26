// Per-dimension descriptive text keyed by language and level: "high" | "moderate" | "low"

const descriptions = {
  en: {
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
  },
  vi: {
    O: {
      high: {
        title: 'Rất cởi mở với trải nghiệm',
        text: 'Bạn chủ động tìm kiếm những ý tưởng, trải nghiệm và góc nhìn mới. Sự tò mò là động lực của bạn — bạn thường khám phá các chủ đề lạ, thử nghiệm các cách tiếp cận sáng tạo, và đặt câu hỏi về cách mọi thứ hoạt động ở mức sâu hơn. Bạn bị thu hút bởi tư duy trừu tượng và thích những cuộc trò chuyện vượt ra ngoài bề mặt.',
      },
      moderate: {
        title: 'Cởi mở ở mức trung bình',
        text: 'Bạn cân bằng giữa sự tò mò và tính thực tế. Bạn thích khám phá ý tưởng mới khi chúng phù hợp, nhưng cũng đánh giá cao các phương pháp đã được chứng minh và những giải thích rõ ràng, cụ thể. Bạn có thể tham gia vào tư duy trừu tượng mà không bị cuốn hút hoàn toàn.',
      },
      low: {
        title: 'Thực tế và vững chắc',
        text: 'Bạn thích những gì cụ thể, đã được kiểm chứng và hữu ích. Bạn hiệu quả và đáng tin cậy vì bạn bám vào các cách tiếp cận đã hiệu quả thay vì thử nghiệm không cần thiết. Các cuộc thảo luận giả định ít hấp dẫn bạn hơn so với các vấn đề thực tế, có thể áp dụng được. Bạn tìm thấy sự thoải mái trong các thói quen quen thuộc và hướng dẫn rõ ràng.',
      },
    },
    C: {
      high: {
        title: 'Rất tận tâm',
        text: 'Bạn lập kế hoạch trước, hoàn thành công việc và giữ vững cam kết ngay cả khi động lực giảm sút. Môi trường của bạn được sắp xếp ngăn nắp, các hạn chót được đáp ứng, và mọi người xung quanh có thể tin tưởng vào bạn. Bạn hiếm khi làm qua loa và có xu hướng kiểm tra công việc trước khi coi là hoàn thành.',
      },
      moderate: {
        title: 'Tận tâm ở mức trung bình',
        text: 'Bạn nhìn chung đáng tin cậy và có tổ chức, mặc dù không cứng nhắc. Bạn hoàn thành hầu hết các cam kết và duy trì trật tự hợp lý trong công việc và cuộc sống, nhưng có thể linh hoạt khi mọi thứ không theo kế hoạch. Bạn tìm thấy sự cân bằng khả thi giữa cấu trúc và sự tự phát.',
      },
      low: {
        title: 'Linh hoạt và tự phát',
        text: 'Bạn có xu hướng ứng biến hơn là lập kế hoạch, và thích nghi nhanh khi hoàn cảnh thay đổi. Cấu trúc và lịch trình cứng nhắc có thể khiến bạn cảm thấy bị giới hạn. Đôi khi bạn để mọi thứ đến phút cuối hoặc không sắp xếp gọn gàng — nhưng bạn thường tìm ra cách sáng tạo để hoàn thành công việc.',
      },
    },
    E: {
      high: {
        title: 'Rất hướng ngoại',
        text: 'Giao tiếp xã hội tiếp thêm năng lượng cho bạn. Bạn chủ động bắt chuyện, thích các nhóm đông, và có xu hướng tạo ấn tượng mạnh trong phòng bằng sự hiện diện của mình. Bạn thoải mái khi gặp người lạ, phát biểu trong nhóm, và dẫn dắt trong các tình huống xã hội. Thời gian một mình ít giúp bạn phục hồi bằng thời gian ở bên người khác.',
      },
      moderate: {
        title: 'Hướng ngoại trung bình (Ambivert)',
        text: 'Bạn di chuyển thoải mái giữa các môi trường xã hội và một mình. Bạn có thể hòa đồng và thu hút trong môi trường phù hợp, nhưng cũng trân trọng thời gian một mình để nạp lại năng lượng. Bạn không cần phải là trung tâm chú ý, nhưng cũng không khó chịu khi ở vị trí đó.',
      },
      low: {
        title: 'Hướng nội',
        text: 'Bạn có xu hướng nạp lại năng lượng trong sự yên tĩnh thay vì ở các bối cảnh xã hội. Bạn thích những cuộc trò chuyện sâu với vài người hơn là tương tác nhóm lớn, và thường lắng nghe nhiều hơn nói. Các sự kiện xã hội có thể thú vị, nhưng cũng gây mệt mỏi — bạn thường cảm thấy muốn về sớm.',
      },
    },
    A: {
      high: {
        title: 'Rất dễ chịu và hòa hợp',
        text: 'Bạn hợp tác, kiên nhẫn, và sẵn sàng gạt bỏ lập trường cá nhân để tránh xung đột. Bạn giúp đỡ người khác mà không cần được yêu cầu, cho mọi người cơ hội giải thích, và khó giữ sự tức giận lâu. Các mối quan hệ của bạn thường ấm áp và hài hòa, một phần vì bạn chủ động đầu tư để duy trì chúng.',
      },
      moderate: {
        title: 'Dễ chịu ở mức trung bình',
        text: 'Bạn nhìn chung dễ sống và làm việc cùng, nhưng không nhượng bộ vô hạn. Bạn có thể ấm áp và hợp tác trong khi vẫn giữ vững lập trường khi điều quan trọng bị đe dọa. Bạn không phải người dễ bị lấn lướt cũng không phải người gây xung đột không cần thiết.',
      },
      low: {
        title: 'Quyết đoán và thẳng thắn',
        text: 'Bạn thẳng thắn và không ngại bảo vệ lợi ích của bản thân. Bạn nêu ý kiến rõ ràng, giữ vững lập trường trong bất đồng, và khó có khả năng chiều lòng người khác quá mức với cái giá phải trả. Bạn nhận ra khi mọi thứ không công bằng và lên tiếng — điều mà người khác có thể thấy sảng khoái hoặc khó chịu, tùy ngữ cảnh.',
      },
    },
    N: {
      high: {
        title: 'Nhạy cảm về cảm xúc',
        text: 'Bạn trải nghiệm cảm xúc mãnh liệt và nhạy cảm với những thay đổi trong môi trường. Căng thẳng, sự không chắc chắn và thất bại có xu hướng kéo dài — bạn nghĩ lại các sự kiện khó khăn, lo lắng về điều có thể xảy ra sai, và khó tập trung hoàn toàn vào hiện tại khi có điều chưa được giải quyết. Chiều sâu cảm xúc này thường giúp bạn nhạy bén và đồng cảm.',
      },
      moderate: {
        title: 'Cảm xúc cân bằng',
        text: 'Bạn có sự biến đổi cảm xúc bình thường — bạn có thể cảm thấy căng thẳng hoặc lo lắng khi tình huống đòi hỏi, nhưng nhìn chung phục hồi mà không quá khó khăn. Bạn không thờ ơ với vấn đề cũng không bị choáng ngợp bởi chúng.',
      },
      low: {
        title: 'Ổn định về cảm xúc',
        text: 'Bạn có xu hướng bình tĩnh dưới áp lực và phục hồi nhanh sau thất bại. Lời chỉ trích không ảnh hưởng nhiều đến bạn, và bạn hiếm khi suy nghĩ dai dẳng. Trong các tình huống không chắc chắn hoặc căng thẳng, bạn tập trung vào bước tiếp theo thay vì nghĩ mãi về điều đã xảy ra. Người khác thường nhìn nhận bạn là người vững vàng và không dễ bị dao động.',
      },
    },
  },
};

function getLevel(score) {
  if (score >= 65) return 'high';
  if (score >= 35) return 'moderate';
  return 'low';
}

function getDimensionDescription(dim, score, lang = 'en') {
  const level = getLevel(score);
  const langDescs = descriptions[lang] || descriptions.en;
  return langDescs[dim][level];
}

function buildSummary(scores, lang = 'en') {
  const DIMENSION_ORDER = ['E', 'A', 'C', 'N', 'O'];
  const langDescs = descriptions[lang] || descriptions.en;

  const high = DIMENSION_ORDER.filter((d) => getLevel(scores[d]) === 'high').map(
    (d) => langDescs[d].high.title,
  );
  const low = DIMENSION_ORDER.filter((d) => getLevel(scores[d]) === 'low').map(
    (d) => langDescs[d].low.title,
  );

  if (lang === 'vi') {
    let summary = 'Dựa trên câu trả lời của bạn, ';
    if (high.length > 0) {
      summary += `những đặc điểm nổi bật nhất của bạn là: ${high.join(', ')}. `;
    }
    if (low.length > 0) {
      summary += `Bạn có điểm thấp hơn ở: ${low.join(', ')}. `;
    }
    if (high.length === 0 && low.length === 0) {
      summary += 'bạn cho thấy một hồ sơ cân bằng tốt trên cả năm chiều, không có đỉnh cao hay đáy rõ rệt. ';
    }
    summary += 'Kéo xuống để đọc phân tích chi tiết cho từng chiều.';
    return summary;
  }

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
  summary += 'Scroll down to read the detailed breakdown for each dimension.';
  return summary;
}

module.exports = { getDimensionDescription, buildSummary, getLevel };
