import * as React from 'karet';
import * as U from 'karet.util';

import Editor from './editor';
import Header from './header';

/**
 * @param {Props} props
 */
export default function App ({ state }) {
  return (
    <main className="app">
      <Header />
      <Editor canvas={U.view('canvas', state)}
              mouse={U.view('mouse', state)} />
      <pre><code>{U.stringify(state, null, 2)}</code></pre>
    </main>
  );
};

//

/**
 * @typedef {object} Props
 * @prop {any} state
 */
