import * as React from 'karet';
import * as U from 'karet.util';

import * as Layout from './layout';
import * as M from './meta';
import * as C from './components';

/**
 * @param {Props} props
 */
export default function App ({ state }) {
  return (
    <main className="app layout layout--root">
      <Layout.Header />

      <Layout.Editor
        canvas={M.canvasFrom(state)}
        mouse={M.mouseFrom(state)}
        palette={M.paletteFrom(state)}
      />

      <Layout.Sidebar>
        <C.Palette palette={M.paletteFrom(state)} />
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
