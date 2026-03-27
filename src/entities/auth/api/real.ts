import axios from 'axios';

import { http } from '@shared/api/http';
import { env } from '@shared/config';

import {
  CsrfStatusResponse,
  CsrfTokenResponse,
  EmailCheckResult,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
} from '../model/types';
import { emailSchema } from '../model/validation';

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const { data: response } = await http.post<SignupResponse>(
    '/auth/signup',
    data
  );
  return response;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response } = await http.post<LoginResponse>(
    '/auth/login',
    data
  );
  return response;
};

export const refreshTokens = async (
  data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const { data: response } = await axios.post<RefreshTokenResponse>(
    `${env.apiBaseUrl}/auth/refresh`,
    data,
    {
      timeout: 10000,
      withCredentials: true,
    }
  );

  return response;
};

export const logout = async (): Promise<LogoutResponse> => {
  const { data: response } = await http.post<LogoutResponse>('/auth/logout');
  return response;
};

export const getCsrfToken = async (): Promise<CsrfTokenResponse> => {
  const { data } = await http.get<CsrfTokenResponse>('/auth/csrf-token');
  if (__DEV__) {
    console.log('[CSRF][token] response:', JSON.stringify(data)?.slice(0, 300));
  }
  return data;
};

export const getCsrfStatus = async (): Promise<CsrfStatusResponse> => {
  const { data } = await http.get<CsrfStatusResponse>('/auth/csrf-status');
  if (__DEV__) {
    console.log(
      '[CSRF][status] response:',
      JSON.stringify(data)?.slice(0, 300)
    );
  }
  return data;
};

export const validateEmailFormat = async (
  email: string
): Promise<EmailCheckResult> => {
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    throw new Error(
      result.error.issues[0]?.message || '올바른 이메일 형식을 입력해주세요'
    );
  }

  return {
    exists: false,
    email: result.data,
  };
};
