import { cn } from '@shared/lib/utils';
import type { BackgroundColor, BorderColor } from '@shared/types/ui.types';
import React from 'react';
import { View, ViewProps } from 'react-native';

const paddingMap = {
  none: 'p-0', // 0px
  xs: 'p-1', // 4px
  sm: 'p-2', // 8px
  md: 'p-4', // 16px
  lg: 'p-6', // 24px
  xl: 'p-8', // 32px
};

const marginMap = {
  none: 'm-0', // 0px
  xs: 'm-1', // 4px
  sm: 'm-2', // 8px
  md: 'm-4', // 16px
  lg: 'm-6', // 24px
  xl: 'm-8', // 32px
};

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const directionMap = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const gapMap = {
  none: 'gap-0', // 0px
  xs: 'gap-1', // 4px
  sm: 'gap-2', // 8px
  md: 'gap-4', // 16px
  lg: 'gap-6', // 24px
  xl: 'gap-8', // 32px
  auto: 'gap-auto', // auto
} as const;

type PaddingKey = keyof typeof paddingMap;
type MarginKey = keyof typeof marginMap;
type RoundedKey = keyof typeof roundedMap;
type BorderKey = 'thin' | 'thick';
type DirectionKey = keyof typeof directionMap;
type JustifyKey = keyof typeof justifyMap;
type AlignKey = keyof typeof alignMap;
type GapKey = keyof typeof gapMap;

interface BoxProps extends Omit<ViewProps, 'className'> {
  /**
   * 컴포넌트 children
   */
  children?: React.ReactNode;
  /**
   * 배경 색상
   */
  bg?: BackgroundColor;
  /**
   * 테두리 색상
   */
  borderColor?: BorderColor;
  /**
   * 패딩
   */
  p?: PaddingKey;
  /**
   * 마진
   */
  m?: MarginKey;
  /**
   * 테두리 반지름
   */
  rounded?: RoundedKey;
  /**
   * 테두리 두께
   */
  border?: boolean | BorderKey;
  /**
   * Flex 방향
   */
  direction?: DirectionKey;
  /**
   * Flex justify-content
   */
  justify?: JustifyKey;
  /**
   * Flex align-items
   */
  align?: AlignKey;
  /**
   * Gap 간격
   */
  gap?: GapKey;
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
  direction,
  justify,
  align,
  gap,
  className,
  ...props
}: BoxProps) => {
  const boxStyles = cn(
    // 배경색
    bg,
    // 테두리 색상
    borderColor,
    // 패딩
    paddingMap[p],
    // 마진
    marginMap[m],
    // 테두리 반지름
    roundedMap[rounded],
    // 테두리
    {
      border: border === true || border === 'thin',
      'border-2': border === 'thick',
    },
    // Flex 관련
    direction && directionMap[direction],
    justify && justifyMap[justify],
    align && alignMap[align],
    gap && gapMap[gap],
    className
  );

  return (
    <View className={boxStyles} {...props}>
      {children}
    </View>
  );
};
