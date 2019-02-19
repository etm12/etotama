import palettes from './assets/palettes';
import * as S from '@etotama/core.shared';
import * as L from 'kefir.partial.lenses';

const colors = L.get(
  S.lenses.hexString,
  palettes.get('endesga-32.hex'),
);

export const initialState = {
  debug: {
    annotate: true,
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
    width: 24,
    height: 24,
    scale: 16,
    offset: {
      left: 0,
      top: 0,
    },
  },
  palette: {
    active: [10, 16],
    selected: '#c28569',
    colors,
  },
};
