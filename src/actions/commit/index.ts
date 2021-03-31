import assertAndRequestMessage from '../../helpers/assertAndRequestMessage';
import getAvailablePackages from '../../helpers/getAvailablePackages';
import assertArgs from './helpers/assertArgs';
import commitPackage from './helpers/commitPackage';
import loadCommitLintConfig from './helpers/loadCommitLintConfig';
import promptBreaking from './helpers/promptBreaking';
import promptType from './helpers/promptType';
import { ICommit } from './types';

const commit = async ({
  message,
  type,
  all,
  scopes,
  root,
  breaking,
  dry,
}: ICommit) => {
  const { maxCount, types } = await loadCommitLintConfig();
  assertArgs({ type, all, scopes, root, allowedTypes: types });

  const availablePackages = await getAvailablePackages({ root, all, scopes });

  type = type ?? (await promptType(types));
  breaking = breaking ?? (await promptBreaking());
  message = await assertAndRequestMessage({
    availablePackages,
    type,
    message,
    maxCount,
    breaking,
  });

  for (const { packageName, location, files, isRoot } of availablePackages) {
    await commitPackage({
      type,
      message,
      packageName,
      location,
      files,
      isRoot,
      breaking,
      dry,
    });
  }
};

export default commit;
