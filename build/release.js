const { OUT_DIST } = require('./constants');

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'chore', release: 'patch' },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'chore', hidden: 'Chore' },
            { type: 'docs', hidden: 'Documentation' },
            { type: 'style', hidden: 'Style' },
            { type: 'refactor', hidden: 'Refactor' },
            { type: 'perf', hidden: 'Performance' },
            { type: 'test', hidden: 'Test' },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
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
