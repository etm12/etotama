import * as React from 'karet';

import ToolPaletteButton from './tool-palette-button';

export default function ToolPalette (props) {
  return (
    <div className="component component--tool-palette">
      <ul className="tool-palette__list">
        <ToolPaletteButton title="Brush" />
        <ToolPaletteButton title="Erase" />
        <ToolPaletteButton title="Eyedropper" />
      </ul>
    </div>
  );
}

//

/**
 * @typedef {object} Props
 */
