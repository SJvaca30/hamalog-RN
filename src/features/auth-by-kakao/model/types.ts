/**
 * 카카오 로그인 API 요청 타입
 */
export interface KakaoLoginRequest {
  accessToken: string;
}

/**
 * 카카오 로그인 API 응답 타입
 */
export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
}
