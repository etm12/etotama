/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';

import * as Layout from './layout';
import * as C from './components';
import { pushEffect, takeEffects, EffPool, addEff } from './_effects';
import Command from './_commands';

/**
 * @param {Props} props
 */
export default function App ({ state }) {
  const { canvas, mouse, palette, imageData } = U.destructure(state);

  const keydown = U.fromEvents(document, 'keydown', Command.KeyDown);

  addEff(keydown);

  //

  return (
    <main className="app layout layout--root">
      {U.sink(U.thru(
        EffPool,
        U.show,
      ))}

      <Layout.Header />

      <Layout.Editor {...{ canvas, mouse, palette, imageData }} />

      <Layout.Sidebar>
        <C.Palette {...{ palette }} />
        <pre className="component--debug"><code>{U.stringify(state, null, 2)}</code></pre>
      </Layout.Sidebar>
    </main>
  );
};

//

/**
 * @typedef {object} Props
 * @prop {any} state
 */
