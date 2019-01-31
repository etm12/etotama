/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';

import * as Layout from './layout';
import * as C from './components';
import * as UI from './components/ui';
import { addEff } from './_effects';
import Command from './_commands';
import menuItems from './_menu';
import updateOnEff from './_update';

/**
 * @param {Props} props
 */
export default function App ({ state, imageData }) {
  const { canvas, mouse, palette } = U.destructure(state);

  const keydown = U.fromEvents(document, 'keydown', Command.KeyDown);

  //

  return (
    <main className="app layout layout--root">
      {U.sink(U.parallel([
        addEff(keydown),
        updateOnEff,
      ]))}

      <Layout.Header {...{ menuItems }} />

      <Layout.Editor {...{ canvas, mouse, palette, imageData }} />

      <Layout.Sidebar>
        <UI.SidebarPanel title="Color palette">
          <C.Palette {...{ palette }} />
        </UI.SidebarPanel>
        <UI.SidebarPanel title="Tools">
          <C.ToolPalette />
        </UI.SidebarPanel>
        <UI.SidebarPanel title="Debug">
          <pre className="component--debug"><code>{U.stringify(state, null, 2)}</code></pre>
        </UI.SidebarPanel>
      </Layout.Sidebar>
    </main>
  );
};

//

/**
 * @typedef {object} Props
 * @prop {any} state
 * @prop {any} imageData
 */
