import { PageContainer } from '@shared/ui/PageContainer';
import { AuthWelcome } from '@widgets/auth-welcome';

export function LoginPage() {
  console.log('LoginPage 렌더링됨, 환경변수 확인:', {
    kakaoAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  });

  return (
    <PageContainer>
      <AuthWelcome
        title="하마로그에 오신 것을 환영해요!"
        subtitle="당신의 마음 건강 여정을 함께할게요."
      />
    </PageContainer>
  );
}
