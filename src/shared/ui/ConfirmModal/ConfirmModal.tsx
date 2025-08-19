import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { Modal, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowRighttIcon } from '../icons';
import type { ConfirmModalProps } from './types';

/**
 * 사용자에게 특정 작업을 확인받기 위한 다목적 모달 컴포넌트입니다.
 * `variant` prop을 통해 세 가지 다른 유형의 모달을 렌더링할 수 있습니다.
 *
 * @param {'confirm'} variant - 일반 확인/취소 모달입니다. (예: "정말 삭제하시겠습니까?")
 * @param {'consent'} variant - 약관 동의 모달입니다.
 * @param {'select'} variant - 여러 옵션 중 하나를 선택하는 모달입니다. (예: 갤러리/카메라 선택)
 */
export function ConfirmModal(props: ConfirmModalProps) {
  const { bottom: bottomInset } = useSafeAreaInsets();
  const { visible, onCancel } = props;

  const renderContent = () => {
    switch (props.variant) {
      case 'confirm':
        return (
          <>
            <Box className="items-center justify-center p-6">
              <Typography variant="h3" color="text-gray-850" align="center">
                {props.title}
              </Typography>
            </Box>
            <Box className="w-full flex-row gap-2.5 p-6">
              <Pressable
                className="flex-1 items-center justify-center rounded-[16px] border border-primary-400 bg-gray-0 p-4"
                onPress={onCancel}>
                <Typography variant="button-medium" color="text-primary-400">
                  {props.cancelText ?? '취소'}
                </Typography>
              </Pressable>
              <Pressable
                className="flex-1 items-center justify-center rounded-[16px] bg-primary-400 p-4"
                onPress={props.onConfirm}>
                <Typography variant="button-medium" color="text-gray-0">
                  {props.confirmText ?? '확인'}
                </Typography>
              </Pressable>
            </Box>
          </>
        );
      case 'consent':
        return (
          <>
            <Box p="lg" className="gap-10 pb-20">
              <Typography variant="h3" color="text-gray-850">
                {props.title}
              </Typography>
              <Pressable onPress={props.onTermsPress}>
                <Box direction="row" justify="between">
                  <Typography variant="body-1" color="text-gray-700">
                    {props.termsContent}
                  </Typography>
                  <ArrowRighttIcon />
                </Box>
              </Pressable>
            </Box>
            <Box className="w-full flex-row gap-2.5 p-6">
              <Pressable
                className="flex-1 items-center justify-center rounded-[16px] bg-primary-400 p-4"
                onPress={props.onConfirm}>
                <Typography variant="button-medium" color="text-gray-0">
                  {props.confirmText ?? '동의'}
                </Typography>
              </Pressable>
            </Box>
          </>
        );
      case 'select':
        return (
          <Box p="lg" className="gap-10 pb-20">
            <Typography variant="h3" color="text-gray-850">
              {props.title}
            </Typography>
            <Box gap="lg">
              {props.options.map(option => (
                <Pressable key={option.id} onPress={option.onPress}>
                  <Box direction="row" justify="between">
                    <Box direction="row" gap="sm">
                      {option.icon}
                      <Typography variant="body-1" color="text-gray-700">
                        {option.text}
                      </Typography>
                    </Box>
                    <ArrowRighttIcon />
                  </Box>
                </Pressable>
              ))}
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}>
      <Pressable
        className="flex-1 justify-end bg-[rgba(0,0,0,0.6)]"
        onPress={onCancel}>
        <Pressable
          className="mx-3 rounded-[24px] bg-white"
          style={{
            marginBottom: Platform.OS === 'android' ? bottomInset + 36 : 36,
          }}
          onPress={e => e.stopPropagation()}>
          <Box className="items-center justify-center px-2.5 py-4">
            <Box className="h-1 w-14 rounded-sm bg-gray-300" />
          </Box>
          {renderContent()}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
