import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import type {
  MedicationTimeEntry,
  UseMedicationScheduleFormOptions,
} from './types';

const hasDirtyMedicationScheduleForm = (
  startDate: Date,
  prescriptionDays: number,
  medicationTimes: MedicationTimeEntry[],
  alarmMode: 'sound' | 'vibration'
) => {
  return (
    startDate.toDateString() !== new Date().toDateString() ||
    prescriptionDays > 0 ||
    medicationTimes.length > 0 ||
    alarmMode !== 'sound'
  );
};

export function useMedicationScheduleForm({
  navigation,
  onExitConfirmed,
}: UseMedicationScheduleFormOptions) {
  const [startDate, setStartDate] = useState(new Date());
  const [prescriptionDays, setPrescriptionDays] = useState(0);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [medicationTimes, setMedicationTimes] = useState<MedicationTimeEntry[]>(
    []
  );
  const [alarmMode, setAlarmMode] = useState<'sound' | 'vibration'>('sound');
  const [isStartDateCalendarVisible, setIsStartDateCalendarVisible] =
    useState(false);
  const [
    isPrescriptionEndCalendarVisible,
    setIsPrescriptionEndCalendarVisible,
  ] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [editingTimeId, setEditingTimeId] = useState<string | null>(null);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const isNavigatingBackRef = useRef(false);

  const canSubmit = prescriptionDays >= 1 && medicationTimes.length >= 1;

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', event => {
      if (
        isNavigatingBackRef.current ||
        !hasDirtyMedicationScheduleForm(
          startDate,
          prescriptionDays,
          medicationTimes,
          alarmMode
        )
      ) {
        return;
      }

      event.preventDefault();
      setShowExitConfirmModal(true);
    });

    return unsubscribe;
  }, [alarmMode, medicationTimes, navigation, prescriptionDays, startDate]);

  useEffect(() => {
    if (prescriptionDays > 0) {
      const calculatedEndDate = addDays(
        startOfDay(startDate),
        prescriptionDays - 1
      );
      setEndDate(calculatedEndDate);
      return;
    }

    setEndDate(null);
  }, [prescriptionDays, startDate]);

  return {
    startDate,
    prescriptionDays,
    endDate,
    medicationTimes,
    alarmMode,
    isStartDateCalendarVisible,
    isPrescriptionEndCalendarVisible,
    isTimePickerVisible,
    editingTimeId,
    showExitConfirmModal,
    canSubmit,
    setAlarmMode,
    setPrescriptionDays: (days: number) => setPrescriptionDays(days),
    openStartDateCalendar: () => setIsStartDateCalendarVisible(true),
    closeStartDateCalendar: () => setIsStartDateCalendarVisible(false),
    confirmStartDate: (date: Date) => {
      setStartDate(date);
      setIsStartDateCalendarVisible(false);
    },
    openPrescriptionEndCalendar: () =>
      setIsPrescriptionEndCalendarVisible(true),
    closePrescriptionEndCalendar: () =>
      setIsPrescriptionEndCalendarVisible(false),
    confirmPrescriptionEndDate: (date: Date) => {
      const days =
        differenceInDays(startOfDay(date), startOfDay(startDate)) + 1;

      if (days > 0) {
        setPrescriptionDays(days);
      }

      setIsPrescriptionEndCalendarVisible(false);
    },
    openMedicationTimePicker: () => {
      setEditingTimeId(null);
      setIsTimePickerVisible(true);
    },
    editMedicationTime: (id: string) => {
      setEditingTimeId(id);
      setIsTimePickerVisible(true);
    },
    closeMedicationTimePicker: () => {
      setIsTimePickerVisible(false);
      setEditingTimeId(null);
    },
    confirmMedicationTime: (time: Date) => {
      if (editingTimeId) {
        setMedicationTimes(prev =>
          prev.map(item =>
            item.id === editingTimeId ? { ...item, time } : item
          )
        );
      } else {
        setMedicationTimes(prev => [
          ...prev,
          { id: Date.now().toString(), time },
        ]);
      }

      setIsTimePickerVisible(false);
      setEditingTimeId(null);
    },
    deleteMedicationTime: (id: string) => {
      setMedicationTimes(prev => prev.filter(item => item.id !== id));
    },
    changeDailyCount: (count: number) => {
      const currentCount = medicationTimes.length;

      if (count > currentCount) {
        setEditingTimeId(null);
        setIsTimePickerVisible(true);
        return;
      }

      if (count < currentCount) {
        setMedicationTimes(prev => prev.slice(0, count));
      }
    },
    cancelExitConfirm: () => setShowExitConfirmModal(false),
    confirmExit: () => {
      setShowExitConfirmModal(false);
      isNavigatingBackRef.current = true;
      onExitConfirmed();
    },
    createRequestInput: () => ({
      startDate,
      prescriptionDays,
      medicationTimes,
      alarmMode,
    }),
  };
}
