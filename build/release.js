const { OUT_DIST } = require('./constants');

module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        pkgRoot: OUT_DIST,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'yarn sync-versions',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
      },
    ],
    '@semantic-release/github',
  ],
};
