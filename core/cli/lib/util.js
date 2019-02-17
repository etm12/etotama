const S = require('shelljs');
const I = require('infestines');

module.exports = exports = {};

const fn1 = I.curry(function (f, x) { return f(x) });
const fn2 = I.curry(function (f, x, y) { return f(x, y) });
const flip = I.curry(function (f, y, x) { return f(x, y) });

exports.exec = flip(S.exec, { silent: true });

//

const test = fn2(S.test);

exports.isDir = test('-d');
exports.isFile = test('-f');
