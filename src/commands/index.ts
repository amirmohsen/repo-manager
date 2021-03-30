import yargs from 'yargs/yargs';
import { commit } from '..'; // This must import the index in order to import globals

const argv = process.argv.slice(2);

yargs(argv)
  .command({
    command: 'commit',
    describe: 'Commit message to one, multiple or all scopes',
    builder: (yargs) =>
      yargs.options({
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
      }),
    handler: commit,
  })
  .scriptName('reman')
  .demandCommand()
  .version()
  .strict()
  .completion()
  .parse();
