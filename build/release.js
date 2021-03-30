const { OUT_DIST } = require('./constants');

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'chore', release: 'patch' },
        ],
      },
    ],
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
      '@semantic-release/exec',
      {
        prepareCmd: 'yarn build:docs',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'docs', 'CHANGELOG.md'],
      },
    ],
    '@semantic-release/github',
  ],
};
