import * as React from 'karet';
import { mount } from 'enzyme';
import Divider from '../divider';

describe('Divider', () => {
  test('mounts without crashing', () => {
    mount(<Divider />);
  });

  test('has not inadvertently changed', () => {
    expect(mount(<Divider />)).toMatchSnapshot();
  });
});
