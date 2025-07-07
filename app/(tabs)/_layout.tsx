import { colors } from '@shared';
import { Text } from '@shared/ui';
import HomeIcon from 'assets/svg/HomeIcon';
import ProfileIcon from 'assets/svg/ProfileIcon';
import ReportIcon from 'assets/svg/ReportIcon';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[400], // 디자인 시스템 색상 사용
        tabBarInactiveTintColor: colors.gray[500], // 디자인 시스템 색상 사용
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.gray[0], // 디자인 시스템 색상 사용
          borderTopWidth: 0,
          elevation: 24, // Android shadow
          shadowOffset: { width: 0, height: -2 }, // iOS shadow
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowColor: '#000000',
          paddingBottom: Platform.OS === 'ios' ? 28 : 7, // Safe area for iOS
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 88 : 60,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          tabBarIcon: ({ focused, size }) => (
            <HomeIcon isActive={focused} size={size} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="caption-primary"
              className={focused ? 'text-primary-400' : 'text-gray-500'}>
              홈
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: '리포트',
          tabBarIcon: ({ focused, size }) => (
            <ReportIcon isActive={focused} size={size} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="caption-primary"
              className={focused ? 'text-primary-400' : 'text-gray-500'}>
              리포트
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '마이',
          tabBarIcon: ({ focused, size }) => (
            <ProfileIcon isActive={focused} size={size} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              variant="caption-primary"
              className={focused ? 'text-primary-400' : 'text-gray-500'}>
              마이
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
