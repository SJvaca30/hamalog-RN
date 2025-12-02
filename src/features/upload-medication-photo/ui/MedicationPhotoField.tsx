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
import { Alert, Image, Platform, Pressable, View } from 'react-native';
import { ConfirmModal } from '../../../shared/ui/ConfirmModal';
import type { PickedImage } from '../model/types';
import { usePickImage } from '../model/usePickImage';

/** 서버 이미지 파일 용량 제한: 5MB */
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

type Props = {
  /** 이미지 선택 완료 시 호출 (업로드 X, PickedImage 객체 전달) */
  onSelected?: (image: PickedImage) => void;
  /** 이미지 삭제 시 호출 */
  onCleared?: () => void;
  label?: string;
  description?: string;
};

/**
 * 약물 사진 선택 입력 필드
 * - 클릭(Press) 시 갤러리/카메라에서 이미지를 선택합니다.
 * - 선택된 이미지는 `onSelected(image)` 콜백으로 상위에 PickedImage 객체를 전달합니다.
 * - 실제 업로드는 복약 스케줄 등록 시 FormData에 함께 전송됩니다.
 * - 5MB 용량 제한 검증 포함.
 */
export function MedicationPhotoField({
  onSelected,
  onCleared,
  label = '약물 사진',
  description = '약 봉투, 약 한 알 등,\n편한 방식으로 기록하세요',
}: Props) {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { image, pickFromLibrary, takePhoto, clear, checkPermissions } =
    usePickImage();

  // 개발 중 권한 상태 확인
  useEffect(() => {
    if (__DEV__) {
      checkPermissions();
    }
  }, [checkPermissions]);

  // 개발 환경에서 시뮬레이터 제한사항 안내
  useEffect(() => {
    if (__DEV__ && Platform.OS === 'ios') {
      console.warn('iOS 시뮬레이터에서는 갤러리 선택이 제한적일 수 있습니다.');
      console.warn('실제 기기나 `npx expo run:ios`로 테스트를 권장합니다.');
    }
  }, []);

  // 이미지 상태 변경 디버그 로그
  useEffect(() => {
    if (__DEV__) {
      console.log(
        '[MedicationPhotoField] image 상태 변경:',
        image?.uri ?? null
      );
    }
  }, [image]);

  /**
   * 이미지 파일 크기 검증 (5MB 제한)
   * expo-image-picker가 제공하는 fileSize를 사용합니다.
   */
  const validateImageSize = (fileSize?: number): boolean => {
    if (!fileSize) {
      // 파일 크기 정보가 없으면 서버에서 최종 검증하도록 허용
      console.warn('[MedicationPhotoField] 파일 크기 정보 없음, 서버에서 검증');
      return true;
    }

    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    console.log(`[MedicationPhotoField] 이미지 크기: ${fileSizeMB}MB`);

    if (fileSize > MAX_IMAGE_SIZE_BYTES) {
      Alert.alert(
        '파일 크기 초과',
        `이미지 파일 크기가 5MB를 초과합니다. (현재: ${fileSizeMB}MB)\n더 작은 이미지를 선택해주세요.`,
        [{ text: '확인' }]
      );
      return false;
    }

    return true;
  };

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
    setIsProcessing(true);
    try {
      console.log('[MedicationPhotoField] 갤러리 선택 시작');
      const picked = await pickFromLibrary();
      if (!picked) {
        console.log('[MedicationPhotoField] 갤러리에서 이미지 선택되지 않음');

        if (__DEV__ && Platform.OS === 'ios') {
          Alert.alert(
            '갤러리 접근 제한',
            'iOS 시뮬레이터에서는 갤러리 선택이 제한적일 수 있습니다.\n\n해결 방법:\n• 실제 iPhone에서 테스트\n• npx expo run:ios 사용',
            [{ text: '확인' }]
          );
        }
        return;
      }

      // 5MB 용량 검증 (expo-image-picker가 제공하는 fileSize 사용)
      if (!validateImageSize(picked.fileSize)) {
        clear();
        return;
      }

      console.log('[MedicationPhotoField] 이미지 선택 완료:', picked);
      onSelected?.(picked);
    } catch (error) {
      console.error('[MedicationPhotoField] Gallery pick failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCamera = async () => {
    setShowSelectModal(false);
    setIsProcessing(true);
    try {
      console.log('[MedicationPhotoField] 카메라 촬영 시작');
      const picked = await takePhoto();
      if (!picked) {
        console.log('[MedicationPhotoField] 카메라에서 이미지 촬영되지 않음');

        if (__DEV__ && Platform.OS === 'ios') {
          Alert.alert(
            '카메라 사용 불가',
            'iOS 시뮬레이터에는 카메라가 없어 촬영할 수 없습니다.\n\n해결 방법:\n• 실제 iPhone에서 테스트\n• 갤러리에서 이미지 선택 사용',
            [{ text: '확인' }]
          );
        }
        return;
      }

      // 5MB 용량 검증 (expo-image-picker가 제공하는 fileSize 사용)
      if (!validateImageSize(picked.fileSize)) {
        clear();
        return;
      }

      console.log('[MedicationPhotoField] 카메라 촬영 완료:', picked);
      onSelected?.(picked);
    } catch (error) {
      console.error('[MedicationPhotoField] Camera capture failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    clear();
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
          disabled={isProcessing}
          className={cn(
            'h-[120] w-[120] rounded-2xl border border-gray-150',
            'shrink-0 items-center justify-center gap-2.5',
            isProcessing && 'opacity-70'
          )}>
          {image ? (
            <>
              <Image
                key={image.uri}
                source={{ uri: image.uri }}
                className="h-full w-full rounded-2xl"
                resizeMode="cover"
              />
              {!isProcessing && (
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
              <PictureUploadIcon width={20} height={20} />
              <Typography variant="button-small" color="text-gray-300">
                사진 선택
              </Typography>
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
