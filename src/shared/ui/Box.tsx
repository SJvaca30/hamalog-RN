import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../lib/utils';
import type { BackgroundColor, BorderColor } from '../types/colors.types';

interface BoxProps extends Omit {
  /**
   * 컴포넌트 children
   */
  children?: React.ReactNode;
  /**
   * 배경 색상 (하마로그 디자인 시스템)
   */
  bg?: BackgroundColor;
  /**
   * 테두리 색상 (하마로그 디자인 시스템)
   */
  borderColor?: BorderColor;
  /**
   * 패딩
   */
  p?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 마진
   */
  m?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 테두리 반지름
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * 테두리 두께
   */
  border?: boolean | 'thin' | 'thick';
  /**
   * 추가 스타일 클래스
   */
  className?: string;
}

export const Box = ({
  children,
  bg,
  borderColor,
  p = 'none',
  m = 'none',
  rounded = 'none',
  border = false,
  className,
  ...props
}: BoxProps) => {
  const boxStyles = cn(
    // 배경색
    bg,
    // 테두리 색상
    borderColor,
    // 패딩
    {
      'p-0': p === 'none',
      'p-1': p === 'xs',
      'p-2': p === 'sm',
      'p-4': p === 'md',
      'p-6': p === 'lg',
      'p-8': p === 'xl',
    },
    // 마진
    {
      'm-0': m === 'none',
      'm-1': m === 'xs',
      'm-2': m === 'sm',
      'm-4': m === 'md',
      'm-6': m === 'lg',
      'm-8': m === 'xl',
    },
    // 테두리 반지름
    {
      'rounded-none': rounded === 'none',
      'rounded-sm': rounded === 'sm',
      'rounded-md': rounded === 'md',
      'rounded-lg': rounded === 'lg',
      'rounded-xl': rounded === 'xl',
      'rounded-full': rounded === 'full',
    },
    // 테두리
    {
      border: border === true || border === 'thin',
      'border-2': border === 'thick',
    },
    className
  );

  return (
    <View className={boxStyles} {...props}>
      {children}
    </View>
  );
};
