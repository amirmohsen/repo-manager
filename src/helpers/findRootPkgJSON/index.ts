import { dirname } from 'path';
import { NormalizedPackageJson, sync as readPkgUp } from 'read-pkg-up';

import { RootPackageJSON } from '../../types/packages';

export interface FindRootPkgJSONReturnValue {
  packageJson: RootPackageJSON;
  path: string;
}

const isRootPackageJSON = (
  pkg: NormalizedPackageJson,
): pkg is RootPackageJSON => typeof pkg.workspaces !== 'undefined';

const findRootPkgJSON = (
  dir: string = process.cwd(),
): FindRootPkgJSONReturnValue => {
  const result = readPkgUp({
    cwd: dir,
  });

  if (!result) {
    throw new Error('No valid package.json found');
  }

  const { packageJson, path } = result;

  if (isRootPackageJSON(packageJson)) {
    return { packageJson, path };
  }

  return findRootPkgJSON(dirname(dirname(path)));
};

export default findRootPkgJSON;
