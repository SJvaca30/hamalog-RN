import { useEffect, useRef, useState } from 'react';

import type { PickedImage } from '@shared/types';

import {
  hasDirtyMedicationRegisterForm,
  serializeMedicationDraftToRouteParams,
} from '../lib/route-params';
import type { UseMedicationRegisterFormOptions } from './types';

export function useMedicationRegisterForm({
  navigation,
  onExitConfirmed,
}: UseMedicationRegisterFormOptions) {
  const [nickname, setNickname] = useState('');
  const [hospital, setHospital] = useState('');
  const [prescribedAt, setPrescribedAt] = useState<Date | null>(null);
  const [memo, setMemo] = useState('');
  const [selectedImage, setSelectedImage] = useState<PickedImage | null>(null);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const isNavigatingBackRef = useRef(false);

  const draft = {
    nickname,
    hospital,
    prescribedAt,
    memo,
    selectedImage,
  };

  const canProceed =
    nickname.trim().length > 0 &&
    hospital.trim().length > 0 &&
    selectedImage !== null;
  const hasUserInput = hasDirtyMedicationRegisterForm(draft);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', event => {
      if (isNavigatingBackRef.current || !hasUserInput) {
        return;
      }

      event.preventDefault();
      setShowExitConfirmModal(true);
    });

    return unsubscribe;
  }, [hasUserInput, navigation]);

  return {
    nickname,
    hospital,
    prescribedAt,
    memo,
    selectedImage,
    isTextFieldFocused,
    isCalendarVisible,
    showExitConfirmModal,
    canProceed,
    setNickname,
    setHospital,
    setMemo,
    setSelectedImage,
    openCalendar: () => setIsCalendarVisible(true),
    closeCalendar: () => setIsCalendarVisible(false),
    confirmDate: (date: Date) => {
      setPrescribedAt(date);
      setIsCalendarVisible(false);
    },
    handleTextFieldFocus: () => setIsTextFieldFocused(true),
    handleTextFieldBlur: () => setIsTextFieldFocused(false),
    cancelExitConfirm: () => setShowExitConfirmModal(false),
    confirmExit: () => {
      setShowExitConfirmModal(false);
      isNavigatingBackRef.current = true;
      onExitConfirmed();
    },
    buildRouteParams: () => serializeMedicationDraftToRouteParams(draft),
  };
}
