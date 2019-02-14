/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import ReactDOM from 'react-dom';
import '@etotama/core.styles';

import App from './app';
import * as serviceWorker from './serviceWorker';
import { state, imageData } from './store';
import { Store } from './context';
import * as GlobalEvent from './global-events';

ReactDOM.render(
  <Store.Provider value={{ state, imageData }}>
    <App
      state={state}
      imageData={imageData}
      globalEvents={GlobalEvent}
    />
  </Store.Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
