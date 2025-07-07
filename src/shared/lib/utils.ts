import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 이름을 조건부로 결합하고 Tailwind CSS 클래스 충돌을 해결하는 유틸리티 함수.
 * clsx와 tailwind-merge를 함께 사용합니다.
 * @param inputs - 결합할 클래스 이름들.
 * @returns 병합되고 충돌이 해결된 클래스 이름 문자열.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
