import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '@shared';
import { ICON_SIZES } from '@shared/constants/sizes';
import { Text } from '@shared/ui';
import HomeIcon from 'assets/svg/HomeIcon';
import ProfileIcon from 'assets/svg/ProfileIcon';
import ReportIcon from 'assets/svg/ReportIcon';
import { Tabs } from 'expo-router';
import { Shadow } from 'react-native-shadow-2';

const CustomTabBar = (props: BottomTabBarProps) => {
  return (
    <Shadow
      distance={12}
      startColor="rgba(0, 0, 0, 0.15)"
      endColor="rgba(0, 0, 0, 0)"
      offset={[0, -2]}
      style={{ width: '100%' }}>
      <BottomTabBar {...props} />
    </Shadow>
  );
};

export function MainBottomTabs() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // 탭 바 자체의 스타일을 지정
        tabBarStyle: {
          backgroundColor: colors.gray[0],
          paddingTop: 12,
          height: 85,
          // 상단 경계선
          borderTopWidth: 0,
        },
        // 각 탭 아이템(아이콘 + 라벨)의 스타일을 지정
        tabBarItemStyle: {
          // 아이콘과 라벨 사이의 간격
          gap: 4,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              isActive={focused}
              activeColor={colors.primary[400]}
              inactiveColor={colors.gray[500]}
              size={ICON_SIZES.M}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="button-small"
              color={focused ? 'text-primary-400' : 'text-gray-500'}>
              홈
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: '리포트',
          tabBarIcon: ({ focused }) => (
            <ReportIcon
              isActive={focused}
              activeColor={colors.primary[400]}
              inactiveColor={colors.gray[500]}
              size={ICON_SIZES.M}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="button-small"
              color={focused ? 'text-primary-400' : 'text-gray-500'}>
              리포트
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '마이',
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              isActive={focused}
              activeColor={colors.primary[400]}
              inactiveColor={colors.gray[500]}
              size={ICON_SIZES.M}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="button-small"
              color={focused ? 'text-primary-400' : 'text-gray-500'}>
              마이
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
