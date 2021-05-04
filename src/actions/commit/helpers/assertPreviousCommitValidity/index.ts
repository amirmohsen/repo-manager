import lint from '@commitlint/lint';
import load from '@commitlint/load';
import errorAndExit from '../../../../helpers/errorAndExit';
import { globals } from '../../../../helpers/globals';

const assertPreviousCommitValidity = async (): Promise<void> => {
  const { git } = globals;
  const { all } = await git.log({ maxCount: 1 });
  const lastMessage = all[0].message;

  const config = await load();
  const linted = await lint(lastMessage, config.rules);
  const { valid } = linted;

  if (!valid) {
    errorAndExit(
      `Previous commit ("${lastMessage}") was not valid.  Clean that commit before continuing`,
    );
  }
};

export default assertPreviousCommitValidity;
