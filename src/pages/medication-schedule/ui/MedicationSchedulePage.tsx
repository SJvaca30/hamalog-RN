import { MedicationTimeCard } from '@entities/medication-schedule';
import { useSession } from '@entities/session';
import {
  buildMedicationScheduleRequest,
  parseMedicationDraftFromRouteParams,
  useMedicationScheduleForm,
} from '@features/medication-schedule-form';
import { useSubmitMedicationSchedule } from '@features/submit-medication-schedule';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { AlarmModeSelector } from '@shared/ui/AlarmModeSelector';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { CalendarModal } from '@shared/ui/Calendar';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { createEndDateHelperText, NumberInput } from '@shared/ui/NumberInput';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { TimePickerModal } from '@shared/ui/TimePicker';
import { Typography } from '@shared/ui/Typography';
import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Alert, Keyboard, Platform, Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';

export function MedicationSchedulePage() {
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef(null);
  const { memberId } = useSession();
  const params = useLocalSearchParams();
  const draft = useMemo(
    () => parseMedicationDraftFromRouteParams(params),
    [params]
  );
  const form = useMedicationScheduleForm({
    navigation,
    onExitConfirmed: () => router.back(),
  });
  const { isSubmitting, submitMedicationSchedule } =
    useSubmitMedicationSchedule();

  const handleSubmit = async () => {
    if (!form.canSubmit || isSubmitting) {
      return;
    }

    if (!memberId) {
      Alert.alert('오류', '로그인 정보를 확인할 수 없습니다.');
      return;
    }

    const requestData = buildMedicationScheduleRequest({
      memberId,
      draft,
      form: form.createRequestInput(),
    });

    const result = await submitMedicationSchedule({
      requestData,
      selectedImage: draft.selectedImage,
    });

    if (!result.ok) {
      Alert.alert(result.title, result.message);
      return;
    }

    Alert.alert('등록 완료', '복약 스케줄이 등록되었습니다.', [
      {
        text: '확인',
        onPress: () => router.push('/(app)/(home)'),
      },
    ]);
  };

  return (
    <>
      <PageContainer
        scrollable
        keyboardVerticalOffset={headerHeight}
        scrollRef={scrollRef}
        onScrollBeginDrag={Keyboard.dismiss}>
        {({ bottomInset }) => {
          const ctaContainerStyle = {
            paddingBottom: Platform.OS === 'android' ? bottomInset + 48 : 48,
          };

          return (
            <Box className="flex-1 gap-10">
              <Box direction="col" className="flex-1 gap-8 px-4 pt-4">
                <MedicationCreationStepper variant="schedule" />

                <Pressable onPress={form.openStartDateCalendar}>
                  <TextField
                    label="복약 시작일"
                    required
                    placeholder="복약을 시작할 날짜를 선택해주세요"
                    value={format(form.startDate, 'yyyy년 M월 d일', {
                      locale: ko,
                    })}
                    onChangeText={() => {}}
                    inputProps={{ editable: false }}
                  />
                </Pressable>

                <NumberInput
                  label="처방일수"
                  required
                  description="며칠 치 약을 처방받았나요?"
                  value={form.prescriptionDays}
                  onChange={form.setPrescriptionDays}
                  min={1}
                  helperText={
                    form.endDate
                      ? createEndDateHelperText(form.endDate)
                      : undefined
                  }
                  onPlusPress={form.openPrescriptionEndCalendar}
                />

                <NumberInput
                  label="1일 복약 횟수"
                  required
                  description="하루에 몇 번 복용하시나요?"
                  value={form.medicationTimes.length}
                  onChange={form.changeDailyCount}
                  min={1}
                  onPlusPress={form.openMedicationTimePicker}
                />

                <Box direction="col" gap="md">
                  <Typography variant="label" color="text-gray-700">
                    복약 시간
                  </Typography>

                  <Box direction="col" gap="sm">
                    {form.medicationTimes.map(item => (
                      <MedicationTimeCard
                        key={item.id}
                        time={item.time}
                        onPress={() => form.editMedicationTime(item.id)}
                        onDelete={() => form.deleteMedicationTime(item.id)}
                      />
                    ))}
                  </Box>
                </Box>

                <AlarmModeSelector
                  value={form.alarmMode}
                  onChange={form.setAlarmMode}
                />
              </Box>

              <Shadow
                distance={Platform.OS === 'ios' ? 34 : 30}
                startColor="rgba(0, 0, 0, 0.15)"
                offset={Platform.OS === 'ios' ? [0, 22] : [0, 15]}
                style={styles.fullWidth}>
                <Box
                  bg="bg-gray-0"
                  className="px-6 pt-3"
                  style={ctaContainerStyle}>
                  <BottomCTA
                    text={isSubmitting ? '등록 중...' : '확인'}
                    disabled={!form.canSubmit || isSubmitting}
                    onPress={handleSubmit}
                  />
                </Box>
              </Shadow>
            </Box>
          );
        }}
      </PageContainer>

      <CalendarModal
        visible={form.isStartDateCalendarVisible}
        onClose={form.closeStartDateCalendar}
        onConfirm={form.confirmStartDate}
        initialDate={form.startDate}
      />

      <CalendarModal
        visible={form.isPrescriptionEndCalendarVisible}
        onClose={form.closePrescriptionEndCalendar}
        onConfirm={form.confirmPrescriptionEndDate}
        initialDate={form.endDate ?? addDays(form.startDate, 1)}
      />

      <TimePickerModal
        visible={form.isTimePickerVisible}
        onClose={form.closeMedicationTimePicker}
        onConfirm={form.confirmMedicationTime}
        initialTime={
          form.editingTimeId
            ? form.medicationTimes.find(item => item.id === form.editingTimeId)
                ?.time
            : new Date()
        }
      />

      <ConfirmModal
        visible={form.showExitConfirmModal}
        variant="confirm"
        title={`지금까지 작성한 내용이 저장되지 않아요.\n이전 페이지로 이동할까요?`}
        onCancel={form.cancelExitConfirm}
        onConfirm={form.confirmExit}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
