import * as React from 'karet';
import * as U from 'karet.util';

const Divider = ({ type = 'thin' }) =>
  <div className={U.cns(
    'c-divider',
    U.when(type, U.string`c-divider--${type}`),
  )} />;

export default Divider;
