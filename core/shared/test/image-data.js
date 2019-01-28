import {
  testEq,
} from './_helpers';

import * as Impl from '../lib/image-data';

testEq(new Uint8ClampedArray(4), () => Impl.clampedArray(4));
