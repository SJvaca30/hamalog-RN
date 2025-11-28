import WheelPicker, {
  useOnPickerValueChangedEffect,
  usePickerControl,
  withPickerControl,
} from '@quidone/react-native-wheel-picker';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { format, setHours, setMinutes } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ControlledWheelPicker = withPickerControl(WheelPicker);

// AM/PM 데이터
const ampmData = [
  { value: 'AM', label: '오전' },
  { value: 'PM', label: '오후' },
];

// 시간 데이터 (1-12)
const hourData = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

// 분 데이터 (0-59, 5분 간격)
const minuteData = Array.from({ length: 12 }, (_, i) => ({
  value: i * 5,
  label: `${(i * 5).toString().padStart(2, '0')}`,
}));

type PickersMap = {
  ampm: { item: { value: string; label: string } };
  hour: { item: { value: number; label: string } };
  minute: { item: { value: number; label: string } };
};

export interface TimePickerModalProps {
  /** 모달 표시 여부 */
  visible: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 시간 선택 확인 콜백 */
  onConfirm: (time: Date) => void;
  /** 초기 시간 (기본값: 현재 시간) */
  initialTime?: Date;
  /** 모달 제목 */
  title?: string;
}

/**
 * Wheel 스타일의 시간 선택기를 위한 모달 컴포넌트
 * - 오전/오후, 시간(1-12), 분(5분 간격) 선택 가능
 * - @quidone/react-native-wheel-picker 사용
 * - 네이티브 코드 없이 완전 커스터마이징 가능
 */
export function TimePickerModal({
  visible,
  onClose,
  onConfirm,
  initialTime,
  title = '복약 시간',
}: TimePickerModalProps) {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const pickerControl = usePickerControl<PickersMap>();

  // 초기 시간에서 AM/PM, 시간, 분 추출
  const getInitialValues = useCallback((time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const roundedMinute = Math.round(minutes / 5) * 5; // 5분 단위로 반올림

    return {
      ampm,
      hour: hour12,
      minute: roundedMinute >= 60 ? 0 : roundedMinute,
    };
  }, []);

  const initialValues = getInitialValues(initialTime ?? new Date());

  // 현재 선택된 값들
  const [selectedValues, setSelectedValues] = useState(initialValues);

  // 현재 선택된 시간을 Date 객체로 변환
  const getSelectedTime = useCallback(() => {
    const { ampm, hour, minute } = selectedValues;
    let hour24 = hour;

    if (ampm === 'AM' && hour === 12) {
      hour24 = 0;
    } else if (ampm === 'PM' && hour !== 12) {
      hour24 = hour + 12;
    }

    const baseDate = initialTime ?? new Date();
    return setMinutes(setHours(baseDate, hour24), minute);
  }, [selectedValues, initialTime]);

  // picker 값 변경 시 상태 업데이트
  useOnPickerValueChangedEffect(pickerControl, event => {
    setSelectedValues({
      ampm: event.pickers.ampm.item.value,
      hour: event.pickers.hour.item.value,
      minute: event.pickers.minute.item.value,
    });
  });

  // 모달이 열릴 때 초기값 설정
  useEffect(() => {
    if (visible) {
      const values = getInitialValues(initialTime ?? new Date());
      setSelectedValues(values);
    }
  }, [visible, initialTime, getInitialValues]);

  const handleConfirm = () => {
    const selectedTime = getSelectedTime();
    onConfirm(selectedTime);
  };

  const handleCancel = () => {
    // 초기 시간으로 되돌리기
    const values = getInitialValues(initialTime ?? new Date());
    setSelectedValues(values);
    onClose();
  };

  const currentTime = getSelectedTime();

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

          {/* 제목 */}
          <Box className="px-6 pb-4">
            <Typography variant="h3" color="text-gray-850" align="center">
              {title}
            </Typography>
          </Box>

          {/* 현재 선택된 시간 표시 */}
          <Box className="px-6 pb-6">
            <Typography variant="h1" color="text-primary-400" align="center">
              {format(currentTime, 'a h:mm', { locale: ko })}
            </Typography>
          </Box>

          {/* Wheel Pickers */}
          <Box
            direction="row"
            className="px-6 py-4"
            justify="between"
            align="center">
            {/* AM/PM Picker */}
            <Box direction="col" align="center" className="flex-1">
              <Typography
                variant="label"
                color="text-gray-500"
                className="mb-2">
                오전/오후
              </Typography>
              <ControlledWheelPicker
                control={pickerControl}
                pickerName="ampm"
                data={ampmData}
                value={selectedValues.ampm}
                width={80}
                enableScrollByTapOnItem
                renderItem={({ item }) => (
                  <Box className="h-10 items-center justify-center py-2">
                    <Typography
                      variant="button-medium"
                      color={
                        item.value === selectedValues.ampm
                          ? 'text-primary-400'
                          : 'text-gray-500'
                      }>
                      {item.label}
                    </Typography>
                  </Box>
                )}
              />
            </Box>

            {/* 시간 Picker */}
            <Box direction="col" align="center" className="flex-1">
              <Typography
                variant="label"
                color="text-gray-500"
                className="mb-2">
                시
              </Typography>
              <ControlledWheelPicker
                control={pickerControl}
                pickerName="hour"
                data={hourData}
                value={selectedValues.hour}
                width={80}
                enableScrollByTapOnItem
                renderItem={({ item }) => (
                  <Box className="h-10 items-center justify-center py-2">
                    <Typography
                      variant="button-medium"
                      color={
                        item.value === selectedValues.hour
                          ? 'text-primary-400'
                          : 'text-gray-500'
                      }>
                      {item.label}
                    </Typography>
                  </Box>
                )}
              />
            </Box>

            {/* 분 Picker */}
            <Box direction="col" align="center" className="flex-1">
              <Typography
                variant="label"
                color="text-gray-500"
                className="mb-2">
                분
              </Typography>
              <ControlledWheelPicker
                control={pickerControl}
                pickerName="minute"
                data={minuteData}
                value={selectedValues.minute}
                width={80}
                enableScrollByTapOnItem
                renderItem={({ item }) => (
                  <Box className="h-10 items-center justify-center py-2">
                    <Typography
                      variant="button-medium"
                      color={
                        item.value === selectedValues.minute
                          ? 'text-primary-400'
                          : 'text-gray-500'
                      }>
                      {item.label}
                    </Typography>
                  </Box>
                )}
              />
            </Box>
          </Box>

          {/* 버튼들 */}
          <Box direction="row" className="gap-3 p-6">
            <Pressable
              className="flex-1 items-center justify-center rounded-[16px] border border-gray-200 py-4"
              onPress={handleCancel}>
              <Typography variant="button-medium" color="text-gray-700">
                취소
              </Typography>
            </Pressable>
            <Pressable
              className="flex-1 items-center justify-center rounded-[16px] bg-primary-400 py-4"
              onPress={handleConfirm}>
              <Typography variant="button-medium" color="text-gray-0">
                확인
              </Typography>
            </Pressable>
          </Box>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
