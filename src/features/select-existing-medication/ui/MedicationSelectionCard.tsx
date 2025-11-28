import type { MedicationSchedule } from '@entities/medication-schedule';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { MedicationCheckIcon } from '@shared/ui/icons';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Image } from 'expo-image';
import { Pressable } from 'react-native';

interface Props {
  medication: MedicationSchedule;
  isSelected: boolean;
  onSelect: (medication: MedicationSchedule) => void;
}

export const MedicationSelectionCard = ({
  medication,
  isSelected,
  onSelect,
}: Props) => {
  const prescriptionDate = new Date(medication.prescriptionDate);

  // 연도와 월일을 분리하여 포맷팅
  const formattedYear = format(prescriptionDate, 'yyyy년', { locale: ko });
  const formattedMonth = format(prescriptionDate, 'M월', { locale: ko });
  const formattedDay = format(prescriptionDate, 'd일', { locale: ko });

  return (
    <Pressable onPress={() => onSelect(medication)} hitSlop={10}>
      <Box
        direction="row"
        gap="sm"
        align="start"
        p="sm"
        bg={isSelected ? 'bg-primary-50' : 'bg-gray-0'}
        borderColor={isSelected ? 'border-primary-400' : 'border-gray-100'}
        className="self-stretch rounded-2xl border-[1px]">
        {/* 약물 이미지 영역 */}
        <Box
          className="h-[94px] w-[94px] rounded-xl bg-gray-50"
          justify="center"
          align="center">
          {medication.imagePath ? (
            <Image
              source={{ uri: medication.imagePath }}
              className="h-full w-full rounded-xl"
              contentFit="cover"
              transition={300}
              priority="normal"
              onError={error => {
                console.warn('이미지 로드 실패:', error);
              }}
            />
          ) : (
            <Typography variant="caption-secondary" color="text-gray-300">
              이미지
            </Typography>
          )}
        </Box>
        {/* 약물 정보 컨테이너 */}
        <Box direction="col" gap="sm" align="start" className="flex-[1_0_0]">
          {/* 약물 이름 */}
          <Box
            direction="row"
            justify="between"
            align="center"
            px="xs"
            className="h-[24px] self-stretch">
            <Typography
              variant="button-medium"
              color={isSelected ? 'text-primary-700' : 'text-gray-850'}>
              {medication.name}
            </Typography>
            {isSelected && <MedicationCheckIcon size={24} />}
          </Box>
          {/* 약물 정보 */}
          <Box
            direction="row"
            py="sm"
            px="xs"
            justify="between"
            align="center"
            bg={isSelected ? 'bg-gray-0' : 'bg-gray-50'}
            className="self-stretch rounded-xl">
            {/* 등록 일자 */}
            <Box
              direction="col"
              align="center"
              justify="start"
              gap="xs"
              className="flex-1 self-stretch">
              <Typography variant="caption-secondary" color="text-gray-300">
                등록 일자
              </Typography>
              <Box direction="col" align="center">
                <Typography variant="caption-primary" color="text-gray-700">
                  {formattedYear}
                </Typography>
                <Box direction="row" align="center" className="gap-x-[2px]">
                  <Typography variant="caption-primary" color="text-gray-700">
                    {formattedMonth}
                  </Typography>
                  <Typography variant="caption-primary" color="text-gray-700">
                    {formattedDay}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="w-0 self-stretch border-l border-gray-150" />
            {/* 진료 기관 */}
            <Box
              direction="col"
              align="center"
              justify="start"
              px="sm"
              gap="xs"
              className="flex-1 self-stretch">
              <Typography variant="caption-secondary" color="text-gray-300">
                진료 기관
              </Typography>
              <Typography variant="caption-primary" color="text-gray-700">
                {medication.hospitalName}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
