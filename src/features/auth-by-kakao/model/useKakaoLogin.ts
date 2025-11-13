import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

import { useSession } from '@entities/session';
import { env } from '@shared/config/env';

export const useKakaoLogin = () => {
  const { setTokens } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Deep Link 처리 (백엔드에서 토큰과 함께 리다이렉트)
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      console.log('🔗 Deep Link 수신:', url);

      // hamalog-rn://auth?token=xxx 형태 처리
      if (url.startsWith('hamalog-rn://auth')) {
        try {
          const urlObj = new URL(url);
          const token = urlObj.searchParams.get('token');

          if (token) {
            console.log('✅ 백엔드로부터 토큰 수신');
            setTokens({
              accessToken: token,
            });
            setIsLoading(false);
            Alert.alert('성공', '카카오 로그인에 성공했습니다!');
          } else {
            const error = urlObj.searchParams.get('error');
            Alert.alert('로그인 실패', error || '토큰을 받을 수 없습니다.');
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

  // 백엔드 OAuth 엔드포인트로 리다이렉트
  const login = async () => {
    try {
      setIsLoading(true);

      // 백엔드의 카카오 OAuth 시작 엔드포인트
      const backendOAuthUrl = `${env.apiBaseUrl}/oauth2/auth/kakao`;

      console.log('🚀 백엔드 OAuth URL:', backendOAuthUrl);

      // ⚠️ CSRF 방지를 위한 추가 헤더
      // 백엔드가 CSRF 보호를 한다면 이 요청이 차단될 수 있습니다
      const result = await WebBrowser.openBrowserAsync(backendOAuthUrl, {
        dismissButtonStyle: 'cancel',
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        // 브라우저에서 추가 헤더를 보낼 수 없으므로 백엔드에서 처리 필요
      });

      // 사용자가 브라우저를 닫았을 때
      if (result.type === 'dismiss') {
        console.log('사용자가 브라우저를 닫았습니다.');
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
    isPending: isLoading,
  };
};
