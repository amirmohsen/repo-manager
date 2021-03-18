import { SimpleGit } from 'simple-git';
import { FindRootPkgJSONReturnValue } from '../findRootPkgJSON';

export interface Globals {
  rootPkgJson: FindRootPkgJSONReturnValue;
  root: string;
  git: SimpleGit;
}
