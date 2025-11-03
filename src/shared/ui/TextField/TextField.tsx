import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = {
  /** 필드 라벨 */
  label?: string;
  /** 라벨 옆 필수 표시 여부 */
  required?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** placeholder에 적용할 추가 클래스 */
  placeholderClassName?: string;
  /** 입력 값 */
  value: string;
  /** 입력 변경 핸들러 */
  onChangeText: (text: string) => void;
  /** 에러 메시지 */
  error?: string;
  /** 여러 줄 입력 여부 */
  multiline?: boolean;
  /** TextInput에 전달할 추가 prop */
  inputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'multiline' | 'placeholder'
  >;
  /** TextInput에 적용할 추가 클래스 */
  inputClassName?: string;
  /** TextInput ref (포커스 위치 계산 등 외부 제어용) */
  inputRef?: React.Ref<TextInput>;
  /** 포커스를 받았을 때 호출되는 함수 */
  onFocus?: () => void;
  /** 포커스를 잃었을 때 호출되는 함수 */
  onBlur?: () => void;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
};

/**
 * 공용 텍스트 입력 필드
 * - 라벨 + 하단 보더 형태의 입력 UI
 * - 키보드 처리 로직을 제거하여 순수한 입력 컴포넌트로 만듭니다.
 */
export function TextField({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  error,
  multiline,
  inputProps,
  inputClassName,
  placeholderClassName,
  inputRef,
  onFocus,
  onBlur,
  rightIcon,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const internalInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (isFocused) {
          internalInputRef.current?.blur();
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <View>
      <Box direction="col" gap="sm">
        {label && (
          <Box direction="row" gap="xs">
            <Typography variant="label" color="text-gray-700">
              {label}
            </Typography>
            {required && (
              <Typography variant="label" color="text-primary-400">
                *
              </Typography>
            )}
          </Box>
        )}

        <Box
          className={clsx('border-b', {
            'border-red-400': error,
            'border-gray-150': !error,
            'py-2': multiline && Platform.OS === 'ios',
          })}>
          <Box direction="row" align="center" gap="sm">
            <TextInput
              ref={node => {
                internalInputRef.current = node;
                if (typeof inputRef === 'function') {
                  inputRef(node);
                } else if (inputRef) {
                  // @ts-ignore
                  inputRef.current = node;
                }
              }}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={colors.gray[150]}
              multiline={multiline}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={clsx(
                'flex-1 px-0 text-body-1 text-gray-850',
                {
                  'h-[40px]': !multiline && Platform.OS === 'ios',
                },
                value ? inputClassName : placeholderClassName
              )}
              textAlignVertical={multiline ? 'top' : 'auto'}
              {...inputProps}
            />
            {rightIcon && <Box>{rightIcon}</Box>}
          </Box>
        </Box>

        {error && (
          <Typography variant="caption-secondary" color="text-point-red-400">
            {error}
          </Typography>
        )}
      </Box>
    </View>
  );
}
