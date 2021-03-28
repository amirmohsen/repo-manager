import load from '@commitlint/load';

export interface CommitLintConfig {
  maxCount: number;
  types?: string[];
}

const loadCommitLintConfig = async (): Promise<CommitLintConfig> => {
  const config = await load();
  return {
    maxCount: config.rules['header-max-length']?.[2] ?? Infinity,
    types: config.rules['type-enum']?.[2],
  };
};

export default loadCommitLintConfig;
