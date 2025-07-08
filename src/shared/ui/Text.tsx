import { cn } from '@shared/lib/utils';
import type { TextColor, TypographyVariant } from '@shared/types/ui.types';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

/**
 * 각 텍스트 variant에 해당하는 스타일(className)을 정의한 맵 객체입니다.
 * 이 객체는 tailwind.config.js에 정의된 값을 기반으로 합니다.
 * 이제부터 텍스트 스타일은 이 variant를 통해 제어하는 것을 원칙으로 합니다.
 */
const variantStyles: Record   <TypographyVariant, string> = {
  'display-b': 'text-display-b font-paperlogy-600 tracking-display-b',
  display: 'text-display font-paperlogy-400 tracking-display',
  h1: 'text-h1 font-paperlogy-500 tracking-h1',
  h2: 'text-h2 font-pretendard-600 tracking-h2',
  h3: 'text-h3 font-pretendard-600 tracking-h3',
  'body-1': 'text-body-1 font-pretendard-400 tracking-body-1',
  label: 'text-label font-pretendard-600 tracking-label',
  'body-2': 'text-body-2 font-pretendard-400 tracking-body-2',
  'button-large': 'text-button-large font-pretendard-600 tracking-button-large',
  'button-medium':
    'text-button-medium font-pretendard-600 tracking-button-medium',
  'button-small': 'text-button-small font-pretendard-600 tracking-button-small',
  'button-small-p':
    'text-button-small-p font-pretendard-400 tracking-button-small-p',
  'caption-primary':
    'text-caption-primary font-pretendard-400 tracking-caption-primary',
  'caption-secondary':
    'text-caption-secondary font-pretendard-400 tracking-caption-secondary',
};

interface TextProps extends Omit<RNTextProps, 'className' | 'style'> {
  /**
   * 컴포넌트 children
   */
  children?: React.ReactNode;
  /**
   * Typography variant
   * @default 'body-1'
   */
  variant?: TypographyVariant;
  /**
   * 텍스트 색상
   * @default 'text-gray-850'
   */
  color?: TextColor;
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
   * 네이티브 style prop. 꼭 필요한 경우에만 사용하세요.
   */
  style?: RNTextProps['style'];
}

/**
 * Hamalog 디자인 시스템의 Text 컴포넌트입니다.
 * `variant` prop을 사용하여 스타일을 적용하세요.
 * 개별적인 size, weight, font-family 등의 prop은 사용하지 않습니다.
 *
 * @example
 * // h1 스타일 적용
 * <Text variant="h1">Hello World</Text>
 *
 * // 색상 및 정렬 변경
 * <Text variant="body-1" color="text-primary-400" align="center">
 *   Centered blue text
 * </Text>
 *
 * // 추가 스타일링
 * <Text variant="label" className="mt-4">
 *   Label with margin
 * </Text>
 */
export const Text = ({
  children,
  variant = 'body-1',
  color = 'text-gray-850',
  align = 'left',
  className,
  style,
  ...props
}: TextProps) => {
  const textStyles = cn(
    variantStyles[variant],
    color,
    `text-${align}`,
    className
  );

  return (
    <RNText className={textStyles} style={style} {...props}>
      {children}
    </RNText>
  );
};
