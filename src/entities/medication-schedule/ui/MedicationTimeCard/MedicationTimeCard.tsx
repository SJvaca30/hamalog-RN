import { Box } from '@shared/ui/Box';
import { AlarmIcon, TrashCanIcon } from '@shared/ui/icons';
import { Typography } from '@shared/ui/Typography';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Pressable, View } from 'react-native';

export interface MedicationTimeCardProps {
  /** 복약 시간 */
  time: Date;
  /** 카드 클릭 시 호출되는 함수 (시간 수정) */
  onPress?: () => void;
  /** 삭제 버튼 클릭 시 호출되는 함수 */
  onDelete?: () => void;
  /** 약물 이미지 URI (선택사항) */
  medicationImageUri?: string;
}

/**
 * 복약 시간을 표시하는 카드 컴포넌트
 * - 클릭으로 시간 수정 가능
 * - 휴지통 아이콘으로 삭제 가능
 * - 알람 아이콘과 함께 시간 표시
 */
export function MedicationTimeCard({
  time,
  onPress,
  onDelete,
  medicationImageUri,
}: MedicationTimeCardProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between rounded-2xl bg-blue-50 p-4"
      onPress={onPress}>
      <Box direction="row" align="center" gap="md">
        {/* 약물 이미지 (있는 경우에만) */}
        {medicationImageUri && (
          <View className="h-12 w-12 rounded-lg bg-gray-200">
            {/* TODO: 실제 이미지 컴포넌트로 교체 */}
            <View className="h-full w-full rounded-lg bg-gray-300" />
          </View>
        )}

        {/* 알람 아이콘 */}
        <AlarmIcon size={20} color="#6E7987" />

        {/* 시간 표시 */}
        <Typography variant="body-1" color="text-gray-850">
          {format(time, 'a h:mm', { locale: ko })}
        </Typography>
      </Box>

      {/* 삭제 버튼 */}
      {onDelete && (
        <Pressable
          onPress={e => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1">
          <TrashCanIcon size={24} color="#8A96A4" />
        </Pressable>
      )}
    </Pressable>
  );
}
