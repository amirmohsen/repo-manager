import initTools from './helpers/globals';

process.addListener('unhandledRejection', (error) => {
  throw error;
});

initTools();

export * from './actions';
