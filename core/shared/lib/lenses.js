/// <reference path="./lenses.d.ts" />
import * as R from 'ramda';
import * as L from 'partial.lenses';
import { color } from 'd3-color';
import { inspect } from 'util';
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

const inv = L.inverse;
const dropP = L.dropPrefix;
const dropS = L.dropSuffix;

const toString = L.reread(R.toString);
const wrap = [L.iso(
    x => {
      console.log('get ', { x });
      return x;
    },
    x => {
      console.log('set ', { x });
      return +x;
    },
  ), inv([dropP('('), dropS(')')])];

const toUnit = unit => L.iso(
  n => `${n}${unit}`,
  s => parseInt(('' + s).replace(unit, ''), 10),
);

export const toPx = toUnit('px');
export const toPct = toUnit('%');
export const toPctU = [L.multiply(100), toPct];
export const toRem = [toString, toUnit('rem')];
export const toDeg = toUnit('deg');
// TODO Iso
export const toColor = L.reread(color);

export const toCssTransform = n => L.iso(x => `${n}(${x})`, x => x.replace(`${n}`, '').replace(/\(|\)/g, ''))

const cssTranslateX = toCssTransform('translateX');
const cssTranslateY = toCssTransform('translateY');
export const translateX = [toPx, cssTranslateX];
export const translateY = [toPx, cssTranslateY];

