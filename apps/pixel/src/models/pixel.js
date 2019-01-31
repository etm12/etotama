/**
 * @module Pixel
 * @namespace Models
 */

function Pixel (x, y, color) {
  if (!(this instanceof Pixel)) {
    return new Pixel()
  }

  this.x = x;
  this.y = y;
  this.color = color;
}

Object.defineProperty(
  Pixel,
  'position',
  {
    get() {
      return [this.x, this.y];
    }
  }
)

export default Pixel;
