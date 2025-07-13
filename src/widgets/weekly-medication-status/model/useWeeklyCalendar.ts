import { add, eachDayOfInterval, endOfWeek, startOfWeek, sub } from 'date-fns';
import { useCallback, useState } from 'react';

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
    currentDate,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
  };
};
