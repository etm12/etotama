import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

const TimeControlButton = ({ count, children }) =>
  <button onClick={U.doModify(count, R.dec)}>
    {children}
    {U.when(count, U.string`(${count})`)}
  </button>;

export default TimeControlButton;
