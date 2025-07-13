import { usePathname } from 'expo-router';
import { useEffect } from 'react';

import { useTabStore } from '../stores/use-tab-store';

export function useListenActiveTab() {
  const pathname = usePathname();
  const setActiveTab = useTabStore(state => state.setActiveTab);
  const activeTab = useTabStore(state => state.activeTab);

  console.log('pathname입니다: ', pathname);
  console.log('activeTab입니다: ', activeTab);

  useEffect(() => {
    switch (pathname) {
      case '/':
        setActiveTab('home');
        break;
      case '/report':
        setActiveTab('report');
        break;
      case '/profile':
        setActiveTab('profile');
        break;
      default:
        setActiveTab(null);
        break;
    }
  }, [pathname, setActiveTab]);
}
