// @ts-check
import * as I from 'infestines';
import * as R from 'kefir.ramda';

/**
 * @param {HTMLCanvasElement} canvas
 * @return {CanvasRenderingContext2D}
 */
export const getCanvasContext = function getCanvasContext (canvas) {
  return canvas.getContext('2d');
};

export const imageDataFrom = function imageDataFrom (sx, sy, data) {
  return new ImageData(data, sx, sy);
}

//

/**
 * @param {Array<any>} data
 * @return {Uint8ClampedArray}
 */
export const makeClampedArrayFrom = function makeClampedArrayFrom (data) {
  return new Uint8ClampedArray(data);
}

/**
 * @param {number} size
 * @return {Uint8ClampedArray}
 */
export const makeClampedArrayOf = function makeClampedArrayOf (size) {
  return new Uint8ClampedArray(size);
}

// Basic arithmetic

export const divideBy = R.flip(R.divide);
