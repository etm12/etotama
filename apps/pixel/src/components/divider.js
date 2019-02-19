import * as React from 'karet';
import * as U from 'karet.util';
import { prefixCn, prefixC } from '@etotama/core.shared';

const baseCn = prefixCn('divider');
const withBase = prefixC(baseCn);

const cns = {
  base: baseCn,
  type: t => withBase(U.string`--${t}`),
};

const Divider = ({ type = 'thin' }) =>
  <div className={U.cns(
    baseCn,
    U.when(type, cns.type(type)),
  )} />;

export default Divider;
