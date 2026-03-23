import { useSession } from '@entities/session';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function ProtectedRoutesGate() {
  const segments = useSegments();
  const router = useRouter();
  const { accessToken, isLoaded } = useSession();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (accessToken && inAuthGroup) {
      router.replace('/(app)/(home)');
      return;
    }

    if (!accessToken && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [accessToken, isLoaded, router, segments]);

  return null;
}
