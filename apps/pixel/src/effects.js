import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { saveAs } from 'file-saver';

import { state } from './store';

export const effect = U.variable();

effect.log('effect');

//

export const createEff = R.curry((type, payload) => ({ type, payload }));

//

export const Effect = {
  WINDOW_RESIZE: 'WINDOW_RESIZE',
  ELEMENT_RESIZE: 'ELEMENT_RESIZE',
  SAVE_IMAGE: 'SAVE_IMAGE',
  LOAD_IMAGE: 'LOAD_IMAGE',
};

const effects = {
  [Effect.WINDOW_RESIZE]: (state, eff) => {
    console.log({ state, eff });
  },
  [Effect.ELEMENT_RESIZE]: (state, eff) => {
    console.log('element =>', { state, eff });
  },
  [Effect.SAVE_IMAGE]: (_, eff) => {
    eff.payload.toBlob(b => saveAs(b, 'foo.png'));
  },
  [Effect.LOAD_IMAGE]: (state, eff) => {
    console.log('LOAD_IMAGE:', { state, eff });
  },
};

//

export const handle = U.thru(
  effect,
  U.skipDuplicates(R.equals),
  U.skipUnless(eff => eff && effects[eff.type]),
  U.consume(eff => {
    console.info('Dispatching effect for effect `%s`', eff.type);
    effects[eff.type](state, eff);
  }),
);
