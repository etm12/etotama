import * as React from 'karet';
import { Store } from '../../context';

const HeaderImpl = () =>
  <header className="container--header layout layout--header header">
    <figure className="header__brand">
      <div className="header__brand__logo" />
      <figcaption className="header__brand__title">pixel</figcaption>
    </figure>
  </header>;

const HeaderContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) =>
        <HeaderImpl />}
    </Store.Consumer>
  </React.Fragment>;

export default HeaderContainer;
