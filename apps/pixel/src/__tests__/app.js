import * as React from 'karet';
import { shallow } from 'enzyme';

import App from '../app';
import * as globalEvents from '../global-events';

import { state, imageData,  } from '../store';

describe('App', () => {
  test('can mount without crashing', () => {
    shallow(<App {...{ state, imageData, globalEvents }} />);
  });
});
