/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';

import EditorContainer from './containers/editor';
import HeaderContainer from './containers/header';
import SidebarContainer from './containers/sidebar';

import { Store } from './context';
import actions from './actions';

const AppImpl = ({ imageData }) =>
  <main className="container--root app layout layout--root">
    {U.sink(actions.log('AppImpl:actions'))}
    <HeaderContainer />
    <EditorContainer />
    <SidebarContainer />
  </main>;

const AppContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ imageData }) =>
        <AppImpl imageData={imageData} />}
    </Store.Consumer>
  </React.Fragment>;

export default AppContainer;
