import * as K from 'kefir';

export function isObservable(x: any): boolean;
export function toObservable<T>(x: T): K.Property<T, never>;

export function takeAllArgs(...xs: any[]): any[];

type Ary2Fn<T0, T1, R> = (a: T0, b: T1) => R;
type Ary3Fn<T0, T1, T2, R> = (a: T0, b: T1, c: T2) => R;

export function flip<T, U, R>(f: (x: T, y: U) => R, y: U, x: T): R;
export function flip<T, U, R>(f: (x: T, y: U) => R): (y: U, x: T) => R;
export function flip<T, U, R>(f: (x: T, y: U) => R): (y: U) => (x: T) => R;

export function apply<T, R>(f: Function, xs: [T]): R;
export function apply<T, U, R>(f: Function, xs: [T, U]): R;
export function apply<T, U, V, R>(f: Function, xs: [T, U, V]): R;

export function invoke0<T, R>(m: string, f: Function): R;
export function invoke1<T, R>(m: string, x: T, f: Function): R;
export function invoke2<T, U, R>(m: string, x: T, y: U, f: Function): R;
export function invoke3<T, U, V, R>(m: string, x: T, y: U, z: V, f: Function): R;

export function camelTokens(camelString: string): string[];
export function kebabTokens(kebabString: string): string[];

export function capitalize(word: string): string;
export function camelKebab(kebabString: string): string;
export function kebabCamel(camelString: string): string;
