import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { postKakaoLogin } from '../api';

import { useSession } from '@entities/session';

export const useKakaoLogin = () => {
  console.log('🔍 useKakaoLogin 훅 초기화됨 (웹 기반)');

  const { setTokens } = useSession();

  const kakaoLoginMutation = useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: response => {
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
    },
    onError: () => {
      // TODO: 에러 처리 고도화 (e.g. Sentry 연동)
      Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했습니다.');
    },
  });

  const login = async () => {
    try {
      console.log('🔍 웹 기반 카카오 로그인 시도 시작');

      // 임시: 웹 기반 카카오 로그인 알림
      Alert.alert(
        '카카오 로그인',
        '현재 네이티브 SDK 연결 문제로 인해 임시로 웹 기반 로그인을 사용합니다.\n\n실제 구현에서는 카카오 웹 로그인 URL로 리다이렉트하거나, 네이티브 SDK 문제를 해결해야 합니다.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '웹에서 로그인',
            onPress: () => {
              // 실제로는 카카오 웹 로그인 URL로 리다이렉트
              const kakaoWebLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=YOUR_REDIRECT_URI&response_type=code`;
              console.log('🔍 카카오 웹 로그인 URL:', kakaoWebLoginUrl);
              // Linking.openURL(kakaoWebLoginUrl);
            },
          },
        ]
      );
    } catch (error) {
      console.error('🔍 웹 기반 카카오 로그인 실패:', error);
    }
  };

  return {
    login,
    isPending: kakaoLoginMutation.isPending,
  };
};
