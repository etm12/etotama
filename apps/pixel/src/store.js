/**
 * @module Store
 * @namespace Pixel
 */
import * as H from 'kefir.partial.lenses.history';
import * as U from 'karet.util';
import * as R from 'ramda';
import * as L from 'partial.lenses';

import palettes from './assets/palettes';
import { COLOR_CHANNELS, PanelType } from './constants';
import * as S from '@etotama/core.shared';

const colors = L.get(
  S.lenses.hexString,
  palettes.get('endesga-32.hex'),
);

//

const initialState = {
  debug: {
    annotate: false,
  },
  input: {
    metaPressed: false,
    ctrlPressed: false,
    altPressed: false,
  },
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
    active: [10, 16],
    selected: '#c28569',
    colors,
  },
};

//

export const state = U.atom(initialState);

window.state = state;

//

U.thru(
  state,
  U.debounce(500),
).log('state');

// Image data

export const imageData = U.atom(
  H.init(
    { replacePeriod: 200 },
    R.map(R.divide(R.__, 256), R.range(0, (24 * 24) * 4)),
  ),
);

imageData.log('imageData');

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
    imageData.view(H.present).set(arr);
  });
