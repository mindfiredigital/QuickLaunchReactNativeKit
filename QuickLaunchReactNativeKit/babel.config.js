module.exports = api => {
  const isProduction = api.env('production');

  const plugins = [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '*': '.',
          root: './',
          src: './src',
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          '@constants': './src/constants',
          i18n: './src/i18n',
          navigation: './src/navigation',
          screens: './src/screens',
          styles: './src/screens/styles.ts',
          service: './src/service',
          store: './src/store',
          theme: './src/theme',
          utils: './src/utils',
          settings: './settings',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ];

  if (isProduction) {
    plugins.push('transform-remove-console');
  }

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins,
  };
};
