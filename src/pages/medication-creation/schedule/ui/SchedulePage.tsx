import { PageContainer } from '@shared/ui/PageContainer';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { Text } from 'react-native';

export function SchedulePage() {
  return (
    <PageContainer>
      <MedicationCreationStepper variant="schedule" />
      <Text>SchedulePage</Text>
    </PageContainer>
  );
}
