import { create } from 'zustand';

type TabState = {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
};

export const useTabStore = create<TabState>(set => ({
  activeTab: 'home', // 기본값
  setActiveTab: tab => set({ activeTab: tab }),
}));
