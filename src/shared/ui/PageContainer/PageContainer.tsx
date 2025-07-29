import { cn } from '@shared/lib/utils';
import { BackgroundColor } from '@shared/types/ui.types';
import React from 'react';
import { View, ViewProps } from 'react-native';

const paddingMap = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

type PaddingKey = keyof typeof paddingMap;

interface PageContainerProps extends Omit<ViewProps, 'className'> {
  /**
   * 컴포넌트 children
   */
  children: React.ReactNode;
  /**
   * 배경 색상
   */
  bg?: BackgroundColor;
  /**
   * 패딩
   */
  p?: PaddingKey;
  /**
   * 추가 스타일 클래스
   */
  className?: string;
}

export const PageContainer = ({
  children,
  bg = 'bg-gray-0',
  p = 'lg',
  className,
  ...props
}: PageContainerProps) => {
  const containerStyles = cn(
    // 기본 스타일
    'flex-1',
    // 배경색
    bg,
    // 패딩
    paddingMap[p],
    className
  );

  return (
    <View className={containerStyles} {...props}>
      {children}
    </View>
  );
};
