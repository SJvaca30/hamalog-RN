/** @type {import('tailwindcss').Config} */

const { colors } = require('./src/shared/config/colors');

/**
 * `colors.ts`의 색상 객체를 Tailwind 설정용으로 변환합니다.
 * @param {typeof colors} colorsObj
 */
const flattenColorPalette = colorsObj => {
  const flattened = {};
  for (const colorName in colorsObj) {
    if (typeof colorsObj[colorName] === 'object') {
      for (const shade in colorsObj[colorName]) {
        flattened[`${colorName}-${shade}`] = colorsObj[colorName][shade];
      }
    } else {
      flattened[colorName] = colorsObj[colorName];
    }
  }
  return flattened;
};

/**
 * 🎨 Hamalog 디자인 시스템 가이드
 *
 * 색상이나 텍스트 스타일을 수정하고 싶다면 이 가이드를 따라하세요
 *
 *
 * 🎨 색상 변경하기
 *
 * 🔸 기존 색상 수정 (예: gray-100 색상 변경)
 *    → `src/shared/config/colors.ts` 파일만 수정
 *
 * 🔸 기존 그룹에 새 색상 추가 (예: gray-900 추가)
 *    → `src/shared/config/colors.ts` 파일만 수정
 *
 * 🔸 완전히 새로운 색상 그룹 추가 (예: point.blue 그룹 추가)
 *    1. `src/shared/config/colors.ts` - 새 색상 추가
 *    2. `src/shared/types/ui.types.ts` - 새 타입 정의 추가
 *
 *
 * ✏️ 텍스트 스타일 변경하기
 *
 * 🔸 기존 스타일 수정 (예: h1 크기 변경)
 *    → 이 파일에서 `fontSize`, `letterSpacing` 값만 수정
 *
 * 🔸 새로운 텍스트 스타일 추가 (예: subtitle 추가)
 *    1. `src/shared/types/typography-variants.ts` - 이름 추가
 *    2. `tailwind.config.js` (이 파일) - 크기, 간격 정의
 *    3. `src/shared/ui/Typography/Typography.tsx` - 폰트, 굵기 설정
 */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // 모든 색상 값은 'src/shared/config/colors.ts'에서 가져옵니다.
      colors: flattenColorPalette(colors),

      // 폰트 패밀리
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
