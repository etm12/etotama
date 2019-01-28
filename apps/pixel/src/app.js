import * as React from 'karet';
import * as U from 'karet.util';

import * as Layout from './layout';
import * as M from './meta';

/**
 * @param {Props} props
 */
export default function App ({ state }) {
  return (
    <main className="app">
      <Layout.Header />

      <Layout.Editor
        canvas={M.canvasFrom(state)}
        mouse={M.mouseFrom(state)}
      />

      <Layout.Sidebar>
        <pre><code>{U.stringify(state, null, 2)}</code></pre>
      </Layout.Sidebar>
    </main>
  );
};

//

/**
 * @typedef {object} Props
 * @prop {any} state
 */
