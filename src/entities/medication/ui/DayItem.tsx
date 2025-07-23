import { Box, Text } from '@shared';
import { cn } from '@shared/lib/utils';
import { format } from 'date-fns';
import { View } from 'react-native';

type DayItemProps = {
  date: Date;
  isToday: boolean;
  medicationProgress: number; // 0 to 1
  hasSymptom: boolean;
};

export const DayItem = ({
  date,
  isToday,
  medicationProgress,
  hasSymptom,
}: DayItemProps) => {
  const dayNumber = format(date, 'd');

  const containerHeight = 40; // h-10 is 40px
  const progressHeight = containerHeight * medicationProgress;

  return (
    <Box className="items-center space-y-1">
      <Box
        className={cn(
          'h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-100',
          isToday && 'bg-gray-300'
        )}>
        <View
          className="absolute bottom-0 left-0 right-0 bg-blue-200"
          style={{ height: progressHeight }}
        />
        <Text
          className={cn(
            'text-lg font-semibold',
            isToday ? 'text-white' : 'text-gray-800'
          )}>
          {dayNumber}
        </Text>
      </Box>
      <Box
        className={cn(
          'h-1 w-3 rounded-full',
          hasSymptom ? 'bg-red-400' : 'bg-gray-200'
        )}
      />
    </Box>
  );
};
