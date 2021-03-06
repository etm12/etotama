/// <reference path="./lenses.d.ts" />
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { color } from 'd3-color';
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

//

const envBaseL = ['navigator'];

export const Env = {
  language: [envBaseL, 'language'],
  dnt: [envBaseL, 'doNotTrack', L.reread(x => !!(+x))],
  os: [envBaseL, 'platform'],
};

//

export const hexString = [L.split('\n'), L.array(L.inverse(L.dropPrefix('#')))];

export const showAsPair = L.reread(([x, y]) => `(${x}, ${y})`);

export const toPx = L.reread(x => `${x}px`);
export const toPct = L.reread(x => `${x}%`);
export const toPctU = [L.reread(R.multiply(100)), toPct];
export const toRem = L.reread(x => `${x}rem`);
export const toColor = L.reread(color);

export const toCssTransform = k => L.reread(y => `${k}(${y})`);

const cssTranslateX = toCssTransform('translateX');
const cssTranslateY = toCssTransform('translateY');
export const translateX = [toPx, cssTranslateX];
export const translateY = [toPx, cssTranslateY];

