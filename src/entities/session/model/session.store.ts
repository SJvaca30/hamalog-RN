import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface DecodedToken {
  sub: string; // loginId (email) 또는 memberId (백엔드 구현에 따라 다름)
  memberId?: number | string;
  id?: number | string;
  member_id?: number | string;
  userId?: number | string;
  user_id?: number | string;
  exp: number;
  [key: string]: unknown;
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

    // 디버그: JWT payload 전체 출력 (개발 환경에서만)
    if (__DEV__) {
      console.log('[Session] JWT payload:', JSON.stringify(decoded, null, 2));
    }

    // memberId, id, member_id, userId, user_id 등 다양한 필드 검색
    // 숫자 타입이 아닌 경우 파싱 시도
    const possibleFields = [
      decoded.memberId,
      decoded.id,
      decoded.member_id,
      decoded.userId,
      decoded.user_id,
    ];

    for (const field of possibleFields) {
      if (field !== undefined && field !== null) {
        const numericValue =
          typeof field === 'number' ? field : parseInt(String(field), 10);
        if (!isNaN(numericValue)) {
          if (__DEV__) {
            console.log('[Session] memberId 추출 성공:', numericValue);
          }
          return numericValue;
        }
      }
    }

    // sub 필드가 숫자인 경우 (일부 백엔드에서 sub에 memberId를 넣음)
    if (decoded.sub) {
      const subAsNumber = parseInt(decoded.sub, 10);
      if (!isNaN(subAsNumber)) {
        if (__DEV__) {
          console.log('[Session] sub 필드에서 memberId 추출:', subAsNumber);
        }
        return subAsNumber;
      }
    }

    if (__DEV__) {
      console.warn(
        '[Session] JWT에서 memberId를 찾을 수 없음. payload keys:',
        Object.keys(decoded)
      );
    }
    return null;
  } catch (e) {
    if (__DEV__) {
      console.error('[Session] JWT 디코딩 실패:', e);
    }
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

    if (__DEV__) {
      console.log('SecureStore에서 토큰 로딩 완료:', {
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
        memberId,
      });
    }
    set({ accessToken, refreshToken, memberId, isLoaded: true });
  },

  // 개발용: Mock 인증이 비활성화되었을 때 토큰 자동 클리어
  clearTokensIfMockDisabled: async () => {
    const { env } = await import('@shared/config/env');
    if (!env.mockAuth.enabled) {
      if (__DEV__) {
        console.log('🔧 Mock 인증이 비활성화됨 - 기존 토큰 클리어');
      }
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      set({ accessToken: null, refreshToken: null, memberId: null });
    }
  },
}));

export const useSession = () => useSessionStore(state => state);
