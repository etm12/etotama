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

import { pushEvent, withBoundContext } from './mouse';
import { saveImageDataU } from './canvas';
import { Panel, PanelHeader, PanelBody } from './layout/panel';
import { StatusIndicator } from './components/status-bar';
import { Canvas, Color } from './containers/editor/meta';
import { Guide, OffsetGuide } from './components/dev/guide';
import PaletteColorPicker from './components/palette-color-picker';
import PaletteColors from './components/palette-colors';
import TimeControlButton from './components/time-control-button';
import AppHeader from './components/app-header';

//

const AppContainer = ({ state, imageData, globalEvents }) => {
  const { info, canvas, palette, debug } = U.destructure(state);
  const { size, scale } = U.destructure(canvas);
  const width = U.view(0, size);
  const height = U.view(1, size);
  const dom = U.variable();
  const offset = Canvas.elOffset(dom);
  const context = Canvas.elContext(dom);

  const { flags } = globalEvents;
  const { events, offsetDelta, pixel } = withBoundContext({ dom, offset, scale });

  const fgColor = Color.fgColorIn(palette);

  const shouldDraw = U.parallel([events.onMouseDown, events.onMouseDrag]);

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
    U.sampledBy(shouldDraw),
    U.mapValue(x => S.getIx(x.pixel[0], x.pixel[1], x.width)),
  );

  const drawPixel = U.thru(
    viewPosition,
    U.flatMapLatest(ix =>
      U.template({
        ixL: L.slice(ix.start, ix.end),
        event: shouldDraw,
        color: fgColor,
      }),
    ),
    // TODO: Fixme
    // U.skipDuplicates((prev, next) => R.equals(prev.event, next.event)),
    U.consume(({ ixL, color }) => {
      U.view([H.present, ixL], imageData)
       .set([...L.get(Color.hexI, color), 255]);
    }),
  );

  const imageDataUint = Canvas.imageDataAsUint(U.view(H.present, imageData));
  const imageDataIndex = U.view(H.index, imageData);


  const drawImageData = U.thru(
    U.template([imageDataUint, context, width, height]),
    U.consume(([data, ctx, w, h]) =>
      ctx.putImageData(new ImageData(data, w, h), 0, 0),
    ),
  );

  //

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
      <Panel className="layout--full-size">
        {/* Application header section */}
        <AppHeader info={info} />

        <Panel direction="horizontal">
          <Panel size={5}>
            <Panel textSize="tiny">
              <PanelHeader>Color</PanelHeader>

              <PanelBody>
                <PaletteColorPicker
                  palette={palette}
                  onSwitchCurrentColors={globalEvents.onSwitchCurrentColors}
                />

                <PaletteColors palette={palette} />
              </PanelBody>
            </Panel>

            <Panel textSize="tiny" size={6}>
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
                  <Guide
                    prefix="pixel"
                    position={pixelPos}
                  />)}

                {/* TODO: Extract canvas-related stuff to its own container */}
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

            <Panel size={6} direction="horizontal" textSize="tiny">
              <Panel>
                <PanelHeader>Save/load image</PanelHeader>
                <PanelBody>
                  <button onClick={U.actions(
                    S.persist,
                    saveImageDataU({
                      name: U.view(['name', 'value'], info),
                      imageData: imageDataUint,
                      width,
                      height,
                    }),
                  )}>
                    Save image
                  </button>
                  <button disabled>
                    Load image
                  </button>
                </PanelBody>
              </Panel>

              <Panel>
                <PanelHeader>Undo history</PanelHeader>
                <PanelBody>
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
                        value={imageDataIndex}
                        onChange={U.getProps({ valueAsNumber: imageDataIndex })}
                      />
                    </label>
                  </div>
                </PanelBody>
              </Panel>
            </Panel>
          </Panel>
        </Panel>

        <Panel
          size={2}
          direction="horizontal"
          textSize="small"
        >
          <Panel
            direction="horizontal"
            className="c-status-bar"
          >
            <StatusIndicator active={flags.isControl} label="Ctrl ⌃" />
            <StatusIndicator active={flags.isOption} label="Alt ⌥" />
            <StatusIndicator active={flags.isMeta} label="Meta ⌘" />
          </Panel>
        </Panel>
      </Panel>
    </main>
  );
};

export default AppContainer;
