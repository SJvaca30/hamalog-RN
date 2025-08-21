import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Typography } from '@shared/ui/Typography';

const KAKAO_SYMBOL_URI =
  'https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakaologin_ci_01.png';

interface KakaoLoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function KakaoLoginButton({ onPress, disabled }: KakaoLoginButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        (pressed || disabled) && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Image source={{ uri: KAKAO_SYMBOL_URI }} style={styles.symbol} />
      <View style={styles.labelContainer}>
        <Typography variant="button-large" color="text-gray-850">
          카카오 로그인
        </Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FEE500',
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
    height: 24,
    left: 15,
    position: 'absolute',
    width: 24,
  },
});
