/**
 * @module Canvas
 * @namespace Editor
 */
// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';

import { Measure } from '../../components/ui';

/**
 * @param {Props} props
 */
export default function Canvas ({ size, style, scale, mousePos, domRef }) {
  const [width, height] = U.destructure(size);

  return (
    <section className="canvas"
             style={style}>
      <div className="editor__measure">
        <div className="editor__mouse-position">
          {U.stringify(mousePos)}
        </div>
        <Measure className="editor__measure-x"
                 width={width}
                 value={U.string`${width}px`} />
        <Measure className="editor__measure-y"
                 width={width}
                 value={U.string`${height}px`} />
      </div>
      {/* FIXME Make me pretty */}
      {U.ifElse(
        !!domRef,
        <canvas className="canvas__body"
                ref={U.refTo(domRef)}
                width={width}
                height={height}
                style={style} />,
        <div>
          No <code>domRef</code> given to canvas.
        </div>
      )}
    </section>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {[number, number]} size
 * @prop {number} scale
 * @prop {Object.<string, any>} style
 * @prop {[number, number]} mousePos
 * @prop {any} domRef
 */
