/**
 * 하마로그 디자인 시스템 색상 타입 정의
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
  | 'primary-400'
  | 'primary-600'
  | 'primary-700';

export type PointColor =
  | 'point-red-100'
  | 'point-red-500'
  | 'point-yellow-100'
  | 'point-yellow-500';

export type StrokeColor = 'stroke';

export type HamalogColor = GrayColor | PrimaryColor | PointColor | StrokeColor;

/**
 * 텍스트 색상 (text-{color} 형태로 사용)
 */
export type TextColor = `text-${HamalogColor}`;

/**
 * 배경 색상 (bg-{color} 형태로 사용)
 */
export type BackgroundColor = `bg-${HamalogColor}`;

/**
 * 테두리 색상 (border-{color} 형태로 사용)
 */
export type BorderColor = `border-${HamalogColor}`;

/**
 * 모든 색상 클래스 타입
 */
export type ColorClass = TextColor | BackgroundColor | BorderColor;

/**
 * 하마로그 텍스트 스타일 타입 정의 (항상 수정(업데이트)될 수 있음)
 */

// HEADLINE 그룹
export type HeadlineSize =
  | 'headline-p1' // P1-요금제 (24px)
  | 'headline-p2' // P2-메인 요금제 (16px)
  | 'headline-main-b' // 메인 헤드라인(B) (24px)
  | 'headline-main-l' // 메인 헤드라인(L) (22px)
  | 'headline-title'; // 타이틀(B) (18px)

// BODY 그룹
export type BodySize =
  | 'body-1' // body1-일반 본문 (16px)
  | 'body-2' // body2-보조 설명 (14px)
  | 'caption-b' // caption(b) (12px)
  | 'caption'; // caption (12px)

// BUTTON 그룹
export type ButtonSize =
  | 'button-primary' // primary button&헤딩텍 (16px)
  | 'button-date' // 톡결&date (14px)
  | 'button-secondary' // secondary button (12px)
  | 'button-micro'; // micro button_label (12px)

/**
 * 모든 하마로그 텍스트 크기 타입
 */
export type HamalogTextSize = HeadlineSize | BodySize | ButtonSize;

/**
 * 텍스트 크기 클래스 (text-{size} 형태로 사용)
 */
export type TextSizeClass = `text-${HamalogTextSize}`;

/**
 * 하마로그 폰트 패밀리 타입 정의
 */
export type HamalogFontFamily =
  | 'hamalog' // Pretendard-Regular (기본)
  | 'hamalog-medium' // Pretendard-Medium
  | 'hamalog-semibold' // Pretendard-SemiBold
  | 'hamalog-bold' // Pretendard-Bold
  | 'system'; // 시스템 폰트 (fallback)

/**
 * 폰트 패밀리 클래스 (font-{family} 형태로 사용)
 */
export type FontFamilyClass = `font-${HamalogFontFamily}`;
