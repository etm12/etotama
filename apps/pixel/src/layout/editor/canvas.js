// @ts-check
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

/**
 * @param {Props} props
 */
export default function Canvas ({ size, scale, domRef }) {
  const [width, height] = U.destructure(size);

  return (
    <section className="canvas">
      {U.ifElse(
        !!domRef,
        <canvas className="canvas__body"
              ref={U.refTo(domRef)}
              width={width}
              height={height}
              style={{
                width: R.multiply(scale, width),
                height: R.multiply(scale, height),
              }} />,
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
 * @prop {any} domRef
 */
