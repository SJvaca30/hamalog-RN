import type { ApiErrorResponse, ApiViolation } from './types';

export function getApiErrorResponse(error: unknown): ApiErrorResponse | null {
  const responseData = (error as { response?: { data?: unknown } })?.response
    ?.data;

  if (!responseData || typeof responseData !== 'object') {
    return null;
  }

  const candidate = responseData as Partial<ApiErrorResponse>;

  if (
    typeof candidate.code === 'string' &&
    typeof candidate.message === 'string' &&
    typeof candidate.path === 'string'
  ) {
    return {
      code: candidate.code,
      message: candidate.message,
      path: candidate.path,
      violations: Array.isArray(candidate.violations)
        ? (candidate.violations as ApiViolation[])
        : null,
    };
  }

  return null;
}

export function getApiViolations(error: unknown): ApiViolation[] {
  return getApiErrorResponse(error)?.violations ?? [];
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const apiError = getApiErrorResponse(error);
  if (!apiError) {
    return fallback;
  }

  if (apiError.violations && apiError.violations.length > 0) {
    return apiError.violations[0]?.message ?? apiError.message;
  }

  return apiError.message || fallback;
}
