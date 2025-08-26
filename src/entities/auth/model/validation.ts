import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

/**
 * 이메일 검증 스키마
 */
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('올바른 이메일 형식을 입력해주세요');

/**
 * 비밀번호 검증 스키마
 * - 최소 8자 이상
 * - 영문, 숫자, 특수문자 조합
 */
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다'
  );

/**
 * 휴대폰 번호 검증 스키마 (한국)
 */
export const phoneNumberSchema = z
  .string()
  .min(1, '휴대폰 번호를 입력해주세요')
  .refine(
    value => {
      try {
        // 한국 휴대폰 번호 형식 체크
        return isValidPhoneNumber(value, 'KR');
      } catch {
        return false;
      }
    },
    {
      message: '올바른 휴대폰 번호를 입력해주세요 (예: 010-1234-5678)',
    }
  );

/**
 * 생년월일 검증 스키마
 */
export const birthDateSchema = z
  .date({
    required_error: '생년월일을 선택해주세요',
    invalid_type_error: '올바른 날짜를 선택해주세요',
  })
  .refine(
    date => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 14 && age <= 120;
    },
    {
      message: '만 14세 이상 120세 이하만 가입 가능합니다',
    }
  );

/**
 * 로그인 폼 스키마
 */
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

/**
 * 회원가입 폼 스키마
 */
export const signupFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
    phoneNumber: phoneNumberSchema,
    birth: birthDateSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

/**
 * 이메일 입력 폼 스키마
 */
export const emailInputFormSchema = z.object({
  email: emailSchema,
});

// 타입 export
export type LoginFormData = z.infer<typeof loginFormSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
export type EmailInputFormData = z.infer<typeof emailInputFormSchema>;
