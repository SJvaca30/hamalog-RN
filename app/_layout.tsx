import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 글로벌 CSS 임포트
import '../global.css';

import { customFontsToLoad } from '../src/shared/config/font-map';

// Splash screen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

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
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="create" />
          </Stack>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
