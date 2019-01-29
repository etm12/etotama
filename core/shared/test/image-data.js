import {
  testEq,
  testThrows,
} from './_helpers';

import * as Impl from '../lib/image-data';

const arr = new Uint8ClampedArray(4);

testEq(arr, () => Impl.clampedArray(4));

testThrows(() => Impl.imageDataOf3('foo', 'bar', 'baz'));
testThrows(() => Impl.imageDataOf3([], 1, 1));
