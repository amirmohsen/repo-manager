const { watch: _watch, series, parallel } = require('gulp');

const js = require('./tasks/javascript');
const dts = require('./tasks/dts');
const clean = require('./tasks/clean');
const packageJson = require('./tasks/packageJson');
const copy = require('./tasks/copy');

const { ALL_FILES } = require('./constants');

module.exports = () => {
  const build = parallel(js, dts, packageJson, copy);
  const watch = () => _watch(ALL_FILES, { ignoreInitial: false }, build);

  return {
    clean,
    build: series(clean, build),
    watch: series(clean, watch),
  };
};
