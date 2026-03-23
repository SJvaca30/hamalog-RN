import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../../../global.css';

import { setupHttpClient } from '@application/init/setup-http-client';
import { AppNavigator } from '@application/navigation/AppNavigator';
import { getCsrfToken } from '@entities/auth';
import { useSession, useSessionStore } from '@entities/session';
import { customFontsToLoad } from '@shared/config';

SplashScreen.preventAutoHideAsync();

export function AppRoot() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const [queryClient] = useState(() => new QueryClient());
  const { loadTokens, accessToken } = useSession();
  const csrfFetchedRef = useRef(false);

  useEffect(() => setupHttpClient(), []);

  useEffect(() => {
    void (async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setButtonStyleAsync('dark');
      }

      await loadTokens();
    })();
  }, [loadTokens]);

  useEffect(() => {
    if (!accessToken) {
      csrfFetchedRef.current = false;
      return;
    }

    if (csrfFetchedRef.current) {
      return;
    }

    void getCsrfToken()
      .then(data => {
        if (data.csrfToken) {
          useSessionStore.getState().setCsrfToken(data.csrfToken);
          csrfFetchedRef.current = true;
        }
      })
      .catch(error => {
        console.warn('앱 초기화: CSRF 토큰 갱신 실패', error);
      });
  }, [accessToken]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
