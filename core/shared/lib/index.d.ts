import { Stream, Property } from 'kefir';
import * as lenses from './lenses';

declare let S: S.Static;

declare namespace S {
  type Pair<T0, T1> = [T0, T1];
  type Position = Pair<number, number>;

  type Ary0Fn<R> = () => R;
  type Ary1Fn<T1, R> = (t1: T1) => R;
  type Ary2Fn<T1, T2, R> = (t1: T1, t2: T2) => R;
  type Ary3Fn<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
  type Ary4Fn<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

  interface CurriedGuardAry2<T1, T2, R extends T2> {
    (t1: T1): (t2: T2) => t2 is R;
    (t1: T1, t2: T2): t2 is R;
  }

  interface CurriedGuardAry3<T1, T2, T3, R extends T3> {
    (t1: T1): CurriedGuardAry2<T2, T3, R>;
    (t1: T1, t2: T2): (t3: T3) => t3 is R;
    (t1: T1, t2: T2, t3: T3): t3 is R;
  }

  interface CurriedAry2<T1, T2, R> {
    (t1: T1): (t2: T2) => R;
    (t1: T1, t2: T2): R;
  }

  interface CurriedAry3<T1, T2, T3, R> {
    (t1: T1): CurriedAry2<T2, R>;
    (t1: T1, t2: T2): (t3: T3) => R;
    (t1: T1, t2: T2, t3: T3): R;
  }

  interface Static {
    // Functions

    takeAllArgs(...xs: any[]): any[];

    flip<T1, T2, R>(fn: Ary2Fn<T1, T2, R>, t2: T2, t1: T1): R;
    flip<T1, T2, R>(fn: Ary2Fn<T1, T2, R>, t2: T2): (t1: T1) => R;
    flip<T1, T2, R>(fn: Ary2Fn<T1, T2, R>): (t2: T2) => (t1: T1) => R;

    // Observables

    isObservable(maybeObs: any): boolean;
    toObservable<T>(maybeObs: T): Property<T>;

    // Event

    persist(e: Event): void;
    eventBus(): { events: Stream<Event>, pushEvent: (e: Event) => void };

    // Positions

    offsetPositionBy_(offset: Position, pos: Position): Position;
    offsetPositionBy(offset: Position): (pos: Position) => Position;
    offsetPositionBy(offset: Position, pos: Position): Position;

    scalePositionBy_(scale: number, pos: Position): Position;
    scalePositionBy(scale: number): (pos: Position) => Position;
    scalePositionBy(scale: number, pos: Position): Position;

    invoke0<R>(m: string, f: Function): R;

    invoke1<T1, R>(m: string, x: T1, f: Ary1Fn<T1, R>): R;
    invoke1<T1, R>(m: string, x: T1): (f: Ary1Fn<T1, R>) => R;
    invoke1<T1, R>(m: string): CurriedAry2<T2, R>;

    invoke2<T1, T2, R>(m: string, t1: T1, t2: T2, f: Ary2Fn<T1, T2, R>): R;
    invoke2<T1, T2, R>(m: string, t1: T1, t2: T2): (f: Ary2Fn<T1, T2, R>) => R;
    invoke2<T1, T2, R>(m: string, t1: T1): CurriedAry2<T2, R>;
    invoke2<T1, T2, R>(m: string): CurriedAry3<T1, T2, R>;

    computeIx(x: number, y: number, w: number): number;
    getIx(x: number, y: number, w: number): { start: number, end: number };

    lenses: typeof lenses;
  }
}

export = S;
export as namespace S;
