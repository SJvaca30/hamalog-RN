import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { typography } from '../config/typography';
import { cn } from '../lib/utils';
import type { HamalogFontFamily, HamalogTextSize, TextColor } from '../types/colors.types';
import type { TypographyVariant } from '../types/typography.types';

interface TextProps extends Omit {
  /**
   * 컴포넌트 children
   */
  children?: React.ReactNode;
  /**
   * Typography variant (Figma로부터 가져온 스타일)
   */
  variant?: TypographyVariant;
  /**
   * 텍스트 색상 (하마로그 디자인 시스템)
   * @default 'text-gray-700'
   */
  color?: TextColor;
  /**
   * 폰트 패밀리 (기존 시스템)
   * @default 'hamalog'
   */
  fontFamily?: HamalogFontFamily;
  /**
   * 텍스트 크기 (하마로그 디자인 시스템) - 기존 시스템
   */
  hamalogSize?: HamalogTextSize;
  /**
   * 텍스트 크기 (Tailwind) - 기존 시스템
   * @default 'base'
   */
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  /**
   * 텍스트 weight (Tailwind) - 기존 시스템
   * @default 'normal'
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * 텍스트 정렬
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * 추가 클래스명
   */
  className?: string;
  /**
   * 추가 스타일
   */
  style?: RNTextProps['style'];
}

export const Text = ({
  children,
  variant,
  color = 'text-gray-700',
  fontFamily = 'hamalog',
  hamalogSize,
  size = 'base',
  weight = 'normal',
  align = 'left',
  className,
  style,
  ...props
}: TextProps) => {
  // Typography variant가 있으면 해당 스타일을 사용
  const typographyStyle = variant ? typography[variant] : null;

  const textStyles = cn(
    // 기본 스타일
    'font-sans',

    // Typography variant가 없는 경우에만 기존 스타일 적용
    ...(variant
      ? []
      : [
          // 폰트 패밀리
          `font-${fontFamily}`,
          // 크기 (하마로그 크기가 우선)
          hamalogSize ? `text-${hamalogSize}` : `text-${size}`,
          // 굵기 (폰트 패밀리가 이미 굵기를 포함하지 않는 경우에만)
          !fontFamily.includes('medium') &&
          !fontFamily.includes('semibold') &&
          !fontFamily.includes('bold') &&
          weight !== 'normal'
            ? `font-${weight}`
            : '',
        ]),

    // 색상
    color,

    // 정렬
    `text-${align}`,

    className
  );

  const combinedStyle = typographyStyle
    ? Object.assign({}, style, {
        fontFamily: typographyStyle.fontFamily,
        fontSize: typographyStyle.fontSize,
        fontWeight: typographyStyle.fontWeight,
        lineHeight: typographyStyle.lineHeight,
        letterSpacing: typographyStyle.letterSpacing,
      })
    : style;

  return (
    <RNText className={textStyles} style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};
