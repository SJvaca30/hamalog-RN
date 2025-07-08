/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // 하마로그 디자인 시스템 색상 팔레트
      colors: {
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
        primary: {
          50: '#E4F2FF',
          100: '#B2DAFF',
          250: '#6CB8EF',
          400: '#189EFF',
          600: '#507B99',
          700: '#28506D',
        },
        point: {
          red: {
            50: '#ffddd7',
            400: '#ff6262',
          },
          yellow: {
            50: '#FFFAD3',
            400: '#FEE36E',
          },
        },
        stroke: '#E2E8F0', // 테두리, 구분선용
      },

      // 폰트 시스템
      fontFamily: {
        'pretendard-400': ['Pretendard-Regular', 'system-ui', 'sans-serif'],
        'pretendard-600': ['Pretendard-SemiBold', 'system-ui', 'sans-serif'],

        'paperlogy-400': ['Paperlogy-4Regular', 'system-ui', 'sans-serif'],
        'paperlogy-500': ['Paperlogy-5Medium', 'system-ui', 'sans-serif'],
        'paperlogy-600': ['Paperlogy-6SemiBold', 'system-ui', 'sans-serif'],

        // 시스템 폰트 (fallback)
        system: ['system-ui', '-apple-system', 'sans-serif'],
      },

      // 텍스트 스타일
      fontSize: {
        'display-b': ['24px', { lineHeight: '28.8px' }],
        display: ['22px', { lineHeight: '26.4px' }],
        h1: ['18px', { lineHeight: '21.6px' }],
        h2: ['20px', { lineHeight: '24px' }],
        h3: ['18px', { lineHeight: '21.6px' }],
        label: ['16px', { lineHeight: '19.2px' }],
        'body-1': ['16px', { lineHeight: '24px' }],
        'body-2': ['14px', { lineHeight: '16.8px' }],
        'button-large': ['18px', { lineHeight: '21.6px' }],
        'button-medium': ['16px', { lineHeight: '19.2px' }],
        'button-small': ['14px', { lineHeight: 'normal' }],
        'button-small-p': ['12px', { lineHeight: 'normal' }],
        'caption-primary': ['12px', { lineHeight: 'normal' }],
        'caption-secondary': ['12px', { lineHeight: 'normal' }],
      },
      letterSpacing: {
        'display-b': '-0.48px',
        display: '-0.44px',
        h1: '-0.36px',
        h2: '-0.4px',
        h3: '-0.36px',
        label: '-0.32px',
        'body-1': '-0.32px',
        'body-2': '-0.28px',
        'button-large': '-0.36px',
        'button-medium': '-0.32px',
        'button-small': '-0.28px',
        'button-small-p': '-0.24px',
        'caption-primary': '-0.24px',
        'caption-secondary': '-0.48px',
      },
    },
  },
  plugins: [],
};
