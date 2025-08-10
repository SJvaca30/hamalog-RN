import { MedicationPhotoField } from '@features/upload-medication-photo';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { useState } from 'react';

export function RegisterPage() {
  const [nickname, setNickname] = useState('');
  const [hospital, setHospital] = useState('');
  const [prescribedAt, setPrescribedAt] = useState('');
  const [memo, setMemo] = useState('');
  const [_photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <PageContainer px="lg" py="lg" scrollable>
      <Box className="flex-col gap-10">
        <MedicationCreationStepper variant="register" />

        {/* 1. 약물 사진 */}
        <MedicationPhotoField onUploaded={setPhotoUrl} />

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
        />
      </Box>
    </PageContainer>
  );
}
