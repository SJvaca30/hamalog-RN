import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 글로벌 CSS 임포트
import '../global.css';

import { useSession } from '@entities/session';
import { customFontsToLoad } from '@shared/config';
import { isMockAuthEnabled, performMockLogin } from '@shared/lib/mock-auth';

// Splash screen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

const useProtectedRoutes = () => {
  const segments = useSegments();
  const router = useRouter();
  const { accessToken, isLoaded } = useSession();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (accessToken && inAuthGroup) {
      router.replace('/(app)/(home)');
    } else if (!accessToken && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [accessToken, isLoaded, segments, router]);
};

function RootLayoutNav() {
  useProtectedRoutes();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" />
      <Stack.Screen name="create" />
      <Stack.Screen
        name="(auth)"
        options={{
          // (auth) 그룹의 화면들은 애니메이션 없이 전환되도록 설정
          animation: 'none',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const [queryClient] = useState(() => new QueryClient());
  const { loadTokens, setTokens, accessToken } = useSession();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setButtonStyleAsync('dark');
      }

      // 기존 토큰 로드
      await loadTokens();

      // Mock 인증 활성화 시 자동 로그인
      if (isMockAuthEnabled() && !accessToken) {
        try {
          const mockTokens = await performMockLogin();
          await setTokens({
            accessToken: mockTokens.accessToken,
            refreshToken: mockTokens.refreshToken,
          });
          console.log('✅ Mock 로그인 완료!');
        } catch (error) {
          console.error('❌ Mock 로그인 실패:', error);
        }
      }
    })();
  }, [loadTokens, setTokens, accessToken]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // 폰트 로딩 중이거나 에러가 없으면 null 반환
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/**
         * React Query 전역 Provider
         * - 서버 상태(업로드 요청 등)를 전역적으로 캐싱/관리하기 위해 루트에 배치
         * - `useMutation`, `useQuery` 훅이 앱 어디서든 동작
         */}
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
