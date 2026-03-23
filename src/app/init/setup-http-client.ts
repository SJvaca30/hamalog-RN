import { getCsrfToken, refreshTokens } from '@entities/auth';
import { useSessionStore } from '@entities/session';
import { configureHttpClient } from '@shared/api';

let teardownHttpClient: (() => void) | null = null;

export function setupHttpClient() {
  if (teardownHttpClient) {
    return teardownHttpClient;
  }

  teardownHttpClient = configureHttpClient({
    getAccessToken: () => useSessionStore.getState().accessToken,
    getRefreshToken: () => useSessionStore.getState().refreshToken,
    getCsrfTokenValue: () => useSessionStore.getState().csrfToken,
    setTokens: (accessToken, refreshToken) =>
      useSessionStore.getState().setTokens(accessToken, refreshToken),
    setCsrfToken: token => {
      useSessionStore.getState().setCsrfToken(token);
    },
    clearSession: () => useSessionStore.getState().clearTokens(),
    refreshAccessToken: refreshToken => refreshTokens({ refreshToken }),
    refreshCsrfToken: getCsrfToken,
  });

  return () => {
    teardownHttpClient?.();
    teardownHttpClient = null;
  };
}
