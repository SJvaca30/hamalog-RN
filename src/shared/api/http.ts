import axios from 'axios';

import { useSessionStore } from '@entities/session/model/session.store';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 요청 인터셉터: 모든 요청에 JWT 토큰 추가
http.interceptors.request.use(
  config => {
    // React Hook이 아니므로 getState()로 직접 상태 조회
    const accessToken = useSessionStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 공통 처리
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.log('Unauthorized, redirect to login');
      // 401 에러 발생 시 토큰 초기화 및 로그인 화면으로 리다이렉트
      useSessionStore.getState().clearTokens();
    }
    return Promise.reject(error);
  }
);
