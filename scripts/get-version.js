#!/usr/bin/env node
require('yargs')
  .usage('Usage: $0 <target> [options]')
  .command(require('./cmd-target'))
  .demandCommand(1)
  .help()
  .argv;
