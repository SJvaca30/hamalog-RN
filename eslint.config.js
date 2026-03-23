/* eslint-env node */
const { FlatCompat } = require('@eslint/eslintrc');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const betterTailwindcss = require('eslint-plugin-better-tailwindcss');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['**/node_modules/**', 'dist/**', 'coverage/**'],
  },
  // Prettier 충돌 방지를 위한 설정
  ...compat.extends('prettier'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      'better-tailwindcss': betterTailwindcss,
    },
    settings: {
      'react-native': {
        version: 'detect',
      },
    },
    rules: {
      // React hooks 규칙
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript 규칙 강화
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/unbound-method': 'off',

      // React Native 특화 규칙
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off', // NativeWind에서는 Text 컴포넌트 외에도 텍스트 사용 가능
      'react-native/sort-styles': ['warn', 'asc'],

      // TailwindCSS/NativeWind 최적화
      'better-tailwindcss/sort-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',

      // 기존 규칙들
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off', // TypeScript 규칙 사용
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@entities/*/api',
            '@entities/*/api/*',
            '@entities/*/model',
            '@entities/*/model/*',
            '@entities/*/lib',
            '@entities/*/lib/*',
            '@entities/*/ui',
            '@entities/*/ui/*',
            '@features/*/api',
            '@features/*/api/*',
            '@features/*/model',
            '@features/*/model/*',
            '@features/*/lib',
            '@features/*/lib/*',
            '@features/*/ui',
            '@features/*/ui/*',
            '@widgets/*/api',
            '@widgets/*/api/*',
            '@widgets/*/model',
            '@widgets/*/model/*',
            '@widgets/*/lib',
            '@widgets/*/lib/*',
            '@widgets/*/ui',
            '@widgets/*/ui/*',
            '@pages/*/*',
            '@pages/*/*/*',
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@entities/*',
            '@features/*',
            '@widgets/*',
            '@pages/*',
            '@app/*',
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@features/*', '@widgets/*', '@pages/*', '@app/*'],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@widgets/*', '@pages/*', '@app/*'],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@pages/*', '@app/*'],
        },
      ],
    },
  },
];

module.exports = eslintConfig;
