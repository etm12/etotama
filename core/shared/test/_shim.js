class ImageData {
  constructor(data, dx, dy) {
    if (!(data instanceof Uint8ClampedArray)) {
      throw new Error('Data is not of type `Uint8ClampedArray`');
    }
  }
}

global.ImageData = ImageData;
