import * as React from 'karet';
import * as U from 'karet.util';

import { Panel } from './panel';
import { Application } from '../constants';

const classPrefix = 'c-app-header';

export const Brand = ({ children }) =>
  <Panel
    className={U.string`${classPrefix}__brand`}
  >
    {children}
  </Panel>;

export const Header = ({ children }) =>
  <Panel
    direction="horizontal"
    className={classPrefix}
    size={Application.HEADER_SIZE}
  >
    {children}
  </Panel>;

//

export default Header;
