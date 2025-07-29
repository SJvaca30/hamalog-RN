import { Box } from '@shared/ui/Box';
import { format } from 'date-fns';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { useWeeklyCalendar } from '../model/useWeeklyCalendar';
import { DayItem } from './DayItem';

export const WeeklyMedicationStatus = () => {
  const { days, goToNextWeek, goToPreviousWeek } = useWeeklyCalendar();

  const panGesture = Gesture.Pan()
    .activeOffsetX([-20, 20]) // 20px 이상 움직여야 제스처 시작
    .onEnd(e => {
      // 벨로시티(속도)를 기준으로 좌우 스와이프 감지
      if (e.velocityX > 500) {
        // 오른쪽으로 스와이프
        runOnJS(goToPreviousWeek)();
      } else if (e.velocityX < -500) {
        // 왼쪽으로 스와이프
        runOnJS(goToNextWeek)();
      }
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Box
        direction="row"
        justify="between"
        align="end"
        className="self-stretch px-[10px] pb-[8px] pt-[10px]">
        {days.map(day => (
          <DayItem
            key={day.toString()}
            date={day}
            isToday={
              format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            }
            medicationProgress={1} // 복약 스케줄 달성률, 임시 값, 백엔드 담당자가 api 준비중
            hasSymptom={true} // 증상 기록 유무, 임시 값, 백엔드 담당자가 api 준비중
          />
        ))}
      </Box>
    </GestureDetector>
  );
};
