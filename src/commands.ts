import yargs from 'yargs/yargs';
import commit from './actions/commit';

const argv = process.argv.slice(2);

yargs(argv)
  .command({
    command: 'commit',
    describe: 'Commit message to one, multiple or all scopes',
    builder: {
      message: {
        alias: 'm',
        type: 'string',
        demandOption: true,
      },
      type: {
        alias: 't',
        type: 'string',
        demandOption: true,
      },
      all: {
        alias: 'a',
        type: 'boolean',
        default: false,
      },
      root: {
        alias: 'r',
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
