import { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '../Box';
import { CalendarModal } from '../Calendar';
import { TextField } from '../TextField';

interface DatePickerProps {
  value?: Date;
  onDateChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

/**
 * 날짜 선택 컴포넌트
 * CalendarModal을 사용하여 일관된 UI를 제공합니다.
 */
export function DatePicker({
  value,
  onDateChange,
  placeholder = '날짜를 선택해주세요',
  error,
  disabled = false,
  minimumDate,
  maximumDate,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handlePress = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const handleDateConfirm = (selectedDate: Date) => {
    onDateChange(selectedDate);
    setShowPicker(false);
  };

  const handleDateCancel = () => {
    setShowPicker(false);
  };

  const displayValue = value ? formatDate(value) : '';

  return (
    <Box>
      <Pressable onPress={handlePress} disabled={disabled}>
        <TextField
          value={displayValue}
          placeholder={placeholder}
          error={error}
          onChangeText={() => {}} // 읽기 전용이므로 빈 함수
          inputProps={{
            editable: false,
          }}
        />
      </Pressable>

      <CalendarModal
        visible={showPicker}
        onClose={handleDateCancel}
        onConfirm={handleDateConfirm}
        initialDate={value || new Date()}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </Box>
  );
}
