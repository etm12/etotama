import * as React from 'karet';

/**
 * @param {Props} props
 */
export default function Sidebar (props) {
  return (
    <aside className="layout layout--sidebar">
      {props.children}
    </aside>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any} children
 */
