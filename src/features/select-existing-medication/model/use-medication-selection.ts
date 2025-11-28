import type { MedicationSchedule } from '@entities/medication-schedule';
import { useCallback, useState } from 'react';

/**
 * 약물 선택 상태 관리 훅
 * 단일 선택만 가능
 */
export const useMedicationSelection = () => {
  const [selectedMedicationId, setSelectedMedicationId] = useState<
    number | null
  >(null);
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationSchedule | null>(null);

  const selectMedication = useCallback((medication: MedicationSchedule) => {
    setSelectedMedicationId(medication.medicationScheduleId);
    setSelectedMedication(medication);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMedicationId(null);
    setSelectedMedication(null);
  }, []);

  const isSelected = useCallback(
    (medicationId: number) => {
      return selectedMedicationId === medicationId;
    },
    [selectedMedicationId]
  );

  return {
    selectedMedicationId,
    selectedMedication,
    selectMedication,
    clearSelection,
    isSelected,
    hasSelection: selectedMedicationId !== null,
  };
};
