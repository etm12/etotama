import * as React from 'karet';
import * as U from 'karet.util';

const Color = ({ value }) =>
  <button
    className="c-palette-color-picker__button"
    style={{ backgroundColor: value }}
  />;

const PaletteColorPicker = ({ palette }) =>
  <div className="c-palette-color-picker">
    <div className="c-grid gap-hairline"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {U.thru(
        palette,
        U.view('colors'),
        U.mapElems((it, idx) =>
          <Color key={idx}
                value={it} />)
      )}
    </div>
  </div>;

export default PaletteColorPicker;
