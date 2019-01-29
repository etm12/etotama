import * as I from 'infestines';
import * as R from 'ramda';
import * as $ from 'sanctuary-def';

export const NullaryType = I.curry(function (name, url, test) {
  return $.NullaryType(name)(url)(test);
});

//

const Type = {};

Type.Uint8ClampedArray = NullaryType(
  'Uint8ClampedArray',
  'Uint8ClampedArray',
  R.is(Uint8ClampedArray),
);

Type.ImageData = NullaryType(
  'ImageData',
  'ImageData',
  R.is(ImageData),
);

export { Type };
