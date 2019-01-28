import * as I from 'infestines';
import * as $ from 'sanctuary-def';
import * as T from './_types';

const def = $.create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: $.env.concat(Object.keys(T.Type)),
});

function defN (name, constr, types, impl) {
  return def(name)(constr)(types)(impl);
}

export default I.curry(defN);
