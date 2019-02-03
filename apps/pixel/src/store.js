/**
 * @module Store
 * @namespace Pixel
 */
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import palettes from './assets/palettes';
import { COLOR_CHANNELS } from './constants';
import * as M from './_meta';

const colors = L.get(
  M.hexStringL,
  palettes.get('endesga-32.hex'),
);



//

const initialState = {
  canvas: {
    width: 24,
    height: 24,
    scale: 16,
    offset: {
      left: 0,
      top: 0,
    },
  },
  brush: {
    size: 2,
  },
  mouse: {
    position: [0, 0],
  },
  palette: {
    selected: '#c28569',
    colors,
  },
};

//

const store = U.atom(initialState);

export default store;
window.store = store;
//

U.thru(
  store,
  U.debounce(500),
).log('store');

// Image data

export const imageData = U.atom();

const imageDataShouldChange = U.thru(
  store,
  U.view(['canvas', L.props('width', 'height')]),
  U.skipDuplicates(R.equals),
  U.mapValue(({ width, height }) => (width * height) * COLOR_CHANNELS),
  U.mapValue(R.constructN(1, Uint8ClampedArray)),
);

imageDataShouldChange
  .onValue(arr => {
    console.info('Image size has changed, creating new image data.');
    imageData.set(arr);
  });
