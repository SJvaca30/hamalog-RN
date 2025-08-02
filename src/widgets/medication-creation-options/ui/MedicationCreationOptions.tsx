import { Box } from '@shared/ui/Box';
import { AddScheduleIcon, ImportScheduleIcon } from '@shared/ui/icons';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';
import { View } from 'react-native';

export function MedicationCreationOptions() {
  return (
    <PageContainer>
      <Box direction="col" className="flex-1">
        <View style={{ flex: 1 }} />
        <Box px="md" className="h-[240] flex-row gap-3">
          <Box
            p="lg"
            direction="col"
            justify="center"
            align="center"
            gap="md"
            bg="bg-primary-50"
            borderColor="border-primary-400"
            className="flex-1 self-stretch rounded-2xl border-[1.5px]">
            <AddScheduleIcon />
            <Typography
              variant="button-medium"
              color="text-primary-700"
              align="center">
              새로 추가하기
            </Typography>
          </Box>

          <Box
            p="lg"
            direction="col"
            justify="center"
            align="center"
            gap="md"
            bg="bg-point-yellow-50"
            borderColor="border-point-yellow-400"
            className="flex-1 self-stretch rounded-2xl border-[1.5px]">
            <ImportScheduleIcon />
            <Typography
              variant="button-medium"
              color="text-primary-700"
              align="center">
              {'기존 약에서\n가져오기'}
            </Typography>
          </Box>
        </Box>
        <View style={{ flex: 2 }} />
      </Box>
    </PageContainer>
  );
}
