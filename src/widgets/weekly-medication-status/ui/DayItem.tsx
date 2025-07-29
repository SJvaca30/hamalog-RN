import { cn } from '@shared/lib';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { format } from 'date-fns';
import { View } from 'react-native';

type DayItemProps = {
  date: Date;
  isToday: boolean;
  medicationProgress: number; // 0 to 1
  hasSymptom: boolean;
};

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const DayItem = ({
  date,
  isToday,
  medicationProgress,
  hasSymptom,
}: DayItemProps) => {
  const dayNumber = format(date, 'd');
  const dayOfWeek = WEEK_DAYS[date.getDay()];

  const containerHeight = 34; // 34px로 수정
  const progressHeight = containerHeight * medicationProgress;

  return (
    <Box
      direction="col"
      justify="end"
      align="center"
      gap="xs"
      className="w-[45px]">
      {/* 요일 */}
      {isToday ? (
        <Box className="h-[20px] w-[22px] shrink-0 items-center justify-center rounded-[10px] bg-gray-300">
          <Typography variant="caption-primary" color="text-gray-0">
            {dayOfWeek}
          </Typography>
        </Box>
      ) : (
        <Box className="h-[20px] w-[22px] shrink-0 items-center justify-center">
          <Typography variant="caption-secondary" color="text-gray-700">
            {dayOfWeek}
          </Typography>
        </Box>
      )}

      <Box
        direction="col"
        justify="end"
        align="center"
        gap="xs"
        className="w-[45px]">
        {/* 복약 스케줄 달성률 */}
        <Box
          justify="center"
          align="center"
          className="aspect-square h-[34px] w-[34px] overflow-hidden rounded-[4.25px] bg-gray-100 p-[4.25px]">
          <View
            className="absolute bottom-0 left-0 right-0 bg-primary-100"
            style={{ height: progressHeight }}
          />
          <Typography variant="button-small" color="text-gray-850">
            {dayNumber}
          </Typography>
        </Box>

        {/* 증상 기록 유무 */}
        <Box
          className={cn(
            'h-[3px] w-3 rounded-[2px]',
            hasSymptom ? 'bg-point-red-400' : 'bg-gray-100'
          )}
        />
      </Box>
    </Box>
  );
};
