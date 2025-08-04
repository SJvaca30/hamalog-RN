import { Box } from '@shared/ui/Box';
import { ImportScheduleIcon, RegisterIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export function MedicationCreationOptions() {
  const router = useRouter();

  const handleNewMedication = () => {
    router.push('/create/medication/register');
  };

  const handleImportMedication = () => {
    router.push('/create/medication/schedule');
  };

  return (
    <PageContainer>
      <Box direction="col" className="flex-1">
        <View style={{ flex: 1 }} />
        <Box px="md" className="h-[240] flex-row gap-3">
          <Pressable onPress={handleNewMedication} className="flex-1">
            <Box
              p="lg"
              direction="col"
              justify="center"
              align="center"
              gap="md"
              bg="bg-primary-50"
              borderColor="border-primary-400"
              className="flex-1 self-stretch rounded-2xl border-[1.5px]">
              <RegisterIcon size={63} />
              <Typography
                variant="button-medium"
                color="text-primary-700"
                align="center">
                새로 추가하기
              </Typography>
            </Box>
          </Pressable>

          <Pressable onPress={handleImportMedication} className="flex-1">
            <Box
              p="lg"
              direction="col"
              justify="center"
              align="center"
              gap="md"
              bg="bg-point-yellow-50"
              borderColor="border-point-yellow-400"
              className="flex-1 self-stretch rounded-2xl border-[1.5px]">
              <ImportScheduleIcon size={63} />
              <Typography
                variant="button-medium"
                color="text-primary-700"
                align="center">
                {'기존 약에서\n가져오기'}
              </Typography>
            </Box>
          </Pressable>
        </Box>
        <View style={{ flex: 2 }} />
      </Box>
    </PageContainer>
  );
}
