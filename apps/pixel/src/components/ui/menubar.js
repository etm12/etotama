import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';

import Menuitem from './menuitem';

/**
 * @param {Props} props
 */
export default function Menubar (props) {
  const { menuItems } = props;
  console.log({ menuItems });

  return (
    <nav className="ui-component--menubar menubar">
      <ul className="menubar__items">
        {U.thru(
          menuItems,
          U.view(L.valueOr([])),
          U.mapElems((it, i) =>
            <Menuitem key={i}
                      title={U.view('title', it)}
                      action={U.view('action', it)} />)
        )}
      </ul>
    </nav>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any[]} menuItems
 */
