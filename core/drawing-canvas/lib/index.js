import * as React from 'karet';
import * as U from 'karet.util';
import * as P from '@etotama/core.proptypes';

const fstIn = U.view(0);
const sndIn = U.view(1);

const makeStyleFromPair = pair => ({ width: fstIn(pair), height: sndIn(pair) });

const DrawingCanvas = ({ canvasSize, elementSize, event, dom = U.variable() }) => {
  const canvasDim = makeStyleFromPair(canvasSize);
  const elemDim = makeStyleFromPair(elementSize);

  return (
    <div className="c-drawing-canvas">
      <canvas
        className="c-drawing-canvas__body"
        ref={U.refTo(dom)}
        {...canvasDim}
        style={elemDim}
        onContextMenu={U.actions(U.preventDefault)}
        onMouseDown={event.pushEvent}
        onMouseMove={event.pushEvent}
        onMouseUp={event.pushEvent}
      />
    </div>
  );
};

DrawingCanvas.propTypes = {
  canvasSize: P.Property.isRequired,
  elementSize: P.Property.isRequired,
  dom: P.Mutable,
  event: P.shape({
    bus: P.Bus.isRequired,
    pushEvent: P.func.isRequired,
  }).isRequired,
};

export default DrawingCanvas;
