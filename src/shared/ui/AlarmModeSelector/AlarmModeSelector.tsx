import { Box } from '@shared/ui/Box';
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
    <Box direction="col" gap="sm">
      {/* 라벨 */}
      <Box direction="row" align="center" gap="sm">
        <Typography variant="label" color="text-gray-700">
          {label}
        </Typography>
      </Box>

      {/* 토글 스위치 */}
      <Box className="rounded-full bg-gray-100 p-1" direction="row">
        {modes.map(mode => {
          const isSelected = value === mode.value;
          return (
            <Pressable
              key={mode.value}
              onPress={() => onChange(mode.value)}
              className={`flex-1 items-center justify-center rounded-full px-4 py-2 ${
                isSelected ? 'bg-white shadow-sm' : 'bg-transparent'
              }`}>
              <Typography
                variant="body-2"
                color={isSelected ? 'text-gray-850' : 'text-gray-500'}>
                {mode.label}
              </Typography>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
}
