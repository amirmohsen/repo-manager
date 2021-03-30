import errorAndExit from '../../../../helpers/errorAndExit';
import { ICommit } from '../../types';

export interface AssertArgs extends Omit<ICommit, 'dry'> {
  allowedTypes?: string[];
}

const assertArgs = ({
  message,
  type,
  all,
  scopes,
  root,
  allowedTypes,
}: AssertArgs) => {
  if (all && (root || scopes)) {
    errorAndExit(
      '"all" option cannot be set in combination with the "root" and/or "scopes" options',
    );
  }
  if (type && !(allowedTypes?.includes(type) ?? true)) {
    errorAndExit(
      `Provided type is not an allowed type. Allow types are ${allowedTypes?.join(
        ', ',
      )}`,
    );
  }
};

export default assertArgs;
