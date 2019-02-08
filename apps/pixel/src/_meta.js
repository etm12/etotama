/**
 * @module _Meta
 * @namespace Pixel
 */
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import { showAsPair } from '@etotama/core.shared/lib/lenses';

export const hexStringL = [L.split('\n'), L.array(L.inverse(L.dropPrefix('#')))];

export const colorPaletteIn = U.view('palette');

export const mousePositionL = ['mouse', 'position'];
export const showMousePositionIn = U.view([mousePositionL, showAsPair]);
export const showCanvasSizeIn = U.view(['canvas', L.props('width', 'height'), L.reread(({ width, height }) => `${width} × ${height}`)]);
