import { Stack } from 'expo-router';

import { ProtectedRoutesGate } from '@application/navigation/ProtectedRoutesGate';

export function AppNavigator() {
  return (
    <>
      <ProtectedRoutesGate />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="create" />
        <Stack.Screen
          name="(auth)"
          options={{
            animation: 'none',
          }}
        />
      </Stack>
    </>
  );
}
