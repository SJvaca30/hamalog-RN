import { cn } from '@shared/lib/utils';
import type { BackgroundColor, BorderColor } from '@shared/types/ui.types';
import React from 'react';
import { View, ViewProps } from 'react-native';

import {
  alignMap,
  directionMap,
  gapMap,
  justifyMap,
  marginMap,
  paddingMap,
  roundedMap,
} from '@shared/config';

const borderWidthMap = {
  thin: 'border',
  thick: 'border-2',
};

type SpacingKey = keyof typeof paddingMap;
type RoundedKey = keyof typeof roundedMap;
type BorderWidthKey = keyof typeof borderWidthMap;
type DirectionKey = keyof typeof directionMap;
type JustifyKey = keyof typeof justifyMap;
type AlignKey = keyof typeof alignMap;
type GapKey = keyof typeof gapMap;

interface BoxProps extends Omit<ViewProps, 'className'> {
  /** 컴포넌트 children */
  children?: React.ReactNode;
  /**
   * 배경 색상.
   * NativeWind의 배경색 클래스 이름을 사용합니다. (e.g., 'bg-primary-100')
   */
  bg?: BackgroundColor;
  /**
   * 테두리 색상.
   * NativeWind의 테두리색 클래스 이름을 사용합니다. (e.g., 'border-gray-300')
   */
  borderColor?: BorderColor;

  /**
   * 전체 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  p?: SpacingKey;
  /**
   * 수평(좌/우) 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  px?: SpacingKey;
  /**
   * 수직(상/하) 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  py?: SpacingKey;
  /**
   * 상단 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  pt?: SpacingKey;
  /**
   * 하단 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  pb?: SpacingKey;
  /**
   * 좌측 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  pl?: SpacingKey;
  /**
   * 우측 패딩.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  pr?: SpacingKey;

  /**
   * 전체 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  m?: SpacingKey;
  /**
   * 수평(좌/우) 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  mx?: SpacingKey;
  /**
   * 수직(상/하) 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  my?: SpacingKey;
  /**
   * 상단 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  mt?: SpacingKey;
  /**
   * 하단 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  mb?: SpacingKey;
  /**
   * 좌측 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  ml?: SpacingKey;
  /**
   * 우측 마진.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  mr?: SpacingKey;

  /**
   * 전체 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @default 'none'
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  rounded?: RoundedKey;
  /**
   * 위쪽 두 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedT?: RoundedKey;
  /**
   * 아래쪽 두 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedB?: RoundedKey;
  /**
   * 왼쪽 두 모서리의 테두리 반지름. (NativeWind v4+)
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedL?: RoundedKey;
  /**
   * 오른쪽 두 모서리의 테두리 반지름. (NativeWind v4+)
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedR?: RoundedKey;
  /**
   * 좌측 상단 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedTL?: RoundedKey;
  /**
   * 우측 상단 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedTR?: RoundedKey;
  /**
   * 좌측 하단 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedBL?: RoundedKey;
  /**
   * 우측 하단 모서리의 테두리 반지름.
   * - `none`: 0px, `sm`: 2px, `md`: 6px, `lg`: 8px, `xl`: 12px, `full`: 9999px
   * @type 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
   */
  roundedBR?: RoundedKey;

  /**
   * 테두리 표시 여부. `true`일 경우 1px의 테두리가 적용됩니다.
   * @default false
   */
  border?: boolean;
  /**
   * 테두리 두께.
   * - `thin`: 1px
   * - `thick`: 2px
   * @type 'thin' | 'thick'
   */
  borderWidth?: BorderWidthKey;

  /**
   * Flex 방향.
   * @type 'row' | 'col' | 'row-reverse' | 'col-reverse'
   */
  direction?: DirectionKey;
  /**
   * Flex 메인 축 정렬 (justify-content).
   * @type 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
   */
  justify?: JustifyKey;
  /**
   * Flex 교차 축 정렬 (align-items).
   * @type 'start' | 'center' | 'end' | 'stretch' | 'baseline'
   */
  align?: AlignKey;

  /**
   * 전체 Gap 간격.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  gap?: GapKey;
  /**
   * 수평 Gap 간격.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  gapX?: GapKey;
  /**
   * 수직 Gap 간격.
   * - `none`: 0px, `xs`: 4px, `sm`: 8px, `md`: 16px, `lg`: 24px, `xl`: 32px
   */
  gapY?: GapKey;

  /** 추가적인 NativeWind 클래스 */
  className?: string;
}

export const Box = ({
  children,
  bg,
  borderColor,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  rounded,
  roundedT,
  roundedB,
  roundedL,
  roundedR,
  roundedTL,
  roundedTR,
  roundedBL,
  roundedBR,
  border = false,
  borderWidth,
  direction,
  justify,
  align,
  gap,
  gapX,
  gapY,
  className,
  ...props
}: BoxProps) => {
  const boxStyles = cn(
    bg,
    {
      ...(borderWidth && { [borderWidthMap[borderWidth]]: true }),
      border: border && !borderWidth,
    },
    borderColor,
    {
      ...(p && { [paddingMap[p]]: true }),
      ...(px && { [paddingMap[px].replace('p', 'px')]: true }),
      ...(py && { [paddingMap[py].replace('p', 'py')]: true }),
      ...(pt && { [paddingMap[pt].replace('p', 'pt')]: true }),
      ...(pb && { [paddingMap[pb].replace('p', 'pb')]: true }),
      ...(pl && { [paddingMap[pl].replace('p', 'pl')]: true }),
      ...(pr && { [paddingMap[pr].replace('p', 'pr')]: true }),
    },
    {
      ...(m && { [marginMap[m]]: true }),
      ...(mx && { [marginMap[mx].replace('m', 'mx')]: true }),
      ...(my && { [marginMap[my].replace('m', 'my')]: true }),
      ...(mt && { [marginMap[mt].replace('m', 'mt')]: true }),
      ...(mb && { [marginMap[mb].replace('m', 'mb')]: true }),
      ...(ml && { [marginMap[ml].replace('m', 'ml')]: true }),
      ...(mr && { [marginMap[mr].replace('m', 'mr')]: true }),
    },
    // Rounded
    {
      ...(rounded && { [roundedMap[rounded]]: true }),
      ...(roundedT && {
        [roundedMap[roundedT].replace('rounded', 'rounded-t')]: true,
      }),
      ...(roundedB && {
        [roundedMap[roundedB].replace('rounded', 'rounded-b')]: true,
      }),
      ...(roundedL && {
        [roundedMap[roundedL].replace('rounded', 'rounded-l')]: true,
      }),
      ...(roundedR && {
        [roundedMap[roundedR].replace('rounded', 'rounded-r')]: true,
      }),
      ...(roundedTL && {
        [roundedMap[roundedTL].replace('rounded', 'rounded-tl')]: true,
      }),
      ...(roundedTR && {
        [roundedMap[roundedTR].replace('rounded', 'rounded-tr')]: true,
      }),
      ...(roundedBL && {
        [roundedMap[roundedBL].replace('rounded', 'rounded-bl')]: true,
      }),
      ...(roundedBR && {
        [roundedMap[roundedBR].replace('rounded', 'rounded-br')]: true,
      }),
    },
    direction && directionMap[direction],
    justify && justifyMap[justify],
    align && alignMap[align],
    {
      ...(gap && { [gapMap[gap]]: true }),
      ...(gapX && { [gapMap[gapX].replace('gap', 'gap-x')]: true }),
      ...(gapY && { [gapMap[gapY].replace('gap', 'gap-y')]: true }),
    },
    className
  );

  return (
    <View className={boxStyles} {...props}>
      {children}
    </View>
  );
};
