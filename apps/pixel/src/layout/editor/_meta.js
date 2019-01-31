/**
 * @module _Meta
 * @namespace Editor
 */
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import * as S from '../../shared';

export const propListFor = (...props) => L.collect([L.props(...props), L.values]);

export const negateWithOffset = U.lift(ys => L.iso(
  xs => [xs[0] - ys[0], xs[1] - ys[1]],
  xs => [xs[0] + ys[0], xs[1] + ys[0]],
));

export const scalePositionWith = scale => R.map(R.o(U.floor, S.divideBy(scale)));

export const mousePositionFor = U.view(['mouse', 'position'])

//

const getWMXY = R.curry((width, scale, x, y) => ((y * width) + x) * scale);

const sliceWMXY = R.curry(
  (width, scale, x, y) => L.slice(
    getWMXY(width, scale, x, y),
    getWMXY(width, scale, x, y) + scale,
  ),
);

export const viewWMXY = (w, m, x, y) => U.view(sliceWMXY(w, m, x, y));
