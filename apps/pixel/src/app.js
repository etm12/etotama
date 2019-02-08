/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import * as M from './_meta';
import EditorContainer from './containers/editor';
import HeaderContainer from './containers/header';
import { Store } from './context';
import { Panel, PanelHeader, PanelBody, PanelFooter } from './layout/panel';
import Button from './components/button';
import ButtonGrid from './components/button-grid';
import KeyValue from './components/key-value';
import ToolGrid from './components/ui/tool-grid';

const AppImpl = ({ imageData, state, palette }) =>
  <main className="container--root app layout layout--root">
    <HeaderContainer />

    <div className="layout__body">
      <Panel direction="horizontal" stretch>
        <Panel size={12}>
          <Panel>
            <PanelHeader>Tools</PanelHeader>
            <PanelBody>
              <ToolGrid />
            </PanelBody>
          </Panel>

          <Panel>
            <PanelHeader>Palette</PanelHeader>
            <PanelBody>
              <ButtonGrid cols={8} gap="hairline">
                {U.thru(
                  palette,
                  U.view('colors'),
                  U.mapElems((it, idx) =>
                    <Button
                      color={it}
                      key={idx}
                      height={2}
                      active={R.equals(it, U.view('selected', palette))}
                      action={U.doSet(U.view('selected', palette), it)}
                    />
                  ))}
              </ButtonGrid>
            </PanelBody>
          </Panel>
        </Panel>

        <Panel
          direction="vertical"
          center>
          <PanelBody name="editor">
            <EditorContainer />
          </PanelBody>

          <PanelFooter>
            <div className="bar--horizontal">
              <KeyValue label="Mouse" value={M.showMousePositionIn(state)} />
              <KeyValue label="Canvas" value={M.showCanvasSizeIn(state)} />
              <KeyValue label="Scale" value={U.view(['canvas', 'scale', L.reread(x => `${x}x`)], state)} />
            </div>
          </PanelFooter>
        </Panel>
      </Panel>
    </div>
  </main>;

const AppContainer = ({ actions }) =>
  <React.Fragment>
    {U.sink(actions.log('AppImpl:actions'))}

    <Store.Consumer>
      {({ state, imageData }) =>
        <AppImpl
          imageData={imageData}
          state={state}
          palette={M.colorPaletteIn(state)}
        />}
    </Store.Consumer>
  </React.Fragment>;

export default AppContainer;
