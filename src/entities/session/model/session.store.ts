import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoaded: boolean; // SecureStore에서 토큰을 불러왔는지 여부
}

interface SessionActions {
  setTokens: (
    accessToken: string,
    refreshToken?: string | null
  ) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
  clearTokensIfMockDisabled: () => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>(set => ({
  accessToken: null,
  refreshToken: null,
  isLoaded: false,

  setTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    if (refreshToken) {
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } else {
      await SecureStore.deleteItemAsync('refreshToken');
    }
    set({ accessToken, refreshToken: refreshToken || null });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ accessToken: null, refreshToken: null });
  },

  loadTokens: async () => {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync('accessToken'),
      SecureStore.getItemAsync('refreshToken'),
    ]);
    console.log('SecureStore에서 토큰 로딩 완료:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });
    set({ accessToken, refreshToken, isLoaded: true });
  },

  // 개발용: Mock 인증이 비활성화되었을 때 토큰 자동 클리어
  clearTokensIfMockDisabled: async () => {
    const { env } = await import('@shared/config/env');
    if (!env.mockAuth.enabled) {
      console.log('🔧 Mock 인증이 비활성화됨 - 기존 토큰 클리어');
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      set({ accessToken: null, refreshToken: null });
    }
  },
}));

export const useSession = () => useSessionStore(state => state);
