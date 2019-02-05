import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';
import * as R from 'kefir.ramda';

const toString = r => x => x.toString(r);
const toHex = toString(16);

export const intToColorHex = R.compose(
  R.invoker(2, 'padStart')(2, 0),
  toHex,
);

export const rgbaToHex = R.compose(
  R.join(''),
  R.map(intToColorHex),
)

export const uintArrayToHexT = [
  L.reread(R.splitEvery(4)),
  L.elems,
  L.when(R.complement(R.equals('#000'))),
];

export const colorCounts = R.pipe(
  L.countsAs(rgbaToHex, uintArrayToHexT),
  U.liftRec(Array.from),
  R.filter(R.pipe(R.head, R.complement(R.either(R.equals('0000'), R.equals('00000000'))))),
);
