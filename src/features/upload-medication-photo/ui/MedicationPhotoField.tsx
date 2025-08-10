import { cn } from '@shared/lib';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { Image, Pressable, View } from 'react-native';
import { usePickImage } from '../model/usePickImage';
import { useUploadImage } from '../model/useUploadImage';

type Props = {
  onUploaded?: (url: string) => void;
  label?: string;
  description?: string;
};

/**
 * 약물 사진 업로드 입력 필드
 * - 클릭(Press) 시 갤러리 열기 → 선택 → 업로드까지 처리합니다.
 * - 업로드 성공 시 `onUploaded(url)` 콜백으로 상위에 알립니다.
 */
export function MedicationPhotoField({
  onUploaded,
  label = '약물 사진',
  description = '약 봉투, 약 한 알 등, 편한 방식으로 기록하세요',
}: Props) {
  const { image, pickFromLibrary, takePhoto } = usePickImage();
  const upload = useUploadImage();

  const handlePick = async () => {
    const picked = await pickFromLibrary();
    if (!picked) return;
    const res = await upload.mutateAsync({ image: picked });
    onUploaded?.(res.url);
  };

  const handleCamera = async () => {
    const picked = await takePhoto();
    if (!picked) return;
    const res = await upload.mutateAsync({ image: picked });
    onUploaded?.(res.url);
  };

  return (
    <Box direction="col" className="gap-3">
      <View>
        <Box direction="row" align="center" className="gap-1">
          <Typography variant="h2">{label} *</Typography>
        </Box>
        <Typography variant="body-2" color="text-gray-500">
          {description}
        </Typography>
      </View>

      <Pressable
        onPress={handlePick}
        className={cn(
          'border-secondary-200 h-[220] w-[220] self-start rounded-3xl border-2',
          'items-center justify-center'
        )}>
        {image ? (
          <Image
            source={{ uri: image.uri }}
            className="h-full w-full rounded-3xl"
            resizeMode="cover"
          />
        ) : (
          <Typography variant="button-medium" color="text-gray-500">
            사진 업로드
          </Typography>
        )}
      </Pressable>

      <Box direction="row" className="gap-3">
        <Pressable
          onPress={handlePick}
          className="rounded-xl border-[1px] border-stroke px-4 py-2">
          <Typography variant="button-small">내 갤러리에서 고르기</Typography>
        </Pressable>
        <Pressable
          onPress={handleCamera}
          className="rounded-xl border-[1px] border-stroke px-4 py-2">
          <Typography variant="button-small">카메라로 사진 찍기</Typography>
        </Pressable>
      </Box>
    </Box>
  );
}
