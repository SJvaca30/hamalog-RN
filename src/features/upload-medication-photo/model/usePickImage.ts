import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import type { PickedImage } from './types';

/**
 * 갤러리(미디어 라이브러리)에서 이미지를 선택하는 훅
 * - 권한 요청 → 이미지 선택 흐름을 캡슐화합니다.
 * - 선택된 이미지는 `image` 상태로 노출합니다.
 */
export function usePickImage() {
  const [image, setImage] = useState<PickedImage | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  /**
   * iOS/Android에서 사진 라이브러리 접근 권한을 요청합니다.
   * 웹은 별도 권한이 필요 없으므로 항상 true를 반환합니다.
   */
  const ensurePermission = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setIsRequestingPermission(true);
      try {
        const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (media.status !== 'granted') {
          return false;
        }
        return true;
      } finally {
        setIsRequestingPermission(false);
      }
    }
    return true;
  }, []);

  /** 카메라 권한 요청 */
  const ensureCameraPermission = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setIsRequestingPermission(true);
      try {
        const camera = await ImagePicker.requestCameraPermissionsAsync();
        if (camera.status !== 'granted') return false;
        return true;
      } finally {
        setIsRequestingPermission(false);
      }
    }
    return true;
  }, []);

  /**
   * 갤러리에서 이미지를 한 장 선택합니다. 취소 시 null을 반환합니다.
   */
  const pickFromLibrary = useCallback(async () => {
    const has = await ensurePermission();
    if (!has) return null;
    const result = await ImagePicker.launchImageLibraryAsync({
      // NOTE: Expo SDK 52+에서 MediaTypeOptions가 deprecated.
      // launchImageLibraryAsync의 기본값이 이미지 전용이라 옵션을 생략하여 경고를 제거합니다.
      allowsEditing: true,
      quality: 0.9,
    });
    if (result.canceled) return null;
    const asset = result.assets[0];
    const picked: PickedImage = {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? undefined,
      mimeType: asset.mimeType,
    };
    setImage(picked);
    return picked;
  }, [ensurePermission]);

  /** 카메라로 사진 촬영 */
  const takePhoto = useCallback(async () => {
    const has = await ensureCameraPermission();
    if (!has) return null;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.9,
    });
    if (result.canceled) return null;
    const asset = result.assets[0];
    const picked: PickedImage = {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? undefined,
      mimeType: asset.mimeType,
    };
    setImage(picked);
    return picked;
  }, [ensureCameraPermission]);

  /** 선택된 이미지를 초기화합니다. */
  const clear = useCallback(() => setImage(null), []);

  return {
    image,
    setImage,
    pickFromLibrary,
    takePhoto,
    clear,
    isRequestingPermission,
  };
}
