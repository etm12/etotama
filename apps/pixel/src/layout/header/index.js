/**
 * @module Header
 * @namespace Layout
 */
import * as React from 'karet';

export default function Header (props) {
  return (
    <header className="layout layout--header header">
      <figure className="header__brand">
        <div className="header__brand__logo" />
        <figcaption className="header__brand__title">pixel</figcaption>
      </figure>
    </header>
  );
}
