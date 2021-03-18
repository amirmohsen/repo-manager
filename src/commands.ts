import yargs from 'yargs/yargs';
import { commit } from '.';

const argv = process.argv.slice(2);

yargs(argv)
  .command({
    command: 'commit',
    describe: 'Commit message to one, multiple or all scopes',
    builder: {
      message: {
        alias: 'm',
        description: 'commit message',
        type: 'string',
        demandOption: true,
      },
      type: {
        alias: 't',
        description: 'commit type',
        type: 'string',
        demandOption: true,
      },
      all: {
        alias: 'a',
        description: 'all workspaces',
        type: 'boolean',
        default: false,
      },
      root: {
        alias: 'r',
        description: 'root package',
        type: 'boolean',
        default: false,
      },
    },
    handler: commit,
  })
  .scriptName('mrt')
  .demandCommand()
  .version()
  .strict()
  .parse();
