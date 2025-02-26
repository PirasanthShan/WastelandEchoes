/**
 * Base class for all objects that can be drawn.
 * Contains methods for loading images, drawing on a canvas,
 * and managing an image cache.
 *
 * @class DrawableObject
 */
class DrawableObject {
  /** @type {HTMLImageElement} */
  img;
  /** @type {Object<string, HTMLImageElement>} */
  imageCache = {};
  /** @type {number} */
  currentImage = 0;
  /** Horizontal position of the object. @type {number} */
  x = 80;
  /** Vertical position of the object. @type {number} */
  y = 270;
  /** Height of the object. @type {number} */
  height = 150;
  /** Width of the object. @type {number} */
  width = 150;
  /** Debugging mode, disabled by default. @type {boolean} */
  DEBUG_MODE = false;

  /**
   * Loads an image from the specified path and stores it in the `img` property.
   *
   * @param {string} path - The path to the image to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the currently loaded image onto the provided canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object if DEBUG_MODE is enabled and the object
   * is an instance of Collectible2 or Character.
   *
   * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
   */
  drawFrame(ctx) {
    if (this.DEBUG_MODE && (this instanceof Collectible || this instanceof Character)) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images from an array of image paths and stores them in the imageCache.
   *
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}