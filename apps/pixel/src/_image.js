import * as U from 'karet.util';
import * as K from 'kefir';

export function createImageBlob (imageData, width) {
  const canvas = document.querySelector('canvas');

  console.log('imageData', imageData, imageData.length);
  console.log('width', width);
  const blob = U.bus();

  const blobP = blob.toProperty().take(1);

  canvas.toBlob(d => {
    blob.push(d);
    blob.end();
  });

  return blobP;
}

export default U.liftRec(createImageBlob);
