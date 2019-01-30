/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';

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

  EffPool.log('EffPool');

  const effs = U.parallel([
    U.fromEvents(document, 'keydown', Command.KeyDown),
    U.fromEvents(document, 'keyup', Command.KeyUp),
    U.thru(
      U.interval(1000, 123),
      U.takeFirst(10),
    ),
  ]);

  const dispatchEffs = U.thru(
    effs,
    U.on({ value: pushEffect }),
  );

  const effsToMonitor = takeEffects(Command.KeyDown);

  effsToMonitor.log('effs to monitor');

  return (
    <main className="app layout layout--root">
      {U.sink(dispatchEffs)}

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
