import { Pressable, StyleSheet, View } from 'react-native';

import { colors } from '@shared/config';
import { Typography } from '@shared/ui/Typography';

interface KakaoLoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function KakaoLoginButton({ onPress, disabled }: KakaoLoginButtonProps) {
  // 4단계: 최종 완성된 카카오 로그인 버튼
  return (
    <Pressable
      style={[styles.container, disabled && styles.pressed]}
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.symbol}>
        <Typography variant="body-1" color="text-gray-850">
          K
        </Typography>
      </View>
      <View style={styles.labelContainer}>
        <Typography variant="body-1" color="text-gray-850">
          카카오 로그인
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.point.yellow[400],
    borderRadius: 6,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    width: '100%',
  },
  labelContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  symbol: {
    alignItems: 'center',
    backgroundColor: colors.gray[850],
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    left: 15,
    position: 'absolute',
    width: 24,
  },
});
