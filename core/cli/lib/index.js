const { exec } = require('shelljs');

const gitroot = exec('git rev-parse --show-toplevel', { silent: true }).toString().trim();

require('yargs')
  .usage('Usage: $0 <command> [options]')
  .option('gitroot', {
    describe: 'Use gitroot for deciding path context',
    type: 'boolean',
    implies: 'context',
  })
  .option('context', {
    describe: 'Path context',
    type: 'string',
    default: gitroot,
  })
  .commandDir('./command')
  .demandCommand()
  .help()
  .argv;
