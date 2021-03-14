module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV || 'development');
  return require('./build/constants').BABEL;
};
