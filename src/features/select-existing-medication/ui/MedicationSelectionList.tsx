import type { MedicationSchedule } from '@entities/medication-schedule';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { useMedicationSelection } from '../model/use-medication-selection';
import { MedicationSelectionCard } from './MedicationSelectionCard';

interface Props {
  medications: MedicationSchedule[];
  isLoading?: boolean;
  selectedMedicationId?: number | null;
  onSelectMedication?: (medication: MedicationSchedule) => void;
}

export const MedicationSelectionList = ({
  medications,
  isLoading,
  selectedMedicationId,
  onSelectMedication,
}: Props) => {
  const {
    selectMedication: internalSelectMedication,
    isSelected: internalIsSelected,
  } = useMedicationSelection();

  // 외부에서 제어하는 경우 외부 값을 사용, 아니면 내부 상태 사용
  const selectMedication = onSelectMedication || internalSelectMedication;
  const isSelectedFn = useCallback(
    (medicationId: number) => {
      if (selectedMedicationId !== undefined) {
        return selectedMedicationId === medicationId;
      }
      return internalIsSelected(medicationId);
    },
    [selectedMedicationId, internalIsSelected]
  );

  const renderItem: ListRenderItem<MedicationSchedule> = useCallback(
    ({ item }) => (
      <MedicationSelectionCard
        medication={item}
        isSelected={isSelectedFn(item.medicationScheduleId)}
        onSelect={selectMedication}
      />
    ),
    [isSelectedFn, selectMedication]
  );

  const renderSeparator = useCallback(() => <View className="h-4" />, []);

  const keyExtractor = useCallback(
    (item: MedicationSchedule) => item.medicationScheduleId.toString(),
    []
  );

  if (isLoading) {
    return (
      <Box className="flex-1" justify="center" align="center">
        <Typography variant="body-1" color="text-gray-500">
          약물 목록을 불러오는 중...
        </Typography>
      </Box>
    );
  }

  if (medications.length === 0) {
    return (
      <Box className="flex-1" justify="center" align="center">
        <Typography variant="body-1" color="text-gray-500" align="center">
          {'등록된 약물이 없습니다.\n새로 추가해보세요!'}
        </Typography>
      </Box>
    );
  }

  return (
    <FlatList
      data={medications}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
    />
  );
};
