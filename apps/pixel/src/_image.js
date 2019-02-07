import * as U from 'karet.util';

export function createImageBlob (imageData, width) {
  const canvas = document.querySelector('canvas');
  const blob = U.bus();

  canvas.toBlob(b => blob.push(b));

  return U.takeFirst(1, blob);
}

export default U.liftRec(createImageBlob);
