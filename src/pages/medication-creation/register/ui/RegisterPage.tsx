import { MedicationPhotoField } from '@features/upload-medication-photo';
import { useHeaderHeight } from '@react-navigation/elements';
import { cn } from '@shared/lib';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { Typography } from '@shared/ui/Typography';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput } from 'react-native';

export function RegisterPage() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const scrollRef = useRef<ScrollView>(null);
  const memoInputRef = useRef<TextInput>(null);
  const [nickname, setNickname] = useState('');
  const [hospital, setHospital] = useState('');
  const [prescribedAt, setPrescribedAt] = useState('');
  const [memo, setMemo] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const canProceed = nickname.trim().length > 0 && !!photoUrl; // 별명+사진 필수

  const handleNext = () => {
    if (!canProceed) return;
    router.push('/create/medication/schedule');
  };

  return (
    <PageContainer
      px="lg"
      py="lg"
      scrollable
      keyboardVerticalOffset={headerHeight}
      scrollRef={scrollRef}>
      <Box className="flex-col gap-10">
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
          scrollRef={scrollRef}
        />

        {/* 3. 병원명 */}
        <TextField
          label="병원명"
          placeholder="진료 받은 병원을 적어주세요"
          value={hospital}
          onChangeText={setHospital}
          scrollRef={scrollRef}
        />

        {/* 4. 처방일 */}
        <TextField
          label="처방일"
          placeholder="처방 받은 날짜를 적어주세요"
          value={prescribedAt}
          onChangeText={setPrescribedAt}
          scrollRef={scrollRef}
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
          scrollRef={scrollRef}
          inputProps={{
            scrollEnabled: false,
            blurOnSubmit: false,
          }}
        />
      </Box>

      {/* 하단 다음 버튼 - 스크롤 최하단에서 보이도록 콘텐츠 끝에 배치 */}
      <Pressable
        onPress={handleNext}
        disabled={!canProceed}
        accessibilityRole="button"
        accessibilityLabel="다음"
        accessibilityState={{ disabled: !canProceed }}
        className={cn(
          'mt-10 w-full items-center justify-center rounded-[60px] py-5',
          canProceed ? 'bg-primary-400' : 'bg-gray-50'
        )}>
        <Typography
          variant="button-large"
          color={canProceed ? 'text-gray-0' : 'text-gray-150'}>
          다음
        </Typography>
      </Pressable>
    </PageContainer>
  );
}
