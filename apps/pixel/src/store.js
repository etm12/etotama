/**
 * @module Store
 * @namespace Pixel
 */
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import palettes from './assets/palettes';
import { COLOR_CHANNELS, PanelType } from './constants';
import * as M from './_meta';

const colors = L.get(
  M.hexStringL,
  palettes.get('endesga-32.hex'),
);



//

const initialState = {
  info: {
    name: {
      value: 'Untitled',
      editing: false,
    },
  },
  canvas: {
    size: [24, 24],
    mouse: [0, 0],
    width: 24,
    height: 24,
    scale: 16,
    offset: {
      left: 0,
      top: 0,
    },
  },
  panels: [
    {
      type: PanelType.PANEL,
      props: {},
      children: [
        {
          type: PanelType.PANEL,
          header: 'Tools & Functions',
          children: [
            {
              type: PanelType.PALETTE,
            },
          ],
        },
      ],
    },
  ],
  brush: {
    size: 2,
  },
  palette: {
    selected: '#c28569',
    colors,
  },
};

//

export const state = U.atom(initialState);

//

U.thru(
  state,
  U.debounce(500),
).log('state');

// Image data

export const imageData = U.atom();

const imageDataShouldChange = U.thru(
  state,
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

//

/**
 * Temp use only
 * @deprecated
 */
export const canvas = U.variable();

canvas.log('canvas (REMOVE ME)');
