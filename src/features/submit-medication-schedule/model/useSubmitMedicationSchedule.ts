import { getCsrfToken } from '@entities/auth';
import { createMedicationSchedule } from '@entities/medication-schedule';
import { useSessionStore } from '@entities/session';
import {
  getApiErrorMessage,
  getApiErrorResponse,
  getApiViolations,
} from '@shared/api';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import type {
  SubmitMedicationScheduleFailure,
  SubmitMedicationScheduleInput,
  SubmitMedicationScheduleResult,
} from './types';

const buildMedicationScheduleFormData = (
  input: SubmitMedicationScheduleInput
) => {
  const formData = new FormData();

  formData.append('data', JSON.stringify(input.requestData));

  if (input.selectedImage) {
    formData.append('image', {
      uri: input.selectedImage.uri,
      name: input.selectedImage.fileName || 'medication.jpg',
      type: input.selectedImage.mimeType || 'image/jpeg',
    } as any);
  }

  return formData;
};

const ensureCsrfToken = async () => {
  const currentToken = useSessionStore.getState().csrfToken;
  if (currentToken) {
    return currentToken;
  }

  const csrfResponse = await getCsrfToken();
  const nextToken =
    csrfResponse.csrfToken ||
    (csrfResponse as { csrf_token?: string }).csrf_token ||
    (csrfResponse as { token?: string }).token;

  if (!nextToken) {
    const error = new Error('CSRF_TOKEN_MISSING');
    (error as Error & { code?: string }).code = 'CSRF_TOKEN_MISSING';
    throw error;
  }

  useSessionStore.getState().setCsrfToken(nextToken);
  return nextToken;
};

const mapSubmitMedicationScheduleError = (
  error: unknown
): SubmitMedicationScheduleFailure => {
  const code = (error as { code?: string }).code;
  if (code === 'CSRF_TOKEN_MISSING') {
    return {
      ok: false,
      title: '등록 실패',
      message: '보안 토큰을 발급받지 못했습니다. 로그인 후 다시 시도해주세요.',
    };
  }

  const status = (error as { response?: { status?: number } }).response?.status;
  const apiError = getApiErrorResponse(error);
  const violations = getApiViolations(error);

  if (status === 401) {
    return {
      ok: false,
      title: '등록 실패',
      message: '세션이 만료되었습니다. 다시 로그인해주세요.',
    };
  }

  if (status === 415) {
    return {
      ok: false,
      title: '등록 실패',
      message:
        apiError?.message ||
        '전송 형식이 올바르지 않습니다. 이미지를 다시 선택한 뒤 시도해주세요.',
    };
  }

  if (status === 409) {
    return {
      ok: false,
      title: '등록 실패',
      message: apiError?.message || '이미 등록된 복약 스케줄과 충돌했습니다.',
    };
  }

  if (status === 400 && violations.length > 0) {
    return {
      ok: false,
      title: '입력 확인',
      message: violations.map(violation => violation.message).join('\n'),
    };
  }

  if (status === 500) {
    return {
      ok: false,
      title: '등록 실패',
      message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }

  return {
    ok: false,
    title: '등록 실패',
    message: getApiErrorMessage(
      error,
      '복약 스케줄 등록에 실패했습니다. 다시 시도해주세요.'
    ),
  };
};

export function useSubmitMedicationSchedule() {
  const mutation = useMutation({
    mutationFn: async (input: SubmitMedicationScheduleInput) => {
      await ensureCsrfToken();
      return createMedicationSchedule(buildMedicationScheduleFormData(input));
    },
  });

  const submitMedicationSchedule = useCallback(
    async (
      input: SubmitMedicationScheduleInput
    ): Promise<SubmitMedicationScheduleResult> => {
      try {
        const data = await mutation.mutateAsync(input);
        return {
          ok: true,
          data,
        };
      } catch (error) {
        return mapSubmitMedicationScheduleError(error);
      }
    },
    [mutation]
  );

  return {
    isSubmitting: mutation.isPending,
    submitMedicationSchedule,
  };
}
