/**
 * @module Editor
 * @namespace Layout
 */
import * as React from 'karet';
import * as L from 'kefir.partial.lenses';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { color } from 'd3-color';
import * as S from '@etotama/shared';

import { getMouseEvents, initDomObservables } from './_reactive';
import Canvas from './canvas';
import Grid from './grid';
import * as M from './_meta';
import { COLOR_CHANNELS } from '../../constants';

//

//

/**
 * @param {Props} props
 */
export default function Editor ({ canvas, mouse, palette, imageData }) {
  const {
    ref: domRef,
    context: domContext,
    offset: domOffset,
  } = initDomObservables();

  const { width, height, scale } = U.destructure(canvas);
  const { selected: selectedColor } = U.destructure(palette);

  // imageData.log('imageData');

  const { onMouseDown, onMouseMove } = getMouseEvents(domRef);

  const scaledSize = {
    width: R.multiply(scale, width),
    height: R.multiply(scale, height),
  };

  const domOffsetValue = M.propListFor('left', 'top')(domOffset);

  const mousePixelPosition = U.thru(
    onMouseMove,
    M.propListFor('pageX', 'pageY'),
    U.view(M.negateWithOffset(domOffsetValue)),
    M.scalePositionWith(scale),
  )

  const clickedMousePixel = U.sampledBy(onMouseDown, mousePixelPosition);

  const selectedAsColor = U.mapValue(R.compose(
    L.modify(L.last, R.multiply(255)),
    R.values,
    color,
  ), selectedColor);

  const onPixelClick = U.thru(
    clickedMousePixel,
    U.flatMapLatest(pos => U.combine([pos, selectedAsColor], (a, b) => [a, b])),
    U.skipDuplicates((prev, next) => R.equals(prev[0], next[0])),
  );

  const clickedPixelIx = U.thru(
    onPixelClick,
    U.flatMapLatest(([pos]) => U.combine([pos, width], S.takeAllArgs)),
    U.mapValue(([pos, w]) => ((pos[1] * w) + pos[0]) * COLOR_CHANNELS),
  );

  // Side-effects

  const updateMousePosition = U.set(U.view('position', mouse), mousePixelPosition);

  const drawPix = U.thru(
    clickedPixelIx,
    U.mapValue(ix => [ix, ix + COLOR_CHANNELS]),
    U.flatMapLatest(ixs => U.combine([ixs, selectedAsColor], S.takeAllArgs)),
    U.on({ value: ([ixs, rgba]) => {
      U.view(L.slice(ixs[0], ixs[1]), imageData).set(rgba);
    } }),
  );

  const updateCanvasContext = U.thru(
    U.template({ imageData, domContext, width, height }),
    U.on({ value: o => {
      o.domContext.putImageData(
        new ImageData(new Uint8ClampedArray(o.imageData), o.width, o.height),
        0,
        0,
      );
    } }),
  );

  //

  return (
    <article className="layout layout--editor">
      <div className="editor"
           style={scaledSize}>
        <React.Fragment>
          {U.sink(U.parallel([
            updateMousePosition,
            updateCanvasContext,
            drawPix,
          ]))}
        </React.Fragment>
        <svg className="editor__guide"
             width={scaledSize.width}
             height="20">
          <line x1="0" y1="50%"
                x2="100%" y2="50%"
                className="editor__guide--line" />
          <g>
            <rect x="43.75%" y="0" />
            <text x="50%" y="50%"
                  alignmentBaseline="middle"
                  textAnchor="middle">
              {U.string`${width} px`}
            </text>
          </g>
        </svg>
        <Canvas domRef={domRef}
                className="editor__canvas"
                style={scaledSize}
                size={[width, height]}
                scale={scale} />
        <Grid size={[width, height]}
              style={scaledSize}
              scale={scale} />
      </div>
    </article>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any} canvas The current editor state slice
 * @prop {any} mouse
 * @prop {any} palette
 * @prop {any} imageData
 */
