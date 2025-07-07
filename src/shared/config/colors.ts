/**
 * 하마로그 디자인 시스템 색상 팔레트
 * tailwind.config.js와 동일한 색상 값을 사용
 */
export const colors = {
  // Gray 시스템
  gray: {
    0: '#FFFFFF',
    50: '#F4F5F7',
    100: '#E1E4EB',
    150: '#C9CACF',
    300: '#8A96A4',
    500: '#6E7987',
    700: '#454B52',
    850: '#1F1E23',
  },

  // Primary 시스템
  primary: {
    50: '#E4F2FF',
    100: '#B2DAFF',
    250: '#6CB8EF',
    400: '#189EFF',
    600: '#507B99',
    700: '#28506D',
  },

  // Point 시스템
  point: {
    red: {
      100: '#FED7D7',
      500: '#FF6262',
    },
    yellow: {
      50: '#FFFAD3',
      400: '#FEE36E',
    },
  },

  // 기타
  stroke: '#E2E8F0',
} as const;
