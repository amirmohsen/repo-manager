import { execSync } from 'child_process';

import { PackageList, Workspaces } from '../../../../types/packages';
import { globals } from '../../../../helpers/globals';
import errorAndExit from '../../../../helpers/errorAndExit';

const getPkgList = async (): Promise<PackageList> => {
  const { git } = globals;
  const workspaces = JSON.parse(
    execSync('yarn --silent workspaces info', {
      encoding: 'utf8',
    }),
  ) as Workspaces;
  const { packageJson: rootPkgJson } = globals.rootPkgJson;
  const { files } = await git.status();

  if (!files.length) {
    errorAndExit('Nothing to commit');
  }

  const workspacePackageList = await Promise.all(
    Object.entries(workspaces).map(async ([packageName, { location }]) => ({
      packageName,
      location,
      isRoot: false,
      shouldCommit: Boolean((await git.status([location])).files.length),
      files: [] as string[],
    })),
  );

  const rootFiles = files
    .filter(({ path: file }) =>
      workspacePackageList.every(({ location }) => !file.startsWith(location)),
    )
    .map(({ path }) => path);

  return workspacePackageList.concat([
    {
      packageName: rootPkgJson.name,
      location: '.',
      isRoot: true,
      shouldCommit: Boolean(rootFiles.length),
      files: rootFiles,
    },
  ]);
};

export default getPkgList;
