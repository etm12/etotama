import * as I from 'infestines';
import * as $ from 'sanctuary-def';

export const NullaryType = I.curry(function (name, url, test) {
  return $.NullaryType(name)(url)(test);
});
