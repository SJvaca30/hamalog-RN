import { cn } from '@shared/lib/utils';
import { BackgroundColor } from '@shared/types/ui.types';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
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
  /**
   * 키보드 회피 시 추가로 적용할 수직 오프셋 (예: 네비게이션 헤더 높이)
   */
  keyboardVerticalOffset?: number;
  /**
   * 내부 ScrollView ref (scrollable=true일 때만 유효)
   */
  scrollRef?: React.RefObject<ScrollView | null>;
}

export const PageContainer = ({
  children,
  bg = 'bg-gray-0',
  px = 'none',
  py = 'none',
  scrollable = false,
  className,
  keyboardVerticalOffset,
  scrollRef,
  ...props
}: PageContainerProps) => {
  const contentPaddingStyles = cn(paddingXMap[px], paddingYMap[py]);

  /**
   * 🤖 Android 키보드 높이 추적 상태
   * - iOS는 자동 처리되므로 Android에서만 필요
   * - 키보드가 나타날 때 ScrollView 하단에 패딩을 동적으로 추가하기 위함
   */
  const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);

  /**
   * 🎹 Android 키보드 이벤트 리스너 등록
   *
   * 왜 필요한가?
   * - Android에서는 키보드가 화면을 가릴 수 있음
   * - manifest의 windowSoftInputMode만으로는 완벽하지 않을 때가 있음
   * - 키보드 높이를 알아야 정확한 패딩을 줄 수 있음
   */
  useEffect(() => {
    // iOS는 자동 처리되므로 Android에서만 실행
    if (Platform.OS !== 'android') return;

    /**
     * 📱 키보드가 나타날 때 실행되는 리스너
     * - e.endCoordinates.height: 키보드의 높이 (픽셀 단위)
     * - 이 높이만큼 ScrollView 하단에 패딩을 추가할 예정
     */
    const show = Keyboard.addListener('keyboardDidShow', e => {
      // 키보드 높이가 유효한 경우에만 설정 (0이나 undefined 방지)
      const keyboardHeight = e.endCoordinates?.height ?? 0;
      if (keyboardHeight > 0) {
        setAndroidKeyboardHeight(keyboardHeight);
      }
    });

    /**
     * 📱 키보드가 사라질 때 실행되는 리스너
     * - 패딩을 0으로 리셋해서 원래 레이아웃으로 복구
     */
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setAndroidKeyboardHeight(0);
    });

    // 🧹 컴포넌트 언마운트 시 리스너 정리 (메모리 누수 방지)
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const content = scrollable ? (
    <ScrollView
      ref={scrollRef}
      className="flex-1"
      contentContainerClassName={contentPaddingStyles}
      contentContainerStyle={[
        /*
         * 🎨 동적 스타일 계산: Android 키보드 대응
         *
         * 전략:
         * 1. iOS: 자동 처리되므로 추가 패딩 불필요
         * 2. Android + 키보드 열림: 동적 패딩 추가
         * 3. Android + 키보드 닫힘: 기본 스타일만 적용
         */
        Platform.OS === 'android' && androidKeyboardHeight > 0
          ? {
              /*
               * 📐 패딩 계산 공식
               * - androidKeyboardHeight: 실제 키보드 높이
               * - +16: 키보드와 콘텐츠 사이 여유 공간
               * - Math.max(계산값, 100): 최소 100px 보장 (안전장치)
               */
              paddingBottom: Math.max(androidKeyboardHeight + 16, 100),

              /*
               * 🏗️ 스크롤 동작 보장
               * - minHeight: '100%': 콘텐츠가 짧아도 스크롤이 가능하도록
               * - 키보드 패딩이 있어도 전체 높이 유지
               */
              minHeight: '100%',
            }
          : {
              /*
               * 🍎 iOS 또는 키보드 닫힌 Android
               * - 기본 minHeight만 적용
               * - 불필요한 패딩 제거
               */
              minHeight: '100%',
            },

        // 🔗 외부에서 전달받은 추가 스타일도 병합
        props.contentContainerStyle as any,
      ]}
      showsVerticalScrollIndicator={false} // 🚫 스크롤바 숨김 (깔끔한 UI)
      contentInsetAdjustmentBehavior={
        // 🍎 iOS 전용: 안전 영역 자동 조정
        Platform.OS === 'ios' ? 'automatic' : undefined
      }
      automaticallyAdjustKeyboardInsets // 🤖 React Native 내장 키보드 조정 (추가 보완)
      keyboardDismissMode="on-drag" // 📱 스크롤 시 키보드 자동 숨김
      keyboardShouldPersistTaps="handled" // 🖱️ 탭 이벤트가 키보드에 가려져도 처리
      {...props}>
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1', contentPaddingStyles)} {...props}>
      {children}
    </View>
  );

  /*
   * 🔀 렌더링 전략 분기: scrollable vs non-scrollable
   *
   * scrollable === true:
   * - ScrollView의 자체 키보드 처리 기능 사용
   * - KeyboardAvoidingView 사용 안 함 (중복 처리로 인한 충돌 방지)
   * - 동적 패딩과 automaticallyAdjustKeyboardInsets로 해결
   *
   * scrollable === false:
   * - KeyboardAvoidingView 사용 (정적 레이아웃용)
   * - 스크롤이 없는 간단한 화면에 적합
   */
  if (scrollable) {
    return <View className={cn('flex-1', bg, className)}>{content}</View>;
  }

  return (
    <KeyboardAvoidingView
      /*
       * 🎭 플랫폼별 키보드 회피 동작
       * - iOS: 'padding' = 패딩으로 콘텐츠 밀어올리기
       * - Android: 'height' = 전체 뷰 높이 조정하기
       */
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      /*
       * 📏 추가 오프셋 (주로 네비게이션 헤더 높이)
       * - 키보드 회피 계산에 추가로 고려할 높이
       * - 예: 헤더가 있어서 실제 콘텐츠 영역이 줄어든 경우
       */
      keyboardVerticalOffset={keyboardVerticalOffset ?? 0}
      className={cn('flex-1', bg, className)}>
      {content}
    </KeyboardAvoidingView>
  );
};
