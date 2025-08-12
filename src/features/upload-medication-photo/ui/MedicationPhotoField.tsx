import { cn } from '@shared/lib';
import { Box } from '@shared/ui/Box';
import { PictureDeleteIcon, PictureUploadIcon } from '@shared/ui/icons';
import { Typography } from '@shared/ui/Typography';
import { Image, Pressable, View } from 'react-native';
import { usePickImage } from '../model/usePickImage';
import { useUploadImage } from '../model/useUploadImage';

type Props = {
  onUploaded?: (url: string) => void;
  onCleared?: () => void;
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
  onCleared,
  label = '약물 사진',
  description = '약 봉투, 약 한 알 등,\n편한 방식으로 기록하세요',
}: Props) {
  const { image, pickFromLibrary, takePhoto, clear } = usePickImage();
  const upload = useUploadImage();

  const handlePick = async () => {
    const picked = await pickFromLibrary();
    if (!picked) return;
    const res = await upload.mutateAsync({ image: picked });
    onUploaded?.(res.url);
  };

  const _handleCamera = async () => {
    const picked = await takePhoto();
    if (!picked) return;
    const res = await upload.mutateAsync({ image: picked });
    onUploaded?.(res.url);
  };

  const handleClear = () => {
    clear();
    onCleared?.();
  };

  return (
    <Box direction="row" justify="between" className="gap-2">
      <View className="flex-col gap-1 pb-1 pt-1">
        <Box direction="row" align="center" gap="xs">
          <Typography variant="label" color="text-gray-700">
            {label}
          </Typography>
          <Typography variant="label" color="text-primary-400">
            *
          </Typography>
        </Box>
        <Typography variant="caption-secondary" color="text-gray-500">
          {description}
        </Typography>
      </View>

      <Pressable
        onPress={handlePick}
        className={cn(
          'h-[120] w-[120] rounded-2xl border border-gray-150',
          'shrink-0 items-center justify-center gap-2.5'
        )}>
        {image ? (
          <>
            <Image
              source={{ uri: image.uri }}
              className="h-full w-full rounded-2xl"
              resizeMode="cover"
            />
            <Pressable
              onPress={handleClear}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="사진 삭제"
              className="absolute right-[6px] top-[6px] z-10">
              <PictureDeleteIcon width={24} height={24} />
            </Pressable>
          </>
        ) : (
          <View className="items-center gap-2.5">
            <PictureUploadIcon width={20} height={20} />
            <Typography variant="button-small" color="text-gray-300">
              사진 업로드
            </Typography>
          </View>
        )}
      </Pressable>

      {/* <Box direction="row" className="gap-3">
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
      </Box> */}
    </Box>
  );
}
