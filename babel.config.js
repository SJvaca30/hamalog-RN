module.exports = function (api) {
  api.cache(true);
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@app': './src/app',
          '@app/*': './src/app/*',
          '@pages': './src/pages',
          '@pages/*': './src/pages/*',
          '@widgets': './src/widgets',
          '@widgets/*': './src/widgets/*',
          '@features': './src/features',
          '@features/*': './src/features/*',
          '@entities': './src/entities',
          '@entities/*': './src/entities/*',
          '@shared': './src/shared',
          '@shared/*': './src/shared/*',
          '@assets': './assets',
          '@assets/*': './assets/*',
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
