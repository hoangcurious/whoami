const translations = {
  en: {
    // Home screen
    home_badge: 'Personality Assessment',
    title: 'Who Am I?',
    home_subtitle: 'Two independent assessments. Two complementary perspectives on who you are.',
    home_bf_desc: 'Measure your personality across five core dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    home_bf_questions: '100 questions',
    home_bf_time: '~15 min',
    home_mbti_desc: 'Discover your 4-letter personality type through 32 forced-choice questions covering all four MBTI dichotomies.',
    home_mbti_questions: '32 questions',
    home_mbti_time: '~5 min',
    home_independent: 'Two separate tests',
    start_bf: 'Start Big Five →',
    start_mbti: 'Start MBTI →',
    completed: 'Completed',
    retake: 'Retake',
    view_results: 'View Results',
    back_home: 'Back to Home',

    // Legacy welcome keys (kept for safety)
    badge: 'Big Five + MBTI Personality Assessment',
    subtitle_1: '',
    subtitle_model: '',
    subtitle_2: '',
    subtitle_3: '',
    subtitle_4: '',
    welcome_reports_label: '',
    startQuiz: 'Start Quiz →',
    meta_time: '~15 min',
    meta_questions: '100 questions',
    meta_signup: 'No sign-up required',

    // Quiz card titles
    welcome_bigfive_title: 'Big Five (OCEAN)',
    welcome_mbti_title: 'MBTI Type',
    welcome_bigfive_desc: '5 dimension scores with detailed descriptions',
    welcome_mbti_desc: 'Your 4-letter personality type',

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

    // Big Five quiz
    page_of: 'Page {current} of {total}',
    answered_of: '{answered} / {total} answered',
    hint: 'Answer all questions on this page to continue.',
    back: '← Back',
    next: 'Next →',
    submit: 'Submit →',
    scoring: 'Scoring…',

    // Likert
    strongly_disagree: 'Strongly Disagree',
    disagree: 'Disagree',
    neutral: 'Neutral',
    agree: 'Agree',
    strongly_agree: 'Strongly Agree',

    // Big Five results
    your_results: 'Your Results',
    personality_report: 'Big Five Report',
    ocean_profile: 'OCEAN Profile',
    dimension_breakdown: 'Dimension Breakdown',
    footer_note: 'Results are based on your self-reported behaviors. The Big Five model is widely used in personality psychology research. Scores reflect tendencies, not fixed traits.',

    // MBTI quiz
    mbti_quiz_label: 'MBTI Assessment',
    mbti_instruction: 'For each question, choose the option that feels most natural to you — go with your first instinct.',

    // MBTI results
    mbti_results_badge: 'MBTI Assessment',
    mbti_results_title: 'Your MBTI Type',
    mbti_results_subtitle: 'Based on your answers to 32 forced-choice questions across all four MBTI dichotomies.',
    mbti_section: 'MBTI Personality Type',
    mbti_dichotomies: 'Dichotomy breakdown',
    mbti_footer_note: 'This assessment is based on 32 forced-choice questions. Results reflect tendencies, not fixed traits. MBTI is a widely-used framework and not a clinical diagnosis.',
    mbti_retake: 'Retake MBTI',

    // Loading / Error
    loading: 'Loading questions…',
    error_retry: 'Retry',

    // Lang toggle
    lang_label: 'VI',
  },
  vi: {
    // Home screen
    home_badge: 'Đánh giá tính cách',
    title: 'Tôi là ai?',
    home_subtitle: 'Hai bài kiểm tra độc lập. Hai góc nhìn bổ sung về con người bạn.',
    home_bf_desc: 'Đo lường tính cách của bạn qua năm chiều cốt lõi: Cởi mở, Tận tâm, Hướng ngoại, Hòa hợp và Nhạy cảm.',
    home_bf_questions: '100 câu hỏi',
    home_bf_time: '~15 phút',
    home_mbti_desc: 'Khám phá kiểu tính cách 4 chữ cái của bạn qua 32 câu hỏi lựa chọn bắt buộc về 4 cặp đối lập MBTI.',
    home_mbti_questions: '32 câu hỏi',
    home_mbti_time: '~5 phút',
    home_independent: 'Hai bài kiểm tra riêng biệt',
    start_bf: 'Bắt đầu Big Five →',
    start_mbti: 'Bắt đầu MBTI →',
    completed: 'Đã hoàn thành',
    retake: 'Làm lại',
    view_results: 'Xem kết quả',
    back_home: 'Về trang chủ',

    // Legacy welcome keys
    badge: 'Đánh giá tính cách Big Five + MBTI',
    subtitle_1: '',
    subtitle_model: '',
    subtitle_2: '',
    subtitle_3: '',
    subtitle_4: '',
    welcome_reports_label: '',
    startQuiz: 'Bắt đầu làm bài →',
    meta_time: '~15 phút',
    meta_questions: '100 câu hỏi',
    meta_signup: 'Không cần đăng ký',

    // Quiz card titles
    welcome_bigfive_title: 'Big Five (OCEAN)',
    welcome_mbti_title: 'Kiểu MBTI',
    welcome_bigfive_desc: '5 chiều tính cách với mô tả chi tiết',
    welcome_mbti_desc: 'Kiểu tính cách 4 chữ cái của bạn',

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

    // Big Five quiz
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

    // Big Five results
    your_results: 'Kết quả của bạn',
    personality_report: 'Báo cáo Big Five',
    ocean_profile: 'Hồ sơ OCEAN',
    dimension_breakdown: 'Phân tích chi tiết',
    footer_note: 'Kết quả dựa trên hành vi tự báo cáo của bạn. Mô hình Big Five được sử dụng rộng rãi trong nghiên cứu tâm lý tính cách. Điểm số phản ánh xu hướng, không phải đặc điểm cố định.',

    // MBTI quiz
    mbti_quiz_label: 'Bài đánh giá MBTI',
    mbti_instruction: 'Với mỗi câu hỏi, chọn phương án cảm thấy tự nhiên nhất với bạn — hãy tin vào trực giác đầu tiên.',

    // MBTI results
    mbti_results_badge: 'Bài đánh giá MBTI',
    mbti_results_title: 'Kiểu MBTI của bạn',
    mbti_results_subtitle: 'Dựa trên câu trả lời của bạn cho 32 câu hỏi lựa chọn bắt buộc về 4 cặp đối lập MBTI.',
    mbti_section: 'Kiểu tính cách MBTI',
    mbti_dichotomies: 'Phân tích các cặp đối lập',
    mbti_footer_note: 'Bài đánh giá này dựa trên 32 câu hỏi lựa chọn bắt buộc. Kết quả phản ánh xu hướng, không phải đặc điểm cố định. MBTI là khung tham chiếu được sử dụng rộng rãi và không phải chẩn đoán lâm sàng.',
    mbti_retake: 'Làm lại MBTI',

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
