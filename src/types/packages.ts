import { NormalizedPackageJson } from 'read-pkg-up';

export interface Workspace {
  location: string;
  workspaceDependencies: string[];
  mismatchedWorkspaceDependencies: string[];
}

export interface Workspaces {
  [packageName: string]: Workspace;
}

export interface RootPackageJSON extends NormalizedPackageJson {
  workspaces: string[];
}

export interface PackageEntry {
  packageName: string;
  location: string;
  isRoot: boolean;
  shouldCommit: boolean;
  files: string[];
}

export type PackageList = PackageEntry[];
