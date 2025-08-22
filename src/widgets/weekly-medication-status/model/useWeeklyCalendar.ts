import { add, eachDayOfInterval, endOfWeek, startOfWeek, sub } from 'date-fns';
import { useCallback, useState } from 'react';

/**
 * 주간 캘린더의 상태와 동작을 관리하는 커스텀 훅입니다.
 * 현재 날짜를 기준으로 한 주의 시작일, 종료일, 그리고 해당 주의 모든 날짜 배열을 제공합니다.
 * 또한, 다음 주, 이전 주, 그리고 오늘로 이동하는 함수를 반환하여
 * 외부에서 캘린더의 상태를 제어할 수 있도록 합니다.
 *
 * @returns {object} 캘린더 상태와 제어 함수를 담은 객체
 * @property {Date[]} days - 현재 선택된 주의 모든 날짜가 담긴 배열 (일요일부터 토요일까지)
 * @property {() => void} goToNextWeek - 캘린더를 다음 주로 이동시키는 함수
 * @property {() => void} goToPreviousWeek - 캘린더를 이전 주로 이동시키는 함수
 * @property {() => void} goToToday - 캘린더를 현재 날짜가 포함된 주로 이동시키는 함수
 */
export const useWeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const goToNextWeek = useCallback(() => {
    setCurrentDate(date => add(date, { weeks: 1 }));
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentDate(date => sub(date, { weeks: 1 }));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  return {
    days,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
  };
};
