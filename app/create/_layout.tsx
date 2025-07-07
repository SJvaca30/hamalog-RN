import { HeaderBackButton } from '@react-navigation/elements';
import { Stack, useRouter } from 'expo-router';
import { Platform } from 'react-native';

export default function CreateLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8fafc',
        },
        headerTintColor: '#1f2937',
        headerTitleStyle: {
          fontWeight: '600',
        },
        presentation: 'card',
        // iOS에서만 HeaderBackButton 표시, Android는 기본 뒤로가기 버튼 사용
        ...(Platform.OS === 'ios' && {
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.push('/(tabs)/(home)/');
                }
              }}
            />
          ),
        }),
      }}>
      <Stack.Screen
        name="medication"
        options={{
          title: '복약 스케줄 추가',
        }}
      />
      <Stack.Screen
        name="symptom"
        options={{
          title: '증상 기록',
        }}
      />
      <Stack.Screen
        name="sleep"
        options={{
          title: '수면/기상 기록',
        }}
      />
      <Stack.Screen
        name="diary"
        options={{
          title: '마음 일기',
        }}
      />
    </Stack>
  );
}
