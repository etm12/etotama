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

const scaleOpacity = R.compose(L.modify(L.last, R.multiply(255)), R.values, color);

const domOffsetValueFrom = M.propListFor('left', 'top');
const pageXYFrom = M.propListFor('pageX', 'pageY');

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

  const { onMouseDown, onMouseMove } = getMouseEvents(domRef);

  const scaledSize = {
    width: R.multiply(scale, width),
    height: R.multiply(scale, height),
  };

  const domOffsetValue = domOffsetValueFrom(domOffset);

  const mousePixelPosition = U.thru(
    pageXYFrom(onMouseMove),
    U.view(M.negateWithOffset(domOffsetValue)),
    M.scalePositionWith(scale),
  );

  const selectedAsColor = U.mapValue(scaleOpacity, selectedColor);

  const onPixelClick = U.thru(
    U.sampledBy(onMouseDown, mousePixelPosition),
    U.flatMapLatest(pos => U.combine([pos, selectedAsColor], S.takeAllArgs)),
    U.skipDuplicates((prev, next) => R.equals(prev[0], next[0])),
  );

  const clickedPixelIx = U.thru(
    U.flatMapLatest(([pos]) => U.combine([pos, width], S.takeAllArgs), onPixelClick),
    U.mapValue(([pos, w]) => ((pos[1] * w) + pos[0]) * COLOR_CHANNELS),
  );

  // Side-effects

  const updateMousePosition = U.set(U.view('position', mouse), mousePixelPosition);

  const drawPix = U.thru(
    clickedPixelIx,
    U.mapValue(ix => [ix, ix + COLOR_CHANNELS]),
    U.flatMapLatest(ixs => U.combine([ixs, selectedAsColor], S.takeAllArgs)),
    U.skipDuplicates(([ixs1], [ixs2]) => ixs1 === ixs2),
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
        <Canvas domRef={domRef}
                className="editor__canvas"
                style={scaledSize}
                size={[width, height]}
                scale={scale}
                mousePos={mousePixelPosition} />
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
