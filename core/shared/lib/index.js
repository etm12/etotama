// @ts-check
/// <reference path="./index.d.ts" />
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';
import * as I from 'infestines';
import * as R from 'kefir.ramda';
import * as K from 'kefir';
import * as C from 'd3-color';
import * as Ls from './lenses';
import { COLOR_CHANNELS } from './constants';

//

// @ts-ignore
export const isObservable = x => x instanceof K.Observable;
export const toObservable = x => (isObservable(x) ? x : K.constant(x));

// #region Functions

export const takeAllArgs = R.unapply(R.identity);

export const flip = I.curry(function flip(f, y, x) {
  return f(x, y);
});

export const apply = I.curry(function apply(f, xs) {
  return f.apply(f, xs);
});

export const invoke0 = I.curry(function invoke0 (m, o) {
  return o[m]();
});``

export const invoke1 = I.curry(function invoke1 (m, x, o) {
  return o[m](x);
});

export const invoke2 = I.curry(function invoke2 (m, x, y, o) {
  return o[m](x, y);
})

export const call0 = f => f();

// #endregion

// #region String parsing
export const camelTokens = I.defineNameU(R.match(/(^[a-z]+|[A-Z][a-z]+)/g), 'camelTokens');
export const kebabTokens = I.defineNameU(invoke1('split', '-'), 'kebabTokens');
// #endregion

// #region String manipulation
export const capitalize = I.defineNameU(R.converge(
  R.concat,
  [R.compose(R.toUpper, R.head), R.compose(R.toLower, R.tail)],
), 'capitalize');

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

export const computeIx = I.curry(function (x, y, w) {
  return ((y * w) + x) * COLOR_CHANNELS;
});

export const getIx = I.curry(function (x, y, w) {
  return {
    start: computeIx(x, y, w),
    end: computeIx(x, y, w) + COLOR_CHANNELS,
  };
});

// #endregion

/**
 * Create an event bus and return an object containing the bus and
 * a function to push events into the stream with.
 */
export const eventBus = () => {
  const bus = U.bus();
  const pushEvent = U.actions(persist, U.through(U.doPush(bus), call0));
  const events = U.flatMapLatest(x => U.toProperty(x), bus);

  return { events, pushEvent };
}

/**
 * @param {string} type
 */
export const takeEvent = I.curry(function (type, source) {
  return U.thru(
    U.fromEvents(source, type, R.identity),
    U.toProperty,
  );
});

export const takeEventU = I.defineNameU(U.liftRec(takeEvent), 'takeEventU');


//. offsetPositionBy :: Offset -> Position -> Position
export const offsetPositionBy_ = ([sx, sy], [dx, dy]) => [dx - sx, dy - sy];
export const offsetPositionBy = R.curry(offsetPositionBy_);

//. scalePositionBy :: Int -> Position -> Position
export const scalePositionBy_ = (r, [x, y]) => [Math.trunc(x / r), Math.trunc(y / r)];
export const scalePositionBy = R.curry(scalePositionBy_);

// #region Colors
const isColor = x => (x instanceof C.color);
export const toColor = (x => (isColor(x) ? x : C.color(x)));

export const toHex = I.defineNameU(invoke0('hex'), 'toHex');

export const darken = I.curry(function darken (amount, color) {
  return color.darker(amount);
});
// #endregion

const lenses = Ls;

export { lenses };
