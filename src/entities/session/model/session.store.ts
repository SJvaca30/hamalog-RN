import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoaded: boolean; // SecureStore에서 토큰을 불러왔는지 여부
}

interface SessionActions {
  setTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
}

export const useSessionStore = create<SessionState & SessionActions>(set => ({
  accessToken: null,
  refreshToken: null,
  isLoaded: false,

  setTokens: async ({ accessToken, refreshToken }) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    set({ accessToken, refreshToken });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ accessToken: null, refreshToken: null });
  },

  loadTokens: async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    console.log('SecureStore에서 토큰 로딩 시작, 토큰 로딩 완료:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    });
    set({ accessToken, refreshToken, isLoaded: true });
  },
}));

export const useSession = () => useSessionStore(state => state);
