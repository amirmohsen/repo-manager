const prefix = (str: string, prefixStr: string): string =>
  [prefixStr, str].filter(Boolean).join(' ');

export default prefix;
