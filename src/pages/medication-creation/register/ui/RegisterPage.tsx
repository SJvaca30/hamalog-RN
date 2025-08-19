import { MedicationPhotoField } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { CalendarModal } from '@shared/ui/Calendar';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, Pressable, TextInput } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export function RegisterPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef<any>(null);
  const memoInputRef = useRef<TextInput>(null);
  const isNavigatingBackRef = useRef(false); // 뒤로가기 여부 확인용 ref
  const [nickname, setNickname] = useState('');
  const [hospital, setHospital] = useState('');
  const [prescribedAt, setPrescribedAt] = useState<Date | null>(null);
  const [memo, setMemo] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const canProceed = nickname.trim().length > 0 && !!photoUrl; // 별명+사진 필수
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // 사용자가 입력한 내용이 있는지 확인
  const hasUserInput =
    nickname.trim().length > 0 ||
    hospital.trim().length > 0 ||
    prescribedAt !== null ||
    memo.trim().length > 0 ||
    !!photoUrl;

  // 뒤로가기 이벤트 처리
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // 강제로 뒤로가기 할 때는 검사 스킵
      if (isNavigatingBackRef.current) {
        return;
      }

      if (!hasUserInput) {
        // 입력된 내용이 없으면 바로 뒤로가기
        return;
      }

      // 뒤로가기 방지
      e.preventDefault();

      // 모달 표시
      setShowConfirmModal(true);
    });

    return unsubscribe;
  }, [navigation, hasUserInput]);

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/create/medication/schedule');
  };

  const handleTextFieldFocus = () => {
    setIsTextFieldFocused(true);
  };

  const handleTextFieldBlur = () => {
    setIsTextFieldFocused(false);
  };

  const handleOpenCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
  };

  const handleConfirmDate = (date: Date) => {
    setPrescribedAt(date);
    handleCloseCalendar();
  };

  // 모달 핸들러 함수들
  const handleModalCancel = () => {
    setShowConfirmModal(false);
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    // 강제 뒤로가기 플래그 설정
    isNavigatingBackRef.current = true;
    router.back();
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
              <Box direction="col" className="flex-1 gap-10 px-4 pt-4">
                <MedicationCreationStepper variant="register" />

                {/* 1. 약물 사진 */}
                <MedicationPhotoField
                  onUploaded={setPhotoUrl}
                  onCleared={() => setPhotoUrl(null)}
                />

                {/* 2. 별명 */}
                <TextField
                  label="별명"
                  required
                  placeholder="표시 될 별명을 적어주세요"
                  value={nickname}
                  onChangeText={setNickname}
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
                />

                {/* 3. 병원명 */}
                <TextField
                  label="병원명"
                  placeholder="진료 받은 병원을 적어주세요"
                  value={hospital}
                  onChangeText={setHospital}
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
                />
                {/* 4. 처방일 */}
                <Pressable onPress={handleOpenCalendar}>
                  <TextField
                    label="처방일"
                    placeholder="처방 받은 날짜를 적어주세요"
                    value={
                      prescribedAt
                        ? format(prescribedAt, 'yyyy년 M월 d일', { locale: ko })
                        : ''
                    }
                    onChangeText={() => {}}
                    inputProps={{
                      editable: false,
                    }}
                    onFocus={handleTextFieldFocus}
                    onBlur={handleTextFieldBlur}
                  />
                </Pressable>

                {/* 5. 메모 */}
                <TextField
                  label="메모"
                  placeholder="간단한 메모가 있다면 적어주세요"
                  value={memo}
                  onChangeText={setMemo}
                  multiline
                  inputRef={memoInputRef}
                  onFocus={handleTextFieldFocus}
                  onBlur={handleTextFieldBlur}
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
                style={{ width: '100%' }}>
                <Box
                  bg="bg-gray-0"
                  className="px-6 pt-3"
                  style={{
                    paddingBottom:
                      Platform.OS === 'android' ? bottomInset + 48 : 48,
                  }}>
                  <BottomCTA
                    label="다음"
                    disabled={!canProceed}
                    onPress={handleNext}
                  />
                </Box>
              </Shadow>
            </Box>
          );
        }}
      </PageContainer>

      <CalendarModal
        visible={isCalendarVisible}
        onClose={handleCloseCalendar}
        onConfirm={handleConfirmDate}
        initialDate={prescribedAt ?? new Date()}
      />

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
