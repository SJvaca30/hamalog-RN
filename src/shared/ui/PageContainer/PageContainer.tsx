import { cn } from '@shared/lib/utils';
import { BackgroundColor } from '@shared/types/ui.types';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
} from 'react-native';

const paddingXMap = {
  none: 'px-0',
  xs: 'px-1',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
  xl: 'px-8',
};

const paddingYMap = {
  none: 'py-0',
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
  xl: 'py-8',
};

type PaddingKey = keyof typeof paddingXMap;

interface PageContainerProps
  extends Omit<ScrollViewProps, 'className' | 'children'> {
  /**
   * 컴포넌트 children
   */
  children: React.ReactNode;
  /**
   * 배경 색상
   */
  bg?: BackgroundColor;
  /**
   * 수평 패딩
   */
  px?: PaddingKey;
  /**
   * 수직 패딩
   */
  py?: PaddingKey;
  /**
   * 스크롤 가능 여부
   */
  scrollable?: boolean;
  /**
   * 추가 스타일 클래스
   */
  className?: string;
}

export const PageContainer = ({
  children,
  bg = 'bg-gray-0',
  px = 'none',
  py = 'none',
  scrollable = false,
  className,
  ...props
}: PageContainerProps) => {
  const contentPaddingStyles = cn(paddingXMap[px], paddingYMap[py]);

  const content = scrollable ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName={contentPaddingStyles}
      showsVerticalScrollIndicator={false}
      {...props}>
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1', contentPaddingStyles)} {...props}>
      {children}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={cn('flex-1', bg, className)}>
      {content}
    </KeyboardAvoidingView>
  );
};
