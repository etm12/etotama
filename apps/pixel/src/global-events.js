import * as U from 'karet.util';
import * as R from 'kefir.ramda';

import * as KeyboardEvent from './keyboard';

const whereCode = code => R.whereEq({ code });
const takeOnly = U.skipUnless;

export const onSwitchCurrentColors = takeOnly(whereCode('KeyX'), KeyboardEvent.onKeyDown);
