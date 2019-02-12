// @ts-check
import * as P from 'prop-types';
import * as K from 'kefir';
import * as A from 'kefir.atom';
import * as U from 'karet.util';

// #region Kefir
export const Observable = P.instanceOf(K.Observable);
export const Stream = P.instanceOf(K.Stream);
export const Property = P.instanceOf(K.Property);
// #endregion

// #region Atom
export const Mutable = P.instanceOf(A.AbstractMutable);
export const Bus = P.instanceOf(U.Bus);
// #endregion

export * from 'prop-types';
