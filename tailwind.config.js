/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // 하마로그 디자인 시스템 색상 팔레트
        gray: {
          0: '#FFFFFF',
          50: '#F9FAFB',
          100: '#F3F4F6',
          150: '#E5E7EB',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
          850: '#1F2937',
        },
        primary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          400: '#3182CE',
          600: '#2B77CB',
          700: '#2C5282',
        },
        point: {
          // 빨간색 포인트 (에러, 중요 표시)
          red: {
            100: '#FED7D7',
            500: '#E53E3E',
          },
          // 노란색 포인트 (경고, 하이라이트)
          yellow: {
            100: '#FEF5E7',
            500: '#D69E2E',
          },
        },
        stroke: '#E2E8F0', // 테두리, 구분선용
      },
      fontFamily: {
        // Hamalog 폰트 시스템 (Pretendard)
        hamalog: ['Pretendard-Regular', 'system-ui', 'sans-serif'],
        'hamalog-medium': ['Pretendard-Medium', 'system-ui', 'sans-serif'],
        'hamalog-semibold': ['Pretendard-SemiBold', 'system-ui', 'sans-serif'],
        'hamalog-bold': ['Pretendard-Bold', 'system-ui', 'sans-serif'],

        // 시스템 폰트 (fallback)
        system: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // 하마로그 텍스트 스타일 (항상 수정(업데이트)될 수 있음)

        // HEADLINE 그룹
        'headline-p1': ['24px', { lineHeight: 'auto' }], // P1-요금제
        'headline-p2': ['16px', { lineHeight: 'auto' }], // P2-메인 요금제
        'headline-main-b': ['24px', { lineHeight: 'auto' }], // 메인 헤드라인(B)
        'headline-main-l': ['22px', { lineHeight: 'auto' }], // 메인 헤드라인(L)
        'headline-title': ['18px', { lineHeight: 'auto' }], // 타이틀(B)

        // BODY 그룹
        'body-1': ['16px', { lineHeight: 'auto' }], // body1-일반 본문
        'body-2': ['14px', { lineHeight: 'auto' }], // body2-보조 설명
        'caption-b': ['12px', { lineHeight: 'auto' }], // caption(b)
        caption: ['12px', { lineHeight: 'auto' }], // caption

        // BUTTON 그룹
        'button-primary': ['16px', { lineHeight: 'auto' }], // primary button&헤딩텍
        'button-date': ['14px', { lineHeight: 'auto' }], // 톡결&date
        'button-secondary': ['12px', { lineHeight: 'auto' }], // secondary button
        'button-micro': ['12px', { lineHeight: 'auto' }], // micro button_label
      },
    },
  },
  plugins: [],
};
