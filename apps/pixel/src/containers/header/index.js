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

const HeaderImpl = () =>
  <header className="container--header layout layout--header header">
    <figure className="header__brand">
      <div className="header__brand__logo" />
      <figcaption className="header__brand__title">pixel</figcaption>
    </figure>

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
        <HeaderImpl />}
    </Store.Consumer>
  </React.Fragment>;

export default HeaderContainer;
