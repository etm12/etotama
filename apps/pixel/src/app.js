/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';

import EditorContainer from './containers/editor';
import HeaderContainer from './containers/header';
import { Store } from './context';

const AppImpl = ({ imageData }) =>
  <main className="container--root app layout layout--root">
    <HeaderContainer />
    <EditorContainer />
  </main>;

const AppContainer = ({ actions }) =>
  <React.Fragment>
    {U.sink(actions.log('AppImpl:actions'))}

    <Store.Consumer>
      {({ imageData }) =>
        <AppImpl imageData={imageData} />}
    </Store.Consumer>
  </React.Fragment>;

export default AppContainer;
