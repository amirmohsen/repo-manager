import { dirname } from 'path';
import simpleGit from 'simple-git';
import findRootPkgJSON from '../findRootPkgJSON';
import { Globals } from './types';

export const globals = {} as Globals;

export * from './types';

const initTools = () => {
  const rootPkgJson = findRootPkgJSON();
  const root = dirname(rootPkgJson.path);

  process.chdir(root);

  const git = simpleGit();
  Object.assign(globals, { root, rootPkgJson, git });
};

export default initTools;
