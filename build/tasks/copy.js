const { src, dest } = require('gulp');

const { FILES_TO_COPY, OUT_DIST } = require('../constants');

const copy = () => src(FILES_TO_COPY).pipe(dest(OUT_DIST));

module.exports = copy;
