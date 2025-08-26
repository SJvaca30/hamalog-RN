/**
 * 회원가입 요청 DTO
 */
export interface SignupRequest {
  loginId: string; // 이메일
  password: string;
  name: string;
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
 * 로그인 응답 DTO
 */
export interface LoginResponse {
  token: string; // JWT 액세스 토큰
}

/**
 * 회원가입 응답 - 단순 문자열
 */
export type SignupResponse = string; // "회원가입 성공"

/**
 * 로그아웃 응답 - 단순 문자열
 */
export type LogoutResponse = string; // "로그아웃 성공"

/**
 * API 에러 응답 형식
 */
export interface ApiErrorResponse {
  errorMessage: string;
  code: string;
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
