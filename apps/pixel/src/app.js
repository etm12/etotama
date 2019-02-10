/**
 * @module Pixel
 * @namespace App
 */
import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as S from '@etotama/core.shared';

import { Panel } from './layout/panel';
import { Canvas } from './containers/editor/meta';

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

const AppContainer = ({ state, imageData }) => {
  const { size, scale } = U.destructure(U.view('canvas', state));
  const width = U.view(0, size);
  const height = U.view(1, size);
  const dom = U.variable();
  const offset = Canvas.elOffset(dom);

  const mouseEvBus = U.bus();
  const pushEvent = U.actions(S.persist, U.through(U.doPush(mouseEvBus), S.call0));

  const events = U.toProperty(mouseEvBus);
  const mousePos = R.props(['pageX', 'pageY'], events);
  const offsetPos = U.thru(
    R.zip(mousePos, offset),
    U.mapValue(([[x1, x2], [y1, y2]]) => [x1 - x2, y1 - y2]),
  );

  return (
    <main className="root layout layout--root">
      <section className="c-app-header">
        <header className="c-app-header__brand">asd</header>

        <div className="c-app-header__body">
          {U.view(['info', 'name', 'value'], state)}
        </div>

        <aside></aside>
      </section>

      <Panel direction="horizontal">
        <Panel size={15}>
          <h2>g</h2>
        </Panel>
        <Panel>
          <div className="c-canvas">
            <div
              className="c-canvas__offset-guide"
              style={{
                width: U.view(0, offset),
                height: U.view(1, offset),
              }}
            >
              Canvas offset: {U.stringify(offset)}
            </div>
            <Guide prefix="page" position={R.props(['pageX', 'pageY'], events)} />
            <Guide prefix="screen" position={R.props(['screenX', 'screenY'], events)} />
            <Guide prefix="client" position={R.props(['clientX', 'clientY'], events)} />
            <Guide prefix="offset" position={offsetPos}/>

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
