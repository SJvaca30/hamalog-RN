import { Box, Container, Text } from '@shared';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';

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

        <View className="gap-y-6">
          <View>
            <Text variant="label" className="mb-2">
              기분
            </Text>
            <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
              <Text variant="body-1" color="text-gray-300">
                오늘의 기분을 선택하세요
              </Text>
            </View>
          </View>

          <View>
            <Text variant="label" className="mb-2">
              스트레스 수준
            </Text>
            <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
              <Text variant="body-1" color="text-gray-300">
                1-10 중 선택하세요
              </Text>
            </View>
          </View>

          <View>
            <Text variant="label" className="mb-2">
              일기 내용
            </Text>
            <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
              <Text variant="body-1" color="text-gray-300">
                오늘 하루를 기록해보세요
              </Text>
            </View>
          </View>
        </View>

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
