import * as React from 'karet';
import * as U from 'karet.util';

/**
 * @param {Props} props
 */
export default function ToolPaletteButton ({
  className,
  title,
}) {
  return (
    <li className={U.cns(
      className,
      'tool-palette-button',
    )}>
      <button className="tool-palette-button__target">
        {title}
      </button>
    </li>
  )
}

//

/**
 * @typedef {object} Props
 * @prop {string} className
 * @prop {string} title
 */
