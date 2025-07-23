import { DiaryForm } from '@entities';
import { Box, Container, Text } from '@shared';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';

export const DiaryPage = () => {
  const router = useRouter();

  const handleSave = () => {
    // 저장 로직 구현
    console.log('마음 일기 저장');
    router.back();
  };

  return (
    <Container bg="bg-gray-0" className="flex-1">
      <ScrollView contentContainerClassName="p-5">
        <Box className="mb-10">
          <Text variant="h1" align="center">
            마음 일기
          </Text>
          <Text
            variant="body-1"
            color="text-gray-500"
            align="center"
            className="mt-2">
            오늘의 마음을 기록해보세요
          </Text>
        </Box>

        <DiaryForm />

        <TouchableOpacity
          className="mt-10 items-center rounded-xl bg-primary-400 py-4 shadow-md"
          onPress={handleSave}>
          <Text variant="button-medium" color="text-gray-0">
            저장하기
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};
