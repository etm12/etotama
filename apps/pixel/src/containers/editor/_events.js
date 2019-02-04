import * as K from 'kefir';
import * as U from 'karet.util';

const takeEvents = source => type => U.thru(
  source,
  U.flatMapLatest(src => K.fromEvents(src, type, a => a)),
  U.toProperty,
);

export const takeMouseEventsFrom = (source, fn = takeEvents(source)) => ({
  onMouseDown: fn('mousedown'),
  onMouseMove: fn('mousemove'),
  onMouseUp: fn('mouseup'),
  onMouseDrag: U.thru(
    fn('mousedown'),
    U.flatMapLatest(() =>
      U.takeUntilBy(
        U.takeFirst(1, fn('mouseup')),
        fn('mousemove'),
      )),
  ),
});
