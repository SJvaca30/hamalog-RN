import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 글로벌 CSS 임포트
import '../global.css';

import { RecordMenu } from '@features/create-record-fab';
import { useCreateRecordFAB } from '@features/create-record-fab/model';
import { useTabStore } from '@shared/stores/use-tab-store';
import { Modal, Pressable } from 'react-native';
import { customFontsToLoad } from '../src/shared/config/font-map';

// Splash screen을 자동으로 숨기지 않도록 설정
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const { isOpen, toggle } = useCreateRecordFAB();
  const activeTab = useTabStore(state => state.activeTab);

  const isHomeScreen = activeTab === 'home';

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
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="create" />
      </Stack>
      <Modal
        statusBarTranslucent
        transparent
        visible={isOpen && isHomeScreen}
        animationType="fade"
        onRequestClose={toggle}>
        <Pressable
          className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"
          onPress={toggle}
        />
        <RecordMenu />
      </Modal>
    </SafeAreaProvider>
  );
}
