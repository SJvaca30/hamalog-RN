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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  extends Omit<ScrollViewProps, 'className' | 'children' | 'scrollEnabled'> {
  /**
   * 페이지의 자식 요소.
   * `bottomInset` 값을 사용하기 위해 함수 형태(Render Prop)로 전달할 수 있습니다.
   */
  children:
    | React.ReactNode
    | ((insets: { topInset: number; bottomInset: number }) => React.ReactNode);
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
   * 스크롤 활성화 여부 (scrollable=true일 때만 유효)
   */
  scrollEnabled?: boolean;
  /**
   * 추가 스타일 클래스
   */
  className?: string;
  /**
   * 키보드 회피 시 추가로 적용할 수직 오프셋 (예: 네비게이션 헤더 높이)
   */
  keyboardVerticalOffset?: number;
  /**
   * 내부 ScrollView ref (scrollable=true일 때만 유효)
   */
  scrollRef?: React.RefObject<ScrollView | KeyboardAwareScrollView | null>;
  /**
   * 상단 Safe Area(Inset) 적용 여부
   */
  useTopInset?: boolean;
}

/**
 * 📱 화면 전체의 레이아웃과 상호작용을 책임지는 핵심 컨테이너입니다.
 *
 * 이 컴포넌트는 앱의 모든 페이지를 감싸며, 다음과 같은 중요한 역할을 수행합니다:
 * - 스크롤 및 비스크롤 화면을 모두 지원합니다.
 * - iOS의 홈 인디케이터(Safe Area)를 수동으로 처리하여 하단 UI가 가려지지 않게 합니다.
 * - 키보드가 나타났을 때 입력 필드가 가려지지 않도록 자동으로 화면을 조정합니다.
 *
 * @param {PageContainerProps} props - 컴포넌트 프로퍼티
 */
export const PageContainer = ({
  children,
  bg = 'bg-gray-0',
  px = 'none',
  py = 'none',
  scrollable = false,
  scrollEnabled = true,
  className,
  keyboardVerticalOffset,
  scrollRef,
  useTopInset = false,
  ...props
}: PageContainerProps) => {
  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
  const contentPaddingStyles = cn(paddingXMap[px], paddingYMap[py]);

  const childrenContent =
    typeof children === 'function'
      ? children({ topInset, bottomInset })
      : children;

  const content = scrollable ? (
    Platform.OS === 'android' ? (
      <KeyboardAwareScrollView
        ref={scrollRef as any}
        bounces={false}
        className="flex-1"
        contentContainerClassName={cn('flex-grow', contentPaddingStyles)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={10}
        scrollEnabled={scrollEnabled}
        {...props}>
        {childrenContent}
      </KeyboardAwareScrollView>
    ) : (
      <ScrollView
        ref={scrollRef as any}
        bounces={false}
        className="flex-1"
        contentContainerClassName={cn('flex-grow', contentPaddingStyles)}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}
        {...props}>
        {childrenContent}
      </ScrollView>
    )
  ) : (
    <View className={cn('flex-1', contentPaddingStyles)}>
      {childrenContent}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset ?? 0}
      style={{ paddingTop: useTopInset ? topInset : 0 }}
      className={cn('flex-1', bg, className)}>
      {content}
    </KeyboardAvoidingView>
  );
};
