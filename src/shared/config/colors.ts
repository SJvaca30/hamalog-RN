/**
 * 하마로그 디자인 시스템 색상 팔레트 (단일 진실 공급원)
 */
export const colors = {
  // Gray Scale Palette
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

  // Primary Color Palette
  primary: {
    50: '#E4F2FF',
    100: '#B2DAFF',
    250: '#6CB8EF',
    400: '#189EFF',
    600: '#507B99',
    700: '#28506D',
  },

  // Point Color Palette
  point: {
    red: {
      50: '#FFDDD7',
      400: '#FF6262',
    },
    yellow: {
      50: '#FFFAD3',
      400: '#FEE36E',
    },
  },

  // 기타 색상
  // 테두리, 구분선 등에 사용
  stroke: '#E2E8F0',
} as const;
