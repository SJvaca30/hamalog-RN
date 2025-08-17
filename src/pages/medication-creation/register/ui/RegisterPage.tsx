import { MedicationPhotoField } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
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
  const canProceed = nickname.trim().length > 0 && !!photoUrl; // 별명+사진 필수
  const contentSizeChanged = useSharedValue(0);

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/create/medication/schedule');
  };

  const handleMemoContentSizeChange = () => {
    // Android에서 multiline 입력 시 높이가 변경될 때 스크롤을 재조정 함.
    if (Platform.OS === 'android') {
      contentSizeChanged.value += 1;
    }
  };

  const scrollToFocusedInput = () => {
    // @ts-ignore: `scrollToFocusedInput` is a valid method on the instance
    scrollRef.current?.scrollToFocusedInput(memoInputRef.current, 199);
  };
  // useSharedValue를 사용하여 렌더링을 유발하지 않는 효율적인 '신호'(contentSizeChanged)를 만들었습니다.
  // useAnimatedReaction으로 이 신호의 변경을 감지하여, 화면 렌더링 주기와 완벽하게 동기화된 시점에 스크롤 함수를 호출합니다.
  // runOnJS를 통해 UI 스레드와 JS 스레드 간의 작업을 안전하게 처리하여 안정성을 극대화했습니다.
  useAnimatedReaction(
    () => contentSizeChanged.value,
    (currentValue, previousValue) => {
      if (currentValue !== previousValue && previousValue !== null) {
        runOnJS(scrollToFocusedInput)();
      }
    },
    [contentSizeChanged]
  );

  return (
    <PageContainer
      scrollable
      keyboardVerticalOffset={headerHeight}
      scrollRef={scrollRef}>
      {({ bottomInset }) => (
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
            />

            {/* 3. 병원명 */}
            <TextField
              label="병원명"
              placeholder="진료 받은 병원을 적어주세요"
              value={hospital}
              onChangeText={setHospital}
            />

            {/* 4. 처방일 */}
            <TextField
              label="처방일"
              placeholder="처방 받은 날짜를 적어주세요"
              value={prescribedAt}
              onChangeText={setPrescribedAt}
              inputProps={{ keyboardType: 'numbers-and-punctuation' }}
            />

            {/* 5. 메모 */}
            <TextField
              label="메모"
              placeholder="간단한 메모가 있다면 적어주세요"
              value={memo}
              onChangeText={setMemo}
              multiline
              inputRef={memoInputRef}
              inputProps={{
                scrollEnabled: false,
                blurOnSubmit: false,
                onContentSizeChange: handleMemoContentSizeChange,
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
              style={{ paddingBottom: bottomInset || 48 }}>
              <BottomCTA
                label="다음"
                disabled={!canProceed}
                onPress={handleNext}
              />
            </Box>
          </Shadow>
        </Box>
      )}
    </PageContainer>
  );
}
