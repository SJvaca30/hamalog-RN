import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
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
   * 권한이 거부되었을 때 사용자에게 설정으로 이동할 수 있는 안내 제공
   */
  const showPermissionDeniedAlert = useCallback(
    (permissionType: '갤러리' | '카메라') => {
      Alert.alert(
        `${permissionType} 접근 권한 필요`,
        `사진을 등록하려면 ${permissionType} 접근 권한이 필요합니다.\n설정에서 권한을 허용해주세요.`,
        [
          { text: '취소', style: 'cancel' },
          {
            text: '설정으로 이동',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
          },
        ]
      );
    },
    []
  );

  /**
   * iOS/Android에서 사진 라이브러리 접근 권한을 요청합니다.
   * 웹은 별도 권한이 필요 없으므로 항상 true를 반환합니다.
   */
  const ensurePermission = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setIsRequestingPermission(true);
      try {
        console.log('[usePickImage] 갤러리 권한 요청 시작');
        const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log('[usePickImage] 갤러리 권한 응답:', media);

        if (media.status !== 'granted') {
          console.log('[usePickImage] 갤러리 권한 거부됨:', media.status);
          if (media.canAskAgain === false) {
            console.log('[usePickImage] 더 이상 권한 요청 불가');
            showPermissionDeniedAlert('갤러리');
          }
          return false;
        }
        console.log('[usePickImage] 갤러리 권한 승인됨');
        return true;
      } catch (error) {
        console.error('[usePickImage] 갤러리 권한 요청 에러:', error);
        return false;
      } finally {
        setIsRequestingPermission(false);
      }
    }
    return true;
  }, [showPermissionDeniedAlert]);

  /** 카메라 권한 요청 */
  const ensureCameraPermission = useCallback(async () => {
    if (Platform.OS !== 'web') {
      setIsRequestingPermission(true);
      try {
        console.log('[usePickImage] 카메라 권한 요청 시작');
        const camera = await ImagePicker.requestCameraPermissionsAsync();
        console.log('[usePickImage] 카메라 권한 응답:', camera);

        if (camera.status !== 'granted') {
          console.log('[usePickImage] 카메라 권한 거부됨:', camera.status);
          if (camera.canAskAgain === false) {
            console.log('[usePickImage] 더 이상 권한 요청 불가');
            showPermissionDeniedAlert('카메라');
          }
          return false;
        }
        console.log('[usePickImage] 카메라 권한 승인됨');
        return true;
      } catch (error) {
        console.error('[usePickImage] 카메라 권한 요청 에러:', error);
        return false;
      } finally {
        setIsRequestingPermission(false);
      }
    }
    return true;
  }, [showPermissionDeniedAlert]);

  /**
   * 갤러리에서 이미지를 한 장 선택합니다. 취소 시 null을 반환합니다.
   */
  const pickFromLibrary = useCallback(async () => {
    try {
      console.log('[usePickImage] 갤러리에서 이미지 선택 시작');
      const has = await ensurePermission();
      if (!has) {
        console.log('[usePickImage] 갤러리 권한 없음');
        return null;
      }

      console.log('[usePickImage] ImagePicker.launchImageLibraryAsync 호출');

      // 시뮬레이터에서 타임아웃 대응
      const timeoutPromise = new Promise<ImagePicker.ImagePickerResult>(
        (_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error('ImagePicker timeout - iOS 시뮬레이터 제한사항')
              ),
            10000
          )
      );

      const pickerPromise = ImagePicker.launchImageLibraryAsync({
        // NOTE: Expo SDK 52+에서 MediaTypeOptions가 deprecated.
        // launchImageLibraryAsync의 기본값이 이미지 전용이라 옵션을 생략하여 경고를 제거합니다.
        allowsEditing: true,
        quality: 0.9,
      });

      const result = await Promise.race([pickerPromise, timeoutPromise]);
      console.log('[usePickImage] ImagePicker 결과:', result);

      if (result.canceled) {
        console.log('[usePickImage] 사용자가 이미지 선택 취소');
        return null;
      }

      if (!result.assets || result.assets.length === 0) {
        console.log('[usePickImage] 선택된 이미지가 없음');
        return null;
      }

      const asset = result.assets[0];
      const picked: PickedImage = {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName ?? undefined,
        mimeType: asset.mimeType,
      };

      console.log('[usePickImage] 이미지 선택 성공:', picked);
      setImage(picked);
      return picked;
    } catch (error) {
      console.error('[usePickImage] 갤러리 이미지 선택 에러:', error);

      // 시뮬레이터 타임아웃 에러인 경우 추가 안내
      if (error instanceof Error && error.message.includes('timeout')) {
        console.warn('iOS 시뮬레이터에서는 갤러리 선택이 제한적입니다.');
        console.warn(
          '실제 기기에서 테스트하거나 `npx expo run:ios`를 사용해보세요.'
        );
      }

      return null;
    }
  }, [ensurePermission]);

  /** 카메라로 사진 촬영 */
  const takePhoto = useCallback(async () => {
    try {
      console.log('[usePickImage] 카메라로 사진 촬영 시작');
      const has = await ensureCameraPermission();
      if (!has) {
        console.log('[usePickImage] 카메라 권한 없음');
        return null;
      }

      console.log('[usePickImage] ImagePicker.launchCameraAsync 호출');
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.9,
      });

      console.log('[usePickImage] 카메라 결과:', result);

      if (result.canceled) {
        console.log('[usePickImage] 사용자가 카메라 촬영 취소');
        return null;
      }

      if (!result.assets || result.assets.length === 0) {
        console.log('[usePickImage] 촬영된 이미지가 없음');
        return null;
      }

      const asset = result.assets[0];
      const picked: PickedImage = {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName ?? undefined,
        mimeType: asset.mimeType,
      };

      console.log('[usePickImage] 카메라 촬영 성공:', picked);
      setImage(picked);
      return picked;
    } catch (error) {
      console.error('[usePickImage] 카메라 촬영 에러:', error);
      return null;
    }
  }, [ensureCameraPermission]);

  /** 선택된 이미지를 초기화합니다. */
  const clear = useCallback(() => setImage(null), []);

  /** 현재 권한 상태를 확인합니다 (개발용) */
  const checkPermissions = useCallback(async () => {
    if (Platform.OS === 'web') return;

    try {
      const [media, camera] = await Promise.all([
        ImagePicker.getMediaLibraryPermissionsAsync(),
        ImagePicker.getCameraPermissionsAsync(),
      ]);

      console.log('[usePickImage] 현재 권한 상태:');
      console.log('- 갤러리:', media);
      console.log('- 카메라:', camera);

      return { media, camera };
    } catch (error) {
      console.error('[usePickImage] 권한 상태 확인 에러:', error);
    }
  }, []);

  return {
    image,
    setImage,
    pickFromLibrary,
    takePhoto,
    clear,
    isRequestingPermission,
    checkPermissions, // 개발용
  };
}
