const path = require('path');
const S = require('./shared');

exports.command = 'ci-target <path> [options]';

exports.aliases = [];

exports.desc = 'Target package to generate metadata for (CI environments)';

exports.builder = yargs => yargs
  .option('prefix-keys', {
    alias: 'p',
    type: 'string',
    default: 'REACT_APP_ETM_APP_',
  });

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
    S.map(([k, v]) => !!v && `${argv.prefixKeys}${k.toUpperCase()}=${v}`),
    S.filter(S.I),
    S.join('\n'),
    S.C(S.concat)('\n'),
  );

  const targetFilePath = S.joinPath2(argv.path)('.env');

  S.writeFile(targetFilePath)(result);

  console.log();
  console.log('Generated file %s with the following values', targetFilePath);
  console.log(result);
}
