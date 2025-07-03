import React from 'react';
import { SafeAreaView, type ViewProps } from 'react-native';
import { cn } from '../lib/utils';
import type { BackgroundColor } from '../types/colors.types';

interface ContainerProps extends Omit {
  /**
   * 컴포넌트 children
   */
  children: React.ReactNode;
  /**
   * 배경 색상 (하마로그 디자인 시스템)
   */
  bg?: BackgroundColor;
  /**
   * 패딩
   */
  p?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 추가 스타일 클래스
   */
  className?: string;
}

export const Container = ({
  children,
  bg = 'bg-gray-0',
  p = 'lg',
  className,
  ...props
}: ContainerProps) => {
  const containerStyles = cn(
    // 기본 스타일
    'flex-1',
    // 배경색
    bg,
    // 패딩
    {
      'p-0': p === 'none',
      'p-1': p === 'xs',
      'p-2': p === 'sm',
      'p-4': p === 'md',
      'p-6': p === 'lg',
      'p-8': p === 'xl',
    },
    className
  );

  return (
    <SafeAreaView className={containerStyles} {...props}>
      {children}
    </SafeAreaView>
  );
};
