/**
 * Test utilities borrowed from [karet.util's](https://github.com/calmm-js/karet.util/blob/master/test/tests.js)
 * tests.
 */
import { Observable } from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

export function show(x) {
  switch (typeof x) {
    case 'string':
    case 'object':
      return JSON.stringify(x);
    default:
      return `${x}`;
  }
}

export const toExpr = f =>
  f
    .toString()
    .replace(/\s+/g, ' ')
    .replace(/^\s*function\s*\(\s*\)\s*{\s*(return\s*)?/, '')
    .replace(/\s*;?\s*}\s*$/, '')
    .replace(/function\s*(\([a-zA-Z]*\))\s*/g, '$1 => ')
    .replace(/{\s*return\s*([^{;]+)\s*;\s*}/g, '$1')
    .replace(/\(([a-zA-Z0-9_]+)\) =>/g, '$1 =>')
    .replace(/\(0, _kefir[^.]*[.]constant\)/g, 'C')
    .replace(/_kefir[^.][.]/g, '');

export const testEq = (expect, thunk) =>
  it(`${toExpr(thunk)} => ${show(expect)}`, done => {
    const actual = thunk();
    const check = actual => {
      const eq = R.equals(actual, expect);
      if (eq instanceof Observable || !eq) {
        done(Error(`Expected: ${show(expect)}, actual: ${show(actual)}`));
      } else {
        done();
      }
    }
    if (actual instanceof Observable) {
      U.thru(actual, U.takeFirst(1), U.on({value: check, error: check}));
    } else {
      check(actual);
    }
  });

export const runTests = R.pipe(R.filter(x => x.length), R.forEach(R.apply(testEq)));
