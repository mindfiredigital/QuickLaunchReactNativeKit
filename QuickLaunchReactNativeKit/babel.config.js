module.exports = api => {
  const isProduction = api.env('production');

  const plugins = ['react-native-reanimated/plugin'];

  if (isProduction) {
    plugins.push('transform-remove-console');
  }

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins,
  };
};
