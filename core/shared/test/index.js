/**
 *
 * Snippets of test helpers taken from [`karet.util`](https://github.com/calmm-js/karet.util/blob/master/test/tests.js)
 * tests.
 */
import * as S from '../lib/index';
import { testEq } from './_helpers';

testEq('Foobar', () => S.capitalize('fooBAR'));
testEq('fooBar', () => S.camelKebab('foo-bar'));
testEq('foo-bar', () => S.kebabCamel('fooBar'));
