import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  isLoaded: boolean; // SecureStore에서 토큰을 불러왔는지 여부
}

interface SessionActions {
  setTokens: (tokens: { accessToken: string }) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
  clearTokensIfMockDisabled: () => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>(set => ({
  accessToken: null,
  isLoaded: false,

  setTokens: async ({ accessToken }) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    set({ accessToken });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    set({ accessToken: null });
  },

  loadTokens: async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    console.log('SecureStore에서 토큰 로딩 시작, 토큰 로딩 완료:', {
      hasAccessToken: !!accessToken,
    });
    set({ accessToken, isLoaded: true });
  },

  // 개발용: Mock 인증이 비활성화되었을 때 토큰 자동 클리어
  clearTokensIfMockDisabled: async () => {
    const { env } = await import('@shared/config/env');
    if (!env.mockAuth.enabled) {
      console.log('🔧 Mock 인증이 비활성화됨 - 기존 토큰 클리어');
      await SecureStore.deleteItemAsync('accessToken');
      set({ accessToken: null });
    }
  },
}));

export const useSession = () => useSessionStore(state => state);
