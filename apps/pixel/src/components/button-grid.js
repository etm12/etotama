import * as React from 'karet';
import * as U from 'karet.util';

const ButtonGrid = ({ children, cols }) =>
  <div className={U.cns(
    'c-button-grid',
    U.string`c-${cols}-cols`,
  )}>
    {children}
  </div>;

export default ButtonGrid;
