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

/**
 * 주어진 객체를 multipart/form-data 전송에 사용할 FormData로 변환합니다.
 * - Blob/File이 아닌 객체는 JSON 문자열로 변환하여 담습니다.
 */
export function toFormData(data: Record<string, any>): FormData {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // React Native(Environment): 파일 객체는 { uri, name, type } 형태
    // Blob 인스턴스가 아닐 수 있으므로 'uri'를 heuristic으로 판단해서 그대로 append
    const isReactNativeFileLike =
      typeof value === 'object' && value !== null && 'uri' in (value as any);

    if (Array.isArray(value)) {
      value.forEach(item => {
        const itemIsFileLike =
          typeof item === 'object' && item !== null && 'uri' in (item as any);
        if (itemIsFileLike) {
          form.append(`${key}[]`, item as any);
        } else if (item instanceof Blob) {
          form.append(`${key}[]`, item);
        } else if (typeof item === 'object') {
          form.append(`${key}[]`, JSON.stringify(item));
        } else {
          form.append(`${key}[]`, String(item));
        }
      });
      return;
    }

    if (isReactNativeFileLike) {
      form.append(key, value as any);
      return;
    }

    if (value instanceof Blob) {
      form.append(key, value);
      return;
    }

    if (typeof value === 'object') {
      form.append(key, JSON.stringify(value));
      return;
    }

    form.append(key, String(value));
  });
  return form;
}
