import lint from '@commitlint/lint';
import load from '@commitlint/load';
import chalk from 'chalk';
import errorAndExit from '../../../../helpers/errorAndExit';
import { globals } from '../../../../helpers/globals';
import promptProceedWithInvalidCommit from '../promptProceedWithInvalidCommit';

const NUMBER_OF_COMMITS = 1;

const assertPreviousCommitValidity = async (): Promise<void> => {
  const { git } = globals;
  const { all } = await git.log({ maxCount: NUMBER_OF_COMMITS });
  const lastMessage = all[0].message;

  if (!lastMessage) return;

  const config = await load();
  const linted = await lint(lastMessage, config.rules);
  const { valid } = linted;

  if (!valid) {
    console.log(
      chalk.red.bold(`Previous commit ("${lastMessage}") was not valid.`),
    );
    const proceed = await promptProceedWithInvalidCommit();
    if (!proceed) {
      errorAndExit(
        chalk`Previous commit ("${lastMessage}") was not valid.  {bold Clean that commit before continuing}`,
      );
    }
  }
};

export default assertPreviousCommitValidity;
