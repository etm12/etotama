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
