import { Pressable, StyleSheet, Text } from 'react-native';

const _KAKAO_SYMBOL_URI =
  'https://developers.kakao.com/assets/img/about/logos/kakaologin/kr/kakaologin_ci_01.png';

interface KakaoLoginButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function KakaoLoginButton({ onPress, disabled }: KakaoLoginButtonProps) {
  console.log('🔍 KakaoLoginButton 렌더링됨', { disabled });

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        (pressed || disabled) && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {/* 임시로 단순한 구조로 변경하여 테스트 */}
      <Text style={{ color: '#3C1E1E', fontSize: 16, fontWeight: 'bold' }}>
        🟡 카카오 로그인
      </Text>
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
