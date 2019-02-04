import * as React from 'karet';
import * as U from 'karet.util';
import * as H from 'kefir.partial.lenses.history';

// Initial state

const initialState = {};

const initialImageData = [];

// State

export const state = U.atom(H.init({}, initialState));

export const imageData = U.atom(H.init({}, initialImageData));

// History

export const currentState = U.view(H.present, state);
export const currentImageData = U.view(H.present, imageData);

// Context

export const Core = React.createContext();

// I'm lazy
export const CoreProvider = Core.Provider;
export const CoreConsumer = Core.Consumer;

// Dev-mode stuff

if (process.env.NODE_ENV !== 'production') {

}
