// eslint-disable-next-line
import * as K from 'kefir';
import * as U from 'karet.util';
import * as S from '@etotama/core.shared';
import { Canvas } from './containers/editor/meta';

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
