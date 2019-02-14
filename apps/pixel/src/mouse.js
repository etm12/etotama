// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as S from '@etotama/core.shared';

const mouseEvBus = U.bus();

/** @type {Function} */
export const pushEvent = U.actions(S.persist, U.through(U.doPush(mouseEvBus), S.call0));

/** @type {MouseEvent$} */
export const events = U.toProperty(mouseEvBus);

/** @return {MouseEvent$} */
const takeEvent = type => U.skipUnless(R.whereEq({ type }), events);

/** @type {MouseEvent$} */
export const onMouseDown = takeEvent('mousedown');

/** @type {MouseEvent$} */
export const onMouseMove = takeEvent('mousemove');

/** @type {MouseEvent$} */
export const onMouseUp = takeEvent('mouseup');

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

/** @type {MouseEvent$} */
export const onMouseDrag = U.thru(
  onMouseDown,
  U.flatMapLatest(() => U.takeUntilBy(
    U.takeFirst(1, onMouseUp),
    onMouseUp
  )),
);

export const onMouseDraw = U.parallel([onMouseDown, onMouseDrag]);

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
