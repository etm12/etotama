import * as React from 'karet';
import { mount } from 'enzyme';
import Button from '../button';

describe('Button', () => {
  test('mounts without crashing', () => {
    const result = mount(<Button />);
    expect(result).toMatchSnapshot();
  })

  test('supports custom action', () => {
    const fn = jest.fn();
    const result = mount(<Button action={fn} />);
    result.find('button').simulate('click');

    expect(fn).toBeCalled();
  });

  test('set height properly as rems', () => {
    const result = mount(<Button height={6} />);

    expect(result).toMatchSnapshot();
    expect(result.find('button').prop('style')).toEqual({
      height: '6rem',
    });
  });
});
