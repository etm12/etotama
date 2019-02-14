// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

const takeEvents = source => type => U.thru(
  source,
  U.flatMapLatest(src => U.fromEvents(src, type, a => a)),
  U.toProperty,
);

const observeEvent = (type, source) => takeEvents(source)(type);

/**
 * @return {Object.<string,MouseEvent$>}
 */
export const mouseEventsFrom = source => ({
  onMouseDown: observeEvent('mousedown', source),
  onMouseMove: observeEvent('mousemove', source),
  onMouseUp: observeEvent('mouseup', source),
  onMouseDrag: U.thru(
    observeEvent('mousedown', source),
    U.flatMapLatest(() => U.thru(
      observeEvent('mousemove', source),
      U.takeUntilBy(
        U.takeFirst(1, observeEvent('mouseup', source)),
      )
    ))
  ),
});

//

/**
 *
 * @param {MouseEvent$} event
 * @param {OffsetCoord$} offset
 * @return {Coord$}
 */
const getPositionDelta = (event, offset) => U.thru(
  R.zip(event, offset),
  U.skipUnless(R.pipe(R.head, R.complement(R.isNil))),
  R.map(R.apply(R.subtract)),
);

/**
 * @param {MouseCoord$} position
 * @param {Number$} scale
 * @return {Coord$}
 */
const getPixelPosition = (position, scale) => U.thru(
  U.template([position, [scale, scale]]),
  R.transpose,
  R.map(R.pipe(R.apply(R.divide), U.trunc)),
  U.skipDuplicates(R.equals),
);

export const eventsFrom = (dom) => {
  const events = mouseEventsFrom(dom);

  return {
    events,
  };
};

/**
 *
 * @param {object} props
 * @prop {any} props.dom
 * @prop {Coord$} props.offset
 * @prop {Number$} props.scale
 * @return {{ events: Object.<string, MouseEvent$>, offsetDelta: Coord$, pixel: Coord$ }}
 */
export const withBoundContext = ({ dom, offset, scale }) => {
  const events = mouseEventsFrom(dom);
  const event = R.props(['pageX', 'pageY'], events.onMouseMove)

  const offsetDelta = getPositionDelta(event, offset);
  const pixel = getPixelPosition(offsetDelta, scale);

  return {
    events,
    offsetDelta,
    pixel,
  };
}

//

/**
 * @typedef {K.Property<MouseEvent, any>} MouseEvent$
 */

/**
 * @typedef {K.Property<[number, number], any>} MouseCoord$
 */

/**
 * @typedef {K.Property<(CanvasRect | DOMRect), any>} OffsetRect$
 */

/**
 * @typedef {K.Property<[number, number], any>} Coord$
 */

/**
 * @typedef {K.Property<number, any>} Number$
 */
