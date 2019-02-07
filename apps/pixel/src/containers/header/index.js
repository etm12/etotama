import * as React from 'karet';
import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import { Store } from '../../context';

const envPrefix = 'REACT_APP_ETM_APP_';

const build = L.get(L.pick({
  name: `${envPrefix}NAME`,
  version: `${envPrefix}VERSION`,
  commit: [`${envPrefix}COMMIT`, L.valueOr('')],
  branch: `${envPrefix}BRANCH`,
  context: `${envPrefix}CONTEXT`,
}), process.env);

const EditFieldShow = ({ field }) =>
  <div onClick={() => U.view('editing', field).set(true)}>{U.view('value', field)}</div>;

const EditFieldEdit = ({ field }) =>
  <U.Input
    type="text"
    value={U.view('value', field)}
    onKeyDown={e => e.keyCode === 13 && U.view('editing', field).set(false)}
  />

const EditField = ({ field }) =>
  <React.Fragment>
    {U.unless(U.view('editing', field), <EditFieldShow field={field} />)}
    {U.when(U.view('editing', field), <EditFieldEdit field={field} />)}
  </React.Fragment>;

const HeaderImpl = ({ info }) =>
  <header className="container--header layout layout--header header">
    <figure className="header__brand">
      <div className="header__brand__logo" />
      <figcaption className="header__brand__title">pixel</figcaption>
    </figure>

    <div className="header__title">
      <EditField field={U.view('name', info)} />
    </div>

    {U.when(
      R.complement(R.isEmpty)(build),
      <aside className="header__version-info">
        <strong>{build.name} {build.version}</strong>
        &nbsp;(<abbr title={build.context}>{build.branch}@{build.commit.slice(0, 8)}</abbr>)
      </aside>
    )}
  </header>;

const HeaderContainer = () =>
  <React.Fragment>
    <Store.Consumer>
      {({ state, imageData }) =>
        <HeaderImpl info={U.view('info', state)} />}
    </Store.Consumer>
  </React.Fragment>;

export default HeaderContainer;
