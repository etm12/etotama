import * as R from 'ramda';
import * as L from 'partial.lenses';
import { capitalize, camelTokens, kebabTokens } from './index';

export const camelKebab = L.seq(
  [L.modifyOp(R.split('-'))],
  [L.slice(1, Infinity), L.elems, L.modifyOp(capitalize)],
  [L.modifyOp(R.join(''))],
);

export const kebabCamel = L.seq(
  [L.modifyOp(camelTokens)],
  [L.elems, L.modifyOp(R.toLower)],
  [L.modifyOp(R.join('-'))],
);

export const Obs = {
  object: L.iso(
    L.modify(L.keys, camelKebab),
    L.modify(L.keys, kebabCamel),
  ),
};

export const hexString = [L.split('\n'), L.array(L.inverse(L.dropPrefix('#')))];
