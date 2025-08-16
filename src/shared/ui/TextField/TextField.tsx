import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type Props = {
  /** 필드 라벨 */
  label: string;
  /** 라벨 옆 필수 표시 여부 */
  required?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 입력 값 */
  value: string;
  /** 입력 변경 핸들러 */
  onChangeText: (text: string) => void;
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
  multiline,
  inputProps,
  inputClassName,
  inputRef,
}: Props) {
  return (
    <View>
      <Box direction="col" gap="md">
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

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[150]}
          multiline={multiline}
          className={`border-b border-gray-150 pb-2 font-pretendard-400 text-body-1 ${
            inputClassName ?? ''
          }`}
          textAlignVertical={multiline ? 'top' : 'auto'}
          {...inputProps}
        />
      </Box>
    </View>
  );
}
