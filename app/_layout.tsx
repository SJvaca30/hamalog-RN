import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// 글로벌 CSS 임포트
import '../global.css';

// Splash screen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 폰트 로딩 (Figma Typography 시스템)
  const [loaded, error] = useFonts({
    // Pretendard 폰트
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    // HSYuji 폰트
    'HSYuji-Regular': require('../assets/fonts/HSYuji.ttf'),
    // Paperlogy 폰트 (모든 weight)
    'Paperlogy-Light': require('../assets/fonts/Paperlogy-3Light.ttf'),
    'Paperlogy-Regular': require('../assets/fonts/Paperlogy-4Regular.ttf'),
    'Paperlogy-Medium': require('../assets/fonts/Paperlogy-5Medium.ttf'),
    'Paperlogy-SemiBold': require('../assets/fonts/Paperlogy-6SemiBold.ttf'),
    'Paperlogy-Bold': require('../assets/fonts/Paperlogy-7Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // 폰트 로딩 중이거나 에러가 없으면 null 반환
  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="create" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
