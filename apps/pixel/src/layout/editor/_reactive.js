/**
 * @module _Reactive
 * @namespace Editor
 */
// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as S from '@etotama/shared';

const takeEvents = source => type => U.thru(
  source,
  U.flatMapLatest(src => U.fromEvents(src, type, a => a)),
  U.toProperty,
);

/**
 * @param {K.Property<HTMLCanvasElement, any>} eventSource
 * @return {MouseEventObject}
 */
export function getMouseEvents (
  eventSource,
) {
  const takeEventsFrom = takeEvents(eventSource);

  const onMouseDown = takeEventsFrom('mousedown');
  const onMouseMove = takeEventsFrom('mousemove');
  const onMouseOut = takeEventsFrom('mouseout');

  return {
    onMouseDown,
    onMouseMove,
    onMouseOut,
  }
};

export function getKeyboardEvents (
  eventSource,
) {
  return {};
};

/**
 * @return {DomObservableObject}
 */
export function initDomObservables () {
  const ref = U.variable();

  return {
    ref,
    context: U.mapValue(S.getContext, ref),
    offset: U.mapValue(S.getBoundingRect, ref),
  }
}

//

/**
 * @typedef {object} MouseEventObject
 * @prop {K.Property<MouseEvent, any>} onMouseDown
 * @prop {K.Property<MouseEvent, any>} onMouseMove
 */

/**
 * @typedef {object} DomObservableObject
 * @prop {any} ref
 * @prop {K.Property<CanvasRenderingContext2D, any>} context
 * @prop {K.Property<(DOMRect | ClientRect), any>}
 */
