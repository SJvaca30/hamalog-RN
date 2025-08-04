import { View } from 'react-native';
import { Step } from './Step';

type Props = {
  variant: 'register' | 'schedule';
};

export const MedicationCreationStepper = ({ variant }: Props) => {
  return (
    <View className="flex-row items-center gap-1">
      <Step variant={variant} />
    </View>
  );
};
