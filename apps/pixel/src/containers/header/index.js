import * as React from 'karet';
import { Store } from '../../context';

const HeaderImpl = () =>
  <header className="container--header layout layout--header header">
    <figure className="header__brand">
      <div className="header__brand__logo" />
      <figcaption className="header__brand__title">pixel</figcaption>
    </figure>

    <nav className="header__menu-bar">
      <ul className="header__menuitems">
        <li className="header__menuitem">
          <button disabled>
            Save image
          </button>
        </li>
        <li className="header__menuitem">
          <button disabled>
            Load image
          </button>
        </li>
      </ul>
    </nav>
  </header>;

const HeaderContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) =>
        <HeaderImpl />}
    </Store.Consumer>
  </React.Fragment>;

export default HeaderContainer;
