import { PageContainer } from '@shared/ui/PageContainer';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { Text } from 'react-native';

export function RegisterPage() {
  return (
    <PageContainer>
      <MedicationCreationStepper variant="schedule" />
      <Text>RegisterPage</Text>
    </PageContainer>
  );
}
