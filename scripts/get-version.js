#!/usr/bin/env node
require('yargs')
  .usage('Usage: $0 <target> [options]')
  .command(require('./cmd-target'))
  .command(require('./cmd-ci-target'))
  .demandCommand(1)
  .help()
  .argv;
