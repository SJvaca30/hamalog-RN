import { Picker } from '@react-native-picker/picker';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import {
  addMonths,
  format,
  getYear,
  setMonth,
  setYear,
  subMonths,
} from 'date-fns';
import { useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, ArrowRighttIcon } from '../icons';
import { CalendarModalProps } from './types';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

/**
 * 날짜 선택을 위한 캘린더 모달 컴포넌트입니다.
 * 년/월을 선택할 수 있는 피커(Picker) 기능을 포함하고 있습니다.
 */
export function CalendarModal({
  visible,
  onClose,
  onConfirm,
  initialDate,
  minimumDate,
  maximumDate,
}: CalendarModalProps) {
  const { bottom: bottomInset } = useSafeAreaInsets();

  // --- STATE ---
  /** 사용자가 최종 선택한 날짜 (YYYY-MM-DD 형식) */
  const [selectedDate, setSelectedDate] = useState(
    initialDate
      ? format(initialDate, 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd')
  );
  /** 현재 캘린더에 표시되고 있는 월 (YYYY-MM-DD 형식) */
  const [currentMonth, setCurrentMonth] = useState(selectedDate);
  /** 년/월 피커 모달의 표시 여부 */
  const [isPickerVisible, setPickerVisible] = useState(false);
  /** 현재 활성화된 피커의 종류 ('year' 또는 'month') */
  const [pickerType, setPickerType] = useState<'year' | 'month'>('year');

  // --- HANDLER ---
  /** 확인 버튼을 눌렀을 때 최종 선택된 날짜를 전달하는 함수 */
  const handleConfirm = () => {
    onConfirm(new Date(selectedDate));
  };

  // --- COMPONENT ---
  /**
   * 캘린더의 헤더를 커스텀 렌더링하는 컴포넌트입니다.
   * 년/월을 누르면 피커 모달이 나타납니다.
   */
  const CustomHeader = ({ date }: { date: Date }) => {
    const headerDate = new Date(date);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() =>
            setCurrentMonth(
              format(subMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')
            )
          }>
          <ArrowLeftIcon />
        </Pressable>
        <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
          <Pressable
            onPress={() => {
              setPickerType('year');
              setPickerVisible(true);
            }}>
            <Text style={{ fontSize: 20, fontFamily: 'Pretendard-SemiBold' }}>
              {format(headerDate, 'yyyy년')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setPickerType('month');
              setPickerVisible(true);
            }}
            style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontFamily: 'Pretendard-SemiBold' }}>
              {format(headerDate, 'M월')}
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() =>
            setCurrentMonth(
              format(addMonths(new Date(currentMonth), 1), 'yyyy-MM-dd')
            )
          }>
          <ArrowRighttIcon />
        </Pressable>
      </View>
    );
  };

  /**
   * 년도와 월을 선택할 수 있는 스크롤 피커 모달입니다.
   */
  const YearMonthPickerModal = () => {
    const currentYear = getYear(new Date(currentMonth));
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(
      new Date(currentMonth).getMonth()
    );

    const minYear = minimumDate ? getYear(minimumDate) : currentYear - 120;
    const maxYear = maximumDate ? getYear(maximumDate) : currentYear + 10;
    const years = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => maxYear - i
    );
    const months = Array.from({ length: 12 }, (_, i) => i);

    const handlePickerConfirm = () => {
      let newDate = new Date(currentMonth);
      if (pickerType === 'year') {
        newDate = setYear(newDate, selectedYear);
      } else {
        newDate = setMonth(newDate, selectedMonth);
      }
      setCurrentMonth(format(newDate, 'yyyy-MM-dd'));
      setPickerVisible(false);
    };

    return (
      <Modal
        transparent
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}>
        <Pressable
          className="flex-1 justify-end bg-[rgba(0,0,0,0.6)]"
          onPress={() => setPickerVisible(false)}>
          <Pressable className="bg-white" onPress={e => e.stopPropagation()}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
              }}>
              <Pressable onPress={() => setPickerVisible(false)}>
                <Text>취소</Text>
              </Pressable>
              <Pressable onPress={handlePickerConfirm}>
                <Text>확인</Text>
              </Pressable>
            </View>
            {pickerType === 'year' ? (
              <Picker
                selectedValue={selectedYear}
                onValueChange={itemValue => setSelectedYear(itemValue)}>
                {years.map(year => (
                  <Picker.Item key={year} label={`${year}년`} value={year} />
                ))}
              </Picker>
            ) : (
              <Picker
                selectedValue={selectedMonth}
                onValueChange={itemValue => setSelectedMonth(itemValue)}>
                {months.map(month => (
                  <Picker.Item
                    key={month}
                    label={`${month + 1}월`}
                    value={month}
                  />
                ))}
              </Picker>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    );
  };

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        className="flex-1 justify-end bg-[rgba(0,0,0,0.6)]"
        onPress={onClose}>
        <Pressable
          className="mx-3 rounded-[24px] bg-white"
          style={{
            marginBottom: Platform.OS === 'android' ? bottomInset + 36 : 36,
          }}
          onPress={e => e.stopPropagation()}>
          {/* 헤더 */}
          <Box className="items-center justify-center px-2.5 py-4">
            <Box className="h-1 w-14 rounded-sm bg-gray-300" />
          </Box>
          {/* 캘린더 컴포넌트 */}
          <View className="bg-black p-6">
            <RNCalendar
              key={currentMonth}
              current={currentMonth}
              onDayPress={day => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: '#3478F5',
                  selectedTextColor: '#FFFFFF',
                },
              }}
              monthFormat="yyyy년 M월"
              renderHeader={date => <CustomHeader date={date} />}
              hideArrows
              minDate={
                minimumDate ? format(minimumDate, 'yyyy-MM-dd') : undefined
              }
              maxDate={
                maximumDate ? format(maximumDate, 'yyyy-MM-dd') : undefined
              }
              theme={{
                stylesheet: {
                  calendar: {
                    main: {
                      week: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    },
                  },
                },
                textSectionTitleColor: '#2d4150',
                selectedDayBackgroundColor: '#3478F5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#3478F5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                arrowColor: '#3478F5',
                monthTextColor: '#2d4150',
                textDayFontFamily: 'Pretendard-Regular',
                textMonthFontFamily: 'Pretendard-SemiBold',
                textDayHeaderFontFamily: 'Pretendard-Regular',
                textDayFontSize: 16,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 14,
              }}
            />
          </View>
          {/* 확인 버튼 */}
          <Box className="w-full p-6">
            <Pressable
              className="flex-1 items-center justify-center rounded-[16px] bg-primary-400 p-4"
              onPress={handleConfirm}>
              <Typography variant="button-medium" color="text-gray-0">
                확인
              </Typography>
            </Pressable>
          </Box>
        </Pressable>
      </Pressable>
      <YearMonthPickerModal />
    </Modal>
  );
}
