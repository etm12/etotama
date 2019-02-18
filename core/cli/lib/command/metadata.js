const fs = require('fs');
const path = require('path');
const U = require('../util');

exports.command = 'metadata <target> [options]'

exports.describe = 'Generate metadata file for project(s)';

exports.builder = yargs => yargs
  .option('all', {
    alias: 'A',
    type: 'boolean',
  });

exports.handler = argv => {
  const target = path.resolve(argv.context, argv.target);

  if (!U.isDir(target)) {
    throw new Error(`Given target not a directory; ${target}`);
  }

  const gitRev = U.exec_(`git log -n 1 --pretty=format:%H ${target}`);
  console.log({ gitRev });
};
