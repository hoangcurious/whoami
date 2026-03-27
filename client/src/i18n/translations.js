const translations = {
  en: {
    // Welcome
    badge: 'Big Five + MBTI Personality Assessment',
    title: 'Who Am I?',
    subtitle_1: 'Answer 100 questions about your everyday behavior and get two complementary personality reports: your',
    subtitle_model: 'Big Five (OCEAN)',
    subtitle_2: 'scores and your derived',
    subtitle_3: 'MBTI type',
    subtitle_4: '— combined into one result.',
    welcome_reports_label: 'You\'ll receive',
    welcome_bigfive_title: 'Big Five (OCEAN)',
    welcome_bigfive_desc: '5 dimension scores with detailed descriptions',
    welcome_mbti_title: 'MBTI Type',
    welcome_mbti_desc: 'Your 4-letter type derived from your scores',
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

    // MBTI
    mbti_section: 'MBTI Personality Type',
    mbti_derived: 'Derived from your Big Five scores',
    mbti_dichotomies: 'Dichotomy breakdown',
    mbti_disclaimer: 'MBTI type is derived from your Big Five scores using established correlations (E↔E, O↔N/S, A↔F/T, C↔J/P). It is an approximation, not a standalone MBTI assessment.',

    // Loading / Error
    loading: 'Loading questions…',
    error_retry: 'Retry',

    // Lang toggle
    lang_label: 'VI',
  },
  vi: {
    // Welcome
    badge: 'Đánh giá tính cách Big Five + MBTI',
    title: 'Tôi là ai?',
    subtitle_1: 'Trả lời 100 câu hỏi về hành vi hàng ngày và nhận hai báo cáo tính cách bổ sung cho nhau: điểm',
    subtitle_model: 'Big Five (OCEAN)',
    subtitle_2: 'và kiểu',
    subtitle_3: 'MBTI',
    subtitle_4: 'được suy ra từ điểm số của bạn.',
    welcome_reports_label: 'Bạn sẽ nhận được',
    welcome_bigfive_title: 'Big Five (OCEAN)',
    welcome_bigfive_desc: '5 chiều tính cách với mô tả chi tiết',
    welcome_mbti_title: 'Kiểu MBTI',
    welcome_mbti_desc: 'Kiểu 4 chữ cái được suy ra từ điểm số của bạn',
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

    // MBTI
    mbti_section: 'Kiểu tính cách MBTI',
    mbti_derived: 'Được suy ra từ điểm Big Five của bạn',
    mbti_dichotomies: 'Phân tích các cặp đối lập',
    mbti_disclaimer: 'Kiểu MBTI được suy ra từ điểm Big Five của bạn dựa trên các tương quan đã được thiết lập (E↔E, O↔N/S, A↔F/T, C↔J/P). Đây là ước tính, không phải bài đánh giá MBTI độc lập.',

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
