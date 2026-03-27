import axios, { type InternalAxiosRequestConfig } from 'axios';

import { env } from '@shared/config';

const BASE_URL = env.apiBaseUrl;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface CsrfRefreshResponse {
  csrfToken?: string;
  csrf_token?: string;
  token?: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface HttpClientDependencies {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getCsrfTokenValue: () => string | null;
  setTokens: (
    accessToken: string,
    refreshToken?: string | null
  ) => Promise<void>;
  setCsrfToken: (token: string) => void;
  clearSession: () => Promise<void>;
  refreshAccessToken: (refreshToken: string) => Promise<RefreshTokenResponse>;
  refreshCsrfToken: () => Promise<CsrfRefreshResponse>;
}

let requestInterceptorId: number | null = null;
let responseInterceptorId: number | null = null;

const logHttpError = (error: unknown) => {
  if (!__DEV__) return;

  const httpError = error as {
    response?: { status?: number; headers?: unknown; data?: unknown };
    config?: {
      url?: string;
      method?: string;
      headers?: Record<string, unknown>;
    };
  };

  const dataPreview =
    typeof httpError.response?.data === 'string'
      ? httpError.response.data.slice(0, 300)
      : JSON.stringify(httpError.response?.data)?.slice(0, 300);

  console.warn('[HTTP][ERROR]', {
    url: httpError.config?.url,
    method: httpError.config?.method,
    status: httpError.response?.status,
    sentCsrf: httpError.config?.headers?.['X-CSRF-TOKEN'],
    sentAuth: httpError.config?.headers?.Authorization
      ? `${String(httpError.config.headers.Authorization).slice(0, 20)}...`
      : null,
    headers: httpError.response?.headers,
    dataPreview,
  });
};

export function configureHttpClient(deps: HttpClientDependencies) {
  if (requestInterceptorId !== null) {
    http.interceptors.request.eject(requestInterceptorId);
  }

  if (responseInterceptorId !== null) {
    http.interceptors.response.eject(responseInterceptorId);
  }

  requestInterceptorId = http.interceptors.request.use(
    config => {
      const accessToken = deps.getAccessToken();
      const csrfToken = deps.getCsrfTokenValue();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

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
    error => Promise.reject(error)
  );

  responseInterceptorId = http.interceptors.response.use(
    response => response,
    async error => {
      logHttpError(error);

      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = deps.getRefreshToken();
          if (!refreshToken) {
            throw error;
          }

          const tokenData = await deps.refreshAccessToken(refreshToken);
          await deps.setTokens(tokenData.access_token, tokenData.refresh_token);

          try {
            const csrfData = await deps.refreshCsrfToken();
            const refreshedCsrfToken =
              csrfData.csrfToken ?? csrfData.csrf_token ?? csrfData.token;
            if (refreshedCsrfToken) {
              deps.setCsrfToken(refreshedCsrfToken);
            }
          } catch (csrfError) {
            if (__DEV__) {
              console.warn('[HTTP][refresh] CSRF 재발급 실패', csrfError);
            }
          }

          originalRequest.headers.Authorization = `Bearer ${tokenData.access_token}`;
          return http(originalRequest);
        } catch (refreshError) {
          await deps.clearSession();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return () => {
    if (requestInterceptorId !== null) {
      http.interceptors.request.eject(requestInterceptorId);
      requestInterceptorId = null;
    }

    if (responseInterceptorId !== null) {
      http.interceptors.response.eject(responseInterceptorId);
      responseInterceptorId = null;
    }
  };
}
