// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import * as S from '@etotama/shared';

/**
 * @param {Props} props
 */
export default function Canvas ({ size, style, scale, domRef }) {
  const [width, height] = U.destructure(size);

  return (
    <section className="canvas"
             style={style}>
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
 * @prop {any} domRef
 */
