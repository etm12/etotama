import * as React from 'karet';
import * as L from 'kefir.partial.lenses';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import { color } from 'd3-color';

import Canvas from './canvas';
import Grid from './grid';
import * as M from './meta';
import * as S from '@etotama/shared';

//

const takeEvents = source => type => U.thru(
  source,
  U.flatMapLatest(src => U.fromEvents(src, type, a => a)),
  U.toProperty,
);

//

/**
 * @param {Props} props
 */
export default function Editor ({ canvas, mouse, palette }) {
  const domRef = U.variable();
  const domContext = U.mapValue(S.getContext, domRef);
  const domOffset = U.mapValue(S.getBoundingRect, domRef);
  const { width, height, scale } = U.destructure(canvas);
  const { selected: selectedColor } = U.destructure(palette);

  const takeEventsFrom = takeEvents(domRef);

  const onMouseDown = takeEventsFrom('mousedown');
  const onMouseMove = takeEventsFrom('mousemove');

  const scaledSize = {
    width: R.multiply(scale, width),
    height: R.multiply(scale, height),
  };

  const domOffsetValue = U.thru(
    domOffset,
    M.propListFor('left', 'top'),
  );

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

  const drawPixelOnClick = U.thru(
    clickedMousePixel,
    U.flatMapLatest(pos => U.combine(
      [pos, selectedAsColor, domContext],
      (p, c, ctx) => ({ pos: p, color: c, ctx }),
    )),
    U.skipDuplicates((prev, next) => R.equals(prev.pos, next.pos)),
    U.on({
      value: ({ pos: [x, y], color: c, ctx }) => {
        ctx.putImageData(new ImageData(S.clampedArray(c), 1), x, y);
      }
    })
  );

  // Side-effects

  const updateMousePosition = U.set(U.view('position', mouse), mousePixelPosition);

  //

  return (
    <article className="layout layout--editor">
      <div className="editor"
           style={scaledSize}>
        <React.Fragment>
          {U.sink(U.parallel([
            updateMousePosition,
            drawPixelOnClick,
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
 */
