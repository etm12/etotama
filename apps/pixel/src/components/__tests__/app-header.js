import * as React from 'karet';
import * as U from 'karet.util';
import { mount } from 'enzyme';
import AppHeader from '../app-header';

describe('AppHeader', () => {
  test('mounts without crashing', () => {
    const result = mount(<AppHeader info={U.atom({ editing: false, value: '' })} />);
    expect(result).toMatchSnapshot();
  });
});
