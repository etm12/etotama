import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

const classPrefix = 'c-grid';

const Grid = ({ children, height, width, className, columns = [] }) => {
  const columnString = L.transform(
    L.seq(
      [L.elems, L.when(R.is(Number)), L.modifyOp(x => `${x}rem`)],
      [L.elems, L.when(R.isNil), L.setOp('auto')],
      L.modifyOp(R.join(' ')),
    ),
    columns,
  );

  return (
    <div
      className={U.cns(
        U.string`${classPrefix}`,
        className,
      )}
      style={{
        gridTemplateColumns: columnString,
        height: U.when(height, U.string`${height}rem`),
        width: U.when(width, U.string`${width}rem`),
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
