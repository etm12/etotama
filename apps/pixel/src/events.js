// @ts-check
import * as K from 'kefir';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';

/**
 * @param {string} type
 * @param {EventSource} source
 * @returns {K.Property<Event, never>}
 */
export function _takeEvents (type, source) {
  console.log({ type, source });
  debugger;
  return U.fromEvents(source, type, x => x);
}

export const takeEvents = U.liftRec(R.curry(_takeEvents));
