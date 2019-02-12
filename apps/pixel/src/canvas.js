// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as S from '@etotama/core.shared';
import { Canvas } from './containers/editor/meta';
import { saveAs } from 'file-saver';

//

export const saveImageData = ({ name, imageData, width, height }) => e => {
  const canvas = document.createElement('canvas');
  Object.assign(canvas, { width, height });

  const data = new ImageData(imageData, width);

  const ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);

  canvas.toBlob(b => saveAs(b, `${name}.png`));
};

export const saveImageDataU = U.liftRec(saveImageData);

const viewCoordIndex = ({ sampleBy, pixel, width }) => U.thru(
  U.combine(
    [pixel, width],
    ([x, y], w) => S.getIx(x, y, w),
  ),
  U.sampledBy(sampleBy),
);

/**
 * @param {WithBoundCanvasProps} props
 * @return {WithBoundCanvasContext}
 */
export const withBoundCanvas = ({ dom }) => {
  const offset = Canvas.elOffset(dom);
  const context = Canvas.elContext(dom);

  return {
    offset,
    context,
  };
};

export const fromBoundContext = ({ sampleBy, pixel, width, height }) => {
  const coordIx = viewCoordIndex({ sampleBy, pixel, width, height });

  return {
    coordIx,
  };
};

//

/**
 * @typedef {object} WithBoundCanvasProps
 * @prop {K.Property<HTMLCanvasElement, any>} dom
 */

/**
 * @typedef {object} WithBoundCanvasContext
 * @prop {Coord$} offset
 * @prop {CanvasRenderingContext2D$} context
 */

/**
 * @typedef {K.Property<[number, number], any>} Coord$
 */

/**
 * @typedef {K.Property<CanvasRenderingContext2D, any>} CanvasRenderingContext2D$
 */
