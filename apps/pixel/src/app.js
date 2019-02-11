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

//

const Guide = ({ prefix, position }) => {
  const translateX = U.view([0, S.lenses.translateX], position);
  const translateY = U.view([1, S.lenses.translateY], position);

  return (
    <React.Fragment>
      <div
        className={U.cns(
          'c-canvas__guides',
          'horizontal',
          U.string`prefix-${prefix}`,
        )}
        style={{ transform: translateY }}
      />
      <div
        className={U.cns(
          'c-canvas__guides',
          'vertical',
          U.string`prefix-${prefix}`,
        )}
        style={{ transform: translateX }}
      />
    </React.Fragment>
  );
}

//

const AppContainer = ({ state, imageData, globalEvents }) => {
  const { size, scale } = U.destructure(U.view('canvas', state));
  const width = U.view(0, size);
  const height = U.view(1, size);
  const dom = U.variable();
  const offset = Canvas.elOffset(dom);
  const context = Canvas.elContext(dom);

  const { offsetDelta, pixel } = withBoundContext({ offset, scale });

  const viewPosition = U.thru(
    U.template({ pixel, width, height }),
    U.sampledBy(onMouseDown),
    U.mapValue(x => S.getIx(x.pixel[0], x.pixel[1], x.width)),
  );

  const drawPixel = U.thru(
    viewPosition,
    U.flatMapLatest(ix => U.template({
      ix,
      event: onMouseDown,
      color: U.view(['palette', L.pick({
        ix: ['active', 0],
        colors: 'colors',
      }), L.reread(({ ix, colors }) => colors[ix])], state),
    })),
    U.skipDuplicates((prev, next) => R.equals(prev.event, next.event)),
    U.consume(({ ix, color }) =>
      U.view(L.slice(ix.start, ix.end), imageData)
       .set([...L.get(Color.hexI, color), 255])),
  );

  const drawImageData = U.thru(
    U.template([Canvas.imageDataAsUint(imageData), context, width, height]),
    U.consume(([data, ctx, w, h]) =>
      ctx.putImageData(new ImageData(data, w, h), 0, 0)),
  );

  return (
    <main className="root layout layout--root">
      {U.sink(U.parallel([
        drawImageData,
        drawPixel,
      ]))}
      <section className="c-app-header">
        <header className="c-app-header__brand">[logo]</header>

        <div className="c-app-header__body">
          {U.view(['info', 'name', 'value'], state)}
        </div>

        <aside></aside>
      </section>

      <Panel direction="horizontal">
        <Panel size={5}>
          [sidebar]
          <PaletteCurrent palette={U.view('palette', state)} onSwitchCurrentColors={globalEvents.onSwitchCurrentColors} />
        </Panel>
        <Panel>
          <div className="c-canvas">
            <div
              className="c-canvas__offset-guide"
              style={{
                width: U.view(0, offset),
                height: U.view(1, offset),
              }}>
              Canvas offset: {U.stringify(offset)}
            </div>
            <Guide prefix="page" position={R.props(['pageX', 'pageY'], events)} />
            <Guide prefix="screen" position={R.props(['screenX', 'screenY'], events)} />
            <Guide prefix="client" position={R.props(['clientX', 'clientY'], events)} />
            <Guide prefix="offset" position={offsetDelta}/>

            <canvas
              ref={U.refTo(dom)}
              className="c-canvas__body"
              width={width}
              height={height}
              onMouseDown={pushEvent}
              onMouseMove={pushEvent}
              onMouseUp={pushEvent}
              style={{
                width: R.multiply(scale, width),
                height: R.multiply(scale, height)
,              }}
            />
          </div>
        </Panel>
      </Panel>
    </main>
  );
};

export default AppContainer;
