import { MedicationPhotoField } from '@features/upload-medication-photo';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { useState } from 'react';

type Props = {
  onChange?: (url: string) => void;
};

/**
 * 페이지 섹션 위젯: 라벨/보조설명 + 업로드 필드 + 업로드 결과 표시
 * - 여러 feature를 조합할 수 있도록 확장 가능한 섹션 형태로 구성
 */
export function MedicationPhotoSection({ onChange }: Props) {
  const [url, setUrl] = useState<string | null>(null);

  const handleUploaded = (u: string) => {
    setUrl(u);
    onChange?.(u);
  };

  return (
    <Box direction="col" className="gap-4">
      <MedicationPhotoField onUploaded={handleUploaded} />
      {url ? (
        <Typography variant="caption-secondary" color="text-gray-500">
          업로드 완료: {url}
        </Typography>
      ) : null}
    </Box>
  );
}
