import * as React from 'karet';
import * as U from 'karet.util';

const Guide = ({
  className,
  float,
  caption,
  width = '100%',
  height = '100%',
}) =>
  <div {...{
    className: U.cns(
      'svg',
      U.when(float, 'svg--float'),
      className,
      'svg__guide',
    ),
  }}>
    <svg {...{
      width,
      height,
      className: 'svg__body',
    }}>
      <line className="svg__guide__midline" x1="0" y1="50%" x2="100%" y2="50%" />
      <line className="svg__guide__end-left" x1="0" y1="0" x2="0" y2="100%" />
      <line className="svg__guide__end-right" x1="100%" y1="0" x2="100%" y2="100%" />
    </svg>
  </div>;

export default Guide;
