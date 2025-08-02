import { colors } from '@shared/config';
import { Typography } from '@shared/ui/Typography';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function CreateLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.gray[0],
        },
        headerTintColor: colors.gray[850],
        presentation: 'card',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="medication"
        options={{
          headerTitle: () => (
            <Typography variant="h1">복약 스케줄 추가</Typography>
          ),
          headerLeft: () => (
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <ArrowLeftIcon />
            </Pressable>
          ),
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
