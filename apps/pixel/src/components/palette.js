import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import { color } from 'd3-color';

/**
 * @param {Props} props
 */
export default function Palette ({ palette }) {
  const { colors, selected } = U.destructure(palette);

  return (
    <div className="component component--palette">
      <ul className="palette__color-list">
        {U.thru(
          colors,
          U.mapValue(R.map(color)),
          U.show,
          U.mapElems((color, i) =>
            <li key={i}
                className={U.cns(
                  'palette__color',
                  U.when(R.equals(color, selected), 'palette__color--selected'),
                )}>
              <button onClick={U.actions(() => selected.set(color.get().toString()))}
                      className="palette__color-control"
                      style={{
                        borderColor: color,
                        backgroundColor: color,
                        boxShadow: U.when(R.equals(color, selected), U.string`0 4px 0 ${color}`),
                      }}>
                {U.stringify(color)}
              </button>
            </li>)
        )}
      </ul>
    </div>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any} palette
 */
