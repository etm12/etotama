/**
 * @module _Meta
 * @namespace Pixel
 */
import * as L from 'partial.lenses';

export const hexStringL = [L.split('\n'), L.array(L.inverse(L.dropPrefix('#')))];
