import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as S from '@etotama/core.shared';

const mouseEvBus = U.bus();

export const pushEvent = U.actions(S.persist, U.through(U.doPush(mouseEvBus), S.call0));

export const events = U.toProperty(mouseEvBus);

const takeEvent = type => U.skipUnless(R.whereEq({ type }), events);

export const onMouseDown = takeEvent('mousedown');
export const onMouseMove = takeEvent('mousemove');

//

const getPositionDelta = (event, offset) => U.thru(
  R.zip(event, offset),
  U.skipUnless(R.pipe(R.head, R.complement(R.isNil))),
  R.map(R.apply(R.subtract)),
);

const getPixelPosition = (position, scale) => U.thru(
  U.template([position, [scale, scale]]),
  R.transpose,
  R.map(R.pipe(R.apply(R.divide), U.trunc)),
  U.skipDuplicates(R.equals),
)

export const withBoundContext = ({ offset, scale }) => {
  const event = R.props(['pageX', 'pageY'], events)

  const offsetDelta = getPositionDelta(event, offset);
  const pixel = getPixelPosition(offsetDelta, scale);

  return {
    offsetDelta,
    pixel,
  };
}
