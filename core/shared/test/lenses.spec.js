import * as L from 'kefir.partial.lenses';
import * as C from 'd3-color';
import * as Ls from '../lib/lenses';

test('hexString', () => {
  expect(L.get(Ls.hexString, `123\n234\n345\n456`))
    .toEqual(['#123', '#234', '#345', '#456']);
});

test('showAsPair', () => {
  expect(L.get(Ls.showAsPair, [0, 0])).toBe('(0, 0)');
});

test('toPx', () => {
  expect(L.get(Ls.toPx, 123)).toBe('123px');
});

test('toPct', () => {
  expect(L.get(Ls.toPct, 123)).toBe('123%');
});

test('toPctU', () => {
  expect(L.get(Ls.toPctU, 123)).toBe('12300%');
});

test('toRem', () => {
  expect(L.get(Ls.toRem, 123)).toBe('123rem');
});

test('toColor', () => {
  const x = L.get(Ls.toColor, '#f00');
  expect(x).toBeInstanceOf(C.color);
});
