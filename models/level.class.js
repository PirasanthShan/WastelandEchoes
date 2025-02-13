/**
 * Klasse, die ein Level im Spiel repräsentiert.
 */
class Level {
  /**
   * @property {Object[]} enemies - Die Liste der Gegnerobjekte im Level.
   * @property {Object[]} birds - Die Liste der Vogelobjekte im Level.
   * @property {Object[]} backgroundObjects - Die Liste der Hintergrundobjekte.
   * @property {number} level_end_x - Die x-Koordinate, an der das Level endet.
   * @property {Object} collectible - Das erste sammelbare Objekt.
   * @property {Object} collectible2 - Das zweite sammelbare Objekt.
   * @property {Object} lastCollectible - Das letzte sammelbare Objekt.
   */
  enemies;
  birds;
  backgroundObjects;
  level_end_x = 2800;
  collectible;
  collectible2;
  lastCollectible;

  /**
   * Erstellt eine Instanz von Level.
   * @param {Object[]} enemies - Das Array der Gegner im Level.
   * @param {Object[]} birds - Das Array der Vögel im Level.
   * @param {Object[]} backgroundObjects - Das Array der Hintergrundobjekte im Level.
   * @param {Object} collectible - Das erste sammelbare Objekt.
   * @param {Object} collectible2 - Das zweite sammelbare Objekt.
   * @param {Object} lastCollectible - Das letzte sammelbare Objekt.
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
