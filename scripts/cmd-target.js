const sh = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const I = x => x;
const K = x => _ => x;
const A = x => f => f(x);
const C = f => y => x => f(x)(y);
const thru = (x, ...fns) => fns.reduce((x, fn) => fn(x), x);
const invokeIf = x => f => f && f(x);
const invoke0 = m => o => o[m]();
const invoke1 = m => x => o => o[m](x);
const toString = invoke0('toString');
const trim = invoke0('trim');
const split = invoke1('split');
const joinPath2 = x => y => join(x, y);
const writeFile = t => x => writeFileSync(t, x);
const writeFileC = C(writeFile);
const prop = k => o => o && o[k];
const join2C = C(joinPath2);
const propC = C(prop);
const exec_ = cmd => sh.exec(cmd, { silent: true });

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

  const targetPkg = thru(argv.path, join2C('package.json'), readFileSync, toString, JSON.parse);
  const targetEnv = thru(argv.path, join2C('.env'));
  const fromPkg = propC(targetPkg);

  const headCommit = thru(exec_('git rev-parse --short HEAD'), toString, trim);
  const [curCommit, curBranch] = thru(exec_(`git name-rev ${headCommit}`), toString, trim, split(' '));

  const target = {
    name: prop('name')(targetPkg),
    version: fromPkg('version'),
    branch: curBranch,
    commit: curCommit,
  };

  let result;

  if (argv.format !== 'env') {
    result = JSON.stringify(target, null, 2);
  }
  else {
    const ps = Object.entries(target);
    const psʼ = ps.map(([k, v]) => `${argv.prefixKeys}${k.toUpperCase()}=${v}`);

    result = psʼ.join('\n');
  }

  if (!result) {
    throw new Error('no result :(');
  }

  if (!argv.stdout) {
    thru(
      argv.path,
      join2C(targetFile),
      writeFileC(result),
    );
  }
  else {
    process.stdout.write(result + '\n');
  }
};
