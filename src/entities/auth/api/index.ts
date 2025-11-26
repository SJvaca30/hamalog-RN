import { http } from '@shared/api/http';
import { isMockAuthEnabled, performMockLogin } from '@shared/lib/mock-auth';

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
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 회원가입 성공');
    await new Promise(resolve => setTimeout(resolve, 500)); // 지연 시뮬레이션
    return '회원가입이 성공적으로 완료되었습니다';
  }

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
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    const mockData = await performMockLogin();
    // 500ms 지연 시뮬레이션 (performMockLogin 내부엔 지연 없음)
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      token: mockData.accessToken,
      refreshToken: mockData.refreshToken,
      expiresIn: mockData.expiresIn,
    };
  }

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
  // Mock 환경 처리
  if (isMockAuthEnabled()) {
    console.log('🔧 [개발 모드] Mock 로그아웃 성공');
    return '로그아웃이 성공적으로 처리되었습니다';
  }

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
