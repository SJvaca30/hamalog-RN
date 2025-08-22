import { Pressable, StyleSheet, View } from 'react-native';

import { KakaoLoginButton, useKakaoLogin } from '@features/auth-by-kakao';
import { HamaIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';

export function LoginPage() {
  console.log('🔍 LoginPage 렌더링됨');
  console.log('🔍 환경변수 확인:', {
    kakaoAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  });

  const { login, isPending } = useKakaoLogin();
  console.log('🔍 useKakaoLogin 상태:', { isPending });

  const handleLogin = () => {
    console.log('🔍 카카오 로그인 버튼 클릭됨');
    if (isPending) {
      console.log('🔍 로그인 진행 중이므로 중단');
      return;
    }
    console.log('🔍 카카오 로그인 시작');
    login();
  };

  return (
    <PageContainer>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <HamaIcon />
          <Typography variant="h2" style={styles.title}>
            하마로그에 오신 것을 환영해요!
          </Typography>
          <Typography variant="body-2" color="text-gray-700">
            당신의 마음 건강 여정을 함께할게요.
          </Typography>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* 디버깅용 테스트 버튼 */}
        <Pressable
          style={{
            backgroundColor: '#FF0000',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
          onPress={() => console.log('🔍 테스트 버튼 클릭됨')}>
          <Typography variant="button-large" color="text-gray-850">
            테스트 버튼 (빨간색)
          </Typography>
        </Pressable>

        <KakaoLoginButton onPress={handleLogin} disabled={isPending} />
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    marginTop: 8,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 16,
  },
});
