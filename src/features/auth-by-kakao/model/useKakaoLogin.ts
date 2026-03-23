import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';

import { getCsrfToken, useLogin } from '@entities/auth';
import { useSession, useSessionStore } from '@entities/session';
import { env } from '@shared/config/env';

export const useKakaoLogin = () => {
  const { setTokens, setCsrfToken } = useSession();
  const loginMutation = useLogin();
  const lastCsrfIssuedAtRef = useRef(0);
  const handledRef = useRef(false); // 단발 처리 가드
  const processedTokenRef = useRef<string | null>(null); // 동일 토큰 중복 처리 방지
  const [isLoading, setIsLoading] = useState(false);

  // Deep Link 처리 (백엔드에서 토큰과 함께 리다이렉트)
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const url = event.url;
      console.log('🔗 Deep Link 수신:', url);

      // hamalog-rn://auth?token=xxx 형태 처리
      if (url.startsWith('hamalog-rn://auth')) {
        (async () => {
          try {
            if (handledRef.current) {
              if (__DEV__) {
                console.log('🔁 Deep Link 이미 처리됨. 건너뜀.');
              }
              return;
            }

            const urlObj = new URL(url);
            const token = urlObj.searchParams.get('token');
            const refreshToken = urlObj.searchParams.get('refreshToken');

            if (token) {
              if (processedTokenRef.current === token) {
                if (__DEV__) {
                  console.log('🔁 동일 토큰 이미 처리됨. 건너뜀.');
                }
                return;
              }

              console.log('✅ 백엔드로부터 토큰 수신');
              // refreshToken은 없을 수도 있음 (호환성 확보)
              await setTokens(token, refreshToken || null);
              processedTokenRef.current = token;
              handledRef.current = true;

              // CSRF 토큰 발급 및 저장 (최근 5초 이내 중복 요청 방지)
              const now = Date.now();
              const existingCsrf = useSessionStore.getState().csrfToken;
              if (existingCsrf) {
                if (__DEV__) {
                  console.log('CSRF 이미 스토어에 존재, 발급 스킵');
                }
              } else if (now - lastCsrfIssuedAtRef.current > 5000) {
                try {
                  const csrfData = await getCsrfToken();
                  if (csrfData.csrfToken) {
                    setCsrfToken(csrfData.csrfToken);
                    lastCsrfIssuedAtRef.current = now;
                    console.log('CSRF 토큰 발급 성공');
                  }
                } catch (csrfError) {
                  console.warn('CSRF 토큰 발급 실패:', csrfError);
                }
              } else if (__DEV__) {
                console.log('CSRF 토큰 최근 발급됨, 중복 요청 스킵');
              }

              setIsLoading(false);
              Alert.alert('성공', '카카오 로그인에 성공했습니다!');
            } else {
              const error = urlObj.searchParams.get('error');
              Alert.alert('로그인 실패', error || '토큰을 받을 수 없습니다.');
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Deep Link 파싱 실패:', error);
            Alert.alert(
              '로그인 실패',
              'Deep Link 처리 중 오류가 발생했습니다.'
            );
            setIsLoading(false);
          }
        })();
      }
    };

    // Deep Link 리스너 등록
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, [setCsrfToken, setTokens]);

  // 백엔드 OAuth 엔드포인트로 리다이렉트
  const login = async () => {
    try {
      setIsLoading(true);

      if (env.enableAuthMock) {
        const response = await loginMutation.mutateAsync({
          loginId: 'kakao.mock@hamalog.local',
          password: 'kakao-mock-password',
        });

        await setTokens(response.access_token, response.refresh_token);

        const csrfData = await getCsrfToken();
        if (csrfData.csrfToken) {
          setCsrfToken(csrfData.csrfToken);
        }

        setIsLoading(false);
        Alert.alert('성공', '카카오 로그인에 성공했습니다!');
        return;
      }

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
