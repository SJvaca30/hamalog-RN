import { CreateRecordFAB } from '@features';
import { HomeHeaderHama, HomeWelcome } from '@widgets';
import { WeeklyMedicationStatus } from '@widgets/weekly-medication-status/ui/WeeklyMedicationStatus';
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
