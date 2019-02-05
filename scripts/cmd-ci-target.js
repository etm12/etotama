const path = require('path');
const S = require('./shared');

exports.command = 'ci-target <path> [options]';

exports.aliases = [];

exports.desc = 'Target package to generate metadata for (CI environments)';

exports.builder = yargs => yargs;

exports.handler = argv => {
  const targetPkg = S.thru(
    S.readFile(path.join(argv.path, 'package.json')),
    S.toString,
    JSON.parse,
  );

  const fromPkg = S.propC(targetPkg);

  const targetInfo = {
    version: fromPkg('version'),
    name: fromPkg('name'),
    branch: process.env.BRANCH,
    commit: process.env.COMMIT_REF,
    context: process.env.CONTEXT,
    head: process.env.HEAD,
  };

  const result = S.thru(
    targetInfo,
    Object.entries,
    S.map(([k, v]) => `${argv.prefixKeys}${k.toUpperCase()}=${v}`),
    S.join('\n'),
    S.C(S.concat)('\n'),
  );

  const targetFilePath = S.joinPath2(argv.path)('.env');

  S.writeFile(targetFilePath)(result);

  console.log('Generated file %s', targetFilePath);
}
