/**
 * 클래스명을 조건부로 결합하는 유틸리티 함수
 * @param inputs 클래스명 또는 조건부 객체들
 * @returns 결합된 클래스명 문자열
 */
export function cn(...inputs: (string | Record | undefined)[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
