import * as React from 'karet';

/**
 * @param {Props} props
 */
export default function Menuitem (props) {
  const { title } = props;
  return (
    <li className="ui-component--menuitem menuitem">
      {title}
    </li>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {string} title
 * @prop {any} [children]
 */
