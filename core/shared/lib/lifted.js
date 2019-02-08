import * as F from 'karet.lift';
import * as S from './index';

export const hexToColor = F.liftRec(S.hexToColor);
export const darken = F.liftRec(S.darken);
