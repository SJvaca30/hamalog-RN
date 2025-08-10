import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { TextInput, TextInputProps } from 'react-native';

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
};

/**
 * 공용 텍스트 입력 필드
 * - 라벨 + 하단 보더 형태의 입력 UI
 * - NativeWind 클래스로만 스타일 제어
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
}: Props) {
  return (
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
  );
}
