import { colors } from '@shared/config/colors';
import { TYPOGRAPHY_VARIANTS } from '@shared/types/typography-variants';
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * colors.ts 객체를 순회하여 모든 텍스트 색상 클래스를 동적으로 생성합니다.
 */
const generateTextColorClasses = () => {
  const textColors: string[] = [];

  const addColors = (obj: any, prefix: string = '') => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        addColors(obj[key], `${prefix}${key}-`);
      } else {
        textColors.push(`text-${prefix}${key}`);
      }
    }
  };

  addColors(colors);
  return textColors;
};

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...TYPOGRAPHY_VARIANTS] }],
      'font-family': [
        {
          font: [
            'pretendard-400',
            'pretendard-600',
            'paperlogy-400',
            'paperlogy-500',
            'paperlogy-600',
            'system',
          ],
        },
      ],
      tracking: [{ tracking: [...TYPOGRAPHY_VARIANTS] }],
      'text-color': generateTextColorClasses(),
    },
  },
});

/**
 * 클래스 이름을 조건부로 결합하고 Tailwind CSS 클래스 충돌을 해결하는 유틸리티 함수.
 * clsx와 tailwind-merge를 함께 사용합니다.
 * @param inputs - 결합할 클래스 이름들.
 * @returns 병합되고 충돌이 해결된 클래스 이름 문자열.
 */
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(...inputs));
}
