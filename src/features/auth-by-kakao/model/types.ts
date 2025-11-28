/**
 * 카카오 OAuth Deep Link 파라미터 타입
 * 백엔드가 OAuth 플로우를 처리한 후 앱으로 리다이렉트할 때 사용
 */
export interface KakaoOAuthDeepLinkParams {
  token: string; // JWT 액세스 토큰
  refreshToken: string; // JWT 리프레시 토큰
  error?: string; // 에러 메시지 (실패 시)
}
