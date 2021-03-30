import yargs from 'yargs/yargs';
import cliCommands from '../actions/cli'; // This must import the index in order to import globals

const argv = process.argv.slice(2);

const yargsInstance = yargs(argv);

for (const command of cliCommands) {
  yargsInstance.command(command);
}

yargsInstance
  .scriptName('reman')
  .demandCommand()
  .version()
  .strict()
  .completion()
  .parse();
