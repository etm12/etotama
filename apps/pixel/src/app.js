/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as S from '@etotama/core.shared';

import { Panel } from './layout/panel';
import { Canvas, Color } from './containers/editor/meta';
import { pushEvent, events, withBoundContext, onMouseDown } from './mouse';
import PaletteCurrent from './components/palette-current';
import PaletteColorPicker from './components/palette-color-picker';
import { Guide, OffsetGuide } from './components/dev/guide';

//

const AppContainer = ({ state, imageData, globalEvents }) => {
  const { canvas, palette } = U.destructure(state);
  const { size, scale } = U.destructure(canvas);
  const width = U.view(0, size);
  const height = U.view(1, size);
  const dom = U.variable();
  const offset = Canvas.elOffset(dom);
  const context = Canvas.elContext(dom);

  const { offsetDelta, pixel } = withBoundContext({ offset, scale });

  const pixelPos = U.thru(
    U.template({ pixel, offset, scale }),
    U.mapValue(x => [
        ((x.pixel[0] * x.scale) + (x.scale / 2) + x.offset[0]),
        ((x.pixel[1] * x.scale) + (x.scale / 2) + x.offset[1]),
      ]
    ),
  );

  /**
   * Get the start and end index for the given position
   */
  const viewPosition = U.thru(
    U.template({ pixel, width, height }),
    U.sampledBy(onMouseDown),
    U.mapValue(x => S.getIx(x.pixel[0], x.pixel[1], x.width)),
  );

  const drawPixel = U.thru(
    viewPosition,
    U.flatMapLatest(ix =>
      U.template({
        ix,
        event: onMouseDown,
        color: U.view(
          [
            'palette',
            L.pick({
              ix: ['active', 0],
              colors: 'colors',
            }),
            L.reread(({ ix, colors }) => colors[ix]),
          ],
          state,
        ),
      }),
    ),
    U.skipDuplicates((prev, next) => R.equals(prev.event, next.event)),
    U.consume(({ ix, color }) =>
      U.view(L.slice(ix.start, ix.end), imageData).set([
        ...L.get(Color.hexI, color),
        255,
      ]),
    ),
  );

  const drawImageData = U.thru(
    U.template([Canvas.imageDataAsUint(imageData), context, width, height]),
    U.consume(([data, ctx, w, h]) =>
      ctx.putImageData(new ImageData(data, w, h), 0, 0),
    ),
  );

  return (
    <main className="root layout layout--root">
      {U.sink(U.parallel([drawImageData, drawPixel]))}
      <section className="c-app-header">
        <header className="c-app-header__brand">[logo]</header>

        <div className="c-app-header__body">
          {U.view(['info', 'name', 'value'], state)}
        </div>

        <aside />
      </section>

      <Panel direction="horizontal">
        <Panel size={5}>
          [sidebar]
          <PaletteCurrent
            palette={palette}
            onSwitchCurrentColors={globalEvents.onSwitchCurrentColors}
          />
          <PaletteColorPicker palette={palette} />
        </Panel>
        <Panel>
          <div className="c-canvas">
            <OffsetGuide offset={offset} />
            <Guide
              prefix="page"
              position={R.props(['pageX', 'pageY'], events)}
            />
            <Guide
              prefix="screen"
              position={R.props(['screenX', 'screenY'], events)}
            />
            <Guide
              prefix="client"
              position={R.props(['clientX', 'clientY'], events)}
            />
            <Guide
              prefix="pixel"
              position={pixelPos}
            />
            <Guide prefix="offset" position={offsetDelta} />

            <canvas
              ref={U.refTo(dom)}
              className="c-canvas__body"
              width={width}
              height={height}
              onContextMenu={U.actions(U.preventDefault)}
              onMouseDown={pushEvent}
              onMouseMove={pushEvent}
              onMouseUp={pushEvent}
              style={{
                width: R.multiply(scale, width),
                height: R.multiply(scale, height),
              }}
            />
          </div>
        </Panel>
      </Panel>
    </main>
  );
};

export default AppContainer;
