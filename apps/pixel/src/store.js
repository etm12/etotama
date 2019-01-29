import * as U from 'karet.util';

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
    selected: '#f00',
    colors: [
      '#f00',
      '#ff0',
      '#0f0',
      '#0ff',
      "#00f",
    ],
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
