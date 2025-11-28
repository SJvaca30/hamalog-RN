import { useMutation, useQuery } from '@tanstack/react-query';

import { authKeys } from '../lib/query-keys';

import { login, logout, signup, validateEmailFormat } from '../api';
import type { LoginRequest, SignupRequest } from './types';

/**
 * 회원가입 훅
 */
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
    },
  });
};

/**
 * 로그인 훅
 * - 주의: 세션 처리와 라우팅은 이 훅을 사용하는 상위 컴포넌트(Feature)에서 처리해야 합니다.
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },
  });
};

/**
 * 로그아웃 훅
 * - 주의: 세션 처리와 라우팅은 이 훅을 사용하는 상위 컴포넌트(Feature)에서 처리해야 합니다.
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onError: (error: any) => {
      console.error('로그아웃 실패:', error);
    },
  });
};

/**
 * 이메일 형식 검증 훅
 *
 * 실제 중복 체크는 회원가입 시점에서 처리하여 보안과 성능을 개선했습니다.
 */
export const useValidateEmailFormat = (email: string) => {
  return useQuery({
    queryKey: authKeys.emailCheck(email),
    queryFn: () => validateEmailFormat(email),
    enabled: !!email && email.includes('@'), // 유효한 이메일일 때만 실행
    retry: false, // 형식 검증은 재시도하지 않음
    staleTime: 10 * 60 * 1000, // 10분간 캐시 유지 (형식 검증이므로 길게)
  });
};
