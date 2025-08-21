import KakaoLogin from '@react-native-seoul/kakao-login';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { postKakaoLogin } from '../api';

import { useSession } from '@entities/session';

export const useKakaoLogin = () => {
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
      const kakaoToken = await KakaoLogin.login();
      kakaoLoginMutation.mutate({ accessToken: kakaoToken.accessToken });
    } catch (error) {
      // 사용자가 중간에 취소한 경우 등
      console.error('카카오 SDK 로그인 실패:', error);
    }
  };

  return {
    login,
    isPending: kakaoLoginMutation.isPending,
  };
};
