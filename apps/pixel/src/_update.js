/* eslint-disable */
/**
 * @module Update
 * @namespace App.Pixel
 */
import * as U from 'karet.util';

import { EffPool } from './_effects';
import Cmd from './_commands';
import store from './store';

const update = new Map([
  [
    Cmd.DrawPixel,
    (cmd, state) => {
      const _state = state.get();

      const { imageData, canvas } = _state;
      const { width, height, scale } = canvas;
      const chans = 4;
      const { x, y } = cmd;

      const clickedIx = ((y * width) + x) * chans;

      U.holding(() => {
        const ix = clickedIx;
        const data = [255, 0, 0, 255];
        const id = state.view('imageData');

        data.forEach((d, i) => id.view(ix + i).set(d));
      });
    },
  ],
]);

//

const updateOnEff = U.thru(
  EffPool,
  U.skipUnless(eff => {
    for (let [k] of update.entries()) {
      const isOf = k.is(eff);

      if (isOf) {
        console.log(
          'k (%s) is an instance of eff (%s); dispatching effect',
          k.toString(),
          eff.toString(),
        );

        return isOf;
      }
    }

    return false;
  }),
  U.mapValue(cmd => [cmd, cmd.constructor[cmd['@@tag']]]),
  U.on({
    value: ([cmd, tag]) => {
      // console.group('Handler %s.%s', tag['@@ret_type'], tag['@@tag']);

      if (process.env.NODE_ENV !== 'production') {
        // console.log('Command =>', tag.toString());
        // console.groupCollapsed('Current state');
        // Object.entries(store.get())
        //       .forEach(([k, v]) => console.table(Object.entries(v)));
        // console.groupEnd();
      }

      update.get(tag)(cmd, store);
      // console.groupEnd();
    }
  }),
);

export default updateOnEff;

//
