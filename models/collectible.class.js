/**
 * Represents a collectible object in the game (e.g., bombs or crystals).
 * These objects inherit from MovableObject and have defined positions and sizes.
 *
 * @class Collectible
 * @extends {MovableObject}
 */
class Collectible extends MovableObject {
  width = 30;
  height = 30;

  /**
   * Creates a new instance of Collectible.
   *
   * @param {string} imagePath - The path to the image of the collectible object.
   * @param {number} y - The vertical position of the object.
   * @param {number} x - The horizontal position of the object.
   * @param {number} width - The width of the object.
   * @param {number} height - The height of the object.
   */
  constructor(imagePath, y, x, width, height) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}