import { Text, View } from 'react-native';

import { Container } from '@shared';

export const ReportPage = () => {
  return (
    <Container bg="bg-gray-50" className="flex-1 items-center justify-center">
      <View>
        <Text className="mb-2 text-center text-2xl font-bold">리포트</Text>
        <Text className="text-center text-base text-gray-500">
          증상 및 활동 기록 리포트
        </Text>
      </View>
    </Container>
  );
};
