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

/**
 * 회원가입 API
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const { data: response } = await http.post<SignupResponse>(
    '/auth/signup',
    data
  );
  return response;
};

/**
 * 로그인 API
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response } = await http.post<LoginResponse>(
    '/auth/login',
    data
  );
  return response;
};

/**
 * 토큰 갱신 API
 * - shared http 인터셉터 순환을 피하기 위해 raw axios를 사용합니다.
 */
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

/**
 * 로그아웃 API
 */
export const logout = async (): Promise<LogoutResponse> => {
  const { data: response } = await http.post<LogoutResponse>('/auth/logout');
  return response;
};

/**
 * CSRF 토큰 발급 API
 * JWT 인증 필수. Redis 기반 토큰 저장소에 60분 TTL로 저장됩니다.
 */
export const getCsrfToken = async (): Promise<CsrfTokenResponse> => {
  const { data } = await http.get<CsrfTokenResponse>('/auth/csrf-token');
  if (__DEV__) {
    console.log('[CSRF][token] response:', JSON.stringify(data)?.slice(0, 300));
  }
  return data;
};

/**
 * CSRF 토큰 상태 확인 API
 * JWT 인증 필수. Redis에 저장된 토큰 존재 여부/TTL 확인.
 */
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

/**
 * 이메일 형식 체크 (Zod 스키마 활용)
 *
 * 보안상의 이유로 실제 중복 체크는 회원가입 시점에서 처리합니다.
 * 이는 많은 실제 서비스들이 사용하는 안전한 패턴입니다.
 */
export const validateEmailFormat = async (
  email: string
): Promise<EmailCheckResult> => {
  // 기존 Zod 스키마 활용 (DRY 원칙 준수)
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    // Zod 에러 메시지 중 첫 번째 사용
    throw new Error(
      result.error.issues[0]?.message || '올바른 이메일 형식을 입력해주세요'
    );
  }

  // 로컬 검증만 수행 - 실제 중복 체크는 회원가입 시점에서
  return {
    exists: false, // 항상 false (실제 체크는 회원가입 시점)
    email: result.data,
  };
};
