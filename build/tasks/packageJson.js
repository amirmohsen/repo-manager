const { src, dest } = require('gulp');
const jsonTransform = require('gulp-json-transform');
const { lensPath, set, view } = require('ramda');
const { OUT_DIST, OUT_DIST_FIELDS, PACKAGE_JSON } = require('../constants');

const replaceOutDist = (data, fields) =>
  fields.reduce((acc, field) => {
    const path = lensPath(field.split('.'));
    return set(path, view(path, acc).replace(`${OUT_DIST}/`, ''), acc);
  }, data);

const packageJson = () =>
  src(PACKAGE_JSON)
    .pipe(jsonTransform((data) => replaceOutDist(data, OUT_DIST_FIELDS), 2))
    .pipe(dest(OUT_DIST));

module.exports = packageJson;
