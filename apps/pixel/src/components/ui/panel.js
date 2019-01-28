import * as React from 'karet';

/**
 * @param {Props} props
 */
export default function Panel (props) {
  return (
    <div className="component component--ui ui--panel">
      {props.children}
    </div>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any} children
 */
