import { Text, View } from 'react-native';

import { Container } from '@shared';

export const ProfilePage = () => {
  return (
    <Container bg="bg-gray-50" className="flex-1 items-center justify-center">
      <View>
        <Text className="mb-2 text-center text-2xl font-bold">마이</Text>
        <Text className="text-center text-base text-gray-500">
          개인 설정 및 프로필 관리
        </Text>
      </View>
    </Container>
  );
};
