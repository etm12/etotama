import * as React from 'karet';
import * as U from 'karet.util';

export default function Measure ({ value, className, width }) {
  return (
    <div className={U.cns(
                     'ui-component--measure',
                     className,
                   )}>
      <div className="measure__wrapper">
        <div className="measure__value">
          {value}
        </div>
        <svg height="100%"
             width={width}
             className="measure__guide">
          <defs>
            <g id="guide-line"
              className="measure__guide-line"
              x="0" y="0"
              width="100%" height="100%">
              <line x1="0" y1="0" x2="0" y2="100%" />
              <line x1="0" y1="50%" x2="50%" y2="50%" />
            </g>
          </defs>
          <use href="#guide-line" x="0" y="0" alignmentBaseline="middle" />
          <use href="#guide-line" x="0" y="0" alignmentBaseline="middle" className="measure__guide-line--mirror" />
        </svg>
      </div>
    </div>
  );
}

//
