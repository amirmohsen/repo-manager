import getPkgList from '../../actions/commit/helpers/getPkgList';
import promptCommitLocations from '../../actions/commit/helpers/promptCommitLocations';
import { ICommit } from '../../actions/commit/types';
import errorAndExit from '../errorAndExit';

export type GetAvailablePackagesProps = Pick<
  ICommit,
  'all' | 'scopes' | 'root'
>;

export interface AvailablePackage {
  displayName: string;
  packageName: string;
  location: string;
  isRoot: boolean;
  shouldCommit: boolean;
  files: string[];
}

export type AvailablePackages = AvailablePackage[];

const getAvailablePackages = async ({
  all,
  scopes,
  root,
}: GetAvailablePackagesProps): Promise<AvailablePackages> => {
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

  if (!all && !root && !scopes) {
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
  } else if (!all) {
    availablePackages = availablePackages.filter(
      ({ isRoot }) => (isRoot && root) || (!isRoot && scopes),
    );
  }

  if (!availablePackages.length) {
    errorAndExit('No available packages');
  }

  return availablePackages;
};

export default getAvailablePackages;
