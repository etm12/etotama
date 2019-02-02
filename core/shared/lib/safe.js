import * as $ from 'sanctuary-def';
import * as Z from 'sanctuary-type-classes';
import { defN } from './env';
import { Type, TypeVar } from './_types';
import * as I from './index';

const { f, a } = TypeVar;

//

export const camelTokens = defN('camelTokens', { f: [Z.Functor] }, [$.String, f($.String)], I.camelTokens);
export const kebabTokens = defN('kebabTokens', { f: [Z.Functor] }, [$.String, f($.String)], I.kebabTokens);
export const camelKebab = defN('camelKebab', {}, [$.String, $.String], I.camelKebab);
export const kebabCamel = defN('kebabCamel', {}, [$.String, $.String], I.kebabCamel);
export const capitalize = defN('capitalize', {}, [$.String, $.String], I.capitalize);
