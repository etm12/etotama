// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';

import * as KeyboardEvent from './keyboard';

const whereCode = code => R.whereEq({ code });
const withMetaKeyAnd = p => R.both(R.whereEq({ metaKey: true }), p);
const takeOnly = U.skipUnless;

export const onSwitchCurrentColors = takeOnly(whereCode('KeyX'), KeyboardEvent.onKeyDown);
export const onDoUndo = takeOnly(withMetaKeyAnd(whereCode('KeyZ')), KeyboardEvent.onKeyDown);
export const onDoSave = takeOnly(withMetaKeyAnd(whereCode('KeyS')), KeyboardEvent.onKeyDown);

//

export const onMeta = takeOnly(x => x.key === 'Meta', KeyboardEvent.onKeyDown);
export const onControl = takeOnly(x => x.key === 'Control', KeyboardEvent.onKeyDown);
export const onOption = takeOnly(x => x.key === 'Alt', KeyboardEvent.onKeyDown);

export const offMeta = takeOnly(x => x.key === 'Meta', KeyboardEvent.onKeyUp);
export const offControl = takeOnly(x => x.key === 'Control', KeyboardEvent.onKeyUp);
export const offOption = takeOnly(x => x.key === 'Alt', KeyboardEvent.onKeyUp);

const onoffFrom = (key, obss) => U.thru(
  U.parallel(obss),
  U.startWith(false),
  U.mapValue(L.get(key)),
);

/**
 * @type {object}
 * @prop {Bool$} isMeta
 * @prop {Bool$} isControl
 * @prop {Bool$} isOption
 */
export const flags = {
  isMeta: onoffFrom('metaKey', [onMeta, offMeta]),
  isControl: onoffFrom('ctrlKey', [onControl, offControl]),
  isOption: onoffFrom('altKey', [onOption, offOption]),
};

/**
 * @typedef {K.Property<KeyboardEvent, any>} KeyboardEvent$
 */

/**
 * @typedef {K.Property<boolean, any>} Bool$
 */
