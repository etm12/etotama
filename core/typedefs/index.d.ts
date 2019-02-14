// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: etotama
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>
import { Property } from 'kefir';

export class Atom<T> extends Property<T, any> {
  get(): T;
  set(x: any): void;
  view<U>(l: any): Atom<U>;
  remove(): void;
}
