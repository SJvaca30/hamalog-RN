import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable } from 'react-native';

import { Box } from '../Box';
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
 * iOS에서는 모달로, Android에서는 네이티브 피커로 표시됩니다.
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

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate && event.type !== 'dismissed') {
      onDateChange(selectedDate);
      if (Platform.OS === 'ios') {
        setShowPicker(false);
      }
    } else if (Platform.OS === 'ios' && event.type === 'dismissed') {
      setShowPicker(false);
    }
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
            pointerEvents: 'none',
          }}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </Box>
  );
}
