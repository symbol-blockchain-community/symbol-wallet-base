/* eslint-env node */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  ...getDefaultConfig(__dirname),
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('expo-symbol-crypto'),
      stream: require.resolve('readable-stream'),
      buffer: require.resolve('buffer'),
      events: require.resolve('events'),
    },
  },
};

module.exports = config;
