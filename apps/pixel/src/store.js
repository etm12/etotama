/**
 * @module Store
 * @namespace Pixel
 */
import * as H from 'kefir.partial.lenses.history';
import * as U from 'karet.util';
import * as R from 'ramda';

import { initialState } from './init';

//

export const state = U.atom(initialState);

//

if (process.env.NODE_ENV === 'development') {
  U.thru(
    state,
    U.debounce(500),
  ).log('state');
}

// Image data

export const imageData = U.atom(
  H.init(
    { replacePeriod: 200 },
    R.map(
      R.divide(R.__, 256),
      R.range(
        0,
        (initialState.canvas.width * initialState.canvas.height) * 4
      ),
    ),
  ),
);
