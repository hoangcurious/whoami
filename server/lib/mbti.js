// MBTI derivation from Big Five (OCEAN) scores.
//
// Correlations (well-established in personality literature):
//   E/I  ←→  Extraversion (E score):  high E → E type,  low E → I type
//   N/S  ←→  Openness     (O score):  high O → N type,  low O → S type
//   F/T  ←→  Agreeableness(A score):  high A → F type,  low A → T type
//   J/P  ←→  Conscientiousness(C):    high C → J type,  low C → P type
//
// Threshold: 50 (midpoint of 0-100 scale).

const TYPE_DATA = {
  en: {
    INTJ: {
      title: 'The Architect',
      tagline: 'Imaginative and strategic thinkers with a plan for everything.',
      text: 'You combine big-picture vision with meticulous execution. Independent and privately confident, you think several moves ahead and hold yourself — and others — to very high standards. Small talk bores you; systems, strategy, and complex ideas do not.',
    },
    INTP: {
      title: 'The Thinker',
      tagline: 'Innovative inventors with an unquenchable thirst for knowledge.',
      text: 'You are driven by a deep need to understand how things work. Logic is your native language, and you are skeptical of anything that cannot withstand scrutiny. You love exploring possibilities and are most alive when working through a genuinely difficult problem.',
    },
    ENTJ: {
      title: 'The Commander',
      tagline: 'Bold, imaginative and strong-willed leaders who always find a way.',
      text: 'You see inefficiency as a personal affront and are naturally drawn to taking charge. Long-term strategy energizes you, and you are direct about what you expect from yourself and others. You turn ambition into structure and structure into results.',
    },
    ENTP: {
      title: 'The Debater',
      tagline: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
      text: 'You thrive on mental sparring and enjoy playing devil\'s advocate — not to be difficult, but because testing ideas is how you refine them. You are entrepreneurial, quick to spot connections others miss, and easily bored by routine.',
    },
    INFJ: {
      title: 'The Advocate',
      tagline: 'Quiet visionaries who see deeper meaning in everything.',
      text: 'You have a rare combination of idealism and follow-through. You perceive meaning and patterns beneath the surface of events, hold strong convictions quietly, and act with deliberate care. You are rarely loud, but those who know you well feel your impact.',
    },
    INFP: {
      title: 'The Mediator',
      tagline: 'Poetic, kind, and altruistic people, always eager to help a good cause.',
      text: 'Your inner world is rich and values-driven. You care deeply about authenticity — your own and others\' — and are drawn to creative work, meaningful causes, and deep one-on-one connections. You often feel things more intensely than you let on.',
    },
    ENFJ: {
      title: 'The Protagonist',
      tagline: 'Charismatic and inspiring leaders who captivate those around them.',
      text: 'You are naturally attuned to other people\'s potential and motivated to help them realize it. Warm, persuasive, and organized, you thrive in roles where you can guide, teach, or bring a group toward a shared vision. You invest deeply in the people around you.',
    },
    ENFP: {
      title: 'The Campaigner',
      tagline: 'Enthusiastic, creative, and free-spirited — seeing life as full of possibilities.',
      text: 'You approach everything with curiosity and contagious energy. Ideas, connections, and people light you up. You are genuinely interested in others and bring warmth and originality to everything you touch — though you may struggle with follow-through once the novelty fades.',
    },
    ISTJ: {
      title: 'The Inspector',
      tagline: 'Practical, fact-minded, and reliable — with a duty before pleasure mindset.',
      text: 'You are the person others count on when it matters. Responsible and thorough, you do what you say you will do, keep detailed records, and take your obligations seriously. You trust experience over theory and prefer a clear structure to open-ended ambiguity.',
    },
    ISFJ: {
      title: 'The Defender',
      tagline: 'Warm, dedicated protectors who are always ready to defend those they care about.',
      text: 'You express care through action — remembering details, showing up consistently, and quietly making life easier for the people you love. You are deeply loyal and take your commitments seriously, often putting others\' needs ahead of your own.',
    },
    ESTJ: {
      title: 'The Executive',
      tagline: 'Excellent administrators who are unsurpassed at managing things and people.',
      text: 'You bring order to chaos through clear rules, consistent follow-through, and decisive action. You have strong opinions about how things should be done and the energy to make it happen. People know where they stand with you, and you respect those who meet your standards.',
    },
    ESFJ: {
      title: 'The Consul',
      tagline: 'Extraordinarily caring, social, and popular — always eager to help.',
      text: 'Social harmony is your priority. You are warm, attentive to others\' needs, and skilled at building environments where people feel included and valued. You remember birthdays, notice when someone is off, and put real effort into maintaining your relationships.',
    },
    ISTP: {
      title: 'The Virtuoso',
      tagline: 'Bold, practical experimenters who master all kinds of tools.',
      text: 'You are quiet until you\'re not. You observe carefully, act efficiently, and are at your best when working with your hands or solving a concrete, real-world problem. You value autonomy highly, dislike bureaucracy, and learn best by doing rather than being told.',
    },
    ISFP: {
      title: 'The Adventurer',
      tagline: 'Flexible, charming artists who live in the moment — never losing sight of what matters.',
      text: 'You are deeply in tune with your senses and the present moment. Gentle and open-minded, you avoid conflict and prefer to express yourself through action — whether that\'s art, music, craft, or quietly helping those around you. You resist labels and boxes.',
    },
    ESTP: {
      title: 'The Entrepreneur',
      tagline: 'Smart, energetic, and very perceptive — who truly enjoy living on the edge.',
      text: 'You are pragmatic, action-oriented, and thrive in fast-moving situations that would overwhelm others. You read people quickly, adapt on the fly, and prefer to learn by doing. Theoretical discussions hold little appeal — results and real-world impact do.',
    },
    ESFP: {
      title: 'The Entertainer',
      tagline: 'Spontaneous, energetic, and enthusiastic — life is never boring around them.',
      text: 'You bring energy and joy into every room. Warm, playful, and highly attuned to others, you are drawn to new experiences and thrive in social settings. You are generous with your time and attention, and at your best when you are making the people around you feel good.',
    },
  },
  vi: {
    INTJ: {
      title: 'Kiến trúc sư',
      tagline: 'Người tư duy chiến lược và sáng tạo với kế hoạch cho mọi thứ.',
      text: 'Bạn kết hợp tầm nhìn lớn với sự thực thi tỉ mỉ. Độc lập và tự tin trong lặng, bạn suy nghĩ trước nhiều bước và đặt ra tiêu chuẩn rất cao cho bản thân — và cả người khác. Chuyện phiếm nhàm chán với bạn; hệ thống, chiến lược và các ý tưởng phức tạp thì không.',
    },
    INTP: {
      title: 'Nhà tư duy',
      tagline: 'Những nhà phát minh sáng tạo với khát vọng hiểu biết vô tận.',
      text: 'Bạn thôi thúc bởi nhu cầu hiểu sâu cách mọi thứ vận hành. Logic là ngôn ngữ bản địa của bạn, và bạn hoài nghi về bất cứ điều gì không chịu được sự kiểm chứng. Bạn thích khám phá các khả năng và sống động nhất khi giải quyết một vấn đề thực sự khó.',
    },
    ENTJ: {
      title: 'Chỉ huy',
      tagline: 'Những nhà lãnh đạo dũng cảm, quyết đoán và đầy nghị lực.',
      text: 'Bạn coi sự kém hiệu quả là điều xúc phạm cá nhân và tự nhiên bị thu hút vào việc lãnh đạo. Chiến lược dài hạn tiếp thêm năng lượng cho bạn, và bạn thẳng thắn về những gì bạn kỳ vọng từ bản thân và người khác. Bạn biến tham vọng thành cấu trúc và cấu trúc thành kết quả.',
    },
    ENTP: {
      title: 'Nhà tranh luận',
      tagline: 'Người tư duy thông minh và tò mò không thể cưỡng lại thách thức trí tuệ.',
      text: 'Bạn phát triển qua tranh luận trí tuệ và thích đứng về phía đối lập — không phải để khó chịu, mà vì kiểm tra ý tưởng là cách bạn tinh chỉnh chúng. Bạn có tinh thần kinh doanh, nhanh chóng nhận ra những kết nối người khác bỏ lỡ, và dễ chán với sự lặp lại.',
    },
    INFJ: {
      title: 'Người ủng hộ',
      tagline: 'Những người có tầm nhìn thầm lặng nhìn thấy ý nghĩa sâu xa trong mọi thứ.',
      text: 'Bạn có sự kết hợp hiếm có giữa lý tưởng và hành động. Bạn nhận ra ý nghĩa và mô hình bên dưới bề mặt của các sự kiện, giữ niềm tin mạnh mẽ một cách yên lặng, và hành động với sự cẩn thận có chủ đích. Bạn hiếm khi ồn ào, nhưng những người thực sự biết bạn đều cảm nhận được tác động của bạn.',
    },
    INFP: {
      title: 'Người hòa giải',
      tagline: 'Những người thơ ca, tử tế và vị tha, luôn sẵn sàng giúp đỡ một mục đích tốt.',
      text: 'Thế giới nội tâm của bạn phong phú và dựa trên giá trị. Bạn quan tâm sâu sắc đến tính xác thực — của bản thân và người khác — và bị thu hút bởi công việc sáng tạo, các mục tiêu có ý nghĩa và những kết nối cá nhân sâu sắc. Bạn thường cảm nhận mọi thứ mãnh liệt hơn bạn thể hiện.',
    },
    ENFJ: {
      title: 'Người chủ xướng',
      tagline: 'Những nhà lãnh đạo có sức lôi cuốn và truyền cảm hứng mê hoặc những người xung quanh.',
      text: 'Bạn tự nhiên nhạy bén với tiềm năng của người khác và được thúc đẩy để giúp họ nhận ra nó. Ấm áp, thuyết phục và có tổ chức, bạn phát triển mạnh trong các vai trò có thể hướng dẫn, dạy học hoặc đưa một nhóm đến tầm nhìn chung. Bạn đầu tư sâu vào những người xung quanh.',
    },
    ENFP: {
      title: 'Người vận động',
      tagline: 'Nhiệt tình, sáng tạo và tự do — nhìn thấy cuộc sống tràn đầy khả năng.',
      text: 'Bạn tiếp cận mọi thứ với sự tò mò và năng lượng dễ lây lan. Ý tưởng, kết nối và con người thắp sáng bạn. Bạn thực sự quan tâm đến người khác và mang sự ấm áp và sáng tạo vào mọi thứ bạn chạm đến — dù bạn có thể gặp khó khăn khi theo đuổi khi sự mới mẻ phai nhạt.',
    },
    ISTJ: {
      title: 'Người thanh tra',
      tagline: 'Thực tế, tư duy thực tế và đáng tin cậy — với tư duy trách nhiệm trước thú vui.',
      text: 'Bạn là người mà người khác trông cậy khi điều đó quan trọng. Có trách nhiệm và kỹ lưỡng, bạn làm những gì bạn nói sẽ làm, lưu giữ hồ sơ chi tiết và coi trọng nghĩa vụ của mình. Bạn tin vào kinh nghiệm hơn lý thuyết và thích cấu trúc rõ ràng hơn sự mơ hồ không xác định.',
    },
    ISFJ: {
      title: 'Người bảo vệ',
      tagline: 'Những người chăm sóc ấm áp, tận tụy, luôn sẵn sàng bảo vệ người họ yêu quý.',
      text: 'Bạn thể hiện sự quan tâm qua hành động — nhớ các chi tiết, xuất hiện đều đặn và âm thầm làm cho cuộc sống của những người bạn yêu thương dễ dàng hơn. Bạn cực kỳ trung thành và coi trọng cam kết của mình một cách nghiêm túc, thường đặt nhu cầu của người khác lên trước bản thân.',
    },
    ESTJ: {
      title: 'Người điều hành',
      tagline: 'Những nhà quản trị xuất sắc không ai sánh được trong việc quản lý mọi thứ và con người.',
      text: 'Bạn mang lại trật tự cho sự hỗn loạn thông qua các quy tắc rõ ràng, theo dõi nhất quán và hành động quyết đoán. Bạn có quan điểm mạnh mẽ về cách mọi thứ nên được thực hiện và năng lượng để biến điều đó thành hiện thực. Mọi người biết họ đứng ở đâu với bạn, và bạn tôn trọng những người đáp ứng tiêu chuẩn của bạn.',
    },
    ESFJ: {
      title: 'Người lãnh sự',
      tagline: 'Cực kỳ quan tâm, hòa đồng và được yêu mến — luôn sẵn sàng giúp đỡ.',
      text: 'Sự hài hòa xã hội là ưu tiên của bạn. Bạn ấm áp, chú ý đến nhu cầu của người khác và khéo léo xây dựng môi trường nơi mọi người cảm thấy được bao gồm và có giá trị. Bạn nhớ ngày sinh nhật, nhận ra khi ai đó không ổn và nỗ lực thực sự để duy trì các mối quan hệ của mình.',
    },
    ISTP: {
      title: 'Người thực hành',
      tagline: 'Những nhà thực nghiệm dũng cảm, thực tế thành thạo mọi loại công cụ.',
      text: 'Bạn yên lặng cho đến khi không còn. Bạn quan sát cẩn thận, hành động hiệu quả và ở trạng thái tốt nhất khi làm việc tay chân hoặc giải quyết vấn đề cụ thể, thực tế. Bạn đặt cao tính tự chủ, không thích quan liêu và học tốt nhất bằng cách thực hành hơn là được chỉ dạy.',
    },
    ISFP: {
      title: 'Nhà thám hiểm',
      tagline: 'Những nghệ sĩ linh hoạt, quyến rũ sống trong hiện tại — không bao giờ mất đi điều quan trọng.',
      text: 'Bạn sâu sắc đồng điệu với các giác quan và khoảnh khắc hiện tại. Nhẹ nhàng và cởi mở, bạn tránh xung đột và thích thể hiện bản thân qua hành động — dù là nghệ thuật, âm nhạc, thủ công hay âm thầm giúp đỡ những người xung quanh. Bạn chống lại nhãn hiệu và khuôn mẫu.',
    },
    ESTP: {
      title: 'Doanh nhân',
      tagline: 'Thông minh, năng động và rất nhạy bén — thực sự thích sống ở ranh giới.',
      text: 'Bạn thực dụng, hướng đến hành động và phát triển trong các tình huống diễn ra nhanh mà người khác sẽ bị áp đảo. Bạn đọc người nhanh, thích nghi linh hoạt và thích học bằng cách làm. Các cuộc thảo luận lý thuyết ít hấp dẫn — kết quả và tác động thực tế mới là điều thú vị.',
    },
    ESFP: {
      title: 'Người biểu diễn',
      tagline: 'Tự phát, năng động và nhiệt tình — cuộc sống không bao giờ nhàm chán khi có họ.',
      text: 'Bạn mang năng lượng và niềm vui vào mọi nơi. Ấm áp, vui tươi và rất nhạy bén với người khác, bạn bị thu hút bởi những trải nghiệm mới và phát triển trong môi trường xã hội. Bạn hào phóng với thời gian và sự chú ý của mình, và ở trạng thái tốt nhất khi làm cho những người xung quanh cảm thấy tốt.',
    },
  },
};

/**
 * Derive an MBTI type from Big Five OCEAN scores (all 0-100).
 * Returns the 4-letter type and per-dichotomy breakdown.
 */
function deriveMBTI(scores) {
  const EI = scores.E >= 50 ? 'E' : 'I';
  const SN = scores.O >= 50 ? 'N' : 'S';
  const TF = scores.A >= 50 ? 'F' : 'T';
  const JP = scores.C >= 50 ? 'J' : 'P';

  const type = `${EI}${SN}${TF}${JP}`;

  // For each dichotomy, express as a 0-100 lean toward the "positive" pole
  // E-pole: E score directly
  // N-pole: O score
  // F-pole: A score
  // J-pole: C score
  const dichotomies = {
    EI: { left: 'E', right: 'I', score: scores.E, chosen: EI },
    SN: { left: 'N', right: 'S', score: scores.O, chosen: SN },
    TF: { left: 'F', right: 'T', score: scores.A, chosen: TF },
    JP: { left: 'J', right: 'P', score: scores.C, chosen: JP },
  };

  return { type, dichotomies };
}

/**
 * Get the title, tagline, and description text for an MBTI type in the given language.
 */
function getMBTIDescription(type, lang = 'en') {
  const langData = TYPE_DATA[lang] || TYPE_DATA.en;
  return langData[type] || langData.INTP; // fallback
}

module.exports = { deriveMBTI, getMBTIDescription };
