import * as U from 'karet.util';
import * as R from 'kefir.ramda';
// eslint-disable-next-line
import * as K from 'kefir';

const takeEvent = type => U.thru(
  U.fromEvents(document, type, R.identity),
  U.toProperty,
);

/** @type {K.Property<KeyboardEvent, any>} */
export const onKeyDown = takeEvent('keydown');
export const onKeyUp = takeEvent('keyup');
