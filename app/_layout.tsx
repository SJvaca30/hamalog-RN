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

// Splash screen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

const useProtectedRoutes = () => {
  const segments = useSegments();
  const router = useRouter();
  const { accessToken, isLoaded } = useSession();

  useEffect(() => {
    console.log('🔍 라우팅 상태:', {
      isLoaded,
      accessToken: !!accessToken,
      segments: segments.join('/'),
      currentSegment: segments[0],
    });

    if (!isLoaded) {
      console.log('🔍 세션 로딩 중...');
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    console.log('🔍 현재 위치 분석:', { inAuthGroup });

    if (accessToken && inAuthGroup) {
      console.log('🔍 로그인된 사용자가 auth 페이지에 있음 → 홈으로 이동');
      router.replace('/(app)/(home)');
    } else if (!accessToken && !inAuthGroup) {
      console.log('🔍 비로그인 사용자가 앱 내부에 있음 → 로그인으로 이동');
      router.replace('/(auth)/login');
    } else {
      console.log('🔍 라우팅 변경 없음');
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
        name="(auth)/login"
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
  const { loadTokens } = useSession();

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setButtonStyleAsync('dark');
      }
      await loadTokens();
    })();
  }, [loadTokens]);

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
