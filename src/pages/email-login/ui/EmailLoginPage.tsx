import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable } from 'react-native';

import {
  emailInputFormSchema,
  useValidateEmailFormat,
  type EmailInputFormData,
} from '@entities/auth';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { ArrowLeftIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { TextField } from '@shared/ui/TextField';
import { Typography } from '@shared/ui/Typography';

/**
 * 이메일 입력 및 중복 체크 페이지
 */
export function EmailLoginPage() {
  const router = useRouter();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<EmailInputFormData>({
    resolver: zodResolver(emailInputFormSchema),
    mode: 'onChange',
  });

  const email = watch('email');

  // 이메일 형식 검증만 수행 (중복 체크는 회원가입 시점에서)
  const { isLoading: isValidatingEmail, refetch: validateEmail } =
    useValidateEmailFormat(email || '');

  const handleNext = async (data: EmailInputFormData) => {
    try {
      // 이메일 형식 검증만 수행
      const result = await validateEmail();

      if (result.data) {
        // 형식이 올바르면 로그인/회원가입 선택 모달 표시
        setCheckedEmail(data.email);
        setShowSignupModal(true);
      }
    } catch (error: any) {
      console.error('이메일 검증 실패:', error);
      Alert.alert(
        '이메일 오류',
        error.message || '올바른 이메일을 입력해주세요.'
      );
    }
  };

  const handleGoToSignup = () => {
    setShowSignupModal(false);
    router.push({
      pathname: '/signup',
      params: { email: checkedEmail },
    });
  };

  const handleGoToLogin = () => {
    setShowSignupModal(false);
    router.push({
      pathname: '/password-login',
      params: { email: checkedEmail },
    });
  };

  const _handleCloseModal = () => {
    setShowSignupModal(false);
    setCheckedEmail('');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <PageContainer>
        {/* 헤더 */}
        <Box className="flex-row items-center justify-between p-4">
          <Pressable onPress={handleGoBack} className="p-2">
            <ArrowLeftIcon />
          </Pressable>
          <Typography variant="h3" color="text-gray-850">
            이메일 입력
          </Typography>
          <Box className="w-8" />
        </Box>

        {/* 메인 콘텐츠 */}
        <Box className="flex-1 px-6 pt-8">
          <Box className="gap-6">
            <Box className="gap-2">
              <Typography variant="h2" color="text-gray-850">
                이메일을 입력해주세요
              </Typography>
              <Typography variant="body-1" color="text-gray-500">
                가입 여부를 확인하여{'\n'}
                로그인 또는 회원가입으로 안내해드릴게요
              </Typography>
            </Box>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  placeholder="이메일을 입력해주세요"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  inputProps={{
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    autoComplete: 'email',
                    autoFocus: true,
                  }}
                />
              )}
            />
          </Box>
        </Box>

        {/* 하단 버튼 */}
        <BottomCTA
          onPress={handleSubmit(handleNext)}
          disabled={!isValid}
          loading={isValidatingEmail}
          text="다음"
        />
      </PageContainer>

      {/* 로그인/회원가입 선택 모달 */}
      <ConfirmModal
        visible={showSignupModal}
        variant="confirm"
        title="계정이 있으신가요?&#10;로그인 또는 회원가입을 선택해주세요."
        confirmText="회원가입"
        cancelText="로그인"
        onConfirm={handleGoToSignup}
        onCancel={handleGoToLogin}
      />
    </>
  );
}
