import * as React from 'karet';
import * as U from 'karet.util';

const KeyValue = ({ label, value }) =>
  <div className="c-key-value">
    <div className="c-key-value__label">{label}</div>
    <div className="c-key-value__value">{value}</div>
  </div>;

export default KeyValue;
