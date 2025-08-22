import { colors } from '@shared/config/colors';

/**
 * Figma에 정의된 텍스트 스타일 종류입니다.
 * Text 컴포넌트의 `variant` prop으로 사용됩니다.
 */
export type { TypographyVariant } from './typography-variants';

// 2. Color Types
// -----------------------------------------------------------------------------

// 각 색상 그룹에 대한 타입을 동적으로 생성합니다.
type GrayColors = `gray-${keyof typeof colors.gray}`;
type PrimaryColors = `primary-${keyof typeof colors.primary}`;
type PointRedColors = `point-red-${keyof typeof colors.point.red}`;
type PointYellowColors = `point-yellow-${keyof typeof colors.point.yellow}`;
type StrokeColor = 'stroke';

/**
 * colors.ts 객체 구조를 기반으로 Tailwind 클래스명에 사용될 색상 이름을 동적으로 생성합니다.
 * 예: 'gray-100', 'primary-400', 'point-red-400', 'stroke'
 */
type HamalogColor =
  | GrayColors
  | PrimaryColors
  | PointRedColors
  | PointYellowColors
  | StrokeColor;

/**
 * 텍스트 색상 클래스입니다. (e.g., 'text-primary-400')
 */
export type TextColor = `text-${HamalogColor}`;

/**
 * 배경 색상 클래스입니다. (e.g., 'bg-gray-0')
 */
export type BackgroundColor = `bg-${HamalogColor}`;

/**
 * 테두리 색상 클래스입니다. (e.g., 'border-stroke')
 */
export type BorderColor = `border-${HamalogColor}`;
