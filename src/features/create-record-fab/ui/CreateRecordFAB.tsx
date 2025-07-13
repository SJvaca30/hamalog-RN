import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors } from '@shared/config/colors';
import { Text } from '@shared/ui';
import { CloseIcon, RecordIcon } from '@shared/ui/icons';
import { useRouter } from 'expo-router';
import { Modal, Pressable, View } from 'react-native';
import { useCreateRecordFAB } from '../model';

const MENU_ITEMS = [
  { href: '/create/medication', label: '복약 스케줄 추가' },
  { href: '/create/symptom', label: '증상 기록' },
  { href: '/create/sleep', label: '수면 시간 기록' },
  { href: '/create/diary', label: '마음 일기' },
];

export const CreateRecordFAB = () => {
  const router = useRouter();
  const { isOpen, toggle } = useCreateRecordFAB();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleMenuPress = (href: string) => {
    toggle();
    router.push(href as `http${string}`);
  };

  return (
    <>
      <Modal
        statusBarTranslucent
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={toggle}>
        <Pressable
          className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"
          onPress={toggle}
        />
        {isOpen && (
          <View
            className="absolute right-4 items-end"
            style={{ bottom: bottomTabBarHeight + 9 }}>
            <View className="mb-4 w-52 rounded-2xl bg-white p-2 shadow-lg">
              {MENU_ITEMS.map(item => (
                <Pressable
                  key={item.href}
                  className="flex-row items-center rounded-lg p-3"
                  onPress={() => handleMenuPress(item.href)}>
                  <Text className="ml-3 text-base font-semibold">
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              className="h-12 w-12 items-center justify-center rounded-[18px] bg-gray-0"
              onPress={toggle}>
              <CloseIcon size={24} color={colors.gray[700]} />
            </Pressable>
          </View>
        )}
      </Modal>

      <View className="absolute bottom-[9] right-4 items-end">
        {!isOpen && (
          <Pressable
            className="h-12 w-12 items-center justify-center rounded-[18px] bg-gray-850 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)]"
            onPress={toggle}>
            <RecordIcon size={24} color={colors.gray[50]} />
          </Pressable>
        )}
      </View>
    </>
  );
};
