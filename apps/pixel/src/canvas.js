// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as L from 'kefir.partial.lenses';
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

//

export const getSelectedFile = L.get(['target', 'files', L.first]);

export const loadImageData = ({ file }) => {
  const input = document.createElement('input');
  input.type = 'file';

  input.addEventListener('change', e => {
    console.log('input', e, e.target.files);
    reader.readAsDataURL(e.target.files[0]);
  });

  input.click();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const image = new Image();
  const reader = new FileReader();

  const result = U.variable();

  reader.addEventListener('load', e => {
    console.log('reader:load', { e });
    image.src = e.target.result;
  });

  image.addEventListener('load', e => {
    console.log('image:load', { e });
    const { width, height } = e.target;
    ctx.drawImage(e.target, 0, 0);

    const imageData = ctx.getImageData(0, 0, width, height);

    result.set(imageData);
  })

  return result.take(1).log();
}

export const loadImageDataU = U.liftRec(loadImageData);

//

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
