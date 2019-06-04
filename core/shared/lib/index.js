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

export const CLASS_PREFIX = 'c';

export const prefixCn = R.concat(`${CLASS_PREFIX}-`);
export const prefixC = R.concat;

//

// @ts-ignore
export const isObservable = x => x instanceof K.Observable;
export const toObservable = x => (isObservable(x) ? x : K.constant(x));

// #region Functions

export const takeAllArgs = R.unapply(R.identity);

/**
 * Flip a function's two first arguments
 */
export const flip = I.curry(function flip(f, y, x) {
  return f(x, y);
});

/**
 * Apply array as parameters to the given function
 */
export const apply = I.curry(function apply(f, xs) {
  return f.apply(f, xs);
});

/**
 * Invoke the method `m` in `o` with zero arguments.
 * Point-free equivalent of `o[m]()`.
 *
 * @sig String -> a -> b
 */
export const invoke0 = I.curry(function invoke0 (m, o) {
  return o[m]();
});

/**
 * Invoke the method `m` in `o` with `x`.
 * Point-free equivalent of `o[m](x)`.
 *
 * @sig String -> a -> b -> c
 */
export const invoke1 = I.curry(function invoke1 (m, x, o) {
  return o[m](x);
});

/**
 * Invoke the method `m` in `o` with `x, y`.
 * Point-free equivalent of `o[m](x, y)`.
 *
 * @sig String -> a -> b -> c -> d
 */
export const invoke2 = I.curry(function invoke2 (m, x, y, o) {
  return o[m](x, y);
})

export const call0 = f => f();

// #endregion

// #region String parsing
/**
 * Split the given camelCased string into array of words.
 *
 * @sig String -> [String]
 */
export const camelTokens =
  I.defineNameU(R.match(/(^[a-z]+|[A-Z][a-z]+)/g), 'camelTokens');

/**
 * Split the given kebab-cased string into array of words.
 *
 * @sig String -> [String]
 */
export const kebabTokens =
  I.defineNameU(invoke1('split', '-'), 'kebabTokens');
// #endregion

// #region String manipulation
/**
 * Format given string an upper-case first letter, rest lower-case
 *
 * @sig String -> String
 */
export const capitalize = I.defineNameU(R.converge(
  R.concat,
  [R.compose(R.toUpper, R.head), R.compose(R.toLower, R.tail)],
), 'capitalize');
// #endregion

// #region Event
/**
 * @sig Event -> ()
 */
export const persist = invoke0('persist');
// #endregion

// #region Canvas
/**
 * @sig HTMLElement -> DOMRect
 */
export const getBoundingRect =
  I.defineNameU(invoke0('getBoundingClientRect'), 'getBoundingRect');

/**
 * @sig HTMLCanvasElement -> CanvasRenderingContext2D
 */
export const getContext =
  I.defineNameU(invoke1('getContext', '2d'), 'getContext');

/**
 * Compute a 1D array index from the given coordinates and width.
 * @sig Int -> Int -> Int -> Int
 */
export const computeIx = I.curry(function computeIx (x, y, w) {
  return ((y * w) + x) * COLOR_CHANNELS;
});

/**
 * Get start and end index for given coordinates from a 1D array.
 * @sig Int -> Int -> Int -> { start :: Int, end :: Int }
 */
export const getIx = I.curry(function getIx (x, y, w) {
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
export const eventBus = I.defineNameU(() => {
  const bus = U.bus();
  const pushEvent = U.actions(persist, U.through(U.doPush(bus), call0));
  const events = U.flatMapLatest(x => U.toProperty(x), bus);

  return { events, pushEvent };
}, 'eventBus');

/**
 * @param {string} type
 */
export const takeEvent = I.curry(function takeEvent (type, source) {
  return U.thru(
    U.fromEvents(source, type, R.identity),
    U.toProperty,
  );
});

export const takeEventU =
  I.defineNameU(U.liftRec(takeEvent), 'takeEventU');

/**
 * @sig Offset -> Position -> Position
 */
export const offsetPositionBy_ =
  I.curry(function offsetPositionBy_ ([sx, sy], [dx, dy]) {
    return [dx - sx, dy - sy];
  });

export const offsetPositionBy =
  I.defineNameU(U.liftRec(offsetPositionBy_), 'offsetPositionBy');

/**
 * Get pixel coordinates from scaled coordinates.
 *
 * @sig Int -> Position -> Position
 */
export const scalePositionBy =
  I.curry(function scalePositionBy (r, [x, y]) {
    return [Math.trunc(x / r), Math.trunc(y / r)];
  });

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
