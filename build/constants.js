const BABEL = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12',
        },
        modules: 'commonjs',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
};

const OUT_DIST = 'out/dist';
const OUT_DIST_FIELDS = ['bin.mrt', 'main', 'types'];

const SOURCES = ['src/**/*.ts', '!src/**/*.test.ts'];
const PACKAGE_JSON = 'package.json';
const FILES_TO_COPY = ['LICENSE', 'README.md'];

const ALL_FILES = [...SOURCES, PACKAGE_JSON, ...FILES_TO_COPY];

const constants = {
  BABEL,
  SOURCES,
  PACKAGE_JSON,
  ALL_FILES,
  OUT_DIST,
  OUT_DIST_FIELDS,
  FILES_TO_COPY,
};

module.exports = constants;
