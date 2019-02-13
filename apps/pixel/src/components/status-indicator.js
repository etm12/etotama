import * as React from 'karet';
import * as U from 'karet.util';

const classPrefix = 'c-status-indicator';

const StatusIndicator = ({ className, label, active = false }) =>
  <div className={U.cns(
    className,
    classPrefix,
    U.when(active, U.string`${classPrefix}--active`),
  )}>
    {label}
  </div>;

export default StatusIndicator;
