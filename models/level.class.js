/**
 * Class representing a level in the game.
 */
class Level {
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
   * @param {Object} collectible - The first collectible object.
   * @param {Object} collectible2 - The second collectible object.
   * @param {Object} lastCollectible - The final collectible object.
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