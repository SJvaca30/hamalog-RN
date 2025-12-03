import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable } from 'react-native';

import {
  getCsrfToken,
  loginFormSchema,
  useLogin,
  type LoginFormValidationData,
} from '@entities/auth';
import { useSession } from '@entities/session';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { Typography } from '@shared/ui/Typography';

/**
 * 비밀번호 입력 및 로그인 페이지
 */
export function PasswordLoginPage() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValidationData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: email || '',
    },
  });

  const { setTokens, setCsrfToken } = useSession();

  const handleLogin = async (data: LoginFormValidationData) => {
    try {
      const response = await loginMutation.mutateAsync({
        loginId: data.email,
        password: data.password,
      });

      console.log('로그인 성공');

      // 토큰을 세션 스토어에 저장 (snake_case 응답 형식 대응)
      await setTokens(response.access_token, response.refresh_token);

      // CSRF 토큰 발급 및 저장
      try {
        const csrfData = await getCsrfToken();
        if (csrfData.csrfToken) {
          setCsrfToken(csrfData.csrfToken);
          console.log('CSRF 토큰 발급 성공');
        }
      } catch (csrfError) {
        console.warn('CSRF 토큰 발급 실패:', csrfError);
        // CSRF 토큰 발급 실패해도 로그인은 성공 처리 (일부 GET 요청은 가능할 수 있음)
      }

      // 메인 화면으로 이동
      router.replace('/(app)/(home)');
    } catch (error: any) {
      console.error('로그인 실패:', error);

      // 백엔드 에러 메시지 처리
      if (error.response?.status === 401) {
        Alert.alert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
      } else if (error.response?.data?.message) {
        Alert.alert('로그인 실패', error.response.data.message);
      } else {
        Alert.alert(
          '로그인 실패',
          '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
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

  const handleForgotPassword = () => {
    // TODO: 비밀번호 찾기 기능 구현
    Alert.alert('안내', '비밀번호 찾기 기능은 추후 업데이트 예정입니다.');
  };

  const handleFindEmail = () => {
    // TODO: 이메일 찾기 기능 구현
    Alert.alert('안내', '이메일 찾기 기능은 추후 업데이트 예정입니다.');
  };

  return (
    <PageContainer>
      {/* 헤더 */}
      <Box className="flex-row items-center justify-between p-4">
        <Pressable onPress={handleGoBack} className="p-2">
          <ArrowLeftIcon />
        </Pressable>
        <Typography variant="h3" color="text-gray-850">
          로그인
        </Typography>
        <Box className="w-8" />
      </Box>

      {/* 메인 콘텐츠 */}
      <Box className="flex-1 px-6 pt-8">
        <Box className="gap-6">
          <Box className="gap-2">
            <Typography variant="h2" color="text-gray-850">
              비밀번호를 입력해주세요
            </Typography>
            <Typography variant="body-1" color="text-gray-500">
              {email}으로 로그인합니다
            </Typography>
          </Box>

          <Box className="gap-4">
            {/* 이메일 (읽기 전용) */}
            <Controller
              control={control}
              name="email"
              render={({ field: { value } }) => (
                <TextField
                  label="이메일"
                  value={value || ''}
                  onChangeText={() => {}} // 읽기 전용이므로 빈 함수
                  inputProps={{ editable: false }}
                  inputClassName="bg-gray-50"
                />
              )}
            />

            {/* 비밀번호 */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  label="비밀번호"
                  placeholder="비밀번호를 입력해주세요"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  inputProps={{
                    secureTextEntry: !showPassword,
                    autoCapitalize: 'none',
                    autoFocus: true,
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

            {/* 찾기 링크들 */}
            <Box className="flex-row justify-center gap-4">
              <Pressable onPress={handleFindEmail}>
                <Typography variant="caption-secondary" color="text-gray-500">
                  이메일 찾기
                </Typography>
              </Pressable>
              <Typography variant="caption-secondary" color="text-gray-500">
                |
              </Typography>
              <Pressable onPress={handleForgotPassword}>
                <Typography variant="caption-secondary" color="text-gray-500">
                  비밀번호 찾기
                </Typography>
              </Pressable>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 하단 버튼 */}
      <BottomCTA
        onPress={handleSubmit(handleLogin)}
        disabled={!isValid}
        loading={loginMutation.isPending}
        text="로그인"
      />
    </PageContainer>
  );
}
