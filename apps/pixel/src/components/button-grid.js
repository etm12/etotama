import * as React from 'karet';
import * as U from 'karet.util';

const ButtonGrid = ({ children, cols, gap }) =>
  <div className={U.cns(
    'c-button-grid',
    U.string`c-${cols}-cols`,
    U.when(gap, U.string`c-button-grid--gap-${gap}`),
  )}
  style={{
    gridTemplateColumns: U.string`repeat(${cols}, 1fr)`,
  }}>
    {children}
  </div>;

export default ButtonGrid;
