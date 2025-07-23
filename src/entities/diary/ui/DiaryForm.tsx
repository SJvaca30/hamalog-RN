import { Text, View } from 'react-native';

export const DiaryForm = () => {
  return (
    <View className="gap-y-6">
      <View>
        <Text className="mb-2">기분</Text>
        <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
          <Text className="text-gray-300">오늘의 기분을 선택하세요</Text>
        </View>
      </View>

      <View>
        <Text className="mb-2">스트레스 수준</Text>
        <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
          <Text className="text-gray-300">1-10 중 선택하세요</Text>
        </View>
      </View>

      <View>
        <Text className="mb-2">일기 내용</Text>
        <View className="rounded-lg border border-gray-150 bg-gray-50 p-3">
          <Text className="text-gray-300">오늘 하루를 기록해보세요</Text>
        </View>
      </View>
    </View>
  );
};
