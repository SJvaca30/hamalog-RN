import { useMutation } from '@tanstack/react-query';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

import { useSession } from '@entities/session';
import { postKakaoLogin } from '../api';

export const useKakaoLogin = () => {
  const { setTokens } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // 백엔드 API 호출을 위한 mutation
  const kakaoLoginMutation = useMutation({
    mutationFn: postKakaoLogin,
    onSuccess: response => {
      setTokens({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      setIsLoading(false);
    },
    onError: error => {
      console.error('백엔드 로그인 실패:', error);
      Alert.alert('로그인 실패', '카카오 로그인 중 오류가 발생했습니다.');
      setIsLoading(false);
    },
  });

  // Deep Link 처리
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      console.log('🔗 Deep Link 수신:', url);

      // hamalog-rn://auth?token=xxx&refreshToken=yyy 형태 처리
      if (url.startsWith('hamalog-rn://auth')) {
        try {
          const urlObj = new URL(url);
          const token = urlObj.searchParams.get('token');
          const refreshToken = urlObj.searchParams.get('refreshToken');

          if (token && refreshToken) {
            setTokens({
              accessToken: token,
              refreshToken: refreshToken,
            });
            setIsLoading(false);
            Alert.alert('성공', '카카오 로그인에 성공했습니다!');
          } else {
            const error = urlObj.searchParams.get('error');
            Alert.alert(
              '로그인 실패',
              error || '알 수 없는 오류가 발생했습니다.'
            );
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Deep Link 파싱 실패:', error);
          Alert.alert('로그인 실패', 'Deep Link 처리 중 오류가 발생했습니다.');
          setIsLoading(false);
        }
      }
    };

    // Deep Link 리스너 등록
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [setTokens]);

  const login = async () => {
    try {
      setIsLoading(true);

      // 카카오 OAuth URL 직접 구성
      const kakaoAuthUrl =
        `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}` +
        `&redirect_uri=${encodeURIComponent(process.env.EXPO_PUBLIC_API_BASE_URL + '/api/auth/kakao/callback')}` +
        `&response_type=code` +
        `&lang=ko`;

      console.log('🚀 카카오 로그인 URL:', kakaoAuthUrl);

      // 웹브라우저로 카카오 로그인 페이지 열기
      const result = await WebBrowser.openBrowserAsync(kakaoAuthUrl);

      // 사용자가 브라우저를 직접 닫은 경우
      if (result.type === 'dismiss') {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      Alert.alert('로그인 실패', '카카오 로그인을 시작할 수 없습니다.');
      setIsLoading(false);
    }
  };

  return {
    login,
    isPending: isLoading || kakaoLoginMutation.isPending,
  };
};
