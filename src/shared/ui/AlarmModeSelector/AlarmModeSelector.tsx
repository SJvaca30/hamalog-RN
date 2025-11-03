import { Box } from '@shared/ui/Box';
import { AlarmIcon } from '@shared/ui/icons';
import { Typography } from '@shared/ui/Typography';
import { Pressable } from 'react-native';

export type AlarmMode = 'sound' | 'vibration';

export interface AlarmModeSelectorProps {
  /** 현재 선택된 알람 모드 */
  value: AlarmMode;
  /** 알람 모드 변경 콜백 */
  onChange: (mode: AlarmMode) => void;
  /** 라벨 */
  label?: string;
}

/**
 * 잠금화면 알람 설정을 위한 모드 선택 컴포넌트
 * - 소리 모드 / 진동 모드 선택
 * - 라디오 버튼 형태
 */
export function AlarmModeSelector({
  value,
  onChange,
  label = '잠금화면 알람 설정',
}: AlarmModeSelectorProps) {
  const modes: { value: AlarmMode; label: string }[] = [
    { value: 'sound', label: '소리 모드' },
    { value: 'vibration', label: '진동 모드' },
  ];

  return (
    <Box direction="col" gap="md">
      {/* 라벨 */}
      <Box direction="row" align="center" gap="sm">
        <AlarmIcon size={16} color="#454B52" />
        <Typography variant="label" color="text-gray-700">
          {label}
        </Typography>
      </Box>

      {/* 모드 선택 버튼들 */}
      <Box direction="row" gap="sm">
        {modes.map(mode => {
          const isSelected = value === mode.value;
          return (
            <Pressable
              key={mode.value}
              onPress={() => onChange(mode.value)}
              className={`flex-1 flex-row items-center justify-center rounded-xl border px-4 py-3 ${
                isSelected
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-200 bg-white'
              }`}>
              {/* 라디오 버튼 */}
              <Box
                className={`mr-2 h-4 w-4 items-center justify-center rounded-full border-2 ${
                  isSelected ? 'border-primary-400' : 'border-gray-300'
                }`}>
                {isSelected && (
                  <Box className="h-2 w-2 rounded-full bg-primary-400" />
                )}
              </Box>

              {/* 모드 라벨 */}
              <Typography
                variant="body-2"
                color={isSelected ? 'text-primary-400' : 'text-gray-700'}>
                {mode.label}
              </Typography>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
}
