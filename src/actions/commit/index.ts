import assertAndRequestMessage from '../../helpers/assertAndRequestMessage';
import getAvailablePackages from '../../helpers/getAvailablePackages';
import assertArgs from './helpers/assertArgs';
import commitPackage from './helpers/commitPackage';
import loadCommitLintConfig from './helpers/loadCommitLintConfig';
import promptType from './helpers/promptType';
import { ICommit } from './types';

const commit = async ({ message, type, all, scopes, root, dry }: ICommit) => {
  const { maxCount, types } = await loadCommitLintConfig();
  assertArgs({ message, type, all, scopes, root, allowedTypes: types });

  const availablePackages = await getAvailablePackages({ root, all, scopes });

  type = type ?? (await promptType(types));
  message = await assertAndRequestMessage({
    availablePackages,
    type,
    message,
    maxCount,
  });

  for (const { packageName, location, files, isRoot } of availablePackages) {
    await commitPackage({
      type,
      message,
      packageName,
      location,
      files,
      isRoot,
      dry,
    });
  }
};

export default commit;
