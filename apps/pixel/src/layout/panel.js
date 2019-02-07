import * as React from 'karet';
import * as U from 'karet.util';

//

export const PanelHeader = ({ children }) => (
  <header className="c-panel__header">
    {children}
  </header>
);

//

export const PanelBody = ({ children }) => (
  <div className="c-panel__body">{children}</div>
);

//

export const Panel = ({ children, main, size, className }) => {
  const style = {
    flexBasis: U.string`${size}rem`,
  };

  return (
    <section
      className={U.cns(
        'c-panel',
        U.when(main, 'c-panel--main'),
        U.when(size, 'c-panel--fixed'),
        U.unless(size, 'c-panel--auto'),
        className
      )}
      style={style}>
      {children}
    </section>
  );
};

export default Panel;
