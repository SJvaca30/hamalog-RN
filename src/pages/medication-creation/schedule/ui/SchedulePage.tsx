import { getCsrfToken } from '@entities/auth/api';
import {
  createMedicationSchedule,
  MedicationTimeCard,
} from '@entities/medication-schedule';
import { useSession, useSessionStore } from '@entities/session';
import type { PickedImage } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AlarmMode, AlarmModeSelector } from '@shared/ui/AlarmModeSelector';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { CalendarModal } from '@shared/ui/Calendar';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { createEndDateHelperText, NumberInput } from '@shared/ui/NumberInput';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { TimePickerModal } from '@shared/ui/TimePicker';
import { Typography } from '@shared/ui/Typography';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { addDays, differenceInDays, format, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, Platform, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface MedicationTime {
  id: string;
  time: Date;
}

/** RegisterPage에서 전달받는 route params */
type RegisterParams = {
  nickname?: string;
  hospital?: string;
  prescribedAt?: string; // "YYYY-MM-DD" or ""
  memo?: string;
  selectedImage?: string; // JSON.stringify(PickedImage)
};

/** AlarmMode를 API alarmType으로 변환 */
const alarmModeToType = (
  mode: AlarmMode
): 'SOUND' | 'VIBRATION' | 'SOUND_AND_VIBRATION' | 'NONE' => {
  switch (mode) {
    case 'sound':
      return 'SOUND';
    case 'vibration':
      return 'VIBRATION';
    default:
      return 'SOUND';
  }
};

export function SchedulePage() {
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef<any>(null);
  const isNavigatingBackRef = useRef(false);

  // RegisterPage에서 전달받은 params
  const params = useLocalSearchParams() as RegisterParams;

  // JSON 파싱 안전 처리 (잘못된 JSON이나 직접 네비게이션 대응)
  const selectedImage: PickedImage | null = (() => {
    if (!params.selectedImage) return null;
    try {
      return JSON.parse(params.selectedImage) as PickedImage;
    } catch (error) {
      console.error('[SchedulePage] selectedImage 파싱 실패:', error);
      return null;
    }
  })();

  // 세션에서 memberId 가져오기
  const { memberId } = useSession();

  // 폼 상태
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [prescriptionDays, setPrescriptionDays] = useState(0);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [medicationTimes, setMedicationTimes] = useState<MedicationTime[]>([]);
  const [alarmMode, setAlarmMode] = useState<AlarmMode>('sound');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 모달 상태
  const [isStartDateCalendarVisible, setIsStartDateCalendarVisible] =
    useState(false);
  const [
    isPrescriptionEndCalendarVisible,
    setIsPrescriptionEndCalendarVisible,
  ] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [editingTimeId, setEditingTimeId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);

  // 유효성 검사
  const canProceed = prescriptionDays >= 1 && medicationTimes.length >= 1;

  // 사용자 입력이 있는지 확인
  const _hasUserInput =
    startDate.toDateString() !== new Date().toDateString() ||
    prescriptionDays > 0 ||
    medicationTimes.length > 0 ||
    alarmMode !== 'sound';

  // 뒤로가기 이벤트 처리
  // NOTE: 리스너 내부에서 최신 상태를 직접 참조하므로 의존성 배열에 상태를 추가하지 않음
  // 상태를 의존성에 추가하면 리스너가 계속 재등록되어 성능 문제 발생
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (isNavigatingBackRef.current) {
        return;
      }

      // 사용자 입력 여부를 리스너 내부에서 최신 상태로 체크
      const currentHasUserInput =
        startDate.toDateString() !== new Date().toDateString() ||
        prescriptionDays > 0 ||
        medicationTimes.length > 0 ||
        alarmMode !== 'sound';

      if (!currentHasUserInput) {
        return;
      }

      e.preventDefault();
      setShowConfirmModal(true);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  // 처방일수 직접 변경 시에만 종료일 업데이트 (캘린더 선택 시 제외)
  const updateEndDateFromDays = useCallback(
    (days: number) => {
      if (days > 0) {
        // 시간 무시하고 날짜만 계산하여 일관성 확보
        const startDateOnly = startOfDay(startDate);
        const calculatedEndDate = addDays(startDateOnly, days - 1);
        setEndDate(calculatedEndDate);
      } else {
        setEndDate(null);
      }
    },
    [startDate]
  );

  // 시작일 변경 시 종료일 재계산
  useEffect(() => {
    if (prescriptionDays > 0) {
      updateEndDateFromDays(prescriptionDays);
    }
  }, [prescriptionDays, updateEndDateFromDays]);

  // 복약 시작일 선택
  const handleStartDateSelect = (date: Date) => {
    setStartDate(date);
    setIsStartDateCalendarVisible(false);
  };

  // 처방 종료일 선택으로 처방일수 계산
  const handlePrescriptionEndDateSelect = (date: Date) => {
    // 시간 무시하고 날짜만 비교 (9월 15일 → 9월 16일 = 2일)
    const startDateOnly = startOfDay(startDate);
    const endDateOnly = startOfDay(date);
    const days = differenceInDays(endDateOnly, startDateOnly) + 1;

    if (days > 0) {
      setPrescriptionDays(days);
      // 계산된 날짜로 통일하여 일관성 확보
      updateEndDateFromDays(days);
    }
    setIsPrescriptionEndCalendarVisible(false);
  };

  // 복약 시간 추가
  const handleAddMedicationTime = () => {
    setEditingTimeId(null);
    setIsTimePickerVisible(true);
  };

  // 복약 시간 편집
  const handleEditMedicationTime = (id: string) => {
    setEditingTimeId(id);
    setIsTimePickerVisible(true);
  };

  // 복약 시간 확인
  const handleTimeConfirm = (time: Date) => {
    if (editingTimeId) {
      // 기존 시간 수정
      setMedicationTimes(prev =>
        prev.map(item => (item.id === editingTimeId ? { ...item, time } : item))
      );
    } else {
      // 새 시간 추가
      const newTime: MedicationTime = {
        id: Date.now().toString(),
        time,
      };
      setMedicationTimes(prev => [...prev, newTime]);
    }
    setIsTimePickerVisible(false);
    setEditingTimeId(null);
  };

  // 복약 시간 삭제
  const handleDeleteMedicationTime = (id: string) => {
    setMedicationTimes(prev => prev.filter(item => item.id !== id));
  };

  // 마지막 복약 시간 제거 (- 버튼)
  const _handleRemoveLastMedicationTime = () => {
    if (medicationTimes.length > 0) {
      setMedicationTimes(prev => prev.slice(0, -1));
    }
  };

  // 1일 복약 횟수 변경
  const handleDailyCountChange = (count: number) => {
    const currentCount = medicationTimes.length;

    if (count > currentCount) {
      // 시간 추가가 필요한 경우
      handleAddMedicationTime();
    } else if (count < currentCount) {
      // 시간 제거가 필요한 경우
      setMedicationTimes(prev => prev.slice(0, count));
    }
  };

  // 확인 버튼 - FormData 구성 + API 호출
  const handleConfirm = async () => {
    if (!canProceed || isSubmitting) return;

    if (!memberId) {
      Alert.alert('오류', '로그인 정보를 확인할 수 없습니다.');
      return;
    }

    setIsSubmitting(true);

    // CSRF 토큰 보장 로직
    // NOTE: useSessionStore.getState()로 직접 상태 확인하여 타이밍 이슈 방지
    const currentCsrfToken = useSessionStore.getState().csrfToken;
    if (!currentCsrfToken) {
      try {
        console.log('CSRF 토큰이 없어 재발급 시도...');
        const csrfResponse = await getCsrfToken();
        console.log('CSRF API 응답:', JSON.stringify(csrfResponse, null, 2));

        // 응답에서 csrfToken 추출 (snake_case 대응)
        const newToken =
          csrfResponse.csrfToken ||
          (csrfResponse as any).csrf_token ||
          (csrfResponse as any).token;

        if (newToken) {
          // 스토어에 직접 저장 (동기적으로 즉시 반영됨)
          useSessionStore.getState().setCsrfToken(newToken);
          console.log('CSRF 토큰 재발급 성공:', newToken);

          // 저장 확인
          const storedToken = useSessionStore.getState().csrfToken;
          console.log('스토어에 저장된 CSRF 토큰:', storedToken);
        } else {
          console.warn('CSRF 응답에 토큰이 없음:', Object.keys(csrfResponse));
        }
      } catch (e) {
        console.error('CSRF 토큰 재발급 실패:', e);
        // 실패해도 일단 진행 (서버 설정에 따라 다를 수 있음)
      }
    }

    try {
      // API 요청 데이터 구성
      const requestData = {
        memberId,
        name: params.nickname,
        hospitalName: params.hospital || '',
        prescriptionDate:
          params.prescribedAt || format(new Date(), 'yyyy-MM-dd'),
        memo: params.memo || '',
        startOfAd: format(startDate, 'yyyy-MM-dd'),
        prescriptionDays,
        perDay: medicationTimes.length,
        alarmType: alarmModeToType(alarmMode),
      };

      // FormData 구성 (multipart/form-data)
      const formData = new FormData();

      // Part 1: data (application/json)
      formData.append('data', JSON.stringify(requestData));

      // Part 2: image (선택사항)
      if (selectedImage) {
        const imageFile = {
          uri: selectedImage.uri,
          name: selectedImage.fileName || 'medication.jpg',
          type: selectedImage.mimeType || 'image/jpeg',
        } as unknown as Blob;

        formData.append('image', imageFile);
      }

      console.log('복약 스케줄 등록 요청:', requestData);

      // API 호출
      const response = await createMedicationSchedule(formData);

      console.log('복약 스케줄 등록 성공:', response);
      Alert.alert('등록 완료', '복약 스케줄이 등록되었습니다.', [
        {
          text: '확인',
          onPress: () => router.push('/(app)/(home)'),
        },
      ]);
    } catch (error) {
      console.error('복약 스케줄 등록 실패:', error);
      Alert.alert(
        '등록 실패',
        '복약 스케줄 등록에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달 핸들러들
  const handleModalCancel = () => {
    setShowConfirmModal(false);
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    isNavigatingBackRef.current = true;
    router.back();
  };

  const handleTextFieldFocus = () => {
    setIsTextFieldFocused(true);
  };

  const handleTextFieldBlur = () => {
    setIsTextFieldFocused(false);
  };

  return (
    <>
      <PageContainer
        scrollable
        scrollEnabled={!isTextFieldFocused}
        keyboardVerticalOffset={headerHeight}
        scrollRef={scrollRef}
        onScrollBeginDrag={Keyboard.dismiss}>
        {({ bottomInset }) => {
          return (
            <Box className="flex-1 gap-10">
              <Box direction="col" className="flex-1 gap-8 px-4 pt-4">
                <MedicationCreationStepper variant="schedule" />

                {/* 복약 시작일 */}
                <Pressable onPress={() => setIsStartDateCalendarVisible(true)}>
                  <TextField
                    label="복약 시작일"
                    required
                    placeholder="복약을 시작할 날짜를 선택해주세요"
                    value={format(startDate, 'yyyy년 M월 d일', { locale: ko })}
                    onChangeText={() => {}}
                    inputProps={{ editable: false }}
                    onFocus={handleTextFieldFocus}
                    onBlur={handleTextFieldBlur}
                  />
                </Pressable>

                {/* 처방일수 */}
                <NumberInput
                  label="처방일수"
                  required
                  description="며칠 치 약을 처방받았나요?"
                  value={prescriptionDays}
                  onChange={days => {
                    setPrescriptionDays(days);
                    updateEndDateFromDays(days);
                  }}
                  min={1}
                  helperText={
                    endDate ? createEndDateHelperText(endDate) : undefined
                  }
                  onPlusPress={() => setIsPrescriptionEndCalendarVisible(true)}
                />

                {/* 1일 복약 횟수 */}
                <NumberInput
                  label="1일 복약 횟수"
                  required
                  description="하루에 몇 번 복용하시나요?"
                  value={medicationTimes.length}
                  onChange={handleDailyCountChange}
                  min={1}
                  onPlusPress={handleAddMedicationTime}
                />

                {/* 복약 시간 */}
                <Box direction="col" gap="md">
                  <Typography variant="label" color="text-gray-700">
                    복약 시간
                  </Typography>

                  <Box direction="col" gap="sm">
                    {medicationTimes.map(item => (
                      <MedicationTimeCard
                        key={item.id}
                        time={item.time}
                        onPress={() => handleEditMedicationTime(item.id)}
                        onDelete={() => handleDeleteMedicationTime(item.id)}
                      />
                    ))}
                  </Box>
                </Box>

                {/* 잠금화면 알람 설정 */}
                <AlarmModeSelector value={alarmMode} onChange={setAlarmMode} />
              </Box>

              <Shadow
                distance={Platform.OS === 'ios' ? 34 : 30}
                startColor="rgba(0, 0, 0, 0.15)"
                offset={Platform.OS === 'ios' ? [0, 22] : [0, 15]}
                style={{ width: '100%' }}>
                <Box
                  bg="bg-gray-0"
                  className="px-6 pt-3"
                  style={{
                    paddingBottom:
                      Platform.OS === 'android' ? bottomInset + 48 : 48,
                  }}>
                  <BottomCTA
                    text={isSubmitting ? '등록 중...' : '확인'}
                    disabled={!canProceed || isSubmitting}
                    onPress={handleConfirm}
                  />
                </Box>
              </Shadow>
            </Box>
          );
        }}
      </PageContainer>

      {/* 복약 시작일 캘린더 */}
      <CalendarModal
        visible={isStartDateCalendarVisible}
        onClose={() => setIsStartDateCalendarVisible(false)}
        onConfirm={handleStartDateSelect}
        initialDate={startDate}
      />

      {/* 처방 종료일 캘린더 */}
      <CalendarModal
        visible={isPrescriptionEndCalendarVisible}
        onClose={() => setIsPrescriptionEndCalendarVisible(false)}
        onConfirm={handlePrescriptionEndDateSelect}
        initialDate={endDate ?? addDays(startDate, 1)}
      />

      {/* 시간 선택 모달 */}
      <TimePickerModal
        visible={isTimePickerVisible}
        onClose={() => {
          setIsTimePickerVisible(false);
          setEditingTimeId(null);
        }}
        onConfirm={handleTimeConfirm}
        initialTime={
          editingTimeId
            ? medicationTimes.find(t => t.id === editingTimeId)?.time
            : new Date()
        }
      />

      {/* 확인 모달 */}
      <ConfirmModal
        visible={showConfirmModal}
        variant="confirm"
        title={`지금까지 작성한 내용이 저장되지 않아요.\n이전 페이지로 이동할까요?`}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
