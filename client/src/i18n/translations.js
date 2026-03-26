const translations = {
  en: {
    // Welcome
    badge: 'Big Five Personality Assessment',
    title: 'Who Am I?',
    subtitle_1: 'Answer 100 questions about your everyday behavior — not your values or intentions, but what you actually do — and get a detailed personality report based on the scientifically validated',
    subtitle_model: 'Big Five (OCEAN)',
    subtitle_2: 'model.',
    startQuiz: 'Start Quiz →',
    meta_time: '~15 min',
    meta_questions: '100 questions',
    meta_signup: 'No sign-up required',

    // Dimensions
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

    // Quiz
    page_of: 'Page {current} of {total}',
    answered_of: '{answered} / {total} answered',
    hint: 'Answer all questions on this page to continue.',
    back: '← Back',
    next: 'Next →',
    submit: 'Submit Quiz →',
    scoring: 'Scoring…',

    // Likert
    strongly_disagree: 'Strongly Disagree',
    disagree: 'Disagree',
    neutral: 'Neutral',
    agree: 'Agree',
    strongly_agree: 'Strongly Agree',

    // Results
    your_results: 'Your Results',
    personality_report: 'Personality Report',
    ocean_profile: 'OCEAN Profile',
    dimension_breakdown: 'Dimension Breakdown',
    footer_note: 'Results are based on your self-reported behaviors. The Big Five model is widely used in personality psychology research. Scores reflect tendencies, not fixed traits.',
    take_again: 'Take the Quiz Again',

    // Loading / Error
    loading: 'Loading questions…',
    error_retry: 'Retry',

    // Lang toggle
    lang_label: 'VI',
  },
  vi: {
    // Welcome
    badge: 'Bài đánh giá tính cách Big Five',
    title: 'Tôi là ai?',
    subtitle_1: 'Trả lời 100 câu hỏi về hành vi hàng ngày của bạn — không phải giá trị hay ý định, mà là những gì bạn thực sự làm — và nhận báo cáo tính cách chi tiết dựa trên mô hình khoa học',
    subtitle_model: 'Big Five (OCEAN)',
    subtitle_2: '.',
    startQuiz: 'Bắt đầu làm bài →',
    meta_time: '~15 phút',
    meta_questions: '100 câu hỏi',
    meta_signup: 'Không cần đăng ký',

    // Dimensions
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

    // Quiz
    page_of: 'Trang {current} / {total}',
    answered_of: '{answered} / {total} đã trả lời',
    hint: 'Trả lời tất cả câu hỏi trên trang này để tiếp tục.',
    back: '← Quay lại',
    next: 'Tiếp →',
    submit: 'Nộp bài →',
    scoring: 'Đang chấm điểm…',

    // Likert
    strongly_disagree: 'Rất không đồng ý',
    disagree: 'Không đồng ý',
    neutral: 'Trung lập',
    agree: 'Đồng ý',
    strongly_agree: 'Rất đồng ý',

    // Results
    your_results: 'Kết quả của bạn',
    personality_report: 'Báo cáo tính cách',
    ocean_profile: 'Hồ sơ OCEAN',
    dimension_breakdown: 'Phân tích chi tiết',
    footer_note: 'Kết quả dựa trên hành vi tự báo cáo của bạn. Mô hình Big Five được sử dụng rộng rãi trong nghiên cứu tâm lý tính cách. Điểm số phản ánh xu hướng, không phải đặc điểm cố định.',
    take_again: 'Làm lại bài đánh giá',

    // Loading / Error
    loading: 'Đang tải câu hỏi…',
    error_retry: 'Thử lại',

    // Lang toggle
    lang_label: 'EN',
  },
};

export function t(key, lang, params = {}) {
  let str = translations[lang]?.[key] ?? translations.en[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}
