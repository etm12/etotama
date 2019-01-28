import * as React from 'karet';
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'partial.lenses';

import * as E from './events';

//

/**
 * @param {Props} props
 */
export default function Canvas ({ state }) {
  const dom = U.variable();

  dom.log('dom');

  const bind = obs => fn => U.flatMapLatest(fn, obs);

  const fromDom = bind(dom);

  const { width, height, scale } = U.destructure(state);

  const scaledDimensions = U.combine(
    [scale, width, height],
    (m, w, h) => ({ width: m * w, height: m * h }),
  );

  const onClick = fromDom(el => U.fromEvents(el, 'click', x => x));
  const onMouseUp = fromDom(el => U.fromEvents(el, 'mouseup', x => x));
  const onMouseDown = fromDom(el => U.fromEvents(el, 'mousedown', x => x));

  onClick.log('click');
  onMouseUp.log('mouseup');
  onMouseDown.log('mousedown');

  return (
    <article>
      <div>
        {U.thru(
          scaledDimensions,
          U.stringify,
        )}
      </div>

      <section>
        <canvas ref={U.refTo(dom)}
                width={width}
                height={height}
                style={U.mapValue(
                  L.set('border', 'solid 1px #f00'),
                  scaledDimensions,
                )} />
      </section>
    </article>
  );
}

//

/**
 * @typedef {Object} Props
 * @prop {number} width
 * @prop {number} height
 * @prop {number} scale
 * @prop {K.Property<any, any>} state
 */
