import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { colors } from '@shared';
import { ICON_SIZES } from '@shared/constants/sizes';
import { useTabStore } from '@shared/stores/use-tab-store';
import { HomeIcon, ProfileIcon, ReportIcon, Text } from '@shared/ui';

// 이 컴포넌트는 현재 활성화된 탭 상태를 업데이트하는 로직을 담당합니다.
// 화면에는 아무것도 렌더링하지 않습니다.
function TabStateUpdater() {
  const setActiveTab = useTabStore(state => state.setActiveTab);
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    // 네비게이션 상태가 처음에는 undefined일 수 있습니다.
    if (navigationState) {
      const currentRoute = navigationState.routes[navigationState.index];
      // Expo Router는 그룹화된 경로를 (group)으로 표현할 수 있습니다.
      // 일관성을 위해 '(home)'을 'home'으로 정규화합니다.
      const currentTab = currentRoute.name.replace(/\(home\)/, 'home');
      setActiveTab(currentTab);
    }
  }, [navigationState, setActiveTab]);

  return null;
}

const CustomTabBar = (props: BottomTabBarProps) => {
  return (
    // figma 요구사항이랑 다름. figma 요구사항처럼 만들면 디자인이 다르게 나옴.
    // figma 요구사항: box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.15)
    <Shadow
      distance={Platform.OS === 'ios' ? 34 : 30}
      startColor="rgba(0, 0, 0, 0.15)"
      offset={Platform.OS === 'ios' ? [0, 22] : [0, 15]}
      style={{ width: '100%' }}>
      <BottomTabBar {...props} />
    </Shadow>
  );
};

export function MainBottomTabs() {
  return (
    <Tabs
      tabBar={props => (
        <>
          <TabStateUpdater />
          <CustomTabBar {...props} />
        </>
      )}
      screenOptions={{
        headerShown: false,
        // 탭 바 자체의 스타일을 지정
        tabBarStyle: {
          backgroundColor: colors.gray[0], // 기본값이랑 같지만 명시적으로 지정
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
