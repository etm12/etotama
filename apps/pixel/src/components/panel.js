import * as React from 'karet';
import * as U from 'karet.util';

const cornerClass = d => U.cns('c-panel__corner', U.string`corner-${d}`);

const PanelCorners = () =>
  <React.Fragment>
    <div className={cornerClass('nw')} />
    <div className={cornerClass('ne')} />
    <div className={cornerClass('sw')} />
    <div className={cornerClass('se')} />
  </React.Fragment>;

const Panel = ({ children, title }) =>
  <section className="c-panel">
    <PanelCorners />
    <header className="c-panel__header">
      {title}
    </header>
    <div className="c-panel__body">
      {children}
    </div>
  </section>

export default Panel;
