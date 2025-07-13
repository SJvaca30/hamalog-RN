/**
 * Hamalog 디자인 시스템의 UI 컴포넌트에서 공통으로 사용되는 타입 모음입니다.
 */

// 1. Typography Types
// -----------------------------------------------------------------------------

/**
 * Figma에 정의된 텍스트 스타일 종류입니다.
 * Text 컴포넌트의 `variant` prop으로 사용됩니다.
 */
export type TypographyVariant =
  | 'display-b'
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body-1'
  | 'label'
  | 'body-2'
  | 'button-large'
  | 'button-medium'
  | 'button-small'
  | 'button-small-p'
  | 'caption-primary'
  | 'caption-secondary';

// 2. Color Types
// -----------------------------------------------------------------------------

/**
 * `tailwind.config.js`에 정의된 색상 이름입니다.
 * (e.g., 'gray-50', 'primary-400')
 */
export type GrayColor =
  | 'gray-0'
  | 'gray-50'
  | 'gray-100'
  | 'gray-150'
  | 'gray-300'
  | 'gray-500'
  | 'gray-700'
  | 'gray-850';

export type PrimaryColor =
  | 'primary-50'
  | 'primary-100'
  | 'primary-250'
  | 'primary-400'
  | 'primary-600'
  | 'primary-700';

export type PointColor =
  | 'point-red-50'
  | 'point-red-400'
  | 'point-yellow-50'
  | 'point-yellow-400';

export type StrokeColor = 'stroke';

type HamalogColor = GrayColor | PrimaryColor | PointColor | StrokeColor;

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
