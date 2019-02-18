import * as K from 'kefir';

type Event$ = K.Property<Event, any>;

export declare interface Browser {
  focus: Event$;
}

//

export declare interface Keyboard {
  keydown: Event$;
  keyup: Event$;
}
