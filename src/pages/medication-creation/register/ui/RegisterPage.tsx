import { MedicationPhotoField } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Keyboard, Platform, TextInput } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export function RegisterPage() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef<any>(null);
  const memoInputRef = useRef<TextInput>(null);
  const [nickname, setNickname] = useState('');
  const [hospital, setHospital] = useState('');
  const [prescribedAt, setPrescribedAt] = useState('');
  const [memo, setMemo] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const canProceed = nickname.trim().length > 0 && !!photoUrl; // 별명+사진 필수

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

  return (
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
              <TextField
                label="처방일"
                placeholder="처방 받은 날짜를 적어주세요"
                value={prescribedAt}
                onChangeText={setPrescribedAt}
                inputProps={{ keyboardType: 'numbers-and-punctuation' }}
                onFocus={handleTextFieldFocus}
                onBlur={handleTextFieldBlur}
              />

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
  );
}
