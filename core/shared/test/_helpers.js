import test from 'ava';

function show (x) {
  switch (typeof x) {
    case 'string':
    case 'object':
      if (x.constructor && x.constructor.name) {
        return `${x.constructor.name}(${JSON.stringify(x)})`;
      }
      return JSON.stringify(x);
    default:
      return `${x}`;
  }
}

const toExpr = f => f
  .toString()
  .replace(/\s+/g, ' ')
  .replace(/^\s*function\s*\(\s*\)\s*{\s*(return\s*)?/, '')
  .replace(/\s*;?\s*}\s*$/, '')
  .replace(/function\s*(\([a-zA-Z]*\))\s*/g, '$1 => ')
  .replace(/{\s*return\s*([^{;]+)\s*;\s*}/g, '$1')
  .replace(/\(([a-zA-Z0-9_]+)\) =>/g, '$1 =>')
  .replace(/\(0, _kefir[^.]*[.]constant\)/g, 'C')
  .replace(/_kefir[^.][.]/g, '');

export function testEq (expected, thunk) {
  test(`${toExpr(thunk)} === ${show(expected)}`, t => {
    const actual = thunk();

    const check = result => {
      t.deepEqual(result, expected);
    };

    check(actual);
  });
}

export function testThrows (thunk) {
  test(`${toExpr(thunk)} => throws`, t => {
    t.throws(thunk);
  });
}
