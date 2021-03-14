const { join } = require('path');

const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const { SOURCES, BABEL, OUT_DIST } = require('../constants');

const js = () => {
  const destDir = join(OUT_DIST, 'js');
  return src(SOURCES)
    .pipe(sourcemaps.init())
    .pipe(babel(BABEL))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(destDir));
};

module.exports = js;
