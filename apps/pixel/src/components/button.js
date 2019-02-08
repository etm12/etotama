import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import { toRem } from '@etotama/core.shared/lib/lenses';

const Button = ({ children, color, className, height, active, disabled, action = x => x }) => {
  return (
    <button
      className={U.cns(
        'c-button',
        U.when(color, 'c-button--custom'),
        U.when(active, `c-button--active`),
        className,
      )}
      disabled={disabled}
      onClick={U.actions(action)}
      style={{
        height: U.view(toRem, height),
        backgroundColor: color,
      }}>
      {children}
    </button>
  );
};

export default Button;
