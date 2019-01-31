/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import store, { imageData } from './store';
import './styles/index.scss';

ReactDOM.render(
  <App state={store}
       imageData={imageData} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
