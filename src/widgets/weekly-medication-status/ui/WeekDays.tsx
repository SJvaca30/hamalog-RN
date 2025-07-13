import { Box, Text } from '@shared';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const WeekDays = () => {
  return (
    <Box className="flex-row justify-between">
      {WEEK_DAYS.map(day => (
        <Box key={day} className="w-10 items-center">
          <Text className="text-gray-500">{day}</Text>
        </Box>
      ))}
    </Box>
  );
};
