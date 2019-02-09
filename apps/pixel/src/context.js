import { createContext } from 'karet';
import { state, imageData, canvas } from './store';

export const Store = createContext({ state, imageData, canvas });
