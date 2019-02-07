// @ts-check
/// <reference path="./index.d.ts" />
import * as L from 'partial.lenses';
import * as R from 'ramda';
import * as K from 'kefir';
import * as Ls from './lenses';

//

// @ts-ignore
export const isObservable = x => x instanceof K.Observable;
export const toObservable = x => (isObservable(x) ? x : K.constant(x));

// #region Functions

export const takeAllArgs = R.unapply(R.identity);
export const flip = R.curry((f, y, x) => f(x, y));
export const apply = R.curry((f, xs) => f.apply(f, xs));
export const invoke0 = R.curry((m, o) => o[m]());
export const invoke1 = R.curry((m, x, o) => o[m](x));
export const invoke2 = R.curry((m, x, y, o) => o[m](x, y));
export const invoke3 = R.curry((m, x, y, z, o) => o[m](x, y, z));
export const call0 = f => f();

// #endregion

// #region String parsing
export const camelTokens = R.match(/(^[a-z]+|[A-Z][a-z]+)/g);
export const kebabTokens = R.split('-');
// #endregion

// #region String manipulation
export const capitalize = R.converge(
  R.concat,
  [R.compose(R.toUpper, R.head), R.compose(R.toLower, R.tail)],
);

export const camelKebab = L.transform(Ls.camelKebab);
export const kebabCamel = L.transform(Ls.kebabCamel);
// #endregion

// #region Event
export const persist = e => e.persist();
// #endregion

// #region OBS
export const obsObjectL = L.iso(
  L.modify(L.keys, camelKebab),
  L.modify(L.keys, kebabCamel),
);
// #endregion

// #region Canvas
export const getBoundingRect = invoke0('getBoundingClientRect');
export const getContext = invoke1('getContext', '2d');
// #endregion

//. offsetPositionBy :: Offset -> Position -> Position
export const offsetPositionBy_ = ([sx, sy], [dx, dy]) => [dx - sx, dy - sy];
export const offsetPositionBy = R.curry(offsetPositionBy_)

//. scalePositionBy :: Int -> Position -> Position
export const scalePositionBy_ = (r, [x, y]) => [Math.trunc(x / r), Math.trunc(y / r)];
export const scalePositionBy = R.curry(scalePositionBy_);
