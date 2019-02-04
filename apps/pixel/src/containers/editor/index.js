import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as M from './meta';
import { Store } from '../../context';
import { COLOR_CHANNELS } from '../../constants';
import { takeMouseEventsFrom } from './_events';
import Panel from '../../components/panel';

const computeIx = (x, y, w) => ((y * w) + x) * COLOR_CHANNELS;

const getIx = (x, y, w) => ({
  start: computeIx(x, y, w),
  end: computeIx(x, y, w) + COLOR_CHANNELS,
})

const EditorImpl = ({ width, height, scale, imageData, palette }) => {
  const dom = U.variable();
  const domOffset = M.Canvas.elOffset(dom);
  const domContext = M.Canvas.elContext(dom);
  const domSize = M.Canvas.scaledSize(width, height, scale);

  const { selected, colors } = U.destructure(palette);
  const colorValue = U.view(M.Color.hexI, selected);

  const takeXYFor = R.props(['pageX', 'pageY']);

  const {
    onMouseDown,
    onMouseMove,
    onMouseDrag,
  } = takeMouseEventsFrom(dom);

  const actions = U.serializer(null);

  const subscribeActions = U.endWith(undefined, actions);

  const pixelPosition = U.thru(
    U.combine(
      [takeXYFor(onMouseMove), domOffset, scale],
      ([x, y], [l, t], c) => [Math.floor((x - l) / c), Math.floor((y - t) / c)],
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
      const { start, end } = getIx(pos[0], pos[1], w);
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

  // mouseMove.log('mouseMove');

  return (
    <section className="container--editor">
      {U.sink(U.parallel([
        subscribeActions,
        drawImageData,
        drawOnPixelClick,
      ]))}

      <Panel title="Canvas" className="editor__grid--body">
        <article className="editor__body" style={canvasSize}>
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

          <section className="editor__info component--info-label">
            {U.string`${width} × ${height}, scale: ${scale}`}&nbsp;
            {U.string`[ ${U.view(0, pixelPosition)}, ${U.view(1, pixelPosition)} ]`}
          </section>
        </article>
      </Panel>

      {/* Color palette */}
      <Panel title="Color list" className="editor__grid--colors">
        <section className="editor__colors">
          <ul className="colorlist">
            {U.thru(
              colors,
              U.mapElems((it, i) =>
                <li className={U.cns(
                      'colorlist__item',
                      U.when(R.equals(it, selected), 'selected'),
                    )}
                    onClick={() => selected.set(it.get())}
                    style={{ backgroundColor: it }} />),
            )}
          </ul>
        </section>
      </Panel>

      <Panel title="Buttons" className="editor__grid--buttons">
        <button className="c-button c-button--primary">
          Primary
        </button>
        <button className="c-button c-button--secondary">
          Secondary
        </button>
      </Panel>

      <Panel title="Stats" className="editor__grid--aside">
        <aside className="editor__aside">
          Aside
        </aside>
      </Panel>
    </section>
  );
}

const EditorContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) => {
        const { canvas, palette } = U.destructure(state);
        const { width, height, scale } = U.destructure(canvas);

        return (
          <EditorImpl {...{
            width,
            height,
            scale,
            palette,
            imageData,
          }} />
        );
      }}
    </Store.Consumer>
  </React.Fragment>;

export default EditorContainer;
