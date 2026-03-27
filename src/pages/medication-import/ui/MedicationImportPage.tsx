import {
  useGetMedicationSchedules,
  type MedicationSchedule,
} from '@entities/medication-schedule';
import { useSession } from '@entities/session';
import { MedicationSelectionList } from '@features/select-existing-medication';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';

export function MedicationImportPage() {
  const router = useRouter();
  const { memberId } = useSession();
  const { data, isLoading, error } = useGetMedicationSchedules(memberId || 0);
  const medications = data?.schedules || [];
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationSchedule | null>(null);

  return (
    <PageContainer>
      {({ bottomInset }) => {
        const ctaContainerStyle = {
          paddingBottom: Platform.OS === 'android' ? bottomInset + 48 : 48,
        };

        return (
          <Box direction="col" className="flex-1">
            <Box p="md" pb="none">
              <MedicationCreationStepper variant="import" />
            </Box>

            <Box direction="col" gap="md" className="flex-1">
              <Box px="md" pt="lg">
                <Typography variant="h2" color="text-gray-850">
                  기존 약에서 가져오기
                </Typography>
                <Typography
                  variant="body-1"
                  color="text-gray-500"
                  className="mt-2">
                  이전에 등록한 약물 중에서 선택해주세요
                </Typography>
              </Box>

              {error ? (
                <Box className="flex-1" justify="center" align="center" px="md">
                  <Typography
                    variant="body-1"
                    color="text-gray-500"
                    align="center">
                    약물 목록을 불러오는 중 오류가 발생했습니다.
                  </Typography>
                </Box>
              ) : (
                <MedicationSelectionList
                  medications={medications}
                  isLoading={isLoading}
                  selectedMedicationId={
                    selectedMedication?.medicationScheduleId
                  }
                  onSelectMedication={setSelectedMedication}
                />
              )}
            </Box>

            <Shadow
              distance={Platform.OS === 'ios' ? 34 : 30}
              startColor="rgba(0, 0, 0, 0.15)"
              offset={Platform.OS === 'ios' ? [0, 22] : [0, 15]}
              style={styles.fullWidth}>
              <Box
                bg="bg-gray-0"
                className="px-6 pt-3"
                style={ctaContainerStyle}>
                <BottomCTA
                  text="다음"
                  disabled={!selectedMedication}
                  onPress={() => {
                    if (selectedMedication) {
                      router.push('/create/medication/schedule');
                    }
                  }}
                />
              </Box>
            </Shadow>
          </Box>
        );
      }}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
