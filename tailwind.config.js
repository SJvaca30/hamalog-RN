/** @type {import('tailwindcss').Config} */

/**
 * ---
 * 폰트 스타일 가이드 (Font Style Guide)
 * ---
 * 이 프로젝트의 폰트 스타일을 안전하게 유지보수하기 위한 규칙입니다.
 *
 * 1. 기존 스타일 수정 (예: h1 크기 변경):
 *    - 이 파일 (`tailwind.config.js`)의 `theme.extend`에서 해당 스타일의 값만 수정하면 됩니다.
 *
 * 2. 새로운 스타일 추가 (예: subtitle 스타일 추가):
 *    - 아래 4개 파일을 순서대로 모두 수정해야 합니다.
 *    - 1. tailwind.config.js: 새로운 스타일(fontSize, letterSpacing 등) 정의
 *    - 2. src/shared/types/ui.types.ts: `TypographyVariant` 타입에 새 이름 추가
 *    - 3. src/shared/ui/Text.tsx: `variantStyles` 맵에 새 variant와 클래스 연결 추가
 *    - 4. src/shared/lib/utils.ts: `extendTailwindMerge` 설정에 새 클래스 그룹 추가
 */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // 하마로그 디자인 시스템 색상 팔레트
      colors: {
        'gray-0': '#FFFFFF',
        'gray-50': '#F4F5F7',
        'gray-100': '#E1E4EB',
        'gray-150': '#C9CACF',
        'gray-300': '#8A96A4',
        'gray-500': '#6E7987',
        'gray-700': '#454B52',
        'gray-850': '#1F1E23',

        'primary-50': '#E4F2FF',
        'primary-100': '#B2DAFF',
        'primary-250': '#6CB8EF',
        'primary-400': '#189EFF',
        'primary-600': '#507B99',
        'primary-700': '#28506D',

        'point-red-50': '#ffddd7',
        'point-red-400': '#ff6262',
        'point-yellow-50': '#FFFAD3',
        'point-yellow-400': '#FEE36E',

        stroke: '#E2E8F0', // 테두리, 구분선용
      },

      // 폰트 시스템
      fontFamily: {
        'pretendard-400': ['Pretendard-Regular', 'system-ui', 'sans-serif'],
        'pretendard-600': ['Pretendard-SemiBold', 'system-ui', 'sans-serif'],

        'paperlogy-400': ['Paperlogy-Regular', 'system-ui', 'sans-serif'],
        'paperlogy-500': ['Paperlogy-Medium', 'system-ui', 'sans-serif'],
        'paperlogy-600': ['Paperlogy-SemiBold', 'system-ui', 'sans-serif'],

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
