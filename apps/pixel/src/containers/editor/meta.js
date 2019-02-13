import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

export const fstIn = U.view(0);
export const sndIn = U.view(1);

export const Canvas = {
  scaledSize: U.liftRec((w, h, m) => [w * m, h * m]),
  elOffset: U.through(
    R.invoker(0, 'getBoundingClientRect'),
    R.props(['left', 'top']),
  ),
  elContext: R.invoker(1, 'getContext')('2d'),
  imageDataAsUint: U.view(L.reread(R.constructN(1, Uint8ClampedArray))),
};

export const Event = {
  pagePosition: R.props(['pageX', 'pageY']),
};

export const Color = {
  activeIn: idx => U.view(['active', idx]),
  fgColorIn: palette => U.view(['colors', Color.activeIn(0)(palette)], palette),
  bgColorIn: palette => U.view(['colors', Color.activeIn(1)(palette)], palette),
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
