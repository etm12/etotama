import * as C from 'd3-color';
import * as S from '../lib/index';
import { runTests } from './util';

describe('CSS', () => {
  runTests([
    ['c', () => S.CLASS_PREFIX],
    ['c-prefixed', () => S.prefixCn('prefixed')],
    ['c-prefixed--suffix', () => S.prefixC(S.prefixCn('prefixed'), '--suffix')],
  ]);
});

describe('Functions', () => {
  runTests([
    [-5, () => S.flip((a, b) => a - b)(5, 0)],
    [[1, 2, 3], () => S.apply((a, b, c) => [a, b, c], [1, 2, 3])],
    ['[object Object]', () => S.invoke0('toString', {})],
    ['this-that', () => S.invoke1('join', '-', ['this', 'that'])],
    [[1, 2], () => S.invoke2('foo', 1, 2, { foo: (a, b) => [a, b] })],
    ['called', () => S.call0(() => 'called')],
  ]);
});

describe('Strings', () => {
  runTests([
    [['this', 'That', 'Then'], () => S.camelTokens('thisThatThen')],
    [['this', 'that', 'then'], () => S.kebabTokens('this-that-then')],
    ['Foo', () => S.capitalize('foo')],
  ]);

  test.todo(S.camelKebab.name);
  test.todo(S.kebabCamel.name);
});

describe('Arrays', () => {
  runTests([
    [4, () => S.computeIx(1, 0, 10)],
    [8, () => S.computeIx(2, 0, 10)],
    [{ start: 4, end: 8 }, () => S.getIx(1, 0, 10)],
  ]);
});

describe('Colors', () => {
  test(S.toColor.name, () => {
    const x = S.toColor('#f00');
    expect(x).toBeInstanceOf(C.color);
  });

  test(S.toHex.name, () => {
    const c = S.toColor('#f00');
    const x = S.toHex(c);
    expect(x).toBe('#ff0000');
  });

  test(S.darken.name, () => {
    const c = S.toColor('#f00');
    const x = S.darken(1, c);
    const x2 = S.darken(1)(c);
    expect(x.hex()).toBe('#b30000');
    expect(x2.hex()).toBe('#b30000');
  });
});

describe('Events', () => {
  test.todo(S.persist.name);
  test.todo(S.eventBus.name);
  test.todo(S.takeEvent.name);
  test.todo(S.takeEventU.name);
});

describe('Canvas', () => {
  test.todo(S.getBoundingRect.name);
  test.todo(S.getContext.name);

  test.todo(S.offsetPositionBy.name);
  test.todo(S.scalePositionBy.name);
});
