import HomeHeader from '@widgets/home-header/ui/HomeHeader';
import { SafeAreaView } from 'react-native';

export const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HomeHeader />
    </SafeAreaView>
  );
};
