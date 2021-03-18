import { globals } from '../../../../helpers/globals';
import { PackageEntry } from '../../../../types/packages';
import { ICommit } from '../../types';

export type CommitPackageParams = Omit<PackageEntry, 'shouldCommit'> &
  Omit<ICommit, 'all' | 'root'>;

const commitPackage = async ({
  type,
  message,
  packageName,
  location,
  files,
  isRoot,
}: CommitPackageParams) => {
  const { git } = globals;
  if (isRoot) {
    files.forEach((file) => {
      console.log(`Adding root file: ${file}`);
    });
    await git.add(files);
  } else {
    console.log(`Adding ${packageName} at ${location}`);
    await git.add(location);
  }

  const fullCommitMessage = `${type}${
    isRoot ? '' : `(${packageName})`
  }: ${message}`;

  console.log(`Committing: ${fullCommitMessage}`);

  await git.commit(fullCommitMessage);
};

export default commitPackage;
