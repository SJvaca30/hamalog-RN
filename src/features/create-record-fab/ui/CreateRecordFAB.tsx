import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import {
  CloseIcon,
  DiaryIcon,
  RecordIcon,
  ScheduleIcon,
  SleepIcon,
  SymptomIcon,
} from '@shared/ui/icons';
import { Href, useRouter } from 'expo-router';
import { Modal, Pressable } from 'react-native';
import { useCreateRecordFAB } from '../model/useCreateRecordFAB';
import { MenuItem } from './MenuItem';

const MENU_ITEMS = [
  {
    href: '/create/medication',
    label: '복약 스케줄 추가',
    Icon: ScheduleIcon,
  },
  { href: '/create/symptom', label: '증상 기록', Icon: SymptomIcon },
  { href: '/create/sleep', label: '수면 시간 기록', Icon: SleepIcon },
  { href: '/create/diary', label: '마음 일기', Icon: DiaryIcon },
] as const;

export const CreateRecordFAB = () => {
  const router = useRouter();
  const { isOpen, toggle } = useCreateRecordFAB();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleMenuPress = (href: Href) => {
    toggle();
    router.push(href);
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
          <Box
            className="absolute right-4 items-stretch gap-4"
            /* TabBar 높이 + 9, 절대 위치이기 때문에. */
            style={{ bottom: bottomTabBarHeight + 9 }}>
            <Box p="xs" bg="bg-gray-0" className="rounded-2xl">
              <MenuItem item={MENU_ITEMS[0]} onPress={handleMenuPress} />
            </Box>

            <Box
              p="xs"
              gap="sm"
              bg="bg-gray-0"
              className="items-stretch rounded-2xl">
              {MENU_ITEMS.slice(1).map(item => (
                <MenuItem
                  key={item.label}
                  item={item}
                  onPress={handleMenuPress}
                />
              ))}
            </Box>

            <Pressable
              className="h-12 w-12 items-center justify-center self-end rounded-[18px] bg-gray-0"
              onPress={toggle}>
              <CloseIcon size={24} color={colors.gray[700]} />
            </Pressable>
          </Box>
        )}
      </Modal>

      <Box
        className="absolute right-4 items-end"
        /* (TabBar 높이) + 9 */
        style={{ bottom: 9 }}>
        {!isOpen && (
          <Pressable
            className="h-12 w-12 items-center justify-center rounded-[18px] bg-gray-850 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.20)]"
            onPress={toggle}>
            <RecordIcon size={24} color={colors.gray[50]} />
          </Pressable>
        )}
      </Box>
    </>
  );
};
