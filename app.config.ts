import 'dotenv/config';
import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  // 기본 config 객체에 우리 커스텀 설정을 병합합니다.
  const customConfig: ExpoConfig = {
    name: 'HamaLog',
    slug: 'hamalog-rn',
    version: '1.0.0',
    scheme: 'hamalog-rn',
    description:
      '정신적 어려움을 겪는 분들을 대상으로 약 처방·복약 관리+일기 작성을 통해 스스로를 돌볼 수 있도록 도와주는 서비스 하마로그',
    runtimeVersion: {
      policy: 'appVersion',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        // 여기서 projectId를 명시적으로 설정합니다.
        projectId:
          process.env.EAS_PROJECT_ID ?? '7d87b9d1-aacd-41d1-9425-e8a4586b4ddd',
      },
      category: 'health',
      tags: [
        'mental-health',
        'mental-illness',
        'mental-disorder',
        'mental-health-app',
        'mental-health-support',
        'mental-health-management',
        'mental-health-therapy',
        'mental-health-treatment',
      ],
    },
    experiments: {
      typedRoutes: true,
    },
    plugins: [
      'expo-router',
      [
        'expo-build-properties',
        {
          android: {
            // 기본 안드로이드 설정
          },
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: '사진을 등록하기 위해 앨범 접근 권한이 필요합니다.',
          cameraPermission:
            '사진을 촬영하기 위해 카메라 접근 권한이 필요합니다.',
        },
      ],
    ],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.hamalog.hamalog',
      buildNumber: '1',
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.hamalog.hamalog',
      versionCode: 1,
      softwareKeyboardLayoutMode: 'pan',
      permissions: [
        'INTERNET',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'CAMERA',
        'RECORD_AUDIO',
      ],
    },
  };

  // 기본 config와 커스텀 config를 깊은 병합합니다.
  // (주의: 단순 spread operator(...) 대신 깊은 병합이 필요할 수 있으나,
  // 현재 구조에서는 대부분의 속성을 덮어쓰므로 spread로 충분합니다.)
  return {
    ...config,
    ...customConfig,
    extra: {
      ...config.extra,
      ...customConfig.extra,
    },
  };
};
