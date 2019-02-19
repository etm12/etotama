import * as React from 'karet';
import { mount } from 'enzyme';
import * as SB from '../status-bar';

describe('StatusBar', () => {;
  describe.each(Object.entries(SB).filter(([k]) => k !== 'default'))('StatusBar.%s', (k, Component) => {
    test('mounts without crashing', () => {
      mount(<Component />);
    });

    test('has not inadvertently changed', () => {
      Component.displayName = k;

      expect(mount(<Component />).children().first()).toMatchSnapshot();
    });
  });
});
