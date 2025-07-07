const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for absolute imports
config.resolver = {
  ...config.resolver,
  extraNodeModules: {
    '@app': path.resolve(__dirname, 'app'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@widgets': path.resolve(__dirname, 'src/widgets'),
    '@features': path.resolve(__dirname, 'src/features'),
    '@entities': path.resolve(__dirname, 'src/entities'),
    '@shared': path.resolve(__dirname, 'src/shared'),
    '@assets': path.resolve(__dirname, 'assets'),
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
