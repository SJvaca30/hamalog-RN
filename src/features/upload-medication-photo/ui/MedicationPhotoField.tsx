import { cn } from '@shared/lib';
import { Box } from '@shared/ui/Box';
import {
  CameraIcon,
  GalaryTwoToneIcon,
  PictureDeleteIcon,
  PictureUploadIcon,
} from '@shared/ui/icons';
import { Typography } from '@shared/ui/Typography';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, View } from 'react-native';
import { ConfirmModal } from '../../../shared/ui/ConfirmModal';
import { usePickImage } from '../model/usePickImage';
import { useUploadImage } from '../model/useUploadImage';

type Props = {
  onUploaded?: (url: string) => void;
  onCleared?: () => void;
  onUploadStateChange?: (isUploading: boolean) => void;
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
  onUploadStateChange,
  label = '약물 사진',
  description = '약 봉투, 약 한 알 등,\n편한 방식으로 기록하세요',
}: Props) {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [_uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { image, pickFromLibrary, takePhoto, clear } = usePickImage();
  const upload = useUploadImage();

  // 업로드 성공 시 즉시 상위 컴포넌트에 알림
  useEffect(() => {
    if (upload.isSuccess && upload.data?.url) {
      const url = upload.data.url;
      setUploadedUrl(url);
      onUploaded?.(url);
    }
  }, [upload.isSuccess, upload.data?.url, onUploaded]);

  // 업로드 에러 시 사용자에게 알림
  useEffect(() => {
    if (upload.isError) {
      Alert.alert(
        '업로드 실패',
        '사진 업로드에 실패했습니다. 다시 시도해주세요.',
        [{ text: '확인' }]
      );
    }
  }, [upload.isError]);

  // 업로드 상태 변경을 상위 컴포넌트에 알림
  useEffect(() => {
    onUploadStateChange?.(upload.isPending);
  }, [upload.isPending, onUploadStateChange]);

  const handlePressUpload = () => {
    // TODO: 로컬 스토리지에서 동의 여부 확인
    const isConsentRequired = true; // 임시값
    if (isConsentRequired) {
      setShowConsentModal(true);
    } else {
      setShowSelectModal(true);
    }
  };

  const handleConsentConfirm = () => {
    setShowConsentModal(false);
    setShowSelectModal(true);
    // TODO: 로컬 스토리지에 동의 여부 저장
  };

  const handlePick = async () => {
    setShowSelectModal(false);
    try {
      const picked = await pickFromLibrary();
      if (!picked) return;

      // TanStack Query의 mutateAsync를 사용하여 업로드
      await upload.mutateAsync({ image: picked });
      // 성공 시 처리는 useEffect에서 처리됨
    } catch (error) {
      // 에러는 useEffect에서 처리됨
      console.error('Gallery upload failed:', error);
    }
  };

  const handleCamera = async () => {
    setShowSelectModal(false);
    try {
      const picked = await takePhoto();
      if (!picked) return;

      // TanStack Query의 mutateAsync를 사용하여 업로드
      await upload.mutateAsync({ image: picked });
      // 성공 시 처리는 useEffect에서 처리됨
    } catch (error) {
      // 에러는 useEffect에서 처리됨
      console.error('Camera upload failed:', error);
    }
  };

  const handleClear = () => {
    clear();
    setUploadedUrl(null);
    upload.reset(); // TanStack Query 상태 초기화
    onCleared?.();
  };

  return (
    <>
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
          onPress={handlePressUpload}
          disabled={upload.isPending}
          className={cn(
            'h-[120] w-[120] rounded-2xl border border-gray-150',
            'shrink-0 items-center justify-center gap-2.5',
            upload.isPending && 'opacity-70'
          )}>
          {image ? (
            <>
              <Image
                source={{ uri: image.uri }}
                className="h-full w-full rounded-2xl"
                resizeMode="cover"
              />
              {upload.isPending && (
                <View className="absolute inset-0 items-center justify-center rounded-2xl bg-black/50">
                  <ActivityIndicator size="large" color="#ffffff" />
                </View>
              )}
              {!upload.isPending && (
                <Pressable
                  onPress={handleClear}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="사진 삭제"
                  className="absolute right-[6px] top-[6px] z-10">
                  <PictureDeleteIcon width={24} height={24} />
                </Pressable>
              )}
            </>
          ) : (
            <View className="items-center gap-2.5">
              {upload.isPending ? (
                <>
                  <ActivityIndicator size="small" color="#9CA3AF" />
                  <Typography variant="button-small" color="text-gray-300">
                    업로드 중...
                  </Typography>
                </>
              ) : (
                <>
                  <PictureUploadIcon width={20} height={20} />
                  <Typography variant="button-small" color="text-gray-300">
                    사진 업로드
                  </Typography>
                </>
              )}
            </View>
          )}
        </Pressable>
      </Box>

      <ConfirmModal
        visible={showConsentModal}
        variant="consent"
        title="사진을 올리려면 동의가 필요해요"
        termsContent="사진 어쩌구 이용약관"
        onTermsPress={() => {
          /* TODO: 이용약관 페이지로 이동 */
        }}
        onConfirm={handleConsentConfirm}
        onCancel={() => setShowConsentModal(false)}
      />

      <ConfirmModal
        visible={showSelectModal}
        variant="select"
        title="사진 올리기"
        onCancel={() => setShowSelectModal(false)}
        options={[
          {
            id: 'gallery',
            text: '내 갤러리에서 고르기',
            icon: <GalaryTwoToneIcon />,
            onPress: handlePick,
          },
          {
            id: 'camera',
            text: '카메라로 사진 찍기',
            icon: <CameraIcon />,
            onPress: handleCamera,
          },
        ]}
      />
    </>
  );
}
