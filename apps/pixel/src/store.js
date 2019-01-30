/**
 * @module Store
 * @namespace App.Pixel
 */
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import palettes from './assets/palettes';

const colors = L.get(
  [L.split('\n'), L.array(L.inverse(L.dropPrefix('#')))],
  palettes.get('endesga-32.hex'),
);



//

const initialState = {
  canvas: {
    width: 24,
    height: 24,
    scale: 16,
  },
  mouse: {
    position: [0, 0],
  },
  palette: {
    selected: '#c28569',
    colors,
  },
  imageData: [],
};

//

const store = U.atom(initialState);

export default store;

//

U.thru(
  store,
  U.debounce(500),
  U.on({
    value: state => console.log('state updated => %o', state),
  })
).onEnd(() => {});
