import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import * as S from '../shared';

export const propListFor = (...props) => L.collect([L.props(...props), L.values]);

export const scalePositionWith = scale => R.map(R.o(U.floor, S.divideBy(scale)));

export const mousePositionFor = U.view(['mouse', 'position'])

/**
 * @param {number} scale
 * @param {[number, number]} xy
 */
export const pixelPositionFor = function pixelPositionFor (scale, xy) {

}
