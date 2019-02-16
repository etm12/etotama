// @ts-check
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

const takeEvent = R.curry((type, source) => U.thru(
  U.fromEvents(source, type, a => a),
  U.toProperty,
));

const takeEvents = events => src => L.transform(
  L.seq([
    L.entries,
    L.log(),
    L.modifyOp(([_, v]) => [v, takeEvent(v, src)]),
  ]),
  events,
)

// Browser events

const BrowserEvents = ['focus'];

export const Browser = takeEvents(BrowserEvents);

// Keyboard events

const KeyboardEvents = ['keydown', 'keyup'];

export const Keyboard = takeEvents(KeyboardEvents);

// Mouse events
