/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  ...defaultConfig,
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('@symbol-blockchain-community/expo-symbol-crypto'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      events: require.resolve('events'),
      asserts: require.resolve('assert'),
      url: require.resolve('url'),
      process: require.resolve('process'),
      util: require.resolve('util'),
    },
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'cjs'],
  },
};

module.exports = config;
