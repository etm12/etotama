/**
 * @module Commands
 * @namespace App.Pixel
 */
import { taggedSum } from 'daggy';
import * as I from 'infestines';

const Command = taggedSum(
  'Command',
  {
    KeyDown: ['event'],
    KeyUp: ['event'],
    TestCmd: ['foo', 'bar'],
    DrawPixel: ['x', 'y'],
  },
);

export default Command;

//

export const isCommandOf = I.curry(function isCommandOf (type, cmd) {
  return type.is(cmd);
});
