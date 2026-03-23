import { useMedicationRegisterForm } from '@features/medication-register-form';
import { MedicationPhotoField } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { CalendarModal } from '@shared/ui/Calendar';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';

export function MedicationRegisterPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef(null);
  const memoInputRef = useRef<TextInput>(null);
  const form = useMedicationRegisterForm({
    navigation,
    onExitConfirmed: () => router.back(),
  });

  return (
    <>
      <PageContainer
        scrollable
        scrollEnabled={!form.isTextFieldFocused}
        keyboardVerticalOffset={headerHeight}
        scrollRef={scrollRef}
        onScrollBeginDrag={Keyboard.dismiss}>
        {({ bottomInset }) => {
          const ctaContainerStyle = {
            paddingBottom: Platform.OS === 'android' ? bottomInset + 48 : 48,
          };

          return (
            <Box className="flex-1 gap-10">
              <Box direction="col" className="flex-1 gap-10 px-4 pt-4">
                <MedicationCreationStepper variant="register" />

                <MedicationPhotoField
                  onSelected={image => form.setSelectedImage(image)}
                  onCleared={() => form.setSelectedImage(null)}
                />

                <TextField
                  label="별명"
                  required
                  placeholder="표시 될 별명을 적어주세요"
                  value={form.nickname}
                  onChangeText={form.setNickname}
                  onFocus={form.handleTextFieldFocus}
                  onBlur={form.handleTextFieldBlur}
                />

                <TextField
                  label="병원명"
                  required
                  placeholder="진료 받은 병원을 적어주세요"
                  value={form.hospital}
                  onChangeText={form.setHospital}
                  onFocus={form.handleTextFieldFocus}
                  onBlur={form.handleTextFieldBlur}
                />

                <Pressable onPress={form.openCalendar}>
                  <TextField
                    label="처방일"
                    placeholder="처방 받은 날짜를 적어주세요"
                    value={
                      form.prescribedAt
                        ? format(form.prescribedAt, 'yyyy년 M월 d일', {
                            locale: ko,
                          })
                        : ''
                    }
                    onChangeText={() => {}}
                    inputProps={{
                      editable: false,
                    }}
                    onFocus={form.handleTextFieldFocus}
                    onBlur={form.handleTextFieldBlur}
                  />
                </Pressable>

                <TextField
                  label="메모"
                  placeholder="간단한 메모가 있다면 적어주세요"
                  value={form.memo}
                  onChangeText={form.setMemo}
                  multiline
                  inputRef={memoInputRef}
                  onFocus={form.handleTextFieldFocus}
                  onBlur={form.handleTextFieldBlur}
                  inputProps={{
                    scrollEnabled: false,
                    blurOnSubmit: false,
                  }}
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
                    text="다음"
                    disabled={!form.canProceed}
                    onPress={() =>
                      router.push({
                        pathname: '/create/medication/schedule',
                        params: form.buildRouteParams(),
                      })
                    }
                  />
                </Box>
              </Shadow>
            </Box>
          );
        }}
      </PageContainer>

      <CalendarModal
        visible={form.isCalendarVisible}
        onClose={form.closeCalendar}
        onConfirm={form.confirmDate}
        initialDate={form.prescribedAt ?? new Date()}
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
