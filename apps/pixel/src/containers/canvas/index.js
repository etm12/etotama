import * as React from 'karet';
import * as H from 'kefir.partial.lenses.history';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as S from '@etotama/core.shared';
import { Canvas, Color } from './meta';
import { mouseEventsFrom } from '../../mouse';

const fstNotNil = R.pipe(R.head, R.complement(R.isNil));
const ratioAsInt = R.pipe(R.apply(R.divide), U.trunc);

const getEventPosition = R.props(['pageX', 'pageY']);

const getPositionDelta = (event, offset) => U.thru(
  R.zip(event, offset),
  U.skipUnless(fstNotNil),
  R.map(R.apply(R.subtract)),
);

const getPixelPosition = (position, scale) => U.thru(
  U.template([position, [scale, scale]]),
  R.transpose,
  R.map(ratioAsInt),
  U.skipDuplicates(R.equals),
);

//

const eventPosition = (offset, scale, event) => U.thru(
  getEventPosition(event),
  U.flatMapLatest(p => getPositionDelta(p, offset)),
  U.flatMapLatest(p => getPixelPosition(p, scale)),
);

const relativePositionFrom = (offset, scale) => event => eventPosition(offset, scale, event);

const indexForPosition = (ev, width) => U.thru(
  ev,
  U.flatMapLatest(e => U.template([e, width])),
  U.mapValue(([[x, y], w]) => S.getIx(x, y, w)),
);

//

const CanvasIndex = ({ dom, width, height, scale, imageData, fgColor }) => {
  const offset = Canvas.elOffset(dom);
  const context = Canvas.elContext(dom);
  const events = mouseEventsFrom(dom);
  const imageDataUint = Canvas.imageDataAsUint(U.view(H.present, imageData));

  const relativeFrom = relativePositionFrom(offset, scale);

  const xs = relativeFrom(events.onMouseMove);
  const posIx = indexForPosition(xs, width);

  const drawOnDrag = U.thru(
    posIx,
    U.sampledBy(events.onMouseDrag),
    U.skipDuplicates(R.equals),
    U.flatMapLatest(ix => U.template([ix, U.takeFirst(1, fgColor)])),
    U.consume(([ix, color]) =>
      imageData.view([H.present, L.slice(ix.start, ix.end)]).set([...L.get(Color.hexI, color), 255]))
  );

  const updateCanvas = U.thru(
    U.template([imageDataUint, context, width, height]),
    U.consume(([data, ctx, w, h]) =>
      ctx.putImageData(new ImageData(data, w, h), 0, 0)),
  )

  return (
    <div className="c-canvas">
      {U.sink(U.parallel([
        drawOnDrag,
        updateCanvas,
      ]))}
      <canvas
        ref={U.refTo(dom)}
        className="c-canvas__body"
        width={width}
        height={height}
        onContextMenu={U.actions(U.preventDefault)}
        style={{
          width: R.multiply(scale, width),
          height: R.multiply(scale, height)
        }}/>
    </div>
  );
};

export default CanvasIndex;

//

/**
 * @typedef {object} CanvasIndexProps
 * @prop {any} dom - mutable to set `canvas` ref into
 * @prop {Number$} width - canvas image width
 * @prop {Number$} height - canvas image height
 * @prop {Number$} scale - canvas image zoom factor
 */
