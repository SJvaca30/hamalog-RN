import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import { Modal, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ConfirmModalProps } from './types';

export function ConfirmModal({
  visible,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const { bottom: bottomInset } = useSafeAreaInsets();

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
          {/* Handle Bar */}
          <Box className="items-center justify-center px-2.5 py-4">
            <Box className="h-1 w-14 rounded-sm bg-gray-300" />
          </Box>

          {/* 이전페이지 이동 모달 */}
          <Box className="items-center justify-center p-6">
            <Typography variant="h3" color="text-gray-850" align="center">
              {`지금까지 작성한 내용이 저장되지 않아요.\n이전 페이지로 이동할까요?`}
            </Typography>
          </Box>

          {/* Buttons */}
          <Box className="w-full flex-row gap-2.5 p-6">
            <Pressable
              className="flex-1 items-center justify-center rounded-[16px] border border-primary-400 bg-gray-0 p-4"
              onPress={onCancel}>
              <Typography variant="button-medium" color="text-primary-400">
                취소
              </Typography>
            </Pressable>

            <Pressable
              className="flex-1 items-center justify-center rounded-[16px] bg-primary-400 p-4"
              onPress={onConfirm}>
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
