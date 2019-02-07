import * as React from 'karet';
import * as U from 'karet.util';

const Button = ({ children, className }) =>
  <button className={U.cns(
    'c-button',
    className,
  )}>
    {children}
  </button>;

export default Button;
