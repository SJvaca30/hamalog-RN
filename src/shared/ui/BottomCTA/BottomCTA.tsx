/**
 * 하단 고정형 CTA 버튼
 * - 여러 페이지에서 동일한 스타일/접근성 규칙으로 사용할 수 있는 공통 컴포넌트입니다.
 * - `Pressable` 기반으로, 비활성화/접근성 상태를 일관되게 처리합니다.
 * - 페이지가 스크롤 가능한 경우, 보통 콘텐츠의 마지막에 배치하여 자연스럽게 노출합니다.
 *
 * 사용 예시
 * ```tsx
 * <BottomCTA label="다음" disabled={!canProceed} onPress={handleNext} className="mt-10" />
 * ```
 */
import { cn } from '@shared/lib';
import { Typography } from '@shared/ui/Typography';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';

type BottomCTAProps = {
  /** 버튼 라벨 텍스트 */
  label: string;
  /** true일 때 비활성화 및 회색 스타일 적용 */
  disabled?: boolean;
  /** Tailwind 클래스 등 추가 커스텀 스타일 */
  className?: string;
  /** 테스트 자동화를 위한 testID */
  testID?: string;
  /** 버튼 클릭 핸들러 */
  onPress?: PressableProps['onPress'];
};

export const BottomCTA: React.FC<BottomCTAProps> = ({
  label,
  disabled,
  className,
  testID,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!!disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      testID={testID}
      className={cn(
        'w-full items-center justify-center rounded-2xl py-[18.5]',
        disabled ? 'bg-gray-50' : 'bg-primary-400',
        className
      )}>
      <Typography
        variant="button-medium"
        color={disabled ? 'text-gray-150' : 'text-gray-0'}>
        {label}
      </Typography>
    </Pressable>
  );
};
