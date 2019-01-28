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
