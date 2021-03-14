const del = require('del');

const { OUT_DIST } = require('../constants');

const clean = () => del(OUT_DIST);

module.exports = clean;
