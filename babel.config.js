module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~localization': './src/localization',
          '~store': './src/store',
          '~slices': './src/slices',
          '~hooks': './src/hooks',
          '~components': './src/components',
          '~middlewares': './src/middlewares',
          '~features': './src/features',
          '~api': './src/api',
          '~utils': './src/utils',
          '~navigation': './src/navigation',
          '~services': './src/services',
          '~constants': './src/constants',
          '~theme': './src/theme',
        },
      },
    ],
  ],
};
