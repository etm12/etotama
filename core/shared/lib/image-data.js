// @ts-check
import * as R from 'ramda';
import * as $ from 'sanctuary-def';
import { Type } from './_types';

import def from './env';

export const clampedArray = def(
  'clampedArray',
  {},
  [$.Any, Type.Uint8ClampedArray],
  xs => new Uint8ClampedArray(xs),
);

export const imageDataOf3 = def(
  'imageDataOf3',
  {},
  [Type.Uint8ClampedArray, $.Number, $.Number, Type.ImageData],
  (xs, dx, dy) => new ImageData(xs, dx, dy),
);

export const imageDataOf = (xs, dx, dy) => imageDataOf3(xs)(dx)(dy);
