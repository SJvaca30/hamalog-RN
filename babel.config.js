module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@widgets': './src/widgets',
          '@widgets/*': './src/widgets/*',
          '@features': './src/features',
          '@features/*': './src/features/*',
          '@entities': './src/entities',
          '@entities/*': './src/entities/*',
          '@shared': './src/shared',
          '@shared/*': './src/shared/*',
        },
      },
    ],
  ];

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],

    plugins,
  };
};
