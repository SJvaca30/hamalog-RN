import { HomeHeaderHama, HomeWelcome } from '@widgets';
import { SafeAreaView } from 'react-native';

export const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HomeHeaderHama />
      <HomeWelcome />
    </SafeAreaView>
  );
};
