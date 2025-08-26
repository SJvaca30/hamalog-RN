import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import { KakaoLoginButton } from '@features/auth-by-kakao';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';

interface AuthWelcomeProps {
  /** 컴포넌트 제목 */
  title?: string;
  /** 부제목 */
  subtitle?: string;
}

/**
 * 사용자에게 로그인 방법을 선택할 수 있도록 하는 환영 화면 위젯
 */
export function AuthWelcome({
  title = '하마로그와 함께',
  subtitle = '건강한 하루를 시작해보세요',
}: AuthWelcomeProps) {
  const router = useRouter();

  const handleEmailLogin = () => {
    router.push('/email-login');
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직 구현
    console.log('카카오 로그인 시도');
  };

  return (
    <Box className="flex-1 items-center justify-center gap-8 px-6">
      {/* 타이틀 섹션 */}
      <Box className="items-center gap-3">
        <Typography variant="h1" color="text-gray-850" align="center">
          {title}
        </Typography>
        <Typography variant="body-1" color="text-gray-500" align="center">
          {subtitle}
        </Typography>
      </Box>

      {/* 로그인 옵션 섹션 */}
      <Box className="w-full gap-4">
        {/* 카카오 로그인 버튼 */}
        <KakaoLoginButton onPress={handleKakaoLogin} />

        {/* 이메일 로그인 버튼 */}
        <Pressable
          className="w-full items-center justify-center rounded-[16px] border border-gray-300 bg-white p-4 active:bg-gray-50"
          onPress={handleEmailLogin}>
          <Typography variant="button-medium" color="text-gray-700">
            이메일로 시작하기
          </Typography>
        </Pressable>
      </Box>

      {/* 하단 안내 텍스트 */}
      <Box className="items-center">
        <Typography
          variant="caption-secondary"
          color="text-gray-500"
          align="center">
          로그인하면 하마로그의{'\n'}
          서비스 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </Typography>
      </Box>
    </Box>
  );
}
