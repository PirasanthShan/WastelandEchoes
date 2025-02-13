/**
 * Repräsentiert die Anzeige der Bombenzahl im Spiel.
 * Diese Klasse zeigt den aktuellen Bombenstatus mithilfe vordefinierter Bilder an.
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
   * Erzeugt eine Instanz von CollectibleBar.
   * Lädt das Standardbild und alle Bilder für die Bombenanzeige.
   */
  constructor() {
    super().loadImage('./img/statusBomb.img/status_bar_taller_bomb_with_count_5.webp');
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 10;
  }

  /**
   * Setzt die Anzeige entsprechend der aktuellen Bombenzahl.
   * Der Wert wird dabei auf einen Bereich von 0 bis 10 begrenzt.
   *
   * @param {number} count - Die aktuelle Bombenzahl.
   */
  setBombs(count) {
    count = Math.max(0, Math.min(count, 10)); // Begrenze den Wert zwischen 0 und 10
    const imageIndex = Math.min(count, this.IMAGES.length - 1);
    this.img = this.imageCache[this.IMAGES[imageIndex]]; // Aktualisiere das angezeigte Bild
  }

  /**
   * Aktualisiert die Bombenanzeige anhand der übergebenen Bombenzahl.
   *
   * @param {number} bombCount - Die aktuelle Bombenzahl.
   */
  update(bombCount) {
    this.setBombs(bombCount);
  }

  /**
   * Behandelt das Aufsammeln eines Bomben-Collectibles.
   * Erhöht die Bombenzahl, aktualisiert die Anzeige und entfernt das
   * eingesammelte Objekt aus dem Level.
   *
   * @param {number} characterBombs - Die aktuelle Bombenzahl des Charakters.
   * @param {number} maxBombs - Die maximal zulässige Bombenzahl.
   * @param {*} collectible - Das aufgesammelte Bomben-Objekt.
   * @param {object} level - Das Level-Objekt, das unter anderem ein Array von Collectibles enthält.
   * @returns {number} Die aktualisierte Bombenzahl.
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
   * Behandelt den Wurf einer Bombe.
   * Verringert die Bombenzahl, sofern vorhanden, und aktualisiert die Anzeige.
   *
   * @param {number} characterBombs - Die aktuelle Bombenzahl des Charakters.
   * @returns {number} Die aktualisierte Bombenzahl.
   */
  handleBombThrow(characterBombs) {
    if (characterBombs > 0) {
      characterBombs--;
      this.update(characterBombs);
    }
    return characterBombs;
  }
}
