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

export const Panel = props => {
  const {
    children,
    main,
    size,
    stretch,
    className,
    center,
    textSize,
    // eslint-disable-next-line
    name,
    // eslint-disable-next-line
    component,
    direction = 'vertical',
  } = props;

  const style = {
    flexBasis: U.string`${size}rem`,
  };

  const classNames = [
    'c-panel',
    className,
    U.when(main, 'c-panel--main'),
    U.ifElse(size, 'c-panel--fixed', 'c-panel--auto'),
    U.when(stretch, 'c-panel--stretch'),
    U.when(textSize, U.string`c-panel--text-${textSize}`),
    U.string`c-panel--${direction}`,
    U.when(center, 'c-panel--center'),
    className,
  ];

  return (
    <section
      className={U.cns(classNames)}
      style={style}>
      {children}
    </section>
  );
};

export default Panel;
