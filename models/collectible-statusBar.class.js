/**
 * Represents the bomb count display in the game.
 * This class displays the current bomb status using predefined images.
 *
 * @class CollectibleBar
 * @extends {MovableObject}
 */
class CollectibleBar extends MovableObject {
  width = 220;
  height = 60;
  IMAGES = [
    './img/statusBomb.img/status_bar_taller_bomb_with_count_0.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_1.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_2.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_3.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_4.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_5.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_6.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_7.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_8.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_9.webp',
    './img/statusBomb.img/status_bar_taller_bomb_with_count_10.webp',
  ];

  /**
   * Creates an instance of CollectibleBar.
   * Loads the default image and all images for the bomb display.
   */
  constructor() {
    super().loadImage('./img/statusBomb.img/status_bar_taller_bomb_with_count_5.webp');
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 10;
  }

  /**
   * Sets the display according to the current bomb count.
   * The value is limited to a range of 0 to 10.
   *
   * @param {number} count - The current bomb count.
   */
  setBombs(count) {
    count = Math.max(0, Math.min(count, 10)); // Limit the value between 0 and 10
    const imageIndex = Math.min(count, this.IMAGES.length - 1);
    this.img = this.imageCache[this.IMAGES[imageIndex]]; // Update the displayed image
  }

  /**
   * Updates the bomb display based on the provided bomb count.
   *
   * @param {number} bombCount - The current bomb count.
   */
  update(bombCount) {
    this.setBombs(bombCount);
  }

  /**
   * Handles the collection of a bomb collectible.
   * Increases the bomb count, updates the display, and removes the
   * collected object from the level.
   *
   * @param {number} characterBombs - The character's current bomb count.
   * @param {number} maxBombs - The maximum allowed bomb count.
   * @param {*} collectible - The collected bomb object.
   * @param {object} level - The level object, which contains an array of collectibles.
   * @returns {number} The updated bomb count.
   */
  handleCollectiblePickup(characterBombs, maxBombs, collectible, level) {
    if (characterBombs < maxBombs) {
      characterBombs++;
      this.update(characterBombs);
      level.collectible.splice(level.collectible.indexOf(collectible), 1);
    }
    return characterBombs;
  }

  /**
   * Handles the throwing of a bomb.
   * Decreases the bomb count, if available, and updates the display.
   *
   * @param {number} characterBombs - The character's current bomb count.
   * @returns {number} The updated bomb count.
   */
  handleBombThrow(characterBombs) {
    if (characterBombs > 0) {
      characterBombs--;
      this.update(characterBombs);
    }
    return characterBombs;
  }
}