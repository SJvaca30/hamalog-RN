/**
 * TanStack Query 키를 관리하는 팩토리
 * 타입 세이프하고 일관된 쿼리 키 생성
 */
export const queryKeys = {
  all: ['all'] as const,

  // 인증 관련 쿼리 키
  auth: {
    all: () => ['auth'] as const,
    emailCheck: (email: string) =>
      [...queryKeys.auth.all(), 'email-check', email] as const,
  },

  // 사용자 관련 쿼리 키
  users: {
    all: () => ['users'] as const,
    details: () => [...queryKeys.users.all(), 'detail'] as const,
    detail: (id: number) => [...queryKeys.users.details(), id] as const,
  },

  // 복약 스케줄 쿼리 키
  medicationSchedules: {
    all: () => ['medication-schedules'] as const,
    lists: () => [...queryKeys.medicationSchedules.all(), 'list'] as const,
    list: (memberId: number) =>
      [...queryKeys.medicationSchedules.lists(), { memberId }] as const,
    details: () => [...queryKeys.medicationSchedules.all(), 'detail'] as const,
    detail: (id: number) =>
      [...queryKeys.medicationSchedules.details(), id] as const,
  },
} as const;
