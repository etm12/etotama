import * as React from 'karet';
import * as U from 'karet.util';

/**
 * @param {Props} props
 */
const PaletteColorPicker = ({ palette, onSwitchCurrentColors }) => {
  const currentColors = U.view('active', palette);
  const colorWithIx = ix => U.view(['colors', ix], palette);

  const switchCurrent = U.thru(
    currentColors,
    U.sampledBy(onSwitchCurrentColors),
    U.mapValue(([a, b]) => [b, a]),
    U.consume(xs => currentColors.set(xs)),
  )

  const fgColor = U.thru(U.view(0, currentColors), colorWithIx);
  const bgColor = U.thru(U.view(1, currentColors), colorWithIx);

  return (
    <div className="c-active-colors">
      {U.sink(switchCurrent)}
      <div className="c-active-colors__body">
        <div className="c-active-colors__foreground" style={{ backgroundColor: fgColor }} />
        <div className="c-active-colors__background" style={{ backgroundColor: bgColor }} />
      </div>
    </div>
  );
};

export default PaletteColorPicker;

//

/**
 * @typedef {object} Props
 * @prop {object} palette
 * @prop {any} onSwitchCurrentColors
 */
