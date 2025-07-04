import { Box, Container, Text } from '@shared';
import { ScrollView, View } from 'react-native';

export const HomeWidget = () => {
  return (
    <Container className="bg-gray-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 p-4">
          {/* Figma Typography 시스템 */}
          <Box className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <Text
              variant="headline-main-b"
              color="text-gray-0"
              className="mb-2">
              🎨 Figma Typography 시스템
            </Text>
            <Text variant="body" color="text-gray-0" className="opacity-90">
              Figma에서 가져온 정확한 Typography 스타일로 letter-spacing,
              font-weight까지 완벽하게 구현했습니다.
            </Text>
          </Box>

          {/* Typography Variants 예제 */}
          <Box className="rounded-xl bg-gray-50 p-6">
            <Text
              variant="headline-title"
              color="text-gray-850"
              className="mb-4">
              📝 Typography Variants
            </Text>

            <View className="gap-4">
              {/* Headlines */}
              <View>
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  HEADLINE 그룹
                </Text>
                <Text variant="headline-p1" className="mb-1">
                  HS유지체 P1 (24px) - HS유지체-Regular
                </Text>
                <Text variant="headline-p2" className="mb-1">
                  HS유지체 P2 (20px) - HS유지체-Regular
                </Text>
                <Text variant="headline-main-l" className="mb-1">
                  Paperlogy Main Light (32px) - Paperlogy-Light
                </Text>
                <Text variant="headline-main-b" className="mb-1">
                  Paperlogy Main Bold (32px) - Paperlogy-Bold
                </Text>
                <Text variant="headline-title">
                  Paperlogy Title (18px) - Paperlogy-Medium
                </Text>
              </View>

              {/* Body */}
              <View>
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  BODY 그룹
                </Text>
                <Text variant="body" className="mb-1">
                  Pretendard Body (16px) - Pretendard-Regular
                </Text>
              </View>

              {/* Buttons */}
              <View>
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  BUTTON 그룹
                </Text>
                <Text variant="button-primary" className="mb-1">
                  Primary Button (16px) - Paperlogy-SemiBold
                </Text>
                <Text variant="button-date" className="mb-1">
                  Date Button (14px) - Paperlogy-Regular
                </Text>
                <Text variant="button-secondary" className="mb-1">
                  Secondary Button (14px) - Pretendard-Medium
                </Text>
                <Text variant="button-micro">
                  Micro Button (12px) - Paperlogy-Regular
                </Text>
              </View>
            </View>
          </Box>

          {/* 사용법 예제 */}
          <Box className="rounded-xl bg-blue-50 p-6">
            <Text
              variant="headline-title"
              color="text-primary-700"
              className="mb-4">
              💻 Typography Variant 사용법
            </Text>

            <View className="gap-4">
              <View className="rounded-lg border border-blue-200 bg-white p-4">
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  JSX 코드:
                </Text>
                <Text fontFamily="system" size="xs" color="text-gray-700">
                  {`<Text variant="headline-main-b">`}
                  {'\n'}
                  {'  환영합니다!'}
                  {'\n'}
                  {`</Text>`}
                </Text>
              </View>

              <View className="rounded-lg border border-blue-200 bg-white p-4">
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  결과:
                </Text>
                <Text variant="headline-main-b" color="text-primary-700">
                  환영합니다!
                </Text>
              </View>
            </View>
          </Box>

          {/* 기존 폰트 시스템과 비교 */}
          <Box className="rounded-xl bg-yellow-50 p-6">
            <Text
              variant="headline-title"
              color="text-point-yellow-500"
              className="mb-4">
              ⚡ 기존 vs 새로운 Typography
            </Text>

            <View className="gap-4">
              <View>
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  기존 방식 (여전히 사용 가능):
                </Text>
                <Text
                  fontFamily="hamalog-bold"
                  hamalogSize="headline-p1"
                  color="text-gray-700">
                  기존 하마로그 폰트 시스템
                </Text>
              </View>

              <View>
                <Text
                  variant="button-micro"
                  color="text-gray-500"
                  className="mb-2">
                  새로운 Figma Typography Variant:
                </Text>
                <Text variant="headline-main-b" color="text-gray-700">
                  새로운 Figma Typography 시스템
                </Text>
              </View>
            </View>
          </Box>

          {/* 주의사항 */}
          <Box className="rounded-xl bg-red-50 p-6">
            <Text
              variant="headline-title"
              color="text-point-red-500"
              className="mb-4">
              ⚠️ 폰트 파일 추가 필요
            </Text>
            <Text variant="body" color="text-point-red-500">
              현재 Pretendard만 로드되어 있습니다. HS유지체와 Paperlogy 폰트
              파일을 추가해야 모든 variants가 정상 작동합니다.
            </Text>
          </Box>

          {/* 기존 폰트 시스템 유지 */}
          <Box className="rounded-xl bg-primary-50 p-6">
            <Text
              fontFamily="hamalog-bold"
              hamalogSize="headline-main-b"
              color="text-primary-700"
              className="mb-2">
              🎨 기존 Hamalog 폰트 시스템
            </Text>
            <Text
              fontFamily="hamalog"
              hamalogSize="body-1"
              color="text-gray-700">
              Pretendard 폰트를 기반으로 한 타입 세이프한 폰트 시스템입니다.
            </Text>
          </Box>

          {/* 폰트 패밀리 예제 */}
          <Box className="rounded-xl bg-gray-50 p-6">
            <Text
              fontFamily="hamalog-semibold"
              hamalogSize="headline-title"
              color="text-gray-850"
              className="mb-4">
              📝 폰트 패밀리 종류
            </Text>

            <View className="gap-3">
              <Text fontFamily="hamalog" hamalogSize="body-1">
                • hamalog (Regular) - 기본 폰트
              </Text>
              <Text fontFamily="hamalog-medium" hamalogSize="body-1">
                • hamalog-medium (Medium) - 중간 두께
              </Text>
              <Text fontFamily="hamalog-semibold" hamalogSize="body-1">
                • hamalog-semibold (SemiBold) - 세미볼드
              </Text>
              <Text fontFamily="hamalog-bold" hamalogSize="body-1">
                • hamalog-bold (Bold) - 볼드
              </Text>
              <Text
                fontFamily="system"
                hamalogSize="body-1"
                color="text-gray-500">
                • system - 시스템 폰트 (fallback)
              </Text>
            </View>
          </Box>

          {/* 텍스트 크기별 예제 */}
          <Box className="rounded-xl bg-point-yellow-100 p-6">
            <Text
              fontFamily="hamalog-semibold"
              hamalogSize="headline-title"
              color="text-point-yellow-500"
              className="mb-4">
              📏 텍스트 크기 예제
            </Text>

            <View className="gap-4">
              {/* HEADLINE 그룹 */}
              <View>
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="caption-b"
                  color="text-gray-500"
                  className="mb-2">
                  HEADLINE 그룹
                </Text>
                <Text
                  fontFamily="hamalog-bold"
                  hamalogSize="headline-p1"
                  className="mb-1">
                  P1 요금제 (24px)
                </Text>
                <Text
                  fontFamily="hamalog"
                  hamalogSize="headline-p2"
                  className="mb-1">
                  P2 메인 요금제 (16px)
                </Text>
                <Text
                  fontFamily="hamalog-bold"
                  hamalogSize="headline-main-b"
                  className="mb-1">
                  메인 헤드라인 Bold (24px)
                </Text>
                <Text
                  fontFamily="hamalog"
                  hamalogSize="headline-main-l"
                  className="mb-1">
                  메인 헤드라인 Light (22px)
                </Text>
                <Text fontFamily="hamalog-bold" hamalogSize="headline-title">
                  타이틀 Bold (18px)
                </Text>
              </View>

              {/* BODY 그룹 */}
              <View>
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="caption-b"
                  color="text-gray-500"
                  className="mb-2">
                  BODY 그룹
                </Text>
                <Text
                  fontFamily="hamalog"
                  hamalogSize="body-1"
                  className="mb-1">
                  Body1 일반 본문 (16px)
                </Text>
                <Text
                  fontFamily="hamalog"
                  hamalogSize="body-2"
                  className="mb-1">
                  Body2 보조 설명 (14px)
                </Text>
                <Text
                  fontFamily="hamalog-bold"
                  hamalogSize="caption-b"
                  className="mb-1">
                  Caption Bold (12px)
                </Text>
                <Text fontFamily="hamalog" hamalogSize="caption">
                  Caption 일반 (12px)
                </Text>
              </View>

              {/* BUTTON 그룹 */}
              <View>
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="caption-b"
                  color="text-gray-500"
                  className="mb-2">
                  BUTTON 그룹
                </Text>
                <Text
                  fontFamily="hamalog-semibold"
                  hamalogSize="button-primary"
                  className="mb-1">
                  Primary Button (16px)
                </Text>
                <Text
                  fontFamily="hamalog"
                  hamalogSize="button-date"
                  className="mb-1">
                  Date 텍스트 (14px)
                </Text>
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="button-secondary"
                  className="mb-1">
                  Secondary Button (12px)
                </Text>
                <Text fontFamily="hamalog" hamalogSize="button-micro">
                  Micro Button (12px)
                </Text>
              </View>
            </View>
          </Box>

          {/* 사용법 예제 */}
          <Box className="rounded-xl bg-primary-100 p-6">
            <Text
              fontFamily="hamalog-semibold"
              hamalogSize="headline-title"
              color="text-primary-700"
              className="mb-4">
              💻 사용법 예제
            </Text>

            <View className="gap-4">
              <View className="rounded-lg bg-gray-0 p-4">
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="caption-b"
                  color="text-gray-500"
                  className="mb-2">
                  JSX 코드:
                </Text>
                <Text
                  fontFamily="system"
                  hamalogSize="caption"
                  color="text-gray-700">
                  {`<Text fontFamily="hamalog-bold" hamalogSize="headline-main-b">`}
                  {'\n'}
                  {'  하마로그 앱에 오신 것을 환영합니다!'}
                  {'\n'}
                  {`</Text>`}
                </Text>
              </View>

              <View className="rounded-lg bg-gray-0 p-4">
                <Text
                  fontFamily="hamalog-medium"
                  hamalogSize="caption-b"
                  color="text-gray-500"
                  className="mb-2">
                  결과:
                </Text>
                <Text
                  fontFamily="hamalog-bold"
                  hamalogSize="headline-main-b"
                  color="text-primary-700">
                  하마로그 앱에 오신 것을 환영합니다!
                </Text>
              </View>
            </View>
          </Box>

          {/* 색상 예제 (간단) */}
          <Box className="rounded-xl bg-gray-100 p-6">
            <Text
              fontFamily="hamalog-semibold"
              hamalogSize="headline-title"
              color="text-gray-850"
              className="mb-4">
              🎨 색상 + 폰트 조합
            </Text>

            <View className="gap-3">
              <Text
                fontFamily="hamalog"
                hamalogSize="body-1"
                color="text-primary-700">
                Primary Blue 텍스트
              </Text>
              <Text
                fontFamily="hamalog-bold"
                hamalogSize="body-1"
                color="text-point-red-500">
                Point Red Bold 텍스트
              </Text>
              <Text
                fontFamily="hamalog-medium"
                hamalogSize="body-1"
                color="text-point-yellow-500">
                Point Yellow Medium 텍스트
              </Text>
              <Text
                fontFamily="hamalog"
                hamalogSize="body-2"
                color="text-gray-500">
                Gray Small 텍스트
              </Text>
            </View>
          </Box>

          {/* 폰트 파일 안내 */}
          <Box className="rounded-xl bg-point-red-100 p-6">
            <Text
              fontFamily="hamalog-semibold"
              hamalogSize="headline-title"
              color="text-point-red-500"
              className="mb-2">
              📁 폰트 파일 설치 안내
            </Text>
            <Text
              fontFamily="hamalog"
              hamalogSize="body-2"
              color="text-gray-700"
              className="mb-3">
              현재 시스템 폰트를 사용 중입니다. 커스텀 폰트를 적용하려면:
            </Text>
            <View className="gap-2">
              <Text
                fontFamily="hamalog"
                hamalogSize="caption"
                color="text-gray-700">
                1. Pretendard 폰트를 assets/fonts/에 다운로드
              </Text>
              <Text
                fontFamily="hamalog"
                hamalogSize="caption"
                color="text-gray-700">
                2. app/_layout.tsx에서 useFonts 주석 해제
              </Text>
              <Text
                fontFamily="hamalog"
                hamalogSize="caption"
                color="text-gray-700">
                3. 앱 재시작 후 적용 확인
              </Text>
            </View>
          </Box>
        </View>
      </ScrollView>
    </Container>
  );
};
