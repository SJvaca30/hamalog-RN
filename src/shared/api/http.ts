import axios from 'axios';

import { useSessionStore } from '@entities/session/model/session.store';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 요청 인터셉터: 모든 요청에 JWT 토큰 및 CSRF 토큰 추가
http.interceptors.request.use(
  config => {
    // React Hook이 아니므로 getState()로 직접 상태 조회
    const { accessToken, csrfToken } = useSessionStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // POST, PUT, DELETE, PATCH 요청 시 CSRF 토큰 추가
    const method = config.method?.toUpperCase();
    if (
      csrfToken &&
      method &&
      ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)
    ) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// 응답 인터셉터: 에러 공통 처리 및 토큰 갱신
http.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 에러이고, 아직 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useSessionStore.getState().refreshToken;

        if (refreshToken) {
          // 토큰 갱신 요청
          const { data } = await axios.post<RefreshTokenResponse>(
            `${BASE_URL}/auth/refresh`,
            {
              refreshToken,
            }
          );

          // 새 토큰 저장 (Store 업데이트) - snake_case 응답 형식 대응
          await useSessionStore
            .getState()
            .setTokens(data.access_token, data.refresh_token);

          // 실패했던 요청에 새 토큰 적용 후 재시도
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
          return http(originalRequest);
        }
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃 처리
        console.log('Token refresh failed, redirecting to login', refreshError);
        await useSessionStore.getState().clearTokens();
      }
    }

    return Promise.reject(error);
  }
);
