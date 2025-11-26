import {
  useGetMedicationSchedules,
  type MedicationSchedule,
} from '@entities/medication-schedule';
import { MedicationSelectionList } from '@features/select-existing-medication';
import { getMockUserInfo, isMockAuthEnabled } from '@shared/lib/mock-auth';
import { BottomCTA } from '@shared/ui/BottomCTA';
import { Box } from '@shared/ui/Box';
import { PageContainer } from '@shared/ui/PageContainer';
import { Typography } from '@shared/ui/Typography';
import { MedicationCreationStepper } from '@widgets/medication-creation-stepper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

export function MedicationImportPage() {
  const router = useRouter();
  const { bottom: _bottomInset } = useSafeAreaInsets();

  // 현재는 Mock 사용자 정보 사용 (추후 실제 사용자 정보로 교체)
  const mockUser = isMockAuthEnabled() ? getMockUserInfo() : null;
  const memberId = mockUser?.memberId || 1; // fallback ID

  const { data, isLoading, error } = useGetMedicationSchedules(memberId);

  const medications = data?.schedules || [];

  // 선택된 약물 상태 관리
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationSchedule | null>(null);

  const handleSelectMedication = (medication: MedicationSchedule) => {
    setSelectedMedication(medication);
  };

  const handleNext = () => {
    if (selectedMedication) {
      // TODO: 선택된 약물 정보를 다음 페이지로 전달
      router.push('/create/medication/schedule');
    }
  };

  const canProceed = selectedMedication !== null;

  return (
    <PageContainer>
      {({ bottomInset }) => {
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
                  onSelectMedication={handleSelectMedication}
                />
              )}
            </Box>

            <Shadow
              distance={Platform.OS === 'ios' ? 34 : 30}
              startColor="rgba(0, 0, 0, 0.15)"
              offset={Platform.OS === 'ios' ? [0, 22] : [0, 15]}
              style={{ width: '100%' }}>
              <Box
                bg="bg-gray-0"
                className="px-6 pt-3"
                style={{
                  paddingBottom:
                    Platform.OS === 'android' ? bottomInset + 48 : 48,
                }}>
                <BottomCTA
                  text="다음"
                  disabled={!canProceed}
                  onPress={handleNext}
                />
              </Box>
            </Shadow>
          </Box>
        );
      }}
    </PageContainer>
  );
}
