import * as React from 'karet';
import * as U from 'karet.util';

import Canvas from './canvas';
import Grid from './grid';
import * as M from './meta';

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
export default function Editor ({ canvas, mouse }) {
  const domRef = U.variable();
  const { width, height, scale } = U.destructure(canvas);

  const takeEventsFrom = takeEvents(domRef);

  const onMouseMove = takeEventsFrom('mousemove');

  //

  const updateMousePosition = U.thru(
    onMouseMove,
    M.propListFor('pageX', 'pageY'),
    M.scalePositionWith(scale),
    U.set(U.view('position', mouse)),
  )

  //

  return (
    <article className="layout layout--editor">
      <div className="editor">
        <React.Fragment>
          {U.sink(U.parallel([
            updateMousePosition,
          ]))}
        </React.Fragment>
        <Canvas domRef={domRef}
                className="editor__canvas"
                size={[width, height]}
                scale={scale} />
        <Grid size={[width, height]}
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
 */
