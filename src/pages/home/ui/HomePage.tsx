import { CreateRecordFAB } from '@features';
import { HomeHeaderHama } from '@widgets/home-header-hama';
import { HomeWelcome } from '@widgets/home-welcome';
import { WeeklyMedicationStatus } from '@widgets/weekly-medication-status';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <HomeHeaderHama />
      <HomeWelcome />
      <WeeklyMedicationStatus />
      <CreateRecordFAB />
    </SafeAreaView>
  );
};
