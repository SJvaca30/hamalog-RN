import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView } from 'react-native';

import {
  signupFormSchema,
  useSignup,
  type SignupFormValidationData,
  type SignupRequest,
} from '@entities/auth';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { DatePicker } from '@shared/ui/DatePicker';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { Typography } from '@shared/ui/Typography';

/**
 * 회원가입 페이지
 */
export function SignupPage() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 세션 관리는 상위 컴포넌트(페이지)에서 담당하지 않고,
  // 회원가입 성공 시 명시적인 로그인 과정을 거치도록 유도합니다.
  // (현재 정책: 회원가입 후 -> 로그인 페이지로 이동)

  const signupMutation = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValidationData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: email || '',
    },
  });

  const handleSignup = async (data: SignupFormValidationData) => {
    try {
      // 폼 데이터를 API 요청 형식으로 변환
      const signupData: SignupRequest = {
        loginId: data.email,
        password: data.password,
        name: '사용자', // 초기값으로 설정, 나중에 수정 가능
        nickName: '닉네임', // [TODO] 닉네임 입력 필드 추가 필요
        phoneNumber: data.phoneNumber,
        birth: data.birth.toISOString().split('T')[0], // YYYY-MM-DD 형식
      };

      await signupMutation.mutateAsync(signupData);

      Alert.alert('성공', '회원가입이 완료되었습니다!', [
        {
          text: '확인',
          onPress: () => {
            // 회원가입 성공 시 로그인 페이지로 이동
            router.replace('/(auth)/login');
          },
        },
      ]);
    } catch (error: any) {
      console.error('회원가입 실패:', error);

      // 특별한 에러 케이스 처리
      if (
        error.response?.status === 400 &&
        error.response?.data?.code === 'DUPLICATE_MEMBER'
      ) {
        Alert.alert(
          '이미 가입된 이메일',
          '이미 가입된 이메일입니다. 로그인하시겠습니까?',
          [
            { text: '취소', style: 'cancel' },
            {
              text: '로그인하기',
              onPress: () => {
                router.push({
                  pathname: '/password-login',
                  params: { email: data.email },
                });
              },
            },
          ]
        );
      } else if (error.response?.data?.errorMessage) {
        Alert.alert('회원가입 실패', error.response.data.errorMessage);
      } else {
        Alert.alert(
          '회원가입 실패',
          '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <PageContainer>
      {/* 헤더 */}
      <Box className="flex-row items-center justify-between p-4">
        <Pressable onPress={handleGoBack} className="p-2">
          <ArrowLeftIcon />
        </Pressable>
        <Typography variant="h3" color="text-gray-850">
          회원가입
        </Typography>
        <Box className="w-8" />
      </Box>

      {/* 메인 콘텐츠 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32 }}
        showsVerticalScrollIndicator={false}>
        <Box className="gap-6">
          <Box className="gap-2">
            <Typography variant="h2" color="text-gray-850">
              정보를 입력해주세요
            </Typography>
            <Typography variant="body-1" color="text-gray-700">
              안전하고 편리한 서비스 이용을 위해{'\n'}
              필요한 정보를 입력해주세요
            </Typography>
          </Box>

          <Box className="gap-4">
            {/* 이메일 */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="이메일"
                  placeholder="이메일을 입력해주세요"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  inputProps={{
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    autoComplete: 'email',
                    editable: !email, // 파라미터로 받은 이메일이 있으면 수정 불가
                  }}
                />
              )}
            />

            {/* 생년월일 */}
            <Controller
              control={control}
              name="birth"
              render={({ field: { onChange, value } }) => (
                <Box className="gap-1">
                  <Typography variant="label" color="text-gray-700">
                    생년월일
                  </Typography>
                  <DatePicker
                    value={value}
                    onDateChange={onChange}
                    placeholder="생년월일을 선택해주세요"
                    error={errors.birth?.message}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                  />
                </Box>
              )}
            />

            {/* 비밀번호 */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="비밀번호"
                  placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  inputProps={{
                    secureTextEntry: !showPassword,
                    autoCapitalize: 'none',
                  }}
                  rightIcon={
                    <Pressable onPress={togglePasswordVisibility}>
                      <Typography
                        variant="caption-secondary"
                        color="text-gray-500">
                        {showPassword ? '숨기기' : '보기'}
                      </Typography>
                    </Pressable>
                  }
                />
              )}
            />

            {/* 비밀번호 확인 */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  inputProps={{
                    secureTextEntry: !showConfirmPassword,
                    autoCapitalize: 'none',
                  }}
                  rightIcon={
                    <Pressable onPress={toggleConfirmPasswordVisibility}>
                      <Typography
                        variant="caption-secondary"
                        color="text-gray-500">
                        {showConfirmPassword ? '숨기기' : '보기'}
                      </Typography>
                    </Pressable>
                  }
                />
              )}
            />

            {/* 휴대폰 번호 */}
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="휴대폰 번호"
                  placeholder="010-1234-5678"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phoneNumber?.message}
                  inputProps={{
                    keyboardType: 'phone-pad',
                    autoComplete: 'tel',
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </ScrollView>

      {/* 하단 버튼 */}
      <BottomCTA
        onPress={handleSubmit(handleSignup)}
        disabled={!isValid}
        loading={signupMutation.isPending}
        text="회원가입 완료"
      />
    </PageContainer>
  );
}
