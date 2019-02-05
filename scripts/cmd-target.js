const sh = require('shelljs');
const S = require('./shared');

//

exports.command = 'target <path> [options]';

exports.aliases = ['t'];

exports.desc = 'Target package to generate metadata for';

exports.builder = yargs => yargs
  .option('format', {
    alias: 'f',
    choices: ['json', 'env'],
    default: 'env',
  })
  .option('prefix-keys', {
    alias: 'p',
    type: 'string',
    default: 'REACT_APP_ETM_APP_',
  })
  .option('stdout', {
    alias: 'o',
    type: 'boolean',
    describe: 'Output to STDOUT instead of file'
  });

exports.handler = argv => {
  if (!sh.test('-d', argv.path)) {
    console.error('Given target path %s doesn\'t exist.', argv.path);
    process.exit(1);
  }

  const targetFile = argv.format === 'env' ? '.env' : 'env.json';

  const targetPkg = S.thru(argv.path, S.joinPath2C('package.json'), S.readFile, S.toString, JSON.parse);
  const targetEnv = S.thru(argv.path, S.joinPath2C('.env'));
  const fromPkg = S.propC(targetPkg);

  const headCommit = S.thru(S.exec_('git rev-parse --short HEAD'), S.toString, S.trim);
  const [curCommit, curBranch] = S.thru(S.exec_(`git name-rev ${headCommit}`), S.toString, S.trim, S.split(' '));

  const target = {
    name: fromPkg('name'),
    version: fromPkg('version'),
    branch: curBranch,
    commit: curCommit,
  };

  let result;

  if (argv.format !== 'env') {
    result = JSON.stringify(target, null, 2);
  }
  else {
    result = S.thru(
      target,
      Object.entries,
      S.map(([k, v]) => `${argv.prefixKeys}${k.toUpperCase()}=${v}`),
      S.join('\n'),
      S.C(S.concat)('\n'),
    )
  }

  if (!result) {
    throw new Error('no result :(');
  }

  if (!argv.stdout) {
    const targetFilePath = S.joinPath2(argv.path)(targetFile);

    S.thru(
      targetFilePath,
      S.writeFileC(result),
    );

    console.log('Generated file %s', targetFilePath);
  }
  else {
    process.stdout.write(result + '\n');
  }
};
