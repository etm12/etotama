/**
 * @module Effects
 * @namespace App.Pixel
 */
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'ramda';

const _EffBus = U.bus();

export const pushEffect = eff => _EffBus.push(eff);
export const pushEffectError = eff => _EffBus.error(eff);

//

const _EffPool = K.pool();

export const EffPool = U.toProperty(_EffPool);

export const addEff = obs => _EffPool.plug(obs);
export const removeEff = obs => _EffPool.unplug(obs);

//

const Eff = U.toProperty(_EffBus);

export default Eff;

//

const shouldTakeEffFrom = effs => eff => R.find(x => x.is(eff), effs);

export const takeEffects = (...effs) => U.skipUnless(shouldTakeEffFrom(effs), Eff);
