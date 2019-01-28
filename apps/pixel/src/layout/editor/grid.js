import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

export default function Grid ({ size, scale, style }) {
  const [width, height] = U.destructure(size);

  const scaledWidth = R.multiply(scale, width);
  const scaledHeight = R.multiply(scale, height);

  const verticalLines = U.thru(
    width,
    R.inc,
    R.range(0),
    R.map(R.pipe(
      R.multiply(scale),
      U.mapValue(x => [x, x]),
      R.of,
      R.concat(R.of([0, scaledHeight])),
      R.apply(R.zip),
    )),
  );

  return (
    <div className="grid">
      <svg className="grid__body"
           style={style}>
        {U.thru(
          R.range(0, R.inc(width)),
          R.map(i =>
            <line key={U.string`vertical-${i}`}
                  x1={R.multiply(scale, i)} y1={0}
                  x2={R.multiply(scale, i)} y2={scaledHeight} />)
        )}
        {U.thru(
          R.range(0, R.inc(height)),
          R.map(i =>
            <line key={U.string`horizontal-${i}`}
                  x1={0} y1={R.multiply(scale, i)}
                  x2={scaledWidth} y2={R.multiply(scale, i)} />)
        )}
      </svg>
    </div>
  );
};

//

/**
 * @typedef {object} Props
 * @prop {[number, number]} size
 * @prop {number} scale
 */
