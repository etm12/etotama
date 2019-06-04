import * as L from 'kefir.partial.lenses';
import * as C from 'd3-color';
import * as Ls from '../lib/lenses';

import { runTests } from './util';

describe('Show', () => {
  runTests([
    ['(0, 0)', () => L.get(Ls.showAsPair, [0, 0])],
    [[0, 0], () => L.set(Ls.showAsPair, [0, 0], undefined)],
  ]);
});

describe('Colors', () => {
  runTests([
    [['#123', '#234', '#345', '#456'], () => L.get(Ls.hexString, `123\n234\n345\n456`)],
    [`123\n234\n345\n456`, () => L.set(Ls.hexString, ['#123', '#234', '#345', '#456'], undefined)],
  ]);
});

describe('Units', () => {
  runTests([
    ['123px', () => L.get(Ls.toPx, 123)],
    [123, () => L.set(Ls.toPx, 123, undefined)],
    ['123%', () => L.get(Ls.toPct, 123)],
    [123, () => L.set(Ls.toPct, 123, undefined)],
    ['12300%', () => L.get(Ls.toPctU, 123)],
    [123, () => L.set(Ls.toPctU, '12300%', undefined)],
    ['123rem', () => L.get(Ls.toRem, 123)],
    [123, () => L.set(Ls.toRem, 123, undefined)],
    ['123deg', () => L.get(Ls.toDeg, 123)],
    [123, () => L.set(Ls.toDeg, 123, undefined)],
  ]);

  test('L.get(Ls.toColor, \'#f00\') => instanceof Color', () => {
    const x = L.get(Ls.toColor, '#f00');
    expect(x).toBeInstanceOf(C.color);
  });
});

describe('Transforms', () => {
  runTests([
    ['foo(123)', () => L.get(Ls.toCssTransform('foo'), '123')],
    ['123', () => L.set(Ls.toCssTransform('foo'), 'foo(123)', undefined)],
    ['translateX(100px)', () => L.get(Ls.translateX, 100)],
    [100, () => L.set(Ls.translateX, 'translateX(100px)', undefined)],
    ['translateY(100px)', () => L.get(Ls.translateY, 100)],
    [100, () => L.set(Ls.translateY, 'translateY(100px)', undefined)],
  ]);
});
