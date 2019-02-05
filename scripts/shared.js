const sh = require('shelljs');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

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
const join = invoke1('join');
const joinPath2 = x => y => path.join(x, y);
const writeFile = t => x => writeFileSync(t, x);
const writeFileC = C(writeFile);
const readFile = f => readFileSync(f);
const prop = k => o => o && o[k];
const joinPath2C = C(joinPath2);
const propC = C(prop);
const exec_ = cmd => sh.exec(cmd, { silent: true });
const map = fn => xs => xs.map(fn);
const concat = x => y => x.concat(y);
const filter = invoke1('filter');

module.exports = {
  I,
  K,
  A,
  C,
  thru,
  invokeIf,
  invoke0,
  invoke1,
  toString,
  trim,
  split,
  join,
  prop,
  propC,
  writeFile,
  writeFileC,
  readFile,
  joinPath2,
  joinPath2C,
  exec_,
  map,
  concat,
  filter,
};
