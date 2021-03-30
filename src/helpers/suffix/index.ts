const suffix = (str: string, suffixStr: string): string =>
  [str, suffixStr].filter(Boolean).join(' ');

export default suffix;
