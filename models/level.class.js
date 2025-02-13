/**
 * Class representing a level in the game.
 */
class Level {
  /**
   * @property {Object[]} enemies - The list of enemy objects in the level.
   * @property {Object[]} birds - The list of bird objects in the level.
   * @property {Object[]} backgroundObjects - The list of background objects.
   * @property {number} level_end_x - The x-coordinate where the level ends.
   * @property {Object} collectible - The first collectible object.
   * @property {Object} collectible2 - The second collectible object.
   * @property {Object} lastCollectible - The final collectible object.
   */
  enemies;
  birds;
  backgroundObjects;
  level_end_x = 2800;
  collectible;
  collectible2;
  lastCollectible;

  /**
   * Creates an instance of Level.
   * @param {Object[]} enemies - The array of enemies in the level.
   * @param {Object[]} birds - The array of birds in the level.
   * @param {Object[]} backgroundObjects - The array of background objects in the level.
   * @param {Object} collectible - The first collectible item.
   * @param {Object} collectible2 - The second collectible item.
   * @param {Object} lastCollectible - The final collectible item.
   */
  constructor(enemies, birds, backgroundObjects, collectible, collectible2, lastCollectible) {
      this.enemies = enemies;
      this.birds = birds;
      this.backgroundObjects = backgroundObjects;
      this.collectible = collectible;
      this.collectible2 = collectible2;
      this.lastCollectible = lastCollectible;
  }
}
