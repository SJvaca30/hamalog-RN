/**
 * 회원가입 요청 DTO
 */
export interface SignupRequest {
  loginId: string; // 이메일
  password: string;
  name: string;
  nickName: string; // 한글/영어 1-10자
  phoneNumber: string;
  birth: string; // "YYYY-MM-DD"
}

/**
 * 로그인 요청 DTO
 */
export interface LoginRequest {
  loginId: string; // 이메일
  password: string;
}

/**
 * 로그인 응답 DTO (snake_case)
 */
export interface LoginResponse {
  access_token: string; // JWT 액세스 토큰
  refresh_token: string; // JWT 리프레시 토큰
  expires_in: number; // 액세스 토큰 만료 시간 (초)
  token_type: string; // "Bearer"
}

/**
 * 토큰 갱신 요청 DTO
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 토큰 갱신 응답 DTO (snake_case)
 */
export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/**
 * 회원가입 응답 - 단순 문자열
 */
export type SignupResponse = string; // "회원가입이 성공적으로 완료되었습니다"

/**
 * 로그아웃 응답 - 단순 문자열
 */
export type LogoutResponse = string; // "로그아웃이 성공적으로 처리되었습니다"

/**
 * API 에러 응답 형식
 */
export interface ApiErrorResponse {
  error: string; // 에러 코드
  message: string; // 에러 메시지
  timestamp: string; // ISO-8601 형식
}

/**
 * CSRF 토큰 응답 DTO
 */
export interface CsrfTokenResponse {
  csrfToken: string;
  headerName: string; // "X-CSRF-TOKEN"
  expiryMinutes: number; // 60
  timestamp: string; // ISO-8601
}

/**
 * CSRF 상태 응답 DTO
 */
export interface CsrfStatusResponse {
  userId: string;
  csrfTokenPresent: boolean;
  csrfTokenValid: boolean;
  timestamp: string; // ISO-8601
}

/**
 * 이메일 중복 체크 결과
 */
export interface EmailCheckResult {
  exists: boolean;
  email: string;
}

/**
 * 회원가입 폼 데이터
 */
export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birth: Date;
}

/**
 * 로그인 폼 데이터
 */
export interface LoginFormData {
  email: string;
  password: string;
}
