/**
 * Creates a new BackgroundObject used as a background in the game.
 *
 * @param {string} imagePath - The path to the image displayed as the background.
 * @param {number} x - The horizontal position of the background object.
 * @param {number} [width=720] - The width of the background object. Default is 720 if no value is provided.
 * @param {number} [height=480] - The height of the background object. Default is 480 if no value is provided.
 */
class BackgroundObject extends MovableObject {
  constructor(imagePath, x, width = 720, height = 480) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.width = width;
    this.height = height;
    this.y = 480 - this.height;
  }
}