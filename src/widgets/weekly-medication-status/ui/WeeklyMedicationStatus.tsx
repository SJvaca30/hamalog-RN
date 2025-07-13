import { Box } from '@shared';
import { format } from 'date-fns';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useWeeklyCalendar } from '../model';
import { DayItem } from './DayItem';
import { WeekDays } from './WeekDays';

export const WeeklyMedicationStatus = () => {
  const { days, goToNextWeek, goToPreviousWeek } = useWeeklyCalendar();

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20]) // 20px 이상 움직여야 제스처 시작
    .onEnd(e => {
      // 벨로시티(속도)를 기준으로 좌우 스와이프 감지
      if (e.velocityX > 500) {
        // 오른쪽으로 빠르게 스와이프
        runOnJS(goToPreviousWeek)();
      } else if (e.velocityX < -500) {
        // 왼쪽으로 빠르게 스와이프
        runOnJS(goToNextWeek)();
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Box className="p-4">
        <WeekDays />
        <Box className="mt-2 flex-row justify-between">
          {days.map(day => (
            <DayItem
              key={day.toString()}
              date={day}
              isToday={
                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              }
              medicationProgress={0.5} // 임시 값
              hasSymptom={false} // 임시 값
            />
          ))}
        </Box>
      </Box>
    </GestureDetector>
  );
};
