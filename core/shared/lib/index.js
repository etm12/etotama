// @ts-check
/// <reference path="./index.d.ts" />
import * as K from 'kefir';
import * as R from 'ramda';
import * as L from 'partial.lenses';

// #region String parsing
export const camelTokens = R.match(/(^[a-z]+|[A-Z][a-z]+)/g);
export const kebabTokens = R.split('-');
// #endregion

// #region String manipulation
export const capitalize = R.converge(
  R.concat,
  [
    R.compose(R.toUpper, R.head),
    R.compose(R.toLower, R.tail),
  ],
);

export const camelKebab = L.transform(L.seq(
  [L.modifyOp(R.split('-'))],
  [L.slice(1, Infinity), L.elems, L.modifyOp(capitalize)],
  [L.modifyOp(R.join(''))],
));

export const kebabCamel = L.transform(L.seq(
  [L.modifyOp(camelTokens)],
  [L.elems, L.modifyOp(R.toLower)],
  [L.modifyOp(R.join('-'))],
));
// #endregion

// #region OBS
export const obsObjectL = L.lens(
  L.modify(L.keys, camelKebab),
  L.modify(L.keys, kebabCamel),
);
// #endregion

// #region Canvas
export function _pixelScaledDimensions (scale, obj) {
  return L.modify(L.values, R.multiply(scale), obj);
}

export const pixelScaledDimensions = (scale, size) => K.combine(
  [scale, size],
  (m, x) => m * x,
).log('pixelScaled');
// #endregion

export * from './image-data';
