import { colors } from '@shared/config/colors';
import { Text } from '@shared/ui';
import { CloseIcon } from '@shared/ui/icons';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCreateRecordFAB } from '../model';

const MENU_ITEMS = [
  { href: '/create/medication', label: '복약 스케줄 추가' },
  { href: '/create/symptom', label: '증상 기록' },
  { href: '/create/sleep', label: '수면 시간 기록' },
  { href: '/create/diary', label: '마음 일기' },
];

export const RecordMenu = () => {
  const router = useRouter();
  const { toggle } = useCreateRecordFAB();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const handleMenuPress = (href: string) => {
    toggle();
    router.push(href as `http${string}`);
  };

  return (
    <View
      style={{ bottom: bottomInset + 59 }}
      className="absolute right-4 items-end">
      <View className="mb-4 w-52 rounded-2xl bg-white p-2 shadow-lg">
        {MENU_ITEMS.map(item => (
          <Pressable
            key={item.href}
            className="flex-row items-center rounded-lg p-3"
            onPress={() => handleMenuPress(item.href)}>
            <Text className="ml-3 text-base font-semibold">{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        className="h-12 w-12 items-center justify-center rounded-[18px] bg-gray-0"
        onPress={toggle}>
        <CloseIcon size={24} color={colors.gray[700]} />
      </Pressable>
    </View>
  );
};
