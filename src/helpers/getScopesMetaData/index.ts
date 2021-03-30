import { AvailablePackages } from '../getAvailablePackages';

export interface GetScopesMetaDataProps {
  type: string;
  availablePackages: AvailablePackages;
  maxCount: number;
}

export interface ScopesMetaData {
  realMaxCount: number;
  prefixes: string[];
}

const getScopesMetaData = ({
  type,
  availablePackages,
  maxCount,
}: GetScopesMetaDataProps): ScopesMetaData => {
  return availablePackages.reduce(
    (metadata, { isRoot, packageName }) => {
      const messagePrefix = `${type}${isRoot ? '' : `(${packageName})`}: `;
      const remainingCharCount = maxCount - messagePrefix.length;
      return {
        realMaxCount:
          remainingCharCount < metadata.realMaxCount
            ? remainingCharCount
            : metadata.realMaxCount,
        prefixes: [...metadata.prefixes, messagePrefix],
      };
    },
    {
      realMaxCount: maxCount,
      prefixes: [] as string[],
    },
  );
};

export default getScopesMetaData;
