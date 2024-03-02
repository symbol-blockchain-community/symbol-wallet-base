/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  ...defaultConfig,
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('expo-symbol-crypto'),
      stream: require.resolve('readable-stream'),
      buffer: require.resolve('buffer'),
      events: require.resolve('events'),
    },
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs'],
  },
};

module.exports = config;
