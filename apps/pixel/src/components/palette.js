import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { color as makeColor } from 'd3-color';

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
          U.mapElems((color, i) => {
            const _color = color.get();
            const rgb = makeColor(_color);
            return (
              <li key={i}
                  className={U.cns(
                    'palette__color',
                    U.when(R.equals(color, selected), 'palette__color--selected'),
                  )}>
                <button onClick={() => selected.set(_color)}
                        className="palette__color-control"
                        style={{
                          borderColor: rgb.darker(1),
                          backgroundColor: color,
                          boxShadow: U.when(R.equals(color, selected), U.string`0 4px 0 ${rgb.darker(1)}`),
                        }}>
                  {U.stringify(color)}
                </button>
              </li>
            );
          })
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
