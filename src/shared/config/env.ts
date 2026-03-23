/**
 * 환경 변수 로더
 * - Expo SDK 53+: 클라이언트에서 접근 가능한 키는 EXPO_PUBLIC_ 접두사가 필요합니다.
 * - 여기서는 EXPO_PUBLIC_API_BASE_URL, EXPO_PUBLIC_ENABLE_AUTH_MOCK을 읽어 public config로 노출합니다.
 * - production에서 값이 없으면 즉시 오류를 던져 잘못된 배포를 방지합니다.
 * - development/preview에서는 로컬 개발 기본값(`http://localhost:8080`)을 사용합니다.
 */
import { z } from 'zod';

// 환경 변수 스키마: 필요한 키만 명시적으로 정의하여 타입 안전성 확보
const EnvSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'preview', 'production']).optional(),
});

// process.env에서 필요한 값만 추출 (런타임/빌드 타임 모두 동작)
const rawEnv = {
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  EXPO_PUBLIC_ENABLE_AUTH_MOCK: process.env.EXPO_PUBLIC_ENABLE_AUTH_MOCK,
  NODE_ENV: process.env.NODE_ENV,
};

// 스키마 기반 파싱 (개발 중 설정 오류를 빠르게 발견)
const parsed = EnvSchema.safeParse(rawEnv);

const isProduction = rawEnv.NODE_ENV === 'production';

/**
 * API Base URL을 결정합니다.
 * - 설정이 있으면 그대로 사용
 * - production에서 누락 시 에러
 * - 그 외 환경은 개발 기본값 반환
 */
function resolveApiBaseUrl(): string {
  const configured = parsed.success
    ? parsed.data.EXPO_PUBLIC_API_BASE_URL
    : undefined;
  if (configured) return configured;
  if (isProduction) {
    throw new Error(
      '환경변수 EXPO_PUBLIC_API_BASE_URL가 설정되어 있지 않습니다 (production)'
    );
  }
  return 'http://localhost:8080';
}

function resolveEnableAuthMock(): boolean {
  if (isProduction) {
    return false;
  }

  return rawEnv.EXPO_PUBLIC_ENABLE_AUTH_MOCK === 'true';
}

// 상위 레이어에서 사용하기 위한 public config
export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
  enableAuthMock: resolveEnableAuthMock(),
};
