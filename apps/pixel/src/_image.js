import * as U from 'karet.util';

export default function createImage (w, h, d) {
  const imageData = new Uint8ClampedArray((w * h) * d);

  const data = U.atom(imageData);

  return data;
}
