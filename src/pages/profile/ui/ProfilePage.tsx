import { useLogout } from '@entities/auth';
import { useSession } from '@entities/session';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';
import { useRouter } from 'expo-router';
import { Alert, Pressable } from 'react-native';

export const ProfilePage = () => {
  const router = useRouter();
  const { clearTokens } = useSession();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutMutation.mutateAsync();
          } catch (error) {
            console.error('로그아웃 서버 요청 실패 (무시하고 진행)', error);
          } finally {
            // 서버 응답 여부와 상관없이 클라이언트 세션 클리어 및 이동
            await clearTokens();
            router.replace('/(auth)/login');
          }
        },
      },
    ]);
  };

  return (
    <PageContainer bg="bg-gray-50" className="flex-1">
      <Box className="flex-1 items-center justify-center gap-4 p-4">
        <Typography variant="h3">마이 페이지</Typography>

        <Pressable
          onPress={handleLogout}
          className="rounded-lg bg-red-100 px-4 py-3">
          <Typography variant="body-1" className="text-red-500">
            로그아웃
          </Typography>
        </Pressable>
      </Box>
    </PageContainer>
  );
};
