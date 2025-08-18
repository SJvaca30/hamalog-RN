import { CreateRecordFAB } from '@features/create-record-fab';
import { PageContainer } from '@shared/ui/PageContainer';
import { HomeHeaderHama } from '@widgets/home-header-hama';
import { HomeWelcome } from '@widgets/home-welcome';
import { WeeklyMedicationStatus } from '@widgets/weekly-medication-status';

export const HomePage = () => {
  return (
    <PageContainer bg="bg-gray-50">
      <HomeHeaderHama />
      <HomeWelcome />
      <WeeklyMedicationStatus />
      <CreateRecordFAB />
    </PageContainer>
  );
};
