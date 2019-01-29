// @ts-check
/// <reference path="./index.d.ts" />
import * as L from 'partial.lenses';
import * as R from 'ramda';
import * as K from 'kefir';

//

// @ts-ignore
const isObservable = x => x instanceof K.Observable;

/**
 * @param {any} x
 * @return {K.Property<any, any>}
 */
const toObservable = x => (isObservable(x) ? x : K.constant(x));

// #region Functions
export const takeAllArgs = R.unapply(R.identity);
// #endregion

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
/**
 * @param {HTMLCanvasElement} el
 * @return {(DOMRect | ClientRect)}
 */
export function getBoundingRect (el) {
  return el.getBoundingClientRect();
}
/**
 * @param {HTMLCanvasElement} el
 * @return {CanvasRenderingContext2D}
 */
export function getContext (el) {
  return el.getContext('2d');
};
// #endregion

export * from './image-data';
