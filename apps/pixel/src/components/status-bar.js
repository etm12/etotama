import * as React from 'karet';
import * as U from 'karet.util';

const classPrefix = 'c-status-bar';

export const StatusLabel = ({ className, children }) => {
  const cname = U.string`${classPrefix}__label`;
  return (
    <div
      className={U.cns(
        cname,
        className,
      )}>
      {children}
    </div>
  );
};

export const StatusIndicator = ({ className, label, active }) => {
  const cname = U.string`${classPrefix}__indicator`;

  return (
    <div className={U.cns(
      cname,
      U.when(active, U.string`${cname}--active`),
      U.string`${classPrefix}-item`,
      className,
    )}>
      {label}
    </div>
  );
}

export const StatusBar = ({ className, children }) => {
  return (
    <div
      className={U.cns(
        classPrefix,
        className,
      )}
    >
      Status
    </div>
  );
};

export default StatusBar;
