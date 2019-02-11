import * as React from 'karet';
import * as U from 'karet.util';

const Color = ({ value, onClick, onRightClick }) =>
  <button
    className="c-palette-color-picker__button"
    style={{ backgroundColor: value }}
    onClick={U.actions(U.preventDefault, onClick)}
    onContextMenu={U.actions(U.preventDefault, onRightClick)}
  />;

const PaletteColorPicker = ({ palette, active = U.view('active', palette), test = active.log('active') }) =>
  <div className="c-palette-color-picker">
    <div className="c-grid gap-hairline"
      style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
      {U.thru(
        palette,
        U.view('colors'),
        U.mapElems((it, idx) =>
          <Color key={idx}
                 onClick={U.doSet(U.view(0, active), idx)}
                 onRightClick={U.doSet(U.view(1, active), idx)}
                 value={it} />)
      )}
    </div>
  </div>;

export default PaletteColorPicker;
