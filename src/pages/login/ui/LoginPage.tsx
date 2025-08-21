import { StyleSheet, View } from 'react-native';

import { KakaoLoginButton, useKakaoLogin } from '@features/auth-by-kakao';
import { HamaIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';

export function LoginPage() {
  const { login, isPending } = useKakaoLogin();

  const handleLogin = () => {
    if (isPending) return;
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
