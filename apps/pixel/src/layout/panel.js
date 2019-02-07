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

export const PanelFooter = ({ children }) => (
  <footer className={U.cns(
    'c-panel__footer',
  )}>
    {children}
  </footer>
)

//

export const Panel = ({ children, main, size, className, direction = 'vertical' }) => {
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
        U.string`c-panel--${direction}`,
        className
      )}
      style={style}>
      {children}
    </section>
  );
};

export default Panel;
