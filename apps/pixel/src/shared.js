// @ts-check
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

// Basic arithmetic

export const divideBy = R.flip(R.divide);
