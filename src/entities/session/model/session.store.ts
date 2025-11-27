import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface DecodedToken {
  sub: string; // loginId (email)
  memberId?: number;
  id?: number;
  exp: number;
  [key: string]: any;
}

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  memberId: number | null;
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

const getMemberIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    // memberId나 id 필드를 우선 찾고, 없으면 null 반환
    return decoded.memberId || decoded.id || null;
  } catch (e) {
    console.error('Failed to decode JWT token:', e);
    return null;
  }
};

export const useSessionStore = create<SessionState & SessionActions>(set => ({
  accessToken: null,
  refreshToken: null,
  memberId: null,
  isLoaded: false,

  setTokens: async (accessToken, refreshToken) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    if (refreshToken) {
      await SecureStore.setItemAsync('refreshToken', refreshToken);
    } else {
      await SecureStore.deleteItemAsync('refreshToken');
    }

    const memberId = getMemberIdFromToken(accessToken);
    set({ accessToken, refreshToken: refreshToken || null, memberId });
  },

  clearTokens: async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    set({ accessToken: null, refreshToken: null, memberId: null });
  },

  loadTokens: async () => {
    const [accessToken, refreshToken] = await Promise.all([
      SecureStore.getItemAsync('accessToken'),
      SecureStore.getItemAsync('refreshToken'),
    ]);

    let memberId: number | null = null;
    if (accessToken) {
      memberId = getMemberIdFromToken(accessToken);
    }

    console.log('SecureStore에서 토큰 로딩 완료:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      memberId,
    });
    set({ accessToken, refreshToken, memberId, isLoaded: true });
  },

  // 개발용: Mock 인증이 비활성화되었을 때 토큰 자동 클리어
  clearTokensIfMockDisabled: async () => {
    const { env } = await import('@shared/config/env');
    if (!env.mockAuth.enabled) {
      console.log('🔧 Mock 인증이 비활성화됨 - 기존 토큰 클리어');
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      set({ accessToken: null, refreshToken: null, memberId: null });
    }
  },
}));

export const useSession = () => useSessionStore(state => state);
