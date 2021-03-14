const { join } = require('path');

const { src, dest } = require('gulp');
const typescript = require('gulp-typescript');

const { SOURCES, OUT_DIST } = require('../constants');

const dts = () => {
  const tsProject = typescript.createProject('tsconfig.json');
  const stream = src(SOURCES).pipe(tsProject());
  const destDir = join(OUT_DIST, 'dts');

  stream.dts.on('error', (error) => {
    throw error;
  });

  stream.js.emit('end');
  stream.dts.pipe(dest(destDir));

  return stream;
};

module.exports = dts;
