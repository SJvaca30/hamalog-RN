import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { useSession } from '@entities/session';
import { authKeys } from '../lib/query-keys';

import { login, logout, signup, validateEmailFormat } from '../api';
import type { LoginRequest, SignupRequest } from './types';

/**
 * 회원가입 훅
 */
export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: () => {
      console.log('회원가입 성공');
      // 회원가입 성공 후 로그인 화면으로 이동
      router.replace('/(auth)/login');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
    },
  });
};

/**
 * 로그인 훅
 */
export const useLogin = () => {
  const { setTokens } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: async response => {
      console.log('로그인 성공');

      // 토큰을 세션 스토어에 저장
      await setTokens(response.token, response.refreshToken);

      // 메인 화면으로 이동
      router.replace('/(app)/(home)');
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },
  });
};

/**
 * 로그아웃 훅
 */
export const useLogout = () => {
  const { clearTokens } = useSession();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      console.log('로그아웃 성공');

      // 토큰 삭제
      await clearTokens();

      // 로그인 화면으로 이동
      router.replace('/(auth)/login');
    },
    onError: (error: any) => {
      console.error('로그아웃 실패:', error);

      // 에러가 발생해도 로컬 토큰은 삭제
      clearTokens();
      router.replace('/(auth)/login');
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
