import * as U from 'karet.util';
import * as R from 'kefir.ramda';
import * as L from 'kefir.partial.lenses';
import * as Store from '../store';
import { initialState } from '../init';

const checkSnapshot = actual => expect(actual).toMatchSnapshot();

const check = (expected, done) => actual => {
  expect(actual).toEqual(expected);
  done();
};

describe('Store', () => {
  describe('State', () => {
    test('is initialised with default state', done => {
      U.thru(
        Store.state,
        U.takeFirst(1),
        U.on({ value: check(initialState, done) }),
      );
    });

    test('default state has not inadvertently changed', () => {
      U.thru(
        Store.state,
        U.takeFirst(1),
        U.on({ value: checkSnapshot }),
      );
    });
  });

  describe('ImageData', () => {
    test('is initialised with history enabled', done => {
      U.thru(
        Store.imageData,
        U.takeFirst(1),
        R.keys,
        U.on({ value: check(['i', 't', 'v', 'c'], done) }),
      )
    });

    test('default value has not inadvertently changed', () => {
      U.thru(
        Store.imageData,
        U.takeFirst(1),
        U.view(L.pick({
          c: 'c',
          i: 'i',
          t: ['t', L.props('l', 'u')],
          v: 'v',
        })),
        U.on({ value: checkSnapshot }),
      )
    })
  });
});
