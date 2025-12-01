import {
  MedicationPhotoField,
  type PickedImage,
} from '@features/upload-medication-photo';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { useState } from 'react';

type Props = {
  onSelected?: (image: PickedImage) => void;
  onCleared?: () => void;
};

/**
 * 페이지 섹션 위젯: 라벨/보조설명 + 사진 선택 필드 + 선택 결과 표시
 * - 여러 feature를 조합할 수 있도록 확장 가능한 섹션 형태로 구성
 */
export function MedicationPhotoSection({ onSelected, onCleared }: Props) {
  const [selectedImage, setSelectedImage] = useState<PickedImage | null>(null);

  const handleSelected = (image: PickedImage) => {
    setSelectedImage(image);
    onSelected?.(image);
  };

  const handleCleared = () => {
    setSelectedImage(null);
    onCleared?.();
  };

  return (
    <Box direction="col" className="gap-4">
      <MedicationPhotoField
        onSelected={handleSelected}
        onCleared={handleCleared}
      />
      {selectedImage ? (
        <Typography variant="caption-secondary" color="text-gray-500">
          선택 완료: {selectedImage.fileName || '이미지'}
        </Typography>
      ) : null}
    </Box>
  );
}
