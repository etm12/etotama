/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as H from 'kefir.partial.lenses.history';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as S from '@etotama/core.shared';

import { pushEvent, events, withBoundContext, onMouseDown } from './mouse';
import { saveImageDataU } from './canvas';
import { Panel, PanelHeader, PanelBody } from './layout/panel';
import Divider from './components/divider';
import { Canvas, Color } from './containers/editor/meta';
import PaletteColorPicker from './components/palette-color-picker';
import PaletteColors from './components/palette-colors';
import { Guide, OffsetGuide } from './components/dev/guide';
import TimeControlButton from './components/time-control-button';

//

const AppContainer = ({ state, imageData, globalEvents }) => {
  const { info, canvas, palette, debug } = U.destructure(state);
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
    ]),
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
      U.view([H.present, L.slice(ix.start, ix.end)], imageData).set([
        ...L.get(Color.hexI, color),
        255,
      ]),
    ),
  );

  const imageDataUint = U.thru(
    imageData,
    U.view(H.present),
    Canvas.imageDataAsUint,
  );

  const drawImageData = U.thru(
    U.template([imageDataUint, context, width, height]),
    U.consume(([data, ctx, w, h]) =>
      ctx.putImageData(new ImageData(data, w, h), 0, 0),
    ),
  );

  //

  const timeIndex = U.view(H.index, imageData);

  const doUndoEffect = U.thru(
    globalEvents.onDoUndo,
    U.consume(e => {
      e.preventDefault();
      e.stopPropagation();
      imageData.modify(L.modify(H.undoIndex, e.shiftKey ? R.inc : R.dec));
    }),
  );

  //

  return (
    <main className={U.cns(
      'root',
      'layout',
      'layout--root',
      U.when(U.view('annotate', debug), 'debug--annotate'),
    )}>
      {U.sink(U.parallel([
        drawImageData,
        drawPixel,
        doUndoEffect,
      ]))}
      <section className="c-app-header">
        <header className="c-app-header__brand">[logo]</header>

        <div className="c-app-header__body">
          {U.view(['info', 'name', 'value'], state)}
        </div>

        <aside />
      </section>

      <Panel direction="horizontal">
        <Panel size={5}>
          <PaletteColorPicker
            palette={palette}
            onSwitchCurrentColors={globalEvents.onSwitchCurrentColors}
          />
          <PaletteColors palette={palette} />
          <Divider />

          <Panel textSize="tiny">
            <PanelHeader>Dev</PanelHeader>
            <PanelBody>
              <label>
                <U.Input
                  id="annotate-toggle"
                  type="checkbox"
                  checked={U.view('annotate', debug)}
                />
                Annotate
              </label>
            </PanelBody>
          </Panel>
        </Panel>

        <Panel>
          <Panel>
            <div className="c-canvas">
              {U.when(U.view('annotate', debug),
              <React.Fragment>
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
              </React.Fragment>)}

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
          <Panel>
            <PanelHeader>Save/load image</PanelHeader>
            <PanelBody>
              <button onClick={U.actions(
                S.persist,
                saveImageDataU({ name: U.view(['name', 'value'], info), imageData: imageDataUint, width, height }),
              )}>
                Save image
              </button>
              <button>
                Load image
              </button>
            </PanelBody>
          </Panel>
          <Panel>
            <PanelHeader>Undo history</PanelHeader>
            <PanelBody>
              <div>
                {U.view(H.index, imageData)}
              </div>

              <div>
                <TimeControlButton count={U.view(H.undoIndex, imageData)}>
                  Undo
                </TimeControlButton>
                <TimeControlButton count={U.view(H.redoIndex, imageData)}>
                  Redo
                </TimeControlButton>
              </div>

              <div>
                <label>
                  <input
                    type="range"
                    min={0}
                    max={H.indexMax(imageData)}
                    value={timeIndex}
                    onChange={U.getProps({ valueAsNumber: timeIndex })}
                  />
                </label>
              </div>
            </PanelBody>
          </Panel>
        </Panel>
      </Panel>
    </main>
  );
};

export default AppContainer;
