import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-b',
            'display',
            'h1',
            'h2',
            'h3',
            'label',
            'body-1',
            'body-2',
            'button-large',
            'button-medium',
            'button-small',
            'button-small-p',
            'caption-primary',
            'caption-secondary',
          ],
        },
      ],
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
      tracking: [
        {
          tracking: [
            'display-b',
            'display',
            'h1',
            'h2',
            'h3',
            'label',
            'body-1',
            'body-2',
            'button-large',
            'button-medium',
            'button-small',
            'button-small-p',
            'caption-primary',
            'caption-secondary',
          ],
        },
      ],
      'text-color': [
        'text-gray-0',
        'text-gray-50',
        'text-gray-100',
        'text-gray-150',
        'text-gray-300',
        'text-gray-500',
        'text-gray-700',
        'text-gray-850',
        'text-primary-50',
        'text-primary-100',
        'text-primary-250',
        'text-primary-400',
        'text-primary-600',
        'text-primary-700',
        'text-point-red-50',
        'text-point-red-400',
        'text-point-yellow-50',
        'text-point-yellow-400',
        'text-stroke',
      ],
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
