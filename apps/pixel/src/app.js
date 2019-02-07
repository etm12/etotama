/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';

import EditorContainer from './containers/editor';
import HeaderContainer from './containers/header';
import { Store } from './context';
import { Panel, PanelHeader, PanelBody, PanelFooter } from './layout/panel';
import Button from './components/button';
import ButtonGrid from './components/button-grid';

const AppImpl = ({ imageData }) =>
  <main className="container--root app layout layout--root">
    <HeaderContainer />

    <div className="layout__body">
      <Panel size={12}>
        <PanelHeader>Palette</PanelHeader>
        <PanelBody>
          content
        </PanelBody>
      </Panel>

      <Panel size={16}>
        <PanelHeader>Tools</PanelHeader>
        <PanelBody>
          <ButtonGrid cols={3}>
            <Button>
              Tool 1
            </Button>
            <Button>
              Tool 2
            </Button>
            <Button>
              Tool 3
            </Button>
          </ButtonGrid>
        </PanelBody>
      </Panel>

      <Panel
        className="c-panel--editor"
        direction="vertical">
        <PanelBody>
          <EditorContainer />
        </PanelBody>
        <PanelFooter>
          Footer stuff
        </PanelFooter>
      </Panel>
    </div>
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
