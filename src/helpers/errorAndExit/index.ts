const errorAndExit = (message: string) => {
  console.error(message);
  process.exit(1);
};

export default errorAndExit;
