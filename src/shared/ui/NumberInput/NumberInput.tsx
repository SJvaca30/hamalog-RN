import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { MinusBtnIcon, PlusBtnIcon } from '@shared/ui/icons';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Pressable } from 'react-native';

export interface NumberInputHelperText {
  /** 월 텍스트 (예: "6월") */
  month: string;
  /** 일 텍스트 (예: "9일") */
  day: string;
  /** 접미사 텍스트 (예: "복약 종료") */
  suffix: string;
}

/**
 * 날짜 기반 도움말 텍스트 생성 헬퍼 함수
 */
export const createEndDateHelperText = (
  endDate: Date,
  suffix: string = '복약 종료'
): NumberInputHelperText => {
  return {
    month: format(endDate, 'M월', { locale: ko }),
    day: format(endDate, 'd일', { locale: ko }),
    suffix,
  };
};

export interface NumberInputProps {
  /** 현재 값 */
  value: number;
  /** 값 변경 콜백 */
  onChange: (value: number) => void;
  /** 최소값 (기본값: 0) */
  min?: number;
  /** 최대값 (기본값: 999) */
  max?: number;
  /** 라벨 */
  label?: string;
  /** 필수 필드 여부 */
  required?: boolean;
  /** 라벨 하단 설명 텍스트 */
  description?: string;
  /** 하단 도움말 텍스트 (문자열 또는 구조화된 데이터) */
  helperText?: string | NumberInputHelperText;
  /** + 버튼 클릭 시 추가 동작 (처방일수에서 캘린더 모달 열기 등) */
  onPlusPress?: () => void;
}

/**
 * 숫자 입력을 위한 +/- 버튼이 있는 컴포넌트
 * - Figma 디자인에 맞춘 가로 레이아웃
 * - 왼쪽: 라벨 + 설명, 오른쪽: 컨트롤
 * - MinusBtnIcon, PlusBtnIcon 사용
 *
 * @example
 * // 단순한 도움말 텍스트
 * <NumberInput helperText="완료" />
 *
 * // 날짜 기반 도움말 (헬퍼 함수 사용)
 * <NumberInput helperText={createEndDateHelperText(endDate)} />
 *
 * // 커스텀 구조화된 도움말
 * <NumberInput helperText={{ month: "6월", day: "9일", suffix: "종료" }} />
 */
export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 999,
  label,
  required,
  description,
  helperText,
  onPlusPress,
}: NumberInputProps) {
  const handleMinus = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handlePlus = () => {
    if (onPlusPress) {
      onPlusPress();
    } else if (value < max) {
      onChange(value + 1);
    }
  };

  const canMinus = value > min;
  const canPlus = value < max || !!onPlusPress;

  return (
    <Box direction="row" align="start" gap="sm" className="py-2">
      {/* 왼쪽: 라벨 영역 */}
      <Box direction="col" gap="xs" py="xs" className="flex-1">
        {/* 라벨 */}
        {label && (
          <Box direction="row" gap="xs" align="center">
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

        {/* 설명 텍스트 */}
        {description && (
          <Typography variant="caption-secondary" color="text-gray-500">
            {description}
          </Typography>
        )}
      </Box>

      {/* 오른쪽: picker 컨트롤 */}
      <Box direction="col" align="center" className="flex-1">
        {/* 버튼들과 숫자 */}
        <Box
          direction="row"
          align="center"
          justify="between"
          className="w-full py-[6px]">
          {/* Minus 버튼 */}
          <Pressable onPress={handleMinus} disabled={!canMinus}>
            <MinusBtnIcon width={44} height={32} />
          </Pressable>

          {/* 숫자 표시 */}
          <Typography
            variant="button-large"
            color="text-gray-850"
            align="center">
            {value}
          </Typography>

          {/* Plus 버튼 */}
          <Pressable onPress={handlePlus} disabled={!canPlus}>
            <PlusBtnIcon width={44} height={32} />
          </Pressable>
        </Box>

        {/* 도움말 텍스트 */}
        <Box direction="row" align="center" gap="xs" className="min-h-[14]">
          {helperText &&
            (typeof helperText === 'string' ? (
              <Typography variant="caption-secondary" color="text-primary-400">
                {helperText}
              </Typography>
            ) : (
              <>
                <Box direction="row" align="center" className="gap-[2px]">
                  <Typography
                    variant="caption-primary"
                    color="text-primary-400">
                    {helperText.month}
                  </Typography>
                  <Typography
                    variant="caption-primary"
                    color="text-primary-400">
                    {helperText.day}
                  </Typography>
                </Box>
                <Typography
                  variant="caption-secondary"
                  color="text-primary-400">
                  {helperText.suffix}
                </Typography>
              </>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
