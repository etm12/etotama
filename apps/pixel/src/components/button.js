import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import { prefixCn, prefixC } from '@etotama/core.shared';
import { toRem } from '@etotama/core.shared/lib/lenses';

const baseCn = prefixCn('button');
const withBase = prefixC(baseCn);

const cns = {
  base: baseCn,
  custom: withBase('--custom'),
  active: withBase('--active'),
};

const Button = ({ children, color, className, height, active, disabled, action = x => x }) => {
  return (
    <button
      className={U.cns(
        baseCn,
        U.when(color, cns.custom),
        U.when(active, cns.active),
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
