/**
 * 카카오 로그인 API 요청 타입 (Authorization Code 방식)
 */
export interface KakaoLoginRequest {
  code: string; // OAuth Authorization Code
  redirectUri?: string; // 선택적으로 백엔드에서 검증용
}

/**
 * 카카오 로그인 API 응답 타입
 */
export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
}
