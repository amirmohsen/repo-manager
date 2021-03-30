import { CommandModule } from 'yargs';
import commit from '.';
import { ICommit } from './types';

const cli = {
  command: 'commit',
  describe: 'Commit message to one, multiple or all scopes',
  builder: {
    message: {
      alias: 'm',
      description: 'commit message',
      type: 'string',
    },
    type: {
      alias: 't',
      description: 'commit type',
      type: 'string',
    },
    scopes: {
      alias: 's',
      description: 'all scopes',
      type: 'boolean',
      default: false,
    },
    root: {
      alias: 'r',
      description: 'root (no scope)',
      type: 'boolean',
      default: false,
    },
    all: {
      alias: 'a',
      description: 'all scopes and root (no scope)',
      type: 'boolean',
      default: false,
    },
    dry: {
      alias: 'd',
      description: 'dry mode (it does not commit anything)',
      type: 'boolean',
      default: false,
    },
  },
  handler: commit,
} as CommandModule<{}, ICommit>;

export default cli;
