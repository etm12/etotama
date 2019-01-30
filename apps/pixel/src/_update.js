/**
 * @module Update
 * @namespace App.Pixel
 */
import * as U from 'karet.util';
import * as R from 'ramda';

import Eff from './_effects';

const updateOnEff = U.thru(
  Eff,
  U.show,
);

export default updateOnEff;

//

const _isOfEff = effs => eff => R.find(x => x.is(eff), effs);

export const takeEffects = (...effs) => U.thru(
  Eff,
  U.skipUnless(_isOfEff(effs)),
  U.show,
);
