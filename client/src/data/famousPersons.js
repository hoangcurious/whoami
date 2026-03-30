// Famous people associated with each personality type.
// Used in result cards to add relatability and shareability.

export const FAMOUS = {
  mbti: {
    INTJ: { name: 'Elon Musk',          role: 'Entrepreneur' },
    INTP: { name: 'Albert Einstein',     role: 'Physicist' },
    ENTJ: { name: 'Steve Jobs',          role: 'Entrepreneur' },
    ENTP: { name: 'Benjamin Franklin',   role: 'Inventor & Statesman' },
    INFJ: { name: 'Martin Luther King Jr.', role: 'Civil Rights Leader' },
    INFP: { name: 'J.R.R. Tolkien',      role: 'Author' },
    ENFJ: { name: 'Barack Obama',        role: 'US President' },
    ENFP: { name: 'Robin Williams',      role: 'Actor & Comedian' },
    ISTJ: { name: 'Warren Buffett',      role: 'Investor' },
    ISFJ: { name: 'Beyoncé',             role: 'Artist' },
    ESTJ: { name: 'Angela Merkel',       role: 'Chancellor of Germany' },
    ESFJ: { name: 'Taylor Swift',        role: 'Artist' },
    ISTP: { name: 'Clint Eastwood',      role: 'Director & Actor' },
    ISFP: { name: 'Michael Jackson',     role: 'Artist' },
    ESTP: { name: 'Dwayne Johnson',      role: 'Actor & Entrepreneur' },
    ESFP: { name: 'Marilyn Monroe',      role: 'Actress & Icon' },
  },
  enneagram: {
    1: { name: 'Mahatma Gandhi',       role: 'Peace Activist' },
    2: { name: 'Princess Diana',       role: 'Humanitarian' },
    3: { name: 'Oprah Winfrey',        role: 'Media Executive' },
    4: { name: 'Frida Kahlo',          role: 'Painter' },
    5: { name: 'Albert Einstein',      role: 'Physicist' },
    6: { name: 'Tom Hanks',            role: 'Actor' },
    7: { name: 'Robin Williams',       role: 'Actor & Comedian' },
    8: { name: 'Winston Churchill',    role: 'Prime Minister' },
    9: { name: 'Abraham Lincoln',      role: 'US President' },
  },
  disc: {
    D: { name: 'Steve Jobs',       role: 'Entrepreneur' },
    I: { name: 'Oprah Winfrey',    role: 'Media Executive' },
    S: { name: 'Princess Diana',   role: 'Humanitarian' },
    C: { name: 'Bill Gates',       role: 'Entrepreneur' },
  },
  attachment: {
    secure:   { name: 'Michelle Obama',   role: 'Former First Lady' },
    anxious:  { name: 'Marilyn Monroe',   role: 'Actress & Icon' },
    avoidant: { name: 'Steve Jobs',       role: 'Entrepreneur' },
    fearful:  { name: 'Kurt Cobain',      role: 'Musician' },
  },
  lovelang: {
    words:   { name: 'Maya Angelou',    role: 'Poet & Author' },
    service: { name: 'Mr. Rogers',      role: 'TV Host & Educator' },
    gifts:   { name: 'Coco Chanel',     role: 'Fashion Designer' },
    time:    { name: 'Barack Obama',    role: 'US President' },
    touch:   { name: 'Dwayne Johnson',  role: 'Actor & Entrepreneur' },
  },
  // Synthesis: keyed by `${energyBucket}_${driveBucket}` (each 0|1|2)
  // 0=low pole, 1=balanced, 2=high pole
  synthesis: {
    '0_0': { name: 'Mahatma Gandhi',     role: 'Peace Activist',          quote: 'Be the change you wish to see in the world.' },
    '0_1': { name: 'J.R.R. Tolkien',     role: 'Author',                  quote: 'Not all those who wander are lost.' },
    '0_2': { name: 'Isaac Newton',        role: 'Physicist & Mathematician', quote: 'If I have seen further, it is by standing on the shoulders of giants.' },
    '1_0': { name: 'Princess Diana',     role: 'Humanitarian',            quote: 'Carry out a random act of kindness, with no expectation of reward.' },
    '1_1': { name: 'Barack Obama',       role: 'US President',            quote: 'Change will not come if we wait for some other person.' },
    '1_2': { name: 'Steve Jobs',         role: 'Entrepreneur',            quote: 'The only way to do great work is to love what you do.' },
    '2_0': { name: 'Oprah Winfrey',      role: 'Media Executive',         quote: 'The biggest adventure you can take is to live the life of your dreams.' },
    '2_1': { name: 'Robin Williams',     role: 'Actor & Comedian',        quote: 'You are only given a little spark of madness. You mustn\'t lose it.' },
    '2_2': { name: 'Winston Churchill',  role: 'Prime Minister',          quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.' },
  },
};

// Returns the famous person for a synthesis result based on energy + drive dimensions.
export function getSynthesisFamous(dimensions) {
  const energy = dimensions?.find(d => d.id === 'energy');
  const drive  = dimensions?.find(d => d.id === 'drive');
  const eB = energy?.bucket ?? 1;
  const dB = drive?.bucket  ?? 1;
  const key = `${eB}_${dB}`;
  return FAMOUS.synthesis[key] || FAMOUS.synthesis['1_1'];
}

