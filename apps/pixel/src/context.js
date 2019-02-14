import { createContext } from 'karet';
import { state, imageData } from './store';

export const Store = createContext({ state, imageData });
