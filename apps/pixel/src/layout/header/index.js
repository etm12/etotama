/**
 * @module Header
 * @namespace Layout
 */
import * as React from 'karet';
import { Menubar } from '../../components/ui';

export default function Header (props) {
  const { menuItems } = props;

  return (
    <header className="layout layout--header header">
      <figure className="header__brand">
        <div className="header__brand__logo" />
        <figcaption className="header__brand__title">pixel</figcaption>
      </figure>

      <Menubar menuItems={menuItems} />
    </header>
  );
}

//

/**
 * @typedef {object} Props
 * @prop {any[]} menuItems
 */
