import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as M from './meta';
import * as S from '@etotama/core.shared';
import { Store } from '../../context';
import { COLOR_CHANNELS } from '../../constants';
import { takeMouseEventsFrom } from './_events';
import actions from '../../actions';
import readFile from './impl/read-file';

const computeIx = (x, y, w) => ((y * w) + x) * COLOR_CHANNELS;

const getIx = (x, y, w) => ({
  start: computeIx(x, y, w),
  end: computeIx(x, y, w) + COLOR_CHANNELS,
})

const EditorImpl = ({ width, height, scale, imageData, palette, mousePosition }) => {
  const dom = U.variable();
  const domOffset = M.Canvas.elOffset(dom);
  const domContext = M.Canvas.elContext(dom);
  const domSize = M.Canvas.scaledSize(width, height, scale);

  const mouseEv = U.bus();

  const reportMouse = U.through(
    R.props(['pageX', 'pageY']),
    U.doPush(mouseEv),
    S.call0,
  );

  const { selected } = U.destructure(palette);
  const colorValue = U.view(M.Color.hexI, selected);

  const takeXYFor = R.props(['pageX', 'pageY']);
  const fstFor = R.prop(0);
  const sndFor = R.prop(1);

  const {
    onMouseDown,
    onMouseMove,
    onMouseDrag,
  } = takeMouseEventsFrom(dom);

  const offsetPosition = U.combine(
    [domOffset, takeXYFor(onMouseMove)],
    (xs, ys) => [Math.trunc(ys[0] - xs[0]), Math.trunc(ys[1] - xs[1])],
  );

  const pixelPosition = U.thru(
    U.combine(
      [takeXYFor(onMouseMove), domOffset, scale],
      ([x, y], [l, t], c) =>
        [Math.trunc((x - l) / c), Math.trunc((y - t) / c)],
    ),
    U.skipDuplicates(R.equals),
  );

  const drawOnPixelClick = U.thru(
    pixelPosition,
    U.sampledBy(U.parallel([onMouseDown, onMouseDrag])),
    U.flatMapLatest(pos => U.combine(
      [pos, width, height, colorValue],
      R.unapply(R.identity),
    )),
    U.skipDuplicates(([pos1], [pos2]) => R.equals(pos1, pos2)),
    U.consume(([pos, w, h, color]) => {
      // Get the start and end range of a pixel
      const { start, end } = getIx(pos[0], pos[1], w);

      // Set said pixel to the given color
      imageData.view(L.slice(start, end)).set([...color, 255]);
    }),
  );

  const drawImageData = U.thru(
    imageData,
    U.mapValue(R.constructN(1, Uint8ClampedArray)),
    U.flatMapLatest(id => U.combine(
      [id, domContext, width],
      (data, ctx, w) => ({ data, ctx, w }),
    )),
    U.consume(({ data, ctx, w }) => ctx.putImageData(new ImageData(data, w), 0, 0)),
  );

  const canvasSize = U.template({
    width: U.view(0, domSize),
    height: U.view(1, domSize),
  });

  const doAction = fn => U.doPush(actions, fn);

  const loadImage = doAction(U.through(
    U.view(['target', 'files', L.first]),
    U.flatMapLatest(readFile),
    U.consume(file => {
      console.log('consume:', file);
    }),
  ));

  const updatePixelPosition = U.thru(
    pixelPosition,
    U.consume(pos => mousePosition.set(pos)),
  );

  return (
    <section className="container--editor">
      <React.Fragment>
        {U.sink(U.parallel([
          drawImageData,
          drawOnPixelClick,
          loadImage,
          actions,
          updatePixelPosition,
        ]))}
      </React.Fragment>

      <article className="editor__body" style={canvasSize}>
        <React.Fragment>
          <div className="editor__mouse-guide--x"
              style={{ transform: U.string`translateX(${fstFor(offsetPosition)}px)` }} />
          <div className="editor__mouse-guide--y"
              style={{ transform: U.string`translateY(${sndFor(offsetPosition)}px)` }} />
        </React.Fragment>

        <div className="guide guide--x component--info-label">
          {U.string`${width}px`}
        </div>
        <div className="guide guide--y component--info-label">
          {U.string`${height}px`}
        </div>
        <canvas
          className="editor__canvas"
          ref={U.refTo(dom)}
          style={canvasSize}
          width={width}
          height={height}
          onMouseDown={reportMouse}
          onMouseMove={reportMouse}
        />
        <svg className="editor__ruler" style={canvasSize}>
          <defs>
            <line id="ruler-tick" className="ruler-tick" x1="0" x2="0" y1="0" y2="10" />

            <g id="ruler-tickline" className="ruler-tickline">
              <use href="#ruler-tick" className="ruler-tick--g ruler-tick--g--first" />
              <use href="#ruler-tick" className="ruler-tick--g" x="50%" />
              <use href="#ruler-tick" className="ruler-tick--g ruler-tick--g--last" x="100%" />
            </g>
          </defs>

          <use href="#ruler-tickline" className="ruler-tickline--n" />
          <use href="#ruler-tickline" className="ruler-tickline--e" y="0%" x="0%" />
          <use href="#ruler-tickline" className="ruler-tickline--w" y="100%" x="0%" />
          <use href="#ruler-tickline" className="ruler-tickline--s" y="100%" />
        </svg>
      </article>
    </section>
  );
}

const EditorContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) => {
        const { canvas, palette, mouse } = U.destructure(state);
        const { width, height, scale } = U.destructure(canvas);
        const { position } = U.destructure(mouse);

        return (
          <EditorImpl {...{
            width,
            height,
            scale,
            palette,
            imageData,
            mousePosition: position,
          }} />
        );
      }}
    </Store.Consumer>
  </React.Fragment>;

export default EditorContainer;
