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

  const uniquePixelContext = U.thru(
    clickedMousePixel,
    U.flatMapLatest(pos => U.combine(
      [pos, selectedAsColor, domContext],
      (p, c, ctx) => ({ pos: p, color: c, ctx }),
    )),
    U.skipDuplicates((prev, next) => R.equals(prev.pos, next.pos)),
  );

  const currentImageData = U.thru(
    U.combine([domContext, width, height], S.takeAllArgs),
    U.sampledBy(uniquePixelContext),
    U.mapValue(([ctx, dx, dy]) => ctx.getImageData(0, 0, dx, dy)),
  );

  // Side-effects

  const updateMousePosition = U.set(
    U.view('position', mouse),
    mousePixelPosition,
  );

  // FIXME: Cleanup required
  const drawPixelOnClick = U.on({
    value: ({ pos: [x, y], color: c, ctx }) => {
      ctx.putImageData(new ImageData(S.clampedArray(c), 1), x, y);
    }
  }, uniquePixelContext);

  const updateCurrentImageData = U.mapValue(
    R.o(Array.from, R.prop('data')),
    currentImageData,
  );

  //

  return (
    <article className="layout layout--editor">
      <div className="editor"
           style={scaledSize}>
        <React.Fragment>
          {U.sink(U.parallel([
            updateMousePosition,
            drawPixelOnClick,
            updateCurrentImageData,
          ]))}
        </React.Fragment>
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
