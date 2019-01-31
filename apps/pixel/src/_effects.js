/**
 * @module Effects
 * @namespace App.Pixel
 */
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';

//

const _EffPool = K.pool();

export const EffPool = U.toProperty(_EffPool);

export const addEff = obs => _EffPool.plug(obs);
export const removeEff = obs => _EffPool.unplug(obs);

export const debug = U.thru(
  EffPool,
  U.on({ value: v => {
    console.group('EffPool')
    console.info(v.toString());
    console.groupEnd();
  } }),
); // .onEnd(() => {});

//

const shouldTakeEffFrom = effs => eff => R.find(x => x.is(eff), effs);

export const takeEffects = (...effs) => U.skipUnless(shouldTakeEffFrom(effs), EffPool);
