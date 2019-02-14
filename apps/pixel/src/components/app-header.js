import * as React from 'karet';
import * as U from 'karet.util';
import Grid from '../layout/grid';
import TogglableInput from './togglable-input';
import logo from '../assets/logo.svg';

const AppHeader = ({ info }) =>
  <Grid
    height={3}
    columns={[10, 'auto', 10]}
    className="c-app-header"
  >
  <div className="c-app-header__brand">
    <img
      className="c-app-header__logo"
      src={logo}
      alt="pixel logo"
    />
    <header className="c-app-header__title">
      pixel
    </header>
  </div>

  <div className="c-app-header__body">
    <TogglableInput data={U.view('name', info)} />
  </div>

  <div className="c-app-header__meta">
    {process.env.REACT_APP_ETM_APP_VERSION}-
    {process.env.REACT_APP_ETM_APP_BRANCH}@<abbr title={process.env.REACT_APP_ETM_APP_CONTEXT}>{(process.env.REACT_APP_ETM_APP_COMMIT || '').slice(0, 8)}</abbr>
  </div>
  </Grid>;

export default AppHeader;
