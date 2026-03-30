const translations = {
  en: {
    // ── Home screen ────────────────────────────────────────────────────────
    home_badge: 'Personality Assessment',
    title: 'Who Am I?',
    home_subtitle: 'Six independent assessments. Six complementary perspectives on who you are.',
    home_independent: 'Six separate tests',
    start_quiz: 'Start →',
    completed: 'Completed',
    retake: 'Retake',
    view_results: 'View Results',
    back_home: 'Back to Home',
    meta_signup: 'No sign-up required',

    // ── Model cards — Big Five ─────────────────────────────────────────────
    model_bigfive_title: 'Big Five (OCEAN)',
    model_bigfive_desc: 'Measure five core personality dimensions with 100 behaviorally-specific questions.',
    model_bigfive_questions: '100 questions',
    model_bigfive_time: '~15 min',
    model_bigfive_badge: 'Big Five',
    model_bigfive_results_title: 'Big Five Report',
    model_bigfive_results_subtitle: 'Your scores across all five OCEAN dimensions.',
    model_bigfive_footer_note: 'Based on self-reported behaviors. The Big Five is widely used in personality research. Scores reflect tendencies, not fixed traits.',

    // ── Model cards — MBTI ────────────────────────────────────────────────
    model_mbti_title: 'MBTI',
    model_mbti_desc: 'Discover your 4-letter type through 32 forced-choice questions about how you think and act.',
    model_mbti_questions: '32 questions',
    model_mbti_time: '~5 min',
    model_mbti_badge: 'MBTI',
    model_mbti_results_title: 'Your MBTI Type',
    model_mbti_results_subtitle: 'Based on 32 forced-choice questions across all four MBTI dichotomies.',
    model_mbti_footer_note: 'Results reflect tendencies, not fixed traits. MBTI is a widely-used framework and not a clinical diagnosis.',

    // ── Model cards — Enneagram ───────────────────────────────────────────
    model_enneagram_title: 'Enneagram',
    model_enneagram_desc: 'Find your core type among 9 patterns based on deep motivations and behavioral tendencies.',
    model_enneagram_questions: '36 questions',
    model_enneagram_time: '~7 min',
    model_enneagram_badge: 'Enneagram',
    model_enneagram_results_title: 'Your Enneagram Type',
    model_enneagram_results_subtitle: 'Based on 36 forced-choice questions measuring all 9 Enneagram types.',
    model_enneagram_footer_note: 'The Enneagram describes patterns of thinking and behaving. Your primary type reflects your dominant tendencies, not your full personality.',
    enneagram_all_types: 'All type scores',

    // ── Model cards — DISC ────────────────────────────────────────────────
    model_disc_title: 'DISC',
    model_disc_desc: 'Identify your dominant behavioral style: Dominance, Influence, Steadiness, or Conscientiousness.',
    model_disc_questions: '28 questions',
    model_disc_time: '~5 min',
    model_disc_badge: 'DISC',
    model_disc_results_title: 'Your DISC Profile',
    model_disc_results_subtitle: 'Based on 28 forced-choice questions across all four DISC styles.',
    model_disc_footer_note: 'DISC describes behavioral tendencies, particularly in work and social contexts. Your style may vary across different situations.',
    disc_profile: 'Style breakdown',
    disc_secondary: 'Secondary style',

    // ── Model cards — Attachment ──────────────────────────────────────────
    model_attachment_title: 'Attachment Style',
    model_attachment_desc: 'Understand your relationship patterns: how you connect, trust, and respond to intimacy.',
    model_attachment_questions: '24 questions',
    model_attachment_time: '~5 min',
    model_attachment_badge: 'Attachment',
    model_attachment_results_title: 'Your Attachment Style',
    model_attachment_results_subtitle: 'Based on 24 forced-choice questions about your relationship patterns.',
    model_attachment_footer_note: 'Attachment styles are patterns formed early in life but can change with awareness and healthy relationships. This is not a clinical assessment.',
    attachment_profile: 'Style breakdown',
    attachment_style_secure: 'Secure',
    attachment_style_anxious: 'Anxious',
    attachment_style_avoidant: 'Avoidant',
    attachment_style_fearful: 'Fearful-Avoidant',

    // ── Model cards — Love Languages ──────────────────────────────────────
    model_lovelang_title: 'Love Languages',
    model_lovelang_desc: 'Discover how you most naturally give and receive love across five expression styles.',
    model_lovelang_questions: '30 questions',
    model_lovelang_time: '~5 min',
    model_lovelang_badge: 'Love Languages',
    model_lovelang_results_title: 'Your Love Languages',
    model_lovelang_results_subtitle: 'Based on 30 paired-choice questions comparing all five love language styles.',
    model_lovelang_footer_note: 'Love languages describe how you prefer to give and receive affection. Inspired by Gary Chapman\'s model.',
    lovelang_ranking: 'Your ranking',
    lovelang_short_words: 'Words',
    lovelang_short_service: 'Service',
    lovelang_short_gifts: 'Gifts',
    lovelang_short_time: 'Time',
    lovelang_short_touch: 'Touch',

    // ── Quiz (shared) ─────────────────────────────────────────────────────
    page_of: 'Page {current} of {total}',
    answered_of: '{answered} / {total} answered',
    hint: 'Answer all questions on this page to continue.',
    back: '← Back',
    next: 'Next →',
    submit: 'Submit →',
    scoring: 'Scoring…',
    mbti_quiz_label: 'MBTI',
    mbti_instruction: 'For each question, choose the option that feels most natural — go with your first instinct.',

    // ── Likert labels ─────────────────────────────────────────────────────
    strongly_disagree: 'Strongly Disagree',
    disagree: 'Disagree',
    neutral: 'Neutral',
    agree: 'Agree',
    strongly_agree: 'Strongly Agree',

    // ── Big Five results ──────────────────────────────────────────────────
    your_results: 'Your Results',
    personality_report: 'Big Five Report',
    ocean_profile: 'OCEAN Profile',
    dimension_breakdown: 'Dimension Breakdown',
    footer_note: 'Results are based on your self-reported behaviors. The Big Five model is widely used in personality psychology research. Scores reflect tendencies, not fixed traits.',

    // ── Dimensions ────────────────────────────────────────────────────────
    dim_O: 'Openness',
    dim_C: 'Conscientiousness',
    dim_E: 'Extraversion',
    dim_A: 'Agreeableness',
    dim_N: 'Neuroticism',
    dim_O_desc: 'Curiosity & creativity',
    dim_C_desc: 'Planning & reliability',
    dim_E_desc: 'Social energy',
    dim_A_desc: 'Cooperation & warmth',
    dim_N_desc: 'Emotional reactivity',

    // ── MBTI dichotomies ──────────────────────────────────────────────────
    mbti_section: 'MBTI Personality Type',
    mbti_dichotomies: 'Dichotomy breakdown',

    // ── Loading / Error ───────────────────────────────────────────────────
    loading: 'Loading questions…',
    error_retry: 'Retry',

    // ── Lang toggle ───────────────────────────────────────────────────────
    lang_label: 'VI',

    // ── Synthesis ─────────────────────────────────────────────────────────
    synthesis_badge: 'Integrated Report',
    synthesis_title: 'Your Full Profile',
    synthesis_subtitle: 'Synthesized from {count} completed assessments',
    synthesis_card_title: 'Full Profile',
    synthesis_card_desc: 'A consolidated analysis synthesized from all your completed assessments.',
    synthesis_card_locked: 'Complete {n} more test(s) to unlock',
    synthesis_card_view: 'View Full Profile →',
    synthesis_section_energy: 'Social Energy',
    synthesis_section_mind: 'Cognitive Style',
    synthesis_section_relationships: 'Relationships',
    synthesis_section_drive: 'Core Motivation',
    synthesis_section_resilience: 'Emotional Resilience',
    synthesis_sources: 'Sources',
    synthesis_footer: '{completed} of {total} assessments complete',
    synthesis_complete_more: 'Complete more assessments to enrich this report.',

    // ── Share ─────────────────────────────────────────────────────────────
    share_copy: 'Share results',
    share_copied: 'Link copied!',
    share_readonly_cta: 'Take this quiz →',
    synthesis_echoes: 'Your profile echoes',
  },

  vi: {
    // ── Home screen ────────────────────────────────────────────────────────
    home_badge: 'Đánh giá tính cách',
    title: 'Tôi là ai?',
    home_subtitle: 'Sáu bài kiểm tra độc lập. Sáu góc nhìn bổ sung về con người bạn.',
    home_independent: 'Sáu bài kiểm tra riêng biệt',
    start_quiz: 'Bắt đầu →',
    completed: 'Đã hoàn thành',
    retake: 'Làm lại',
    view_results: 'Xem kết quả',
    back_home: 'Về trang chủ',
    meta_signup: 'Không cần đăng ký',

    // ── Model cards — Big Five ─────────────────────────────────────────────
    model_bigfive_title: 'Big Five (OCEAN)',
    model_bigfive_desc: 'Đo lường năm chiều tính cách cốt lõi với 100 câu hỏi về hành vi cụ thể.',
    model_bigfive_questions: '100 câu hỏi',
    model_bigfive_time: '~15 phút',
    model_bigfive_badge: 'Big Five',
    model_bigfive_results_title: 'Báo cáo Big Five',
    model_bigfive_results_subtitle: 'Điểm số của bạn trên cả năm chiều OCEAN.',
    model_bigfive_footer_note: 'Dựa trên hành vi tự báo cáo. Big Five được sử dụng rộng rãi trong nghiên cứu tính cách. Điểm số phản ánh xu hướng, không phải đặc điểm cố định.',

    // ── Model cards — MBTI ────────────────────────────────────────────────
    model_mbti_title: 'MBTI',
    model_mbti_desc: 'Khám phá kiểu 4 chữ cái của bạn qua 32 câu hỏi lựa chọn về cách bạn suy nghĩ và hành động.',
    model_mbti_questions: '32 câu hỏi',
    model_mbti_time: '~5 phút',
    model_mbti_badge: 'MBTI',
    model_mbti_results_title: 'Kiểu MBTI của bạn',
    model_mbti_results_subtitle: 'Dựa trên 32 câu hỏi lựa chọn về 4 cặp đối lập MBTI.',
    model_mbti_footer_note: 'Kết quả phản ánh xu hướng, không phải đặc điểm cố định. MBTI là khung tham chiếu phổ biến, không phải chẩn đoán lâm sàng.',

    // ── Model cards — Enneagram ───────────────────────────────────────────
    model_enneagram_title: 'Enneagram',
    model_enneagram_desc: 'Tìm kiểu cốt lõi của bạn trong 9 mẫu tính cách dựa trên động lực sâu xa và xu hướng hành vi.',
    model_enneagram_questions: '36 câu hỏi',
    model_enneagram_time: '~7 phút',
    model_enneagram_badge: 'Enneagram',
    model_enneagram_results_title: 'Kiểu Enneagram của bạn',
    model_enneagram_results_subtitle: 'Dựa trên 36 câu hỏi lựa chọn đánh giá cả 9 kiểu Enneagram.',
    model_enneagram_footer_note: 'Enneagram mô tả các mẫu suy nghĩ và hành vi. Kiểu chính của bạn phản ánh xu hướng nổi bật nhất, không phải toàn bộ tính cách.',
    enneagram_all_types: 'Điểm tất cả các kiểu',

    // ── Model cards — DISC ────────────────────────────────────────────────
    model_disc_title: 'DISC',
    model_disc_desc: 'Xác định phong cách hành vi nổi bật của bạn: Thống trị, Ảnh hưởng, Ổn định hay Tận tâm.',
    model_disc_questions: '28 câu hỏi',
    model_disc_time: '~5 phút',
    model_disc_badge: 'DISC',
    model_disc_results_title: 'Hồ sơ DISC của bạn',
    model_disc_results_subtitle: 'Dựa trên 28 câu hỏi lựa chọn về 4 phong cách DISC.',
    model_disc_footer_note: 'DISC mô tả xu hướng hành vi, đặc biệt trong công việc và giao tiếp xã hội. Phong cách của bạn có thể thay đổi theo ngữ cảnh.',
    disc_profile: 'Phân tích phong cách',
    disc_secondary: 'Phong cách phụ',

    // ── Model cards — Attachment ──────────────────────────────────────────
    model_attachment_title: 'Phong cách gắn bó',
    model_attachment_desc: 'Hiểu rõ mẫu quan hệ của bạn: cách bạn kết nối, tin tưởng và đáp lại sự thân mật.',
    model_attachment_questions: '24 câu hỏi',
    model_attachment_time: '~5 phút',
    model_attachment_badge: 'Gắn bó',
    model_attachment_results_title: 'Phong cách gắn bó của bạn',
    model_attachment_results_subtitle: 'Dựa trên 24 câu hỏi lựa chọn về mẫu quan hệ của bạn.',
    model_attachment_footer_note: 'Phong cách gắn bó là các mẫu được hình thành từ sớm nhưng có thể thay đổi với nhận thức và các mối quan hệ lành mạnh. Đây không phải là đánh giá lâm sàng.',
    attachment_profile: 'Phân tích phong cách',
    attachment_style_secure: 'An toàn',
    attachment_style_anxious: 'Lo âu',
    attachment_style_avoidant: 'Né tránh',
    attachment_style_fearful: 'Sợ gắn bó',

    // ── Model cards — Love Languages ──────────────────────────────────────
    model_lovelang_title: 'Ngôn ngữ tình yêu',
    model_lovelang_desc: 'Khám phá cách bạn trao và nhận tình yêu qua năm phong cách thể hiện.',
    model_lovelang_questions: '30 câu hỏi',
    model_lovelang_time: '~5 phút',
    model_lovelang_badge: 'Ngôn ngữ tình yêu',
    model_lovelang_results_title: 'Ngôn ngữ tình yêu của bạn',
    model_lovelang_results_subtitle: 'Dựa trên 30 câu hỏi so sánh cặp đôi giữa 5 phong cách ngôn ngữ tình yêu.',
    model_lovelang_footer_note: 'Ngôn ngữ tình yêu mô tả cách bạn thích thể hiện và nhận tình cảm. Lấy cảm hứng từ mô hình của Gary Chapman.',
    lovelang_ranking: 'Xếp hạng của bạn',
    lovelang_short_words: 'Lời nói',
    lovelang_short_service: 'Hành động',
    lovelang_short_gifts: 'Quà tặng',
    lovelang_short_time: 'Thời gian',
    lovelang_short_touch: 'Tiếp xúc',

    // ── Quiz (shared) ─────────────────────────────────────────────────────
    page_of: 'Trang {current} / {total}',
    answered_of: '{answered} / {total} đã trả lời',
    hint: 'Trả lời tất cả câu hỏi trên trang này để tiếp tục.',
    back: '← Quay lại',
    next: 'Tiếp →',
    submit: 'Nộp bài →',
    scoring: 'Đang chấm điểm…',
    mbti_quiz_label: 'MBTI',
    mbti_instruction: 'Với mỗi câu hỏi, chọn phương án cảm thấy tự nhiên nhất — hãy tin vào trực giác đầu tiên.',

    // ── Likert labels ─────────────────────────────────────────────────────
    strongly_disagree: 'Rất không đồng ý',
    disagree: 'Không đồng ý',
    neutral: 'Trung lập',
    agree: 'Đồng ý',
    strongly_agree: 'Rất đồng ý',

    // ── Big Five results ──────────────────────────────────────────────────
    your_results: 'Kết quả của bạn',
    personality_report: 'Báo cáo Big Five',
    ocean_profile: 'Hồ sơ OCEAN',
    dimension_breakdown: 'Phân tích chi tiết',
    footer_note: 'Kết quả dựa trên hành vi tự báo cáo của bạn. Mô hình Big Five được sử dụng rộng rãi trong nghiên cứu tâm lý tính cách. Điểm số phản ánh xu hướng, không phải đặc điểm cố định.',

    // ── Dimensions ────────────────────────────────────────────────────────
    dim_O: 'Sự cởi mở',
    dim_C: 'Sự tận tâm',
    dim_E: 'Hướng ngoại',
    dim_A: 'Sự hòa hợp',
    dim_N: 'Sự nhạy cảm',
    dim_O_desc: 'Tò mò & sáng tạo',
    dim_C_desc: 'Kế hoạch & đáng tin cậy',
    dim_E_desc: 'Năng lượng xã hội',
    dim_A_desc: 'Hợp tác & ấm áp',
    dim_N_desc: 'Phản ứng cảm xúc',

    // ── MBTI dichotomies ──────────────────────────────────────────────────
    mbti_section: 'Kiểu tính cách MBTI',
    mbti_dichotomies: 'Phân tích các cặp đối lập',

    // ── Loading / Error ───────────────────────────────────────────────────
    loading: 'Đang tải câu hỏi…',
    error_retry: 'Thử lại',

    // ── Lang toggle ───────────────────────────────────────────────────────
    lang_label: 'EN',

    // ── Synthesis ─────────────────────────────────────────────────────────
    synthesis_badge: 'Báo cáo Tổng hợp',
    synthesis_title: 'Hồ sơ Đầy đủ của Bạn',
    synthesis_subtitle: 'Tổng hợp từ {count} bài đánh giá đã hoàn thành',
    synthesis_card_title: 'Hồ sơ Đầy đủ',
    synthesis_card_desc: 'Phân tích toàn diện được tổng hợp từ tất cả các bài đánh giá của bạn.',
    synthesis_card_locked: 'Hoàn thành thêm {n} bài kiểm tra để mở khóa',
    synthesis_card_view: 'Xem Hồ sơ Đầy đủ →',
    synthesis_section_energy: 'Năng lượng Xã hội',
    synthesis_section_mind: 'Phong cách Tư duy',
    synthesis_section_relationships: 'Các mối Quan hệ',
    synthesis_section_drive: 'Động lực Cốt lõi',
    synthesis_section_resilience: 'Khả năng Phục hồi Cảm xúc',
    synthesis_sources: 'Nguồn',
    synthesis_footer: '{completed} trong {total} bài đánh giá đã hoàn thành',
    synthesis_complete_more: 'Hoàn thành thêm các bài đánh giá để làm phong phú báo cáo này.',

    // ── Share ─────────────────────────────────────────────────────────────
    share_copy: 'Chia sẻ kết quả',
    share_copied: 'Đã sao chép!',
    share_readonly_cta: 'Làm bài kiểm tra này →',
    synthesis_echoes: 'Hồ sơ của bạn gợi nhớ đến',
  },
};

export function t(key, lang, params = {}) {
  let str = translations[lang]?.[key] ?? translations.en[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}
