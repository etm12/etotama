// @ts-check
const S = require('shelljs');
const I = require('infestines');

module.exports = exports = {};

const thru = (x, ...fns) => fns.reduce((x, fn) => fn(x), x);
const call0 = function (f) { return f() };
const call1 = I.curry(function (f, x) { return f(x); });
const call2 = I.curry(function (f, x, y) { return f(x, y); });
const invoke0 = I.curry(function (m, o) { return call0(o[m]); });
const invoke1 = I.curry(function (m, x, o) { return call1(o[m], x); });
const flip = I.curry(function (f, y, x) { return f(x, y); });

const toString = exports.toString = x => x.toString();
const trim = exports.trim = x => x.trim();

const exec = exports.exec = flip(S.exec, { silent: true });
const exec_ = exports.exec_ = x => thru(exec(x), toString, trim);

//

const test = call2(S.test);

exports.isDir = test('-d');
exports.isFile = test('-f');

//

exports.gitRoot = thru(exec('git rev-parse --show-toplevel'), toString, trim);
