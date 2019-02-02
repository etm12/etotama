import { createContext } from 'karet';
import store, { imageData } from './store';

export const Store = createContext({ store, imageData });
