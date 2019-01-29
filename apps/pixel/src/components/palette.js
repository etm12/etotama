import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

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
          U.mapElems((color, i) =>
            <li key={i}
                className={U.cns(
                  'palette__color',
                  U.when(R.equals(color, selected), 'palette__color--selected'),
                )}>
              <button onClick={U.actions(() => selected.set(color.get()))}
                      className="palette__color-control"
                      style={{
                        borderColor: color,
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
