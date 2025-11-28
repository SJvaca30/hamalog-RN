import { http } from '@shared/api/http';

import {
  EmailCheckResult,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
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
 * 로그아웃 API
 */
export const logout = async (): Promise<LogoutResponse> => {
  const { data: response } = await http.post<LogoutResponse>('/auth/logout');
  return response;
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
