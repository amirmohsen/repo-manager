import { magenta, cyan } from 'chalk';
import { execSync } from 'child_process';
import { globals } from '../../../../helpers/globals';
import { PackageEntry } from '../../../../types/packages';
import { ICommit } from '../../types';

export type CommitPackageParams = Omit<PackageEntry, 'shouldCommit'> &
  Required<Omit<ICommit, 'all' | 'root' | 'scopes'>>;

const commitPackage = async ({
  type,
  message,
  packageName,
  location,
  files,
  isRoot,
  dry,
  breaking,
}: CommitPackageParams) => {
  const { git } = globals;
  if (isRoot) {
    files.forEach((file) => {
      console.log(magenta(`Adding root file: ${file}`));
    });
    if (!dry) {
      execSync(
        `git add ${files.map((file) => JSON.stringify(file)).join(' ')}`,
      );
    }
  } else {
    console.log(magenta(`Adding ${packageName} at ${location}`));
    if (!dry) {
      await git.add(location);
    }
  }

  const fullCommitMessage = `${type}${isRoot ? '' : `(${packageName})`}${
    breaking ? '!' : ''
  }: ${message}`;

  console.log(cyan(`Committing: ${fullCommitMessage}`));

  if (!dry) {
    await git.commit(fullCommitMessage);
  }
};

export default commitPackage;
