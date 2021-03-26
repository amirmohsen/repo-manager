import commitPackage from './helpers/commitPackage';
import getPkgList from './helpers/getPkgList';
import promptCommitLocations from './helpers/promptCommitLocations';
import { ICommit } from './types';

const commit = async ({ message, type, all, root }: ICommit) => {
  const packages = await getPkgList();

  let availablePackages = packages
    .filter(({ shouldCommit }) => shouldCommit)
    .map((entry) => {
      const { packageName, location, isRoot } = entry;
      const displayName = `${packageName}${isRoot ? '' : `(${location})`}`;
      return {
        ...entry,
        displayName,
      };
    });

  if (!all && !root) {
    const packageOptions = availablePackages.map(
      ({ displayName, packageName }) => ({
        name: displayName,
        value: packageName,
      }),
    );
    const answers = await promptCommitLocations(packageOptions);
    const packageMap = Object.fromEntries(
      availablePackages.map((entry) => [entry.packageName, entry]),
    );
    availablePackages = answers.map((answer) => packageMap[answer]);
  } else {
    availablePackages = availablePackages.filter(
      ({ isRoot }) => (isRoot && root) || (!isRoot && all),
    );
  }

  for (const { packageName, location, files, isRoot } of availablePackages) {
    await commitPackage({
      type,
      message,
      packageName,
      location,
      files,
      isRoot,
    });
  }
};

export default commit;
