import * as U from 'karet.util';

function readFile (file) {
  const imageData = U.bus();

  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  image.addEventListener('load', e => {
    ctx.drawImage(e.target, 0, 0)
    const data = ctx.getImageData(0, 0, 24, 24);
    console.log({ data });
    imageData.push(data);
    console.log('pushed', imageData);
  });

  reader.addEventListener('load', e => { image.src = e.target.result });

  reader.readAsDataURL(file);

  return imageData.take(1).log();
}

export default readFile;
