/**
 * Mock 인증 헬퍼
 * - 백엔드 서버가 없는 개발 환경에서 사용
 * - 실제 토큰과 동일한 형태의 Mock 데이터 생성
 * - 환경 변수로 제어되어 production에서는 비활성화
 */

import { env } from '@shared/config/env';

/**
 * Mock JWT 토큰을 생성합니다.
 * - 개발 모드용 단순 문자열 토큰
 * - React Native btoa() 호환성 문제 해결
 */
export function generateMockJWT(): string {
  const timestamp = Date.now();
  const userId = env.mockAuth.user.id;

  // 단순하지만 유니크한 토큰 생성
  return `mock_jwt_token_${userId}_${timestamp}_dev`;
}

/**
 * Mock 로그인 응답을 생성합니다.
 */
export function generateMockLoginResponse() {
  return {
    token: generateMockJWT(),
    refreshToken: generateMockJWT(),
    expiresIn: 3600, // 1시간
  };
}

/**
 * Mock 사용자 정보를 반환합니다.
 */
export function getMockUserInfo() {
  return {
    memberId: parseInt(env.mockAuth.user.id),
    loginId: env.mockAuth.user.email,
    name: env.mockAuth.user.name,
    nickName: '테스트유저', // [추가] 닉네임 필드
    phoneNumber: '010-1234-5678',
    birthday: '1990-01-01',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Mock 인증이 활성화되어 있는지 확인합니다.
 */
export function isMockAuthEnabled(): boolean {
  return env.mockAuth.enabled;
}

/**
 * 개발 모드에서 자동 로그인을 수행합니다.
 */
export async function performMockLogin(): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> {
  if (!isMockAuthEnabled()) {
    throw new Error('Mock 인증이 비활성화되어 있습니다.');
  }

  console.log('🔧 [개발 모드] Mock 로그인 수행 중...');
  console.log('👤 사용자:', env.mockAuth.user);

  return {
    accessToken: generateMockJWT(),
    refreshToken: generateMockJWT(), // 실제로는 다른 만료 시간을 가져야 함
    expiresIn: 3600,
  };
}
