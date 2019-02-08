import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

export const Canvas = {
  scaledSize: U.liftRec((w, h, m) => [w * m, h * m]),
  elOffset: U.through(
    R.invoker(0, 'getBoundingClientRect'),
    R.props(['left', 'top']),
  ),
  elContext: R.invoker(1, 'getContext')('2d'),
};

export const Event = {
  pagePosition: R.props(['pageX', 'pageY']),
};

export const Color = {
  hexI: [
    L.dropPrefix('#'), L.iso(
      R.splitEvery(2),
      R.join(''),
    ),
    L.iso(
      R.map(x => parseInt(x, 16)),
      R.map(x => x.toString(16)),
    ),
  ]
};

export const Pixel = {};
