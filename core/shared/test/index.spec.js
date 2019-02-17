import * as S from '../lib/index';

//

test(S.flip.name, () => {
  const fn = (a, b) => a - b;
  expect(S.flip(fn)(5, 0)).toBe(fn(0, 5));
});

test(S.apply.name, () => {
  const fn = (a, b, c) => [a, b, c];
  const input = [1, 2, 3];
  const expected = [1, 2, 3];
  expect(S.apply(fn, input)).toEqual(expected);
  expect(S.apply(fn)(input)).toEqual(expected);
});

test(S.invoke0.name, () => {
  const fn = S.invoke0('toString');
  const input = {};
  const expected = '[object Object]';
  expect(fn(input)).toBe(expected);
});

test(S.invoke1.name, () => {
  const fn = S.invoke1('join', '-');
  const input = ['this', 'that'];
  const expected = 'this-that';
  expect(fn(input)).toBe(expected);
});

test(S.invoke2.name, () => {
  const fn = S.invoke2('foo', 1, 2);
  const input = { foo: (a, b) => [a, b] };
  const output = [1, 2];
  expect(fn(input)).toEqual(output);
})

test(S.camelTokens.name, () => {
  expect(S.camelTokens('thisThatThen')).toEqual(['this', 'That', 'Then']);
});

test(S.kebabTokens.name, () => {
  expect(S.kebabTokens('this-that-then')).toEqual(['this', 'that', 'then'])
});

test(S.capitalize.name, () => {
  expect(S.capitalize('foo')).toBe('Foo');
});

test.todo(S.camelKebab.name);
test.todo(S.kebabCamel.name);
test.todo(S.persist.name);

test.todo(S.getBoundingRect.name);
test.todo(S.getContext.name);

test.todo(S.computeIx.name);
test.todo(S.getIx.name);

test.todo(S.eventBus.name);
test.todo(S.takeEvent.name);
test.todo(S.takeEventU.name);

test.todo(S.offsetPositionBy.name);
test.todo(S.scalePositionBy.name);

test.todo(S.toColor.name);
test.todo(S.toHex.name);
test.todo(S.darken.name);
