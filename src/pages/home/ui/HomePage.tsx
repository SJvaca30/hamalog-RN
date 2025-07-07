import { Box, Container, Text } from '@shared';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export const HomePage = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <Container bg="bg-gray-50" className="flex-1 items-center justify-center">
      <Box className="p-5 text-center">
        <Text variant="display" align="center">
          홈
        </Text>
        <Text
          variant="body-1"
          color="text-gray-500"
          align="center"
          className="mb-10 mt-2">
          무엇을 기록해볼까요?
        </Text>
      </Box>

      <View className="w-full max-w-sm gap-y-4 px-5">
        <TouchableOpacity
          className="items-center rounded-xl bg-primary-400 py-4 shadow-md"
          onPress={() => handleNavigate('/create/medication')}>
          <Text variant="button-medium" color="text-gray-0">
            💊 복약 스케줄 추가
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center rounded-xl bg-primary-400 py-4 shadow-md"
          onPress={() => handleNavigate('/create/symptom')}>
          <Text variant="button-medium" color="text-gray-0">
            🩺 증상 기록
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center rounded-xl bg-primary-400 py-4 shadow-md"
          onPress={() => handleNavigate('/create/sleep')}>
          <Text variant="button-medium" color="text-gray-0">
            😴 수면/기상 기록
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center rounded-xl bg-primary-400 py-4 shadow-md"
          onPress={() => handleNavigate('/create/diary')}>
          <Text variant="button-medium" color="text-gray-0">
            📝 마음 일기
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};
