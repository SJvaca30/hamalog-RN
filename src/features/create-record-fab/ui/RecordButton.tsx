import { colors } from '@shared/config/colors';
import { RecordIcon } from '@shared/ui/icons';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRecordFAB } from '../model';

export const RecordButton = () => {
  const { toggle, isOpen } = useCreateRecordFAB();
  const { bottom } = useSafeAreaInsets();
  console.log('bottom: ', bottom);
  if (isOpen) {
    return null;
  }

  return (
    <Pressable
      className="absolute bottom-[9] right-4 h-12 w-12 items-center justify-center rounded-[18px] bg-gray-850 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)]"
      onPress={toggle}>
      <RecordIcon size={24} color={colors.gray[50]} />
    </Pressable>
  );
};
