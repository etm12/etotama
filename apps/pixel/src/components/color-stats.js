import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';
import * as R from 'kefir.ramda';

const toString = r => x => x.toString(r);
const toHex = toString(16);

const intToColorHex = R.compose(
  R.invoker(2, 'padStart')(2, 0),
  toHex,
);
const rgbaToHex = R.compose(
  R.join(''),
  R.map(intToColorHex),
)

const uintArrayToHexT = [
  L.reread(R.splitEvery(4)),
  L.elems,
  L.when(R.complement(R.equals('#000'))),
];

const colorCounts = R.pipe(
  L.countsAs(rgbaToHex, uintArrayToHexT),
  U.liftRec(Array.from),
  R.filter(R.pipe(R.head, R.complement(R.either(R.equals('0000'), R.equals('00000000'))))),
);

const ColorBar = ({
  color,
  count,
  total,
  ratio = R.divide(count, total),
  pct = R.multiply(100, ratio),
}) =>
  <React.Fragment>
    <div className="c-colorstats--color"
         style={{ backgroundColor: `#${color}` }}>
      <span className="c-colorstats--color-count">{count}</span>
    </div>
    {/* <div className="c-colorstats--ratio">
      <div className="c-colorstats--ratio-bar"
           style={{ width: U.string`${pct}%` }}>
        {count}
      </div>
    </div> */}
  </React.Fragment>;

const ColorStats = ({
  imageData,
  counts = colorCounts(imageData),
  totalColors = L.sum([L.elems, L.index(1)], counts),
}) =>
  <article>
    <div className="c-colorstats">
      {U.thru(
        colorCounts(imageData),
        R.sortBy(R.prop(1)),
        R.reverse,
        R.map(p =>
          <ColorBar key={p[0]}
                    color={p[0]}
                    count={p[1]}
                    total={totalColors} />)
      )}
    </div>
  </article>;

export default ColorStats;
